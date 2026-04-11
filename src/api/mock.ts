import type { Invoice } from '../types';

const AUTO_SUCCESS_AFTER_MS = 45_000;
const PAYMENT_WINDOW_MS = 15 * 60 * 1000;

interface MockState {
  invoice: Invoice;
  createdAt: number;

  latencyMs: number;
}

function makeInvoice(id: string): Invoice {
  return {
    id,
    address: 'TKzxdSv2FZKQrEqkKVgp7YhXhCPTbE6aFm',
    network: 'TRON',
    currency: 'USDT',
    amount: 49.9,
    status: 'WAITING',
    expiresAt: new Date(Date.now() + PAYMENT_WINDOW_MS).toISOString(),
    createdAt: new Date().toISOString(),
    paidAt: null,
  };
}

const store = new Map<string, MockState>();

function getOrCreate(key: string): MockState {
  let state = store.get(key);
  if (!state) {
    state = {
      invoice: makeInvoice(key.slice(0, 10) || 'demo'),
      createdAt: Date.now(),
      latencyMs: 250,
    };
    store.set(key, state);
  }
  return state;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockGetInvoice(key: string): Promise<Invoice> {
  const state = getOrCreate(key);
  await delay(state.latencyMs);

  if (
    state.invoice.status === 'WAITING' &&
    Date.now() - state.createdAt > AUTO_SUCCESS_AFTER_MS
  ) {
    state.invoice = {
      ...state.invoice,
      status: 'PAID',
      paidAt: new Date().toISOString(),
      txHash: '0x' + Math.random().toString(16).slice(2, 10) + 'a1b2c3d4',
    };
  }

  return { ...state.invoice };
}
