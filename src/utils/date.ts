import moment, { Moment, MomentInput } from 'moment';

// Common date formats
export const DateFormats = {
  // Date only
  DATE_SHORT: 'DD/MM/YYYY',
  DATE_MEDIUM: 'DD MMM YYYY',
  DATE_LONG: 'DD MMMM YYYY',
  DATE_US: 'MM/DD/YYYY',
  DATE_ISO: 'YYYY-MM-DD',

  // Time only
  TIME_12H: 'hh:mm A',
  TIME_24H: 'HH:mm',
  TIME_WITH_SECONDS: 'HH:mm:ss',

  // Date and Time
  DATETIME_SHORT: 'DD/MM/YYYY HH:mm',
  DATETIME_MEDIUM: 'DD MMM YYYY, HH:mm',
  DATETIME_LONG: 'DD MMMM YYYY, HH:mm:ss',
  DATETIME_12H: 'DD/MM/YYYY hh:mm A',

  // Relative
  MONTH_YEAR: 'MMMM YYYY',
  DAY_MONTH: 'DD MMM',
  WEEKDAY: 'dddd',
  WEEKDAY_SHORT: 'ddd',
} as const;

export type DateFormat = (typeof DateFormats)[keyof typeof DateFormats];

/**
 * Format a date with the specified format
 */
export function formatDate(
  date: MomentInput,
  format: DateFormat | string = DateFormats.DATE_SHORT
): string {
  if (!date) return '';
  return moment(date).format(format);
}

/**
 * Format date to relative time (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelative(date: MomentInput): string {
  if (!date) return '';
  return moment(date).fromNow();
}

/**
 * Format date to calendar format (e.g., "Today at 2:30 PM", "Yesterday", "Last Monday")
 */
export function formatCalendar(date: MomentInput): string {
  if (!date) return '';
  return moment(date).calendar();
}

/**
 * Format duration between two dates
 */
export function formatDuration(
  startDate: MomentInput,
  endDate: MomentInput
): string {
  if (!startDate || !endDate) return '';
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));
  return duration.humanize();
}

/**
 * Format date for display with smart formatting
 * - Today: "Today, 2:30 PM"
 * - Yesterday: "Yesterday, 2:30 PM"
 * - This year: "15 Jan, 2:30 PM"
 * - Other years: "15 Jan 2023, 2:30 PM"
 */
export function formatSmart(date: MomentInput): string {
  if (!date) return '';

  const m = moment(date);
  const now = moment();

  if (m.isSame(now, 'day')) {
    return `Today, ${m.format(DateFormats.TIME_12H)}`;
  }

  if (m.isSame(now.clone().subtract(1, 'day'), 'day')) {
    return `Yesterday, ${m.format(DateFormats.TIME_12H)}`;
  }

  if (m.isSame(now, 'year')) {
    return m.format('DD MMM, hh:mm A');
  }

  return m.format('DD MMM YYYY, hh:mm A');
}

/**
 * Get start of day
 */
export function startOfDay(date: MomentInput): Date {
  return moment(date).startOf('day').toDate();
}

/**
 * Get end of day
 */
export function endOfDay(date: MomentInput): Date {
  return moment(date).endOf('day').toDate();
}

/**
 * Get start of week
 */
export function startOfWeek(date: MomentInput): Date {
  return moment(date).startOf('week').toDate();
}

/**
 * Get end of week
 */
export function endOfWeek(date: MomentInput): Date {
  return moment(date).endOf('week').toDate();
}

/**
 * Get start of month
 */
export function startOfMonth(date: MomentInput): Date {
  return moment(date).startOf('month').toDate();
}

/**
 * Get end of month
 */
export function endOfMonth(date: MomentInput): Date {
  return moment(date).endOf('month').toDate();
}

/**
 * Add time to a date
 */
export function addTime(
  date: MomentInput,
  amount: number,
  unit: moment.unitOfTime.DurationConstructor
): Date {
  return moment(date).add(amount, unit).toDate();
}

/**
 * Subtract time from a date
 */
export function subtractTime(
  date: MomentInput,
  amount: number,
  unit: moment.unitOfTime.DurationConstructor
): Date {
  return moment(date).subtract(amount, unit).toDate();
}

/**
 * Check if a date is before another date
 */
export function isBefore(
  date: MomentInput,
  compareDate: MomentInput
): boolean {
  return moment(date).isBefore(compareDate);
}

/**
 * Check if a date is after another date
 */
export function isAfter(
  date: MomentInput,
  compareDate: MomentInput
): boolean {
  return moment(date).isAfter(compareDate);
}

/**
 * Check if a date is between two dates
 */
export function isBetween(
  date: MomentInput,
  startDate: MomentInput,
  endDate: MomentInput
): boolean {
  return moment(date).isBetween(startDate, endDate);
}

/**
 * Check if a date is today
 */
export function isToday(date: MomentInput): boolean {
  return moment(date).isSame(moment(), 'day');
}

/**
 * Check if a date is yesterday
 */
export function isYesterday(date: MomentInput): boolean {
  return moment(date).isSame(moment().subtract(1, 'day'), 'day');
}

/**
 * Check if a date is tomorrow
 */
export function isTomorrow(date: MomentInput): boolean {
  return moment(date).isSame(moment().add(1, 'day'), 'day');
}

/**
 * Check if a date is in the past
 */
export function isPast(date: MomentInput): boolean {
  return moment(date).isBefore(moment());
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: MomentInput): boolean {
  return moment(date).isAfter(moment());
}

/**
 * Check if a date is valid
 */
export function isValidDate(date: MomentInput): boolean {
  return moment(date).isValid();
}

/**
 * Get difference between two dates in specified unit
 */
export function getDiff(
  date1: MomentInput,
  date2: MomentInput,
  unit: moment.unitOfTime.Diff = 'days'
): number {
  return moment(date1).diff(moment(date2), unit);
}

/**
 * Get age from birth date
 */
export function getAge(birthDate: MomentInput): number {
  return moment().diff(moment(birthDate), 'years');
}

/**
 * Parse a date string with specified format
 */
export function parseDate(
  dateString: string,
  format: DateFormat | string = DateFormats.DATE_ISO
): Date | null {
  const parsed = moment(dateString, format);
  return parsed.isValid() ? parsed.toDate() : null;
}

/**
 * Get now as Date
 */
export function now(): Date {
  return moment().toDate();
}

/**
 * Get moment instance for advanced usage
 */
export function getMoment(date?: MomentInput): Moment {
  return date ? moment(date) : moment();
}

// Export moment for advanced usage
export { moment };
