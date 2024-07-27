import { ApiResponse, RegisterFormData } from '../utils/types';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Layout } from 'layouts/Layout';
import withAuth from 'lib/withAuth';

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
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

    const formPayload = new FormData();
    formPayload.append('email', formData.email);
    formPayload.append('password', formData.password);
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
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
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
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
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
                Photo ID (Front)
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
                Photo ID (Back)
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
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
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
