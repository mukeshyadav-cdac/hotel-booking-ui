"use client";

import Link from "next/link";
import PageHeader from "./PageHeader";

export default function BookingsHeader() {
  return (
    <PageHeader
      title="Bookings"
      description="Browse all bookings."
      actions={<Link href="/booking/new" className="btn btn-primary">New booking</Link>}
    />
  );
}


