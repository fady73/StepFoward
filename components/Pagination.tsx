import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (pageNumber: number) => void; // Optional callback for handling page changes
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Function to generate page number buttons
  const generatePageNumbers = (): JSX.Element[] => {
    const pageNumbers: JSX.Element[] = [];

    // Adjust the range based on desired behavior (e.g., show surrounding pages)
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      const buttonProps = {
        key: `page-${i}`,
        className: `px-4 py-2 text-lg font-bold rounded-md border border-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          isActive ? 'bg-indigo-600 text-white' : ''
        }`, // Apply active styles
        onClick: () => onPageChange && onPageChange(i), // Call callback if provided
      };

      pageNumbers.push(<button {...buttonProps}>{i}</button>);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination flex items-center justify-center mt-4 px-4 py-2 rounded-md border border-gray-300 shadow-md">
   
  
      {generatePageNumbers()}
     
   
    </div>
  );
};

export default Pagination;