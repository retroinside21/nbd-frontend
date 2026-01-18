import {
  IDevice,
} from '@/shared/models/typesRes'
import {
  DateTime,
} from 'luxon'

export function formatDate(dateStr: string): string {
  return DateTime
    .fromISO(dateStr, {
      zone: 'utc',
    })
    .setZone('local')
    .toFormat('dd.MM.yy / HH:mm')
}

export const formatDateTimeHwid = (dateString: string): string => {
  // Парсим ISO-строку (самый надёжный способ)
  const dt = DateTime.fromISO(dateString, {
    zone: 'utc',
  })

  // Если невалидно — возвращаем заглушку
  if (!dt.isValid) {
    console.warn('Invalid date:', dateString)
    return '—'
  }

  // Переводим в локальную зону и форматируем как нужно
  return dt.toLocal().toFormat('dd-MM-yyyy HH:mm')
}

export const statusDevices = (loading: boolean, arr: IDevice[] | null): 'loading' | 'empty' | 'full' => {
  if (loading && arr === null) {
    return 'loading'
  }

  if (!loading && (arr !== null && arr.length === 0)) {
    return 'empty'
  }

  return 'full'
}
