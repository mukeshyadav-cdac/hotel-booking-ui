"use client";

type Props = {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
};

export default function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const from = totalItems === 0 ? 0 : (clampedPage - 1) * pageSize + 1;
  const to = Math.min(totalItems, clampedPage * pageSize);

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
      <div className="text-sm subtle">
        {from}-{to} of {totalItems}
      </div>
      <div className="flex items-center gap-3">
        {onPageSizeChange ? (
          <div className="flex items-center gap-2">
            <span className="text-sm subtle">Rows per page</span>
            <select
              className="select"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="flex items-center gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => onPageChange(clampedPage - 1)}
            disabled={clampedPage <= 1}
            aria-label="Previous page"
          >
            Prev
          </button>
          <span className="text-sm subtle">
            Page {clampedPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() => onPageChange(clampedPage + 1)}
            disabled={clampedPage >= totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}


