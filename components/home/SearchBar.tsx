import React from 'react';

const SearchBar = ({
  searchQuery,
  handleOnChangeSearch,
  handleClearSearch,
  handleSearch,
  inputRef
}) => {
  return (
    <div className="flex justify-center mt-4 mr-4 ml-4">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="ابحث باسم اللعبه..."
          ref={inputRef}
          onChange={handleOnChangeSearch}
          className="px-4 py-2 border rounded-md outline-none focus:border-blue-500 w-full"
        />
        {searchQuery && (
          <button
            className="absolute inset-y-0 left-0 px-3 text-gray-500 focus:outline-none"
            onClick={handleClearSearch}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <button
        onClick={() => handleSearch(searchQuery)}
        className="bg-blue-500 text-white py-1 mr-3 px-6 rounded-md"
      >
        ابحث
      </button>
    </div>
  );
};

export default SearchBar;
