import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxButtons = 3;

  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);

  for (let i = start; i <= end; i++) pageNumbers.push(i);

  const btnBase =
    "h-9 min-w-[36px] px-3 rounded-xl text-[13px] font-bold flex items-center justify-center transition-all duration-200";
  const btnActive =
    "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_4px_12px_rgba(139,92,246,0.3)]";
  const btnInactive =
    "bg-white border border-purple-100/60 text-gray-500 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50";
  const btnDisabled =
    "bg-white border border-gray-100 text-gray-300 cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-1.5 py-8">
      {/* Prev */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnInactive}`}
      >
        <ChevronLeft size={15} />
      </button>

      {/* First page shortcut */}
      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={`${btnBase} ${btnInactive}`}>
            1
          </button>
          {start > 2 && (
            <span className="text-gray-300 text-sm font-bold px-1">···</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`${btnBase} ${currentPage === num ? btnActive : btnInactive}`}
        >
          {num}
        </button>
      ))}

      {/* Last page shortcut */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="text-gray-300 text-sm font-bold px-1">···</span>
          )}
          <button onClick={() => onPageChange(totalPages)} className={`${btnBase} ${btnInactive}`}>
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnInactive}`}
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
};

export default Pagination;
