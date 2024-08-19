import { ChangeEvent, FormEvent, useState } from 'react';

import { ApiResponse } from '../utils/types';
import Cookie from 'js-cookie';
import { Layout } from 'layouts/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import withAuth from 'lib/withAuth';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await res.json();
    if (res.ok) {
      // Save the token to local storage or cookies
      Cookie.set('auth-token', result.isAdmin, { expires: 1 }); // expires in 1 day

      localStorage.setItem('token', result.token);
      setMessage('Login successful');
      if (result.isAdmin) {
        // Redirect to the waiting list page if the user is an admin
        router.push('/waitingList');
      } else {
        router.push('/');
      }
    } else {
      setMessage(result.error);
    }
    setIsLoading(false);
  };

  return (
    <Layout title={'سجل الدخول'} description={' سجل الدخول'} ogUrl={`/login`}>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <span className="border-gray-300 h-20 w-20 animate-spin rounded-full inline-block border-8 border-t-blue-600"></span>
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center"> تسجيل الدخول</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الالكترونى
              </label>
              <input
                type="email"
                id="email"
                placeholder="البريد الالكترونى"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                كلمه المرور
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'تسجيل الدخول'}
            </button>
          </form>

          <button className="w-full flex justify-center mt-4 py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Link href="/register" passHref>
              {' '}
              {'سجل حساب'}
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

export default withAuth(Login, 'login');
