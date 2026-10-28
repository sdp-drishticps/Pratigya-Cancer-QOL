"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
  onPageChange,
}: PaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mx-3 mb-4 rounded-lg border border-[#EAECF0] bg-white p-4 sm:mx-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        {/* Left */}
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#D0D5DD] bg-[#F9FAFB] text-[#98A2B3] disabled:cursor-not-allowed disabled:opacity-50"
          >
            ‹
          </button>

          {/* Current */}
          <button className="flex h-9 min-w-9 items-center justify-center rounded-md border border-[#3B82F6] bg-[#EFF6FF] px-3 text-sm font-medium text-[#2563EB]">
            {currentPage}
          </button>

          {/* Next */}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#D0D5DD] bg-[#F9FAFB] text-[#98A2B3] disabled:cursor-not-allowed disabled:opacity-50"
          >
            ›
          </button>
        </div>

        {/* Center */}
        <div className="text-center text-sm text-[#475467] sm:text-left">
          Showing{" "}
          <span className="font-semibold">
            {startItem}-{endItem}
          </span>{" "}
          of <span className="font-semibold">{totalItems}</span>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center gap-2 sm:justify-end">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              onPageChange(1);
            }}
            className="h-9 rounded-md border border-[#D0D5DD] px-3 text-sm text-[#475467] outline-none focus:border-[#2563EB]"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <span className="whitespace-nowrap text-sm text-[#475467]">
            / Page
          </span>
        </div>
      </div>
    </div>
  );
}
