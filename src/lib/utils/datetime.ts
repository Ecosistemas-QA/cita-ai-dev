export const APP_TIME_ZONE = process.env.NEXT_PUBLIC_APP_TIME_ZONE || "America/Argentina/Buenos_Aires";

type DateTimeParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

function getPartsInTimeZone(date: Date, timeZone: string): DateTimeParts {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
}

export function zonedDateTimeToIso(
  date: string,
  time: string,
  timeZone = APP_TIME_ZONE,
): string {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute, second = 0] = time.split(":").map(Number);
  const desiredUtcValue = Date.UTC(year, month - 1, day, hour, minute, second);
  let instant = desiredUtcValue;

  // Recalculate the offset to account for zones that use daylight-saving time.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const parts = getPartsInTimeZone(new Date(instant), timeZone);
    const representedUtcValue = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
    );
    const nextInstant = instant + (desiredUtcValue - representedUtcValue);
    if (nextInstant === instant) break;
    instant = nextInstant;
  }

  return new Date(instant).toISOString();
}

export function addDaysToDateKey(date: string, days: number): string {
  const [year, month, day] = date.split("-").map(Number);
  const result = new Date(Date.UTC(year, month - 1, day + days));
  return result.toISOString().slice(0, 10);
}

export function getDateKeyInTimeZone(
  value: string | Date,
  timeZone = APP_TIME_ZONE,
): string {
  const date = typeof value === "string" ? new Date(value) : value;
  const parts = getPartsInTimeZone(date, timeZone);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function formatAppointmentDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions,
  timeZone = APP_TIME_ZONE,
): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("es-AR", { ...options, timeZone }).format(date);
}
