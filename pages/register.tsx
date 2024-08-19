import { ApiResponse, RegisterFormData } from '../utils/types';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Layout } from 'layouts/Layout';
import Link from 'next/link';
import withAuth from 'lib/withAuth';

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '', // Add confirm password field
    photoIdFront: null,
    photoIdBack: null,
    isAdmin: false
  });
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, files, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files?.[0] : value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const formPayload = new FormData();
    formPayload.append('email', formData.email);
    formPayload.append('password', formData.password);
    formPayload.append('confirmPassword', formData.confirmPassword);

    formPayload.append('photoIdFront', formData.photoIdFront!);
    formPayload.append('photoIdBack', formData.photoIdBack!);

    const res = await fetch('/api/register', {
      method: 'POST',
      body: formPayload
    });

    const result: ApiResponse = await res.json();
    setMessage(result.message || result.error!);
    setIsLoading(false);
  };

  return (
    <Layout title={'سجل '} description={' سجل '} ogUrl={`/register`}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">انشاء حساب</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الالكترونى
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="الايميل"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                كلمة المرور
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="كلمه المرور"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                تاكيد كلمة المرور
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="تأكيد كلمة المرور"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                onChange={handleChange}
                required
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
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
                onChange={handleChange}
                required
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isLoading}
            >
              {isLoading ? 'انتظر ...' : 'انشئ حساب'}
            </button>
          </form>
          <button className="w-full flex justify-center mt-4 py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Link
              className=" w-full h-full inline-flex flex-col items-center justify-center px-2 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
              href="/login"
              passHref
            >
              {' '}
              {'تسجيل الدخول'}
            </Link>
          </button>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes('success') ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(Register, 'register');
