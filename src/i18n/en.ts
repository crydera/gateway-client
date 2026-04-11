import type { Dict } from './ru';

const en: Dict = {
  appName: 'Crydera',
  network: 'Network',
  currency: 'Currency',
  amount: 'Amount',
  address: 'Payment address',
  copy: 'Copy',
  copied: 'Copied',
  orderId: 'Order',
  merchant: 'Merchant',

  statusPending: 'Awaiting payment',
  statusSuccess: 'Payment received',
  statusFail: 'Payment failed',

  statusPendingHint: 'Send the exact amount to the address below. Status will update automatically.',
  statusSuccessHint: 'Funds credited. You can return to the shop.',
  statusFailHint: 'No payment was received within the allotted time.',

  timeLeft: 'Time remaining',
  expired: 'Time expired',
  graceNote:
    'If you sent the payment in the last minute — keep this page open. We wait 3 more minutes for network confirmation.',
  graceWaiting: 'Waiting for network confirmation',

  backToShop: 'Back to shop',
  viewTxn: 'View transaction',
  copyAddress: 'Copy address',
  copyAmount: 'Copy amount',

  paymentTo: 'Payment to',
  important: 'Important',
  warningNetwork: 'Send only {currency} via {network} network. Funds sent via any other network will be lost.',
  warningExact: 'Send exactly the amount shown. Smaller or larger amounts will not be credited.',
  poweredBy: 'Powered by',
  securedBy: 'Secured payment',

  loading: 'Loading invoice…',
  errorNoKey: 'Invalid link',
  errorNoKeyHint: 'The link is missing a payment key. Please return to the shop and try again.',
  errorFetch: 'Failed to load invoice',
  retry: 'Retry',
};

export default en;
