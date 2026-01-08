"use client";

import { useRouter } from "next/navigation";
import BookingForm from "../../../components/BookingForm";
import { type Booking } from "../../../store/bookings";

export default function NewBookingPage() {
  const router = useRouter();
  function handleCreated(b: Booking) {
    router.push(`/booking/${b.id}`);
  }
  return (
    <div className="mx-auto max-w-3xl p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">New booking</h1>
          <p className="mt-1 text-sm text-zinc-600">Enter details to create a booking.</p>
        </div>
      </div>
      <BookingForm onCreated={handleCreated} />
    </div>
  );
}


