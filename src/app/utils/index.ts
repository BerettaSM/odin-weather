/* eslint-disable  @typescript-eslint/no-explicit-any */

/**
 * This functions creates a debounced version of the callback
 * passed in.
 *
 * @param callback The callback to be called after delay has passed.
 * @param delayMs The delay in milliseconds.
 * @returns A debounced version of the callback passed in.
 */
export function debounce<F extends (...args: any) => any>(
  callback: F,
  delayMs: number = 1000,
) {
  let eventId: NodeJS.Timeout;
  let timestamp = Infinity;

  return function debounced(...args: Parameters<F>) {
    if (Date.now() < timestamp + delayMs) clearTimeout(eventId);
    timestamp = Date.now();
    eventId = setTimeout(() => {
      callback(...args);
    }, delayMs);
  };
}
