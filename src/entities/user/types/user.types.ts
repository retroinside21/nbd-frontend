/**
 * Основная модель пользователя / ключа из REMNA
 */

export interface IRemnaHapp {
  cryptoLink: string
}
export interface IRemnaUserKey {
  /** Уникальный UUID пользователя/ключа в REMNA */
  uuid: string;

  /** Логин пользователя (обычно автогенерируемый) */
  username: string;

  /** Короткий UUID — используется в ссылках подписки */
  shortUuid: string;

  /** Статус пользователя (ACTIVE | DISABLED | EXPIRED и т.д.) */
  status: 'ACTIVE' | 'DISABLED' | 'EXPIRED';

  /** Дата окончания подписки (ISO строка) */
  expireAt: string;

  /** Дата создания пользователя */
  createdAt: string;

  /** Дата последнего обновления */
  updatedAt: string;

  /** Использованный трафик за текущий период (в байтах) */
  usedTrafficBytes: number;

  /** Использованный трафик за всё время (в байтах) */
  lifetimeUsedTrafficBytes: number;

  /** Лимит трафика (0 = безлимит) */
  trafficLimitBytes: number;

  /** Стратегия сброса трафика */
  trafficLimitStrategy: 'NO_RESET' | 'DAILY' | 'MONTHLY' | string;

  /** User-Agent последнего клиента, который использовал подписку */
  subLastUserAgent: string | null;

  /** Дата последнего открытия подписки */
  subLastOpenedAt: string | null;

  /** Дата последнего онлайна */
  onlineAt: string | null;

  /** Дата отзыва (блокировки) подписки */
  subRevokedAt: string | null;

  /** Дата последнего сброса трафика */
  lastTrafficResetAt: string | null;

  /** Пароль для Trojan-протокола */
  trojanPassword: string;

  /** UUID для VLESS-протокола */
  vlessUuid: string;

  /** Пароль для Shadowsocks */
  ssPassword: string;

  /** Описание (необязательное) */
  description: string | null;

  /** Тег пользователя (например: trial, premium, vip) */
  tag: string | null;

  /** Telegram ID пользователя (если привязан) */
  telegramId: number | null;

  /** Email пользователя */
  email: string;

  /** Лимит устройств по HWID */
  hwidDeviceLimit: number;

  /** Дата первого подключения */
  firstConnectedAt: string | null;

  /** Последний триггер лимитов/ограничений */
  lastTriggeredThreshold: number;

  /** Ссылка на подписку (используется в клиентах) */
  subscriptionUrl: string;

  /** Внутренние группы (обычно пусто) */
  activeInternalSquads: any[];

  /** Последний сервер, к которому подключался пользователь */
  lastConnectedNode: string | null;

  /** UUID внешнего кластера */
  externalSquadUuid: string | null;

  /** Данные для HAPP клиента */
  happ: IRemnaHapp;

  tariff_id: number;

  tariff_name:string

  devices_count: number
}

export interface IUserKeysResponse {
  success: boolean;
  tg_id: number;
  total_keys: number;
  keys: IRemnaUserKey[];
}
