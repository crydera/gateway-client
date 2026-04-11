import { useCallback, useEffect, useRef, useState } from 'react';
import { getInvoice, POLL_INTERVAL_MS } from '../api/client';
import { isInvoicePending, type Invoice } from '../types';

interface State {
  data: Invoice | null;
  error: string | null;

  loading: boolean;
}

export interface UseInvoiceResult extends State {
  refetch: () => Promise<void>;
}

export function useInvoice(secretKey: string | null): UseInvoiceResult {
  const [state, setState] = useState<State>({ data: null, error: null, loading: true });
  const mountedRef = useRef(true);
  const timerRef = useRef<number | null>(null);

  const fetchOnce = useCallback(async (showLoading: boolean) => {
    if (!secretKey) {
      setState({ data: null, error: 'NO_KEY', loading: false });
      return;
    }
    if (showLoading) setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const invoice = await getInvoice(secretKey);
      if (!mountedRef.current) return;
      setState({ data: invoice, error: null, loading: false });
    } catch (err) {
      if (!mountedRef.current) return;
      const message = err instanceof Error ? err.message : 'Unknown error';
      setState((s) => ({ data: s.data, error: message, loading: false }));
    }
  }, [secretKey]);

  useEffect(() => {
    mountedRef.current = true;
    fetchOnce(true);
    return () => {
      mountedRef.current = false;
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [fetchOnce]);

  useEffect(() => {
    if (!state.data) return;
    if (!isInvoicePending(state.data.status)) return;

    timerRef.current = window.setTimeout(() => {
      fetchOnce(false);
    }, POLL_INTERVAL_MS);

    return () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [state.data, fetchOnce]);

  const refetch = useCallback(() => fetchOnce(true), [fetchOnce]);

  return { ...state, refetch };
}
