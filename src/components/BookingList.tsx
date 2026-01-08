"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useBookingsStore } from "../store/bookings";
import { nightsBetween } from "../utils/format";

type Props = {
  linkToBase?: string;
  page?: number;
  pageSize?: number;
};

export default function BookingList({ linkToBase, page, pageSize }: Props) {
  const bookings = useBookingsStore((s) => s.bookings);

  const sorted = useMemo(
    () =>
      [...bookings].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [bookings]
  );

  const effectivePageSize = pageSize && pageSize > 0 ? pageSize : sorted.length;
  const effectivePage = page && page > 0 ? page : 1;
  const start = (effectivePage - 1) * effectivePageSize;
  const end = start + effectivePageSize;
  const paged = sorted.slice(start, end);

  return (
    <div className="card">
      <div className="flex items-baseline justify-between border-b border-zinc-200 p-5">
        <div>
          <h2 className="h2">Bookings</h2>
          <p className="mt-1 text-sm subtle">All created bookings.</p>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
          {sorted.length}
        </span>
      </div>
      {sorted.length === 0 ? (
        <div className="p-8 text-center text-sm text-zinc-600">No bookings yet. Use the form to create your first booking.</div>
      ) : (
        <ul className="divide-y divide-zinc-200">
          {paged.map((b) => {
            const nights = nightsBetween(b.checkIn, b.checkOut);
            const content = (
              <>
                <div
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-zinc-300"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-zinc-900">{b.guestName}</p>
                    <span className="truncate text-xs text-zinc-500">@ {b.email}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600">
                    <span>
                      {b.checkIn} → {b.checkOut} ({nights} night{nights === 1 ? "" : "s"})
                    </span>
                      <span className="chip capitalize">{b.roomType}</span>
                    <span>
                      {b.guests} guest{b.guests === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              </>
            );
            return (
              <li key={b.id}>
                <Link href={`${linkToBase ?? ""}/${b.id}`} className="row">
                  {content}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}


