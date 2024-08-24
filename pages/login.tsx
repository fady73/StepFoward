//@ts-nocheck

import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

import Cookie from 'js-cookie';
import { Layout } from 'layouts/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import withAuth from 'lib/withAuth';

const Login = () => {
  const router = useRouter();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('بريد الكترونى غير مسموح ')
      .required(' البريد الإلكتروني مطلوب '),
    password: Yup.string().required('كلمه المرور  مطلوبه')
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }
  ) => {
    setSubmitting(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    const result = await res.json();

    if (res.ok) {
      // Save the token to local storage or cookies
      Cookie.set('auth-token', result.isAdmin, { expires: 1 });
      localStorage.setItem('token', result.token);

      if (result.isAdmin) {
        router.push('/waitingList');
      } else {
        router.push('/');
      }
    } else {
      // Show backend error using toast
      toast.error(result.error || 'حدث خطأ غير متوقع');
    }

    setSubmitting(false);
  };

  return (
    <Layout title={'سجل الدخول'} description={'سجل الدخول'} ogUrl={`/login`}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h1>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {isSubmitting && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <span className="border-gray-300 h-20 w-20 animate-spin rounded-full inline-block border-8 border-t-blue-600"></span>
                  </div>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    البريد الالكترونى
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="البريد الالكترونى"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    كلمه المرور
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="كلمه المرور"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isSubmitting ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'انتظر...' : 'تسجيل الدخول'}
                </button>
              </Form>
            )}
          </Formik>
          <Link href="/register" passHref>
            <button className="w-full flex justify-center mt-4 py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {' '}
              {'سجل حساب'}
            </button>{' '}
          </Link>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default withAuth(Login, 'login');
