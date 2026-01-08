import BookingDetails from "../../../components/BookingDetails";
import PageHeader from "../../../components/PageHeader";
import { BookingIdProvider } from "../../../contexts/BookingIdContext";

export default async function BookingByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="page" style={{ maxWidth: "48rem" }}>
      {/* Note: this is a server component; keep static strings or move header to client if needed */}
      <PageHeader title="Booking" description="Detailed information for this booking." />
      <BookingIdProvider bookingId={id}>
        <BookingDetails />
      </BookingIdProvider>
    </div>
  );
}


