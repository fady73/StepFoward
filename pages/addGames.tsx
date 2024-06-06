import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Layout } from 'layouts/Layout';
import { useForm } from 'react-hook-form';

const GoogleForm: React.FC = () => {
  const [formData, setFormData] = useState({
    gameName: '',
    gameDescription: '',
    gameTools: '',
    gameObjective: '',
    gameVideo: '',
    additionalNotes: '',
    gameVideoFile: null as File | null,
    gameImage: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (e: {
    gameName: '';
    gameDescription: '';
    gameTools: '';
    gameObjective: '';
    gameVideo: '';
    additionalNotes: '';
  }) => {
    setIsLoading(true);
    const formUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLScAX_mByZVzlBDKsuXu5e5UzRgat21wpQGDa3hXhf4r_ft2FA/formResponse';

    const formPayload = new FormData();
    formPayload.append('entry.1112176006', e.gameName); // Replace with actual entry ID
    formPayload.append('entry.2126093632', e.gameDescription); // Replace with actual entry ID
    formPayload.append('entry.1213165890', e.gameTools); // Replace with actual entry ID
    formPayload.append('entry.1475771126', e.gameObjective); // Replace with actual entry ID
    formPayload.append('entry.1127097736', e.gameVideo); // Replace with actual entry ID
    formPayload.append('entry.1742474701', e.additionalNotes); // Replace with actual entry ID

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        body: formPayload,
        mode: 'no-cors'
      });
      toast.success('سيتم مراجعة اللعبة واضافتها شكرا لكم ربنا يبارككم');
      reset(); // Reset the form fields after successful submission
    } catch (error) {
      toast.error('فى مشكله حصلت');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title={'سجل العاب'} description={'اضف العاب'} ogUrl={`/addGames`}>
      <div className="min-h-screen bg-gray-100">
        <ToastContainer className={'r-0'} style={{ right: '0px', textAlign: 'end' }} />

        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <span className="border-gray-300 h-20 w-20 animate-spin rounded-full inline-block border-8 border-t-blue-600"></span>
          </div>
        )}
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                شاركنا بافكارك والعاب جديدة
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md bg-white shadow-md p-6">
                <div className="mb-6">
                  <label
                    htmlFor="gameName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    اسم اللعبة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="gameName"
                    name="gameName"
                    {...register('gameName', { required: 'اسم اللعبة مطلوب' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                    placeholder="اسم اللعبة"
                  />
                  {errors.gameName && (
                    <p className="text-red-500 text-sm mt-1">
                      {String(errors?.gameName?.message)}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="gameDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    شرح اللعبة <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="gameDescription"
                    name="gameDescription"
                    {...register('gameDescription', { required: 'شرح اللعبة مطلوب' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                    placeholder="شرح اللعبة"
                  />
                  {errors.gameDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {String(errors.gameDescription.message)}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="gameTools"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ادوات اللعبة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="gameTools"
                    name="gameTools"
                    {...register('gameTools', { required: 'ادوات اللعبة مطلوبة' })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                    placeholder="ادوات اللعبة"
                  />
                  {errors.gameTools && (
                    <p className="text-red-500 text-sm mt-1">
                      {String(errors.gameTools.message)}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="gameObjective"
                    className="block text-sm font-medium text-gray-700"
                  >
                    الهدف من اللعبة
                  </label>
                  <input
                    type="text"
                    id="gameObjective"
                    name="gameObjective"
                    {...register('gameObjective')}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                    placeholder="الهدف من اللعبة"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="gameVideo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    فيديو اللعبة
                  </label>
                  <input
                    type="text"
                    id="gameVideo"
                    name="gameVideo"
                    {...register('gameVideo')}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                    placeholder="فيديو اللعبة"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="additionalNotes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    اضافات اخرى
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    {...register('additionalNotes')}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                    placeholder="اضافات اخرى"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  {isLoading ? 'ستتم الاضافة...' : 'اضف اللعبة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GoogleForm;
