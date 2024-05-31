import React from 'react';

const NoData = () => (
  <div className="flex items-center justify-center py-8">
    <p className="text-gray-600 font-bold text-2xl">لا توجد ألعاب بهذا الاسم</p>
    <svg
      className="h-8 w-8 mt-4 mr-2 text-red-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </div>
);

export default NoData;
