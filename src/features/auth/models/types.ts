// описание типо шага 1 - title, 2 форма, 3 логирование
export type TAuthStepType = 1 | 2 | 3

export interface TelegramUser {
  /** Telegram ID пользователя */
  tg_id: string | null;

  /** email */
  email: string
  /** Username в Telegram (может быть null, если не установлен) */
  username: string;

  /** Имя пользователя */
  first_name: string;

  /** Фамилия пользователя (может быть null) */
  last_name: string | null;

  /** Код языка (например, "ru", "en") */
  language_code: string;

  /** Является ли аккаунт ботом */
  is_bot: boolean;

  /** Баланс пользователя */
  balance: number;

  /** Количество использованных триалов (или оставшихся) */
  trial: number;

  /** Предпочитаемая валюта */
  preferred_currency: string;

  /** Источник, откуда пришёл пользователь (например, реферальный код) */
  source_code: string | null;

  /** Дата создания аккаунта */
  created_at: string; // ISO 8601 дата

  /** Дата последнего обновления */
  updated_at: string; // ISO 8601 дата

  hwidDeviceLimit: number,

  /** Описание подписки */
  description: string,
}
