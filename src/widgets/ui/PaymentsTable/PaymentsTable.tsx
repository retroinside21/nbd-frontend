/* eslint-disable id-length */

'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Box,
  Typography,
  Stack,
  Pagination,
} from '@mui/material'

import {
  formatDate,
} from '@/shared/lib/date/formatDate'

// import {
//   ArrowDownward, ArrowUpward,
// } from '@mui/icons-material'
import {
  Order,
} from '@/widgets/model/types'
import {
  Payment,
} from '@/entities/history/types/payment.types'

interface Data {
  id: number;
  created_at: string;
  purchase: string;
  amount: number;
  status: 'success' | 'fail';
}

interface HeadCell {
  id: keyof Data | 'amount';
  label: string;
  sortable: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'created_at',
    label: 'Дата/время',
    sortable: true,
  },
  {
    id: 'amount',
    label: 'Сумма',
    sortable: true,
  },
  {
    id: 'status',
    label: 'Статус',
    sortable: true,
  },
]

interface PaymentsTableProps {
  payments: Payment[];
  handleSortField: (field: keyof Payment) => void;
  order: Order;
  orderBy: keyof Payment;
  rowsPerPage: number;
  page: number;
  setPage: (page: number) => void;
  total?: number;
}

export default function PaymentsTable({
  payments,
  handleSortField,
  order,
  orderBy,
  rowsPerPage,
  page,
  setPage,
  total = 0,
}: PaymentsTableProps) {
  const createSortHandler = (property: keyof Payment | 'amount') => () => {
    handleSortField(property)
  }

  const totalPages = payments ? Math.ceil(total / rowsPerPage) : 0

  return (
    <Box sx={{
      boxShadow: '0px 1px 3px 0px #0000001F',
      borderRadius: 4,
    }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
        }}
      >
        <TableContainer>
          <Table sx={{
            minWidth: 650,
          }}
          >
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                    sx={{
                      fontWeight: 600,
                      color: '#666',
                      fontSize: '14px',
                      py: 2,
                    }}
                  >
                    {headCell.sortable ? (
                      <TableSortLabel
                        active={orderBy === headCell.id && order === 'asc'}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id as keyof Payment)}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: orderBy === headCell.id ? 1 : 0.3,
                            color: orderBy === headCell.id ? 'var(--color-pink)' : '#999',
                            transition: 'all 0.2s ease',
                          },

                          '&:hover .MuiTableSortLabel-icon': {
                            opacity: 0.8,
                            color: orderBy === headCell.id ? 'var(--color-pink)' : '#666',
                          },

                          '&.Mui-active .MuiTableSortLabel-icon': {
                            color: 'var(--color-pink) !important',
                            opacity: '1 !important',
                          },

                          '&.Mui-active:hover .MuiTableSortLabel-icon': {
                            color: 'var(--color-pink) !important',
                            opacity: '1 !important',
                          },
                        }}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {payments.map((row) => (
                <TableRow key={row.payment_id}>
                  <TableCell
                    sx={{
                      color: '#333',
                      fontSize: '14px',

                    }}
                  >
                    <Typography variant="body2">
                      {formatDate(row.created_at)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                  >
                    <Typography variant="body2">
                      {row.amount.toLocaleString('ru-RU')}
                      {' '}
                      ₽
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        display: 'inline-block',
                        mr: 1,
                        fontSize: '14px',
                        fontWeight: 500,
                        color: row.status === 'success' ? '#00B155' : '#F31C20',
                      }}
                    >
                      {row.status === 'success' ? 'Успешно' : 'Отказ'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {
          (totalPages) > 1 && (
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              p: 2,
              backgroundColor: '#fff',
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mr: 3,
              }}
            >
              1 из
              {' '}
              {totalPages}
            </Typography>
            <Pagination
              count={Math.ceil(totalPages)}
              page={page}
              onChange={(e, value) => {
                // setRowsPerPage(parseInt(String(value), 10))
                console.log(value)
                setPage(value)
              }}
              color="primary"
              size="small"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 1,
                },
              }}
            />
          </Stack>
          )
      }
      </Paper>
    </Box>
  )
}
