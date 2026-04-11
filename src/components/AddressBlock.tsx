import { QRCodeSVG } from 'qrcode.react';
import { useI18n } from '../i18n';
import { CopyButton } from './CopyButton';

interface Props {
  address: string;

  amount?: string;
}

export function AddressBlock({ address, amount }: Props) {
  const { t } = useI18n();

  const qrValue = amount ? `tron:${address}?amount=${amount}` : address;

  return (
    <div>
      <div className="row-label">
        <span>{t('address')}</span>
        <CopyButton value={address} label={t('copyAddress')} />
      </div>
      <div className="address-block">
        <div className="address-block__row">
          <div className="address-block__qr" aria-label="QR code">
            <QRCodeSVG
              value={qrValue}
              bgColor="#E9E2CF"
              fgColor="#0B1410"
              level="M"
              marginSize={0}
              size={68}
            />
          </div>
          <div className="address-block__value">{address}</div>
        </div>
      </div>
    </div>
  );
}
