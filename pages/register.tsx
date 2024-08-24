import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

import { Layout } from 'layouts/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import withAuth from 'lib/withAuth';

const Register = () => {
  const router = useRouter();

  // Validation schema using Yup with Arabic messages
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('البريد الإلكتروني غير صالح')
      .required('البريد الإلكتروني مطلوب'),
    password: Yup.string().required('كلمة المرور مطلوبة'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'كلمتا المرور غير متطابقتين')
      .required('تأكيد كلمة المرور مطلوب'),
    photoIdFront: Yup.mixed().required('صورة البطاقة الشخصية الأمامية مطلوبة'),
    photoIdBack: Yup.mixed().required('صورة البطاقة الشخصية الخلفية مطلوبة')
  });

  const handleSubmit = async (
    values: {
      email: string;
      password: string;
      confirmPassword: string;
      photoIdFront: File | null;
      photoIdBack: File | null;
    },
    { setSubmitting }
  ) => {
    setSubmitting(true);

    const formPayload = new FormData();
    formPayload.append('email', values.email);
    formPayload.append('password', values.password);
    formPayload.append('confirmPassword', values.confirmPassword);
    formPayload.append('photoIdFront', values.photoIdFront!);
    formPayload.append('photoIdBack', values.photoIdBack!);

    const res = await fetch('/api/register', {
      method: 'POST',
      body: formPayload
    });

    const result = await res.json();
    if (res.ok) {
      toast.success(result.message);
    } else {
      // Show backend error using toast
      toast.error(result.message || 'حدث خطأ غير متوقع');
    }

    setSubmitting(false);
  };

  return (
    <Layout title={'سجل '} description={' سجل '} ogUrl={`/register`}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">انشاء حساب</h1>

          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              photoIdFront: null,
              photoIdBack: null
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
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
                    placeholder="الايميل"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    كلمة المرور
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
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    تاكيد كلمة المرور
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="تأكيد كلمة المرور"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="photoIdFront"
                    className="block text-sm font-medium text-gray-700"
                  >
                    صورة البطاقة الشخصيه (الاماميه)
                  </label>
                  <input
                    type="file"
                    name="photoIdFront"
                    id="photoIdFront"
                    onChange={e =>
                      setFieldValue('photoIdFront', e.currentTarget.files?.[0])
                    }
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  />
                  <ErrorMessage
                    name="photoIdFront"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="photoIdBack"
                    className="block text-sm font-medium text-gray-700"
                  >
                    صورة البطاقة الشخصيه (الخلفية)
                  </label>
                  <input
                    type="file"
                    name="photoIdBack"
                    id="photoIdBack"
                    onChange={e =>
                      setFieldValue('photoIdBack', e.currentTarget.files?.[0])
                    }
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  />
                  <ErrorMessage
                    name="photoIdBack"
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
                  {isSubmitting ? 'انتظر ...' : 'انشئ حساب'}
                </button>
              </Form>
            )}
          </Formik>
          <Link href="/login" passHref>
            <button className="w-full flex justify-center mt-4 py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {' '}
              {'تسجيل الدخول'}
            </button>{' '}
          </Link>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default withAuth(Register, 'register');
