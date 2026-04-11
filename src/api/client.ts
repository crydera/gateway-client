import type { Invoice } from '../types';
import { mockGetInvoice } from './mock';

export const POLL_INTERVAL_MS = 10_000;

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export async function getInvoice(secretKey: string): Promise<Invoice> {
  if (USE_MOCK) {
    return mockGetInvoice(secretKey);
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/invoice/${encodeURIComponent(secretKey)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Invoice fetch failed: ${response.status} ${response.statusText} ${text}`);
  }

  return (await response.json()) as Invoice;
}
