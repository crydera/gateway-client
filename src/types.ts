export type InvoiceStatus = 'CREATED' | 'WAITING' | 'PAID' | 'EXPIRED' | 'FAILED';

export type Network = 'TRON' | 'TON';

export interface Invoice {
  id: string;
  address: string;
  network: Network;
  currency: string;
  amount: number;
  status: InvoiceStatus;
  expiresAt: string;
  createdAt?: string;
  paidAt?: string | null;
  txHash?: string;
}

export interface ApiError {
  message: string;
  fields?: Record<string, string>;
}

export function isInvoicePending(status: InvoiceStatus): boolean {
  return status === 'CREATED' || status === 'WAITING';
}

export function isInvoicePaid(status: InvoiceStatus): boolean {
  return status === 'PAID';
}

export function isInvoiceFailed(status: InvoiceStatus): boolean {
  return status === 'EXPIRED' || status === 'FAILED';
}
