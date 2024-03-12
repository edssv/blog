import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { env } from '@/env.mjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  input: string | number,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }
): string {
  const date = new Date(input);
  return date.toLocaleDateString('ru-RU', options);
}

export function absoluteUrl(path: string | undefined) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function absoluteUrlImageFromPayload(url: string) {
  return `${env.NEXT_PUBLIC_PAYLOAD_URL}${url}`;
}
