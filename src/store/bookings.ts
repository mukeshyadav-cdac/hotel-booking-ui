import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type RoomType = "standard" | "deluxe" | "suite";

export interface Booking {
	id: string;
	guestName: string;
	email: string;
	phone?: string;
	guests: number;
	roomType: RoomType;
	checkIn: string;
	checkOut: string;
	notes?: string;
	createdAt: string;
}

export interface BookingsState {
		bookings: Booking[];
		createBooking: (input: Omit<Booking, "id" | "createdAt">) => Booking;
		deleteBooking: (id: string) => void;
}

export const useBookingsStore = create<BookingsState>()(
	persist(
		(set) => ({
			bookings: [],
			createBooking: (input) => {
				const booking: Booking = {
					id: uuidv4(),
					createdAt: new Date().toISOString(),
					...input,
				};
				set((state) => ({
					bookings: [booking, ...state.bookings],
				}));
				return booking;
			},
			deleteBooking: (id) =>
				set((state) => {
					const next = state.bookings.filter((b) => b.id !== id);
					return { bookings: next };
				}),
		}),
		{
			name: "hotel-bookings",
			partialize: (state) => ({ bookings: state.bookings }),
		}
	)
);
