"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useBookingsStore } from "../store/bookings";
import { formatDate, nightsBetween } from "../utils/format";
import { useBookingId } from "../contexts/BookingIdContext";

type Props = {
  bookingId?: string;
};

export default function BookingDetails({ bookingId }: Props) {
  const ctxId = useBookingId();
  const effectiveId = bookingId ?? ctxId;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const bookings = useBookingsStore((s) => s.bookings);
  const booking = effectiveId ? bookings.find((b) => b.id === effectiveId) : undefined;
  const deleteBooking = useBookingsStore((s) => s.deleteBooking);

  // Avoid flashing "not found" on first client mount while persisted state hydrates
  if (!mounted && bookings.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-zinc-600">Loading booking…</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">Booking not found</h2>
        <p className="mt-1 text-sm text-zinc-600">We couldn&apos;t find that booking. It may have been deleted.</p>
        <div className="mt-4 flex gap-3">
          <Link
            href="/bookings"
            className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300"
          >
            Back to bookings
          </Link>
          <Link
            href="/booking/new"
            className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300"
          >
            Create new
          </Link>
        </div>
      </div>
    );
  }

 

  const nights = nightsBetween(booking.checkIn, booking.checkOut);

  return (
    <div className="card">
      <div className="flex items-center justify-between border-b border-zinc-200 p-5">
        <div>
          <h2 className="h2">Booking details</h2>
          <p className="mt-1 text-sm subtle">Created {new Date(booking.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-danger" onClick={() => deleteBooking(booking.id)}>Delete</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2">
        <section>
          <h3 className="text-sm font-semibold text-zinc-800">Guest</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Name</dt>
              <dd className="font-medium text-zinc-900">{booking.guestName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Email</dt>
              <dd className="font-medium text-zinc-900">{booking.email}</dd>
            </div>
            {booking.phone ? (
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Phone</dt>
                <dd className="font-medium text-zinc-900">{booking.phone}</dd>
              </div>
            ) : null}
          </dl>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-zinc-800">Stay</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Dates</dt>
              <dd className="font-medium text-zinc-900">
                {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}{" "}
                <span className="text-zinc-500">
                  ({nights} night{nights === 1 ? "" : "s"})
                </span>
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Guests</dt>
              <dd className="font-medium text-zinc-900">
                {booking.guests} guest{booking.guests === 1 ? "" : "s"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Room</dt>
              <dd className="font-medium text-zinc-900">
                <span className="chip capitalize">{booking.roomType}</span>
              </dd>
            </div>
          </dl>
        </section>

        {booking.notes ? (
          <section className="sm:col-span-2">
            <h3 className="text-sm font-semibold text-zinc-800">Notes</h3>
            <p className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-800">
              {booking.notes}
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}


