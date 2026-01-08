export function formatDate(isoDate: string): string {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  const ms = b.getTime() - a.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}


