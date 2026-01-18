'use client'

import PaymentsTable from '@/widgets/ui/PaymentsTable/PaymentsTable'

import {
  usePaymentHistoryStore,
} from '../../model/paymentHistory.store'

const PaymentTableWithPagination = () => {
  const payments = usePaymentHistoryStore((service) => service.payments)
  const total = usePaymentHistoryStore((service) => service.total)
  const page = usePaymentHistoryStore((service) => service.page)
  const rowsPerPage = usePaymentHistoryStore((service) => service.rowsPerPage)
  const sortBy = usePaymentHistoryStore((service) => service.sortBy)
  const order = usePaymentHistoryStore((service) => service.order)
  const loading = usePaymentHistoryStore((service) => service.loading)

  const setPage = usePaymentHistoryStore((service) => service.setPage)
  const setSort = usePaymentHistoryStore((service) => service.setSort)

  if (loading) return null

  return (
    <PaymentsTable
      payments={payments || []}
      handleSortField={setSort}
      order={order}
      orderBy={sortBy}
      rowsPerPage={rowsPerPage}
      page={page}
      setPage={setPage}
      total={total}
    />
  )
}

export default PaymentTableWithPagination
