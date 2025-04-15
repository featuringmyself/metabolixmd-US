import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
 
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Previous Button (only shows if not on the first page)
    if (currentPage > 1) {
      pageNumbers.push(
        <button
          key="prev"
          className="hover:bg-gray-200 p-2 px-4 bg-gray-300 text-black rounded-l"
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      );
    }

    // First page
    pageNumbers.push(
      <button
        key={1}
        className={`p-2 px-4 border ${
          currentPage === 1
            ? "bg-blue-500 text-white font-semibold"
            : "hover:bg-gray-200 text-black"
        }`}
        onClick={() => onPageChange(1)}
        aria-label="1"
      >
        1
      </button>
    );

    // Ellipsis if needed
    if (currentPage > 3) {
      pageNumbers.push(
        <span key="ellipsis1" className="p-2 px-4">…</span>
      );
    }

    // Range of pages around the current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`p-2 px-4 border ${
            currentPage === i
              ? "bg-blue-500 text-white font-semibold"
              : "hover:bg-gray-200 text-black"
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Ellipsis if needed before the last page
    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span key="ellipsis2" className="p-2 px-4">…</span>
      );
    }

    // Last page
    pageNumbers.push(
      <button
        key={totalPages}
        className={`p-2 px-4 border ${
          currentPage === totalPages
            ? "bg-blue-500 text-white font-semibold"
            : "hover:bg-gray-200 text-black"
        }`}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </button>
    );

    // Next Button (only shows if not on the last page)
    if (currentPage < totalPages) {
      pageNumbers.push(
        <button
          key="next"
          className="hover:bg-gray-200 p-2 px-4 bg-gray-300 text-black rounded-r"
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination flex justify-center items-center space-x-1 bg-white p-2 rounded border">
      {renderPageNumbers()}
    </div>
  );
}
