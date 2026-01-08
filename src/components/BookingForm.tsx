"use client";

import { useMemo, useState } from "react";
import { type RoomType, useBookingsStore, type Booking } from "../store/bookings";

type FormState = {
  guestName: string;
  email: string;
  phone: string;
  guests: number;
  roomType: RoomType;
  checkIn: string;
  checkOut: string;
  notes: string;
};

const defaultState: FormState = {
  guestName: "",
  email: "",
  phone: "",
  guests: 1,
  roomType: "standard",
  checkIn: "",
  checkOut: "",
  notes: "",
};

type Props = {
  onCreated?: (booking: Booking) => void;
};

export default function BookingForm({ onCreated }: Props) {
  const createBooking = useBookingsStore((s) => s.createBooking);
  const [form, setForm] = useState<FormState>(defaultState);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({} as any);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.guestName.trim()) e.guestName = "Guest name is required";
    if (!/.+@.+\..+/.test(form.email)) e.email = "Valid email is required";
    if (!form.checkIn) e.checkIn = "Check-in is required";
    if (!form.checkOut) e.checkOut = "Check-out is required";
    if (form.checkIn && form.checkOut && new Date(form.checkOut) <= new Date(form.checkIn)) {
      e.checkOut = "Check-out must be after check-in";
    }
    if (form.guests < 1) e.guests = "At least 1 guest";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      guestName: true,
      email: true,
      phone: true,
      guests: true,
      roomType: true,
      checkIn: true,
      checkOut: true,
      notes: true,
    });
    if (!isValid) return;
    const created = createBooking({
      guestName: form.guestName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      guests: form.guests,
      roomType: form.roomType,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      notes: form.notes.trim() || undefined,
    });
    onCreated?.(created);
    setForm(defaultState);
    setTouched({} as any);
  }

  return (
    <div className="card">
      <div className="border-b border-zinc-200 p-5">
        <h2 className="h2">Create booking</h2>
        <p className="mt-1 text-sm subtle">Enter guest and stay details.</p>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="guestName">Guest name</label>
          <input
            id="guestName"
            type="text"
            className="input"
            value={form.guestName}
            onChange={(e) => update("guestName", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, guestName: true }))}
            placeholder="Jane Doe"
            aria-invalid={touched.guestName && !!errors.guestName}
            aria-describedby={touched.guestName && errors.guestName ? "guestName-error" : undefined}
            required
          />
          {touched.guestName && errors.guestName ? (
            <p id="guestName-error" className="help error">{errors.guestName}</p>
          ) : null}
        </div>

        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="jane@example.com"
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={touched.email && errors.email ? "email-error" : undefined}
            required
          />
          {touched.email && errors.email ? (
            <p id="email-error" className="help error">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <label className="label" htmlFor="phone">Phone (optional)</label>
          <input
            id="phone"
            type="tel"
            className="input"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            placeholder="+1 555 123 4567"
          />
        </div>

        <div>
          <label className="label" htmlFor="checkIn">Check-in</label>
          <input
            id="checkIn"
            type="date"
            className="input"
            value={form.checkIn}
            onChange={(e) => update("checkIn", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, checkIn: true }))}
            aria-invalid={touched.checkIn && !!(errors.checkIn)}
            aria-describedby={touched.checkIn && errors.checkIn ? "checkIn-error" : undefined}
            required
          />
          {touched.checkIn && errors.checkIn ? (
            <p id="checkIn-error" className="help error">{errors.checkIn}</p>
          ) : null}
        </div>

        <div>
          <label className="label" htmlFor="checkOut">Check-out</label>
          <input
            id="checkOut"
            type="date"
            className="input"
            value={form.checkOut}
            onChange={(e) => update("checkOut", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, checkOut: true }))}
            required
            min={form.checkIn || undefined}
            aria-invalid={touched.checkOut && !!(errors.checkOut)}
            aria-describedby={touched.checkOut && errors.checkOut ? "checkOut-error" : undefined}
          />
          {touched.checkOut && errors.checkOut ? (
            <p id="checkOut-error" className="help error">{errors.checkOut}</p>
          ) : null}
        </div>

        <div>
          <label className="label" htmlFor="guests">Guests</label>
          <input
            id="guests"
            type="number"
            min={1}
            max={12}
            className="input"
            value={form.guests}
            onChange={(e) => update("guests", Number(e.target.value))}
            onBlur={() => setTouched((t) => ({ ...t, guests: true }))}
            aria-invalid={touched.guests && !!errors.guests}
            aria-describedby={touched.guests && errors.guests ? "guests-error" : undefined}
            required
          />
          {touched.guests && errors.guests ? (
            <p id="guests-error" className="help error">{errors.guests}</p>
          ) : null}
        </div>

        <div>
          <label className="label" htmlFor="roomType">Room type</label>
          <select
            id="roomType"
            className="select"
            value={form.roomType}
            onChange={(e) => update("roomType", e.target.value as RoomType)}
            onBlur={() => setTouched((t) => ({ ...t, roomType: true }))}
          >
            <option value="standard">Standard</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            rows={3}
            className="textarea"
            placeholder="Dietary requirements, late arrival, etc."
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, notes: true }))}
          />
        </div>

        <div className="sm:col-span-2 mt-2 flex items-center justify-end gap-3">
          <button
            type="reset"
            className="btn btn-secondary"
            onClick={() => {
              setForm(defaultState);
              setTouched({} as any);
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Create booking
          </button>
        </div>
      </form>
    </div>
  );
}


