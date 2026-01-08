"use client";

import { createContext, useContext } from "react";

const BookingIdContext = createContext<string | undefined>(undefined);

export function BookingIdProvider({
  bookingId,
  children,
}: {
  bookingId: string;
  children: React.ReactNode;
}) {
  return <BookingIdContext.Provider value={bookingId}>{children}</BookingIdContext.Provider>;
}

export function useBookingId(): string | undefined {
  return useContext(BookingIdContext);
}


