/**
 * Content editors in the CMS _think_ they're using local or Central time, but
 * the CMS stores their dates in UTC. This converts the CMS's string to what the
 * editor thought it should be (the entered string, but in Central time) and
 * returns the resulting Date object.
 * @param date
 */
export function dateToCentralTime(date: string) {
  const HOUR = 60 * 60 * 1000;
  const centralOffset = 6 * HOUR; // during standard time

  return new Date(new Date(date).getTime() + centralOffset);
}
