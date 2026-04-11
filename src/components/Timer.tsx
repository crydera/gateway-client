import { useI18n } from '../i18n';
import type { CountdownResult } from '../hooks/useCountdown';
import { GRACE_PERIOD_MS } from '../hooks/useCountdown';

interface Props {
  countdown: CountdownResult;

  totalWindowMs: number;
}

export function Timer({ countdown, totalWindowMs }: Props) {
  const { t } = useI18n();
  const { phase, msLeft, graceMsLeft, formatted } = countdown;

  const warning = phase === 'active' && msLeft < 2 * 60 * 1000;

  let className = 'timer';
  if (warning) className += ' timer--warning';
  if (phase === 'grace') className += ' timer--grace';
  if (phase === 'expired') className += ' timer--expired';

  const progress =
    phase === 'active'
      ? Math.max(0, Math.min(100, (msLeft / totalWindowMs) * 100))
      : phase === 'grace'
        ? Math.max(0, Math.min(100, (graceMsLeft / GRACE_PERIOD_MS) * 100))
        : 0;

  const label =
    phase === 'expired' ? t('expired') :
    phase === 'grace' ? t('graceWaiting') :
    t('timeLeft');

  return (
    <div className={className}>
      <div>
        <div className="timer__label">{label}</div>
      </div>
      <div className="timer__value" aria-live="polite">{formatted}</div>
      <div
        className="timer__progress"
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, margin: 0 }}
      >
        <div className="timer__progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
