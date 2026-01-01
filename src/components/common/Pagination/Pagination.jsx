const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxButtons = 3;

  // Dynamic range logic
  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);

  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 py-6 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-md text-sm transition ${
          currentPage === 1
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        Prev
      </button>

      {/* First page */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-3 py-1 border rounded-md text-sm ${
              currentPage === 1
                ? "bg-blue-100 text-blue-600 border-blue-300"
                : "border-gray-300 hover:bg-gray-100 text-gray-700"
            }`}
          >
            1
          </button>
          {start > 2 && <span className="text-gray-500 px-2">...</span>}
        </>
      )}

      {/* Page numbers */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 border rounded-md text-sm ${
            currentPage === num
              ? "bg-blue-100 text-blue-600 border-blue-300"
              : "border-gray-300 hover:bg-gray-100 text-gray-700"
          }`}
        >
          {num}
        </button>
      ))}

      {/* Last page */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="text-gray-500 px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 border rounded-md text-sm ${
              currentPage === totalPages
                ? "bg-blue-100 text-blue-600 border-blue-300"
                : "border-gray-300 hover:bg-gray-100 text-gray-700"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-md text-sm transition ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
