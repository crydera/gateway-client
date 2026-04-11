import { useEffect, useState } from 'react';

export const GRACE_PERIOD_MS = 3 * 60 * 1000;

export type CountdownPhase = 'active' | 'grace' | 'expired';

export interface CountdownResult {

  msLeft: number;

  graceMsLeft: number;

  phase: CountdownPhase;

  formatted: string;
}

function format(ms: number): string {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useCountdown(expiresAt: string | undefined): CountdownResult {
  const deadline = expiresAt ? new Date(expiresAt).getTime() : 0;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!deadline) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [deadline]);

  if (!deadline) {
    return { msLeft: 0, graceMsLeft: 0, phase: 'expired', formatted: '00:00' };
  }

  const msLeft = deadline - now;

  if (msLeft > 0) {
    return {
      msLeft,
      graceMsLeft: GRACE_PERIOD_MS,
      phase: 'active',
      formatted: format(msLeft),
    };
  }

  const graceMsLeft = deadline + GRACE_PERIOD_MS - now;
  if (graceMsLeft > 0) {
    return {
      msLeft,
      graceMsLeft,
      phase: 'grace',
      formatted: format(graceMsLeft),
    };
  }

  return { msLeft, graceMsLeft: 0, phase: 'expired', formatted: '00:00' };
}
