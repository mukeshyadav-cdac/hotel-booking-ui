"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useBookingsStore } from "../store/bookings";
import BookingList from "./BookingList";
import Pagination from "./Pagination";

export default function BookingsSection() {
  const total = useBookingsStore((s) => s.bookings.length);
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageFromUrl = Number(search.get("page") || "1");
  const sizeFromUrl = Number(search.get("size") || "10");
  const [page, setPage] = useState(Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1);
  const [pageSize, setPageSize] = useState(
    Number.isFinite(sizeFromUrl) && sizeFromUrl > 0 ? sizeFromUrl : 10
  );

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  // Clamp page when total or pageSize changes (e.g., deletions)
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    const params = new URLSearchParams(search.toString());
    params.set("page", String(page));
    params.set("size", String(pageSize));
    router.replace(`${pathname}?${params.toString()}`);
  }, [page, pageSize]);

  return (
    <div>
      <BookingList linkToBase="/booking" page={page} pageSize={pageSize} />
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={total}
        onPageChange={setPage}
        onPageSizeChange={(n) => {
          setPageSize(n);
          setPage(1);
        }}
      />
    </div>
  );
}


