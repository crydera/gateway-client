import { useI18n } from '../i18n';
import { isInvoiceFailed, isInvoicePaid, isInvoicePending, type Invoice } from '../types';
import { useCountdown } from '../hooks/useCountdown';
import { StatusBadge } from './StatusBadge';
import { AmountBlock } from './AmountBlock';
import { AddressBlock } from './AddressBlock';
import { Timer } from './Timer';
import { CrabRunner } from './CrabRunner';

interface Props {
  invoice: Invoice;
}

const PAYMENT_WINDOW_MS = 15 * 60 * 1000;

const TRONSCAN_URL = 'https://tronscan.org/#/transaction/';

export function PaymentPage({ invoice }: Props) {
  const { t } = useI18n();
  const countdown = useCountdown(invoice.expiresAt);

  const statusHint =
    isInvoicePaid(invoice.status) ? t('statusSuccessHint') :
    isInvoiceFailed(invoice.status) ? t('statusFailHint') :
    t('statusPendingHint');

  const showTimer = isInvoicePending(invoice.status);
  const showGraceNote = isInvoicePending(invoice.status) && countdown.phase === 'grace';

  return (
    <>
      <CrabRunner status={invoice.status} />

      <article className="card" aria-live="polite">
        <header className="card__header">
          <div className="card__eyebrow">
            {t('paymentTo')} · Crydera
          </div>
          <h1 className="card__title">
            {isInvoicePending(invoice.status) && t('statusPending')}
            {isInvoicePaid(invoice.status) && t('statusSuccess')}
            {isInvoiceFailed(invoice.status) && t('statusFail')}
          </h1>
          <p className="card__subtitle">{statusHint}</p>
          <div style={{ marginTop: 14 }}>
            <StatusBadge status={invoice.status} />
          </div>
        </header>

        <div className="card__body">
          <AmountBlock
            amount={invoice.amount}
            currency={invoice.currency}
            network={invoice.network}
          />

          {isInvoicePending(invoice.status) && (
            <AddressBlock address={invoice.address} amount={String(invoice.amount)} />
          )}

          {showTimer && (
            <Timer countdown={countdown} totalWindowMs={PAYMENT_WINDOW_MS} />
          )}

          {showGraceNote && (
            <div className="note note--warning">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 5v4M8 11.5v.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
              <div className="note__items">
                <span>{t('graceNote')}</span>
              </div>
            </div>
          )}

          {isInvoicePending(invoice.status) && countdown.phase === 'active' && (
            <div className="note">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 5v4M8 11.5v.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
              <div className="note__items">
                <span>
                  <strong>{t('important')}: </strong>
                  {t('warningNetwork', { currency: invoice.currency, network: invoice.network })}
                </span>
                <span>{t('warningExact')}</span>
              </div>
            </div>
          )}

          {isInvoicePaid(invoice.status) && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {invoice.txHash && (
                <a
                  className="btn btn--ghost"
                  href={`${TRONSCAN_URL}${invoice.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('viewTxn')}
                </a>
              )}
            </div>
          )}

        </div>

        <footer className="card__footer">
          <span>{t('securedBy')}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ivory-muted)' }}>
            ID · {invoice.id}
          </span>
        </footer>
      </article>
    </>
  );
}
