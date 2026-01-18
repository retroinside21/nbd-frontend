//* * Для тарифов */

export interface Tariff {
  /** Уникальный ID тарифа */
  id: number;

  /** Название тарифа (например, "1 месяц") */
  name: string;

  /** Код группы (monthly, yearly и т.д.) */
  group_code: string;

  /** Длительность в днях */
  duration_days: number;

  /** Цена в рублях */
  price_rub: number;

  /** Лимит трафика (строка: "0" = безлимит, или "100" = 100 ГБ) */
  traffic_limit: string;

  /** Максимальное количество устройств */
  device_limit: number;

  /** Активен ли тариф */
  is_active: boolean;

  /** Дата создания (может быть null) */
  created_at: string | null;

  /** Дата обновления (может быть null) */
  updated_at: string | null;

  /** Подзаголовок / метка (например, "Популярный") */
  subgroup_title: string;

  /** Порядок сортировки */
  sort_order: number;

  /** Поддержка VLESS протокола */
  vless: boolean;
}

export interface ITariffResponse {
  total: number,
  tariffs: Tariff[]
}
