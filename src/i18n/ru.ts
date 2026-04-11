const ru = {

  appName: 'Crydera',
  network: 'Сеть',
  currency: 'Валюта',
  amount: 'Сумма',
  address: 'Адрес для оплаты',
  copy: 'Копировать',
  copied: 'Скопировано',
  orderId: 'Заказ',
  merchant: 'Мерчант',

  statusPending: 'Ожидание платежа',
  statusSuccess: 'Платёж получен',
  statusFail: 'Платёж не прошёл',

  statusPendingHint: 'Отправьте точную сумму на адрес ниже. Статус обновится автоматически.',
  statusSuccessHint: 'Средства зачислены. Можете вернуться в магазин.',
  statusFailHint: 'Платёж не был получен в течение отведённого времени.',

  timeLeft: 'Осталось времени',
  expired: 'Время вышло',
  graceNote:
    'Если вы отправили платёж в последнюю минуту — не закрывайте страницу. Мы ждём подтверждения ещё 3 минуты.',
  graceWaiting: 'Ждём подтверждения сети',

  backToShop: 'Вернуться в магазин',
  viewTxn: 'Посмотреть транзакцию',
  copyAddress: 'Копировать адрес',
  copyAmount: 'Копировать сумму',

  paymentTo: 'Оплата для',
  important: 'Важно',
  warningNetwork: 'Отправляйте только {currency} по сети {network}. Средства из другой сети будут потеряны безвозвратно.',
  warningExact: 'Отправляйте ровно указанную сумму. Меньшая или большая сумма не будет засчитана.',
  poweredBy: 'Работает на',
  securedBy: 'Платёж защищён',

  loading: 'Загрузка счёта…',
  errorNoKey: 'Неверная ссылка',
  errorNoKeyHint: 'В ссылке отсутствует параметр оплаты. Вернитесь в магазин и попробуйте снова.',
  errorFetch: 'Не удалось получить данные счёта',
  retry: 'Повторить',
};

export type Dict = typeof ru;
export default ru;
