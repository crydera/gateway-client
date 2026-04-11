import { useEffect, useState } from 'react';
import { useI18n } from './i18n';
import { useInvoice } from './hooks/useInvoice';
import { PaymentPage } from './components/PaymentPage';
import { LanguageToggle } from './components/LanguageToggle';
import { isInvoiceFailed, isInvoicePaid } from './types';

function readKeyFromUrl(): string | null {
  const url = new URL(window.location.href);
  const q = url.searchParams.get('key') ?? url.searchParams.get('k');
  if (q) return q;
  const m = url.pathname.match(/\/(?:pay|invoice|i)\/([^/]+)/);
  return m?.[1] ?? null;
}

export default function App() {
  const { t } = useI18n();
  const [secretKey] = useState<string | null>(() => readKeyFromUrl());
  const { data: invoice, loading, error, refetch } = useInvoice(secretKey);

  useEffect(() => {
    if (!invoice) {
      document.title = 'Crydera Pay';
      return;
    }
    const prefix =
      isInvoicePaid(invoice.status) ? '✓' :
      isInvoiceFailed(invoice.status) ? '✕' :
      '•';
    document.title = `${prefix} Crydera Pay`;
  }, [invoice]);

  return (
    <div className="app">
      <header className="app__top">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            {
                <img src="/logo.svg" alt="Crydera" width="30" height="30" />  
            }
          </span>
          Crydera
        </div>
        <LanguageToggle />
      </header>

      <main className="app__main">
        {loading && !invoice && (
          <div className="centered">
            <div className="spinner" />
            <p className="error-text">{t('loading')}</p>
          </div>
        )}

        {!loading && error === 'NO_KEY' && (
          <div className="centered">
            <h2 className="error-title">{t('errorNoKey')}</h2>
            <p className="error-text">{t('errorNoKeyHint')}</p>
          </div>
        )}

        {!loading && error && error !== 'NO_KEY' && !invoice && (
          <div className="centered">
            <h2 className="error-title">{t('errorFetch')}</h2>
            <p className="error-text" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              {error}
            </p>
            <button type="button" className="btn btn--ghost" onClick={refetch}>
              {t('retry')}
            </button>
          </div>
        )}

        {invoice && <PaymentPage invoice={invoice} />}
      </main>

      <footer className="app__bottom">
        <span>{t('poweredBy')} Crydera</span>
      </footer>
    </div>
  );
}
