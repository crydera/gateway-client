import { isInvoiceFailed, isInvoicePaid, type InvoiceStatus } from '../types';
import { useI18n } from '../i18n';

interface Props {
  status: InvoiceStatus;
}

const STATUS_CLASS: Record<InvoiceStatus, string> = {
  CREATED: 'status--pending',
  WAITING: 'status--pending',
  PAID: 'status--success',
  EXPIRED: 'status--fail',
  FAILED: 'status--fail',
};

export function StatusBadge({ status }: Props) {
  const { t } = useI18n();
  const label =
    isInvoicePaid(status) ? t('statusSuccess') :
    isInvoiceFailed(status) ? t('statusFail') :
    t('statusPending');

  return (
    <span className={`status ${STATUS_CLASS[status]}`}>
      <span className="status__dot" aria-hidden="true" />
      {label}
    </span>
  );
}
