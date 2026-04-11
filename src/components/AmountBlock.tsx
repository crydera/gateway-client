import { useI18n } from '../i18n';
import { CopyButton } from './CopyButton';

interface Props {
  amount: number;
  currency: string;
  network: 'TRON' | 'TON';
}

export function AmountBlock({ amount, currency, network }: Props) {
  const { t } = useI18n();

  return (
    <div>
      <div className="row-label">
        <span>{t('amount')}</span>
        <CopyButton value={String(amount)} label={t('copyAmount')} />
      </div>
      <div className="amount-block">
        <div className="amount-block__value">
          <span className="amount-block__num">{amount}</span>
          <span className="amount-block__unit">{currency}</span>
        </div>
        <div className="amount-block__network">
          <span>{t('network')}:</span>
          <span className="net-chip">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/>
              <path d="M3 4h4M5 4v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            {network}
          </span>
        </div>
      </div>
    </div>
  );
}
