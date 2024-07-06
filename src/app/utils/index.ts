/* eslint-disable  @typescript-eslint/no-explicit-any */

import type { SearchParams } from '../types';

export function getDayPeriod(date: Date) {
  const hour = date.getHours();
  if (hour < 6 || hour > 20) return 'NIGHT';
  if (hour < 12) return 'MORNING';
  if (hour < 15) return 'NOON';
  if (hour < 18) return 'AFTERNOON';
  return 'EVENING';
}

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

export async function delay(ms: number = 1000) {
  return new Promise((r) => setTimeout(r, ms));
}

export function parseISODateLocal(str: string) {
  const tokens = str.split(/\D/).map(Number);
  tokens[1]--; // First month is 0.
  return new Date(...(tokens as []));
}

export function parseSearchParameters(params: SearchParams) {
  return Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
}
