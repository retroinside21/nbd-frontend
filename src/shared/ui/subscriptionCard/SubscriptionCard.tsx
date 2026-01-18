/* eslint-disable id-length */

'use client'

import {
  Box, Button, Divider, IconButton, Stack, Typography,
} from '@mui/material'
import {
  DateTime,
} from 'luxon'
import AddIcon from '@mui/icons-material/Add'
// eslint-disable-next-line import/no-extraneous-dependencies
import api from '@/shared/api/api'
import {
  IRemnaUserKey,
} from '@/entities/user/types/user.types'
import {
  Add,
  CheckCircleOutlineRounded,
  ContentCopy,
  Devices,
  QrCode,
} from '@mui/icons-material'
import {
  useMemo,
  useState,
} from 'react'
import {
  useSnackbar,
} from '@/features/notify/model/strores/useSnackbar'
import QrModal from '@/features/subscribe/ui/QrModal/QrModal'
import EditableUsername from '../editableUsername/EditableUsername'
import CardSubscribeContainer from '../cardSubscribeContainer/CardSubscribeContainer'

interface SubscriptionCardProps {
  onClickSetDevices: () => void
  onClickProlong: () => void
  data: IRemnaUserKey;
}

// Devices

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  onClickSetDevices,
  onClickProlong,
  data,
}) => {
  const [isQrOpen, setIsQrOpen] = useState(false)

  const expiry = DateTime.fromISO(data.expireAt, {
    zone: 'utc',
  }).setZone('local')

  const formattedDate = expiry.toFormat('dd-MM-yyyy') // → 24-05-2025
  const daysLeft = Math.ceil(expiry.diffNow('days').as('days'))

  const daysWord = daysLeft === 1
    ? 'день'
    : daysLeft % 10 >= 2 && daysLeft % 10 <= 4 && (daysLeft < 10 || daysLeft > 20)
      ? 'дня'
      : 'дней'

  // const handleDownloadConfig = () => {
  //   window.location.href = `happ://add/${data.subscriptionUrl}`
  // }

  const handleChangeName = async (newName: string) => {
    try {
      const response = await api.patch('/user/update-key', {
        client_id: data.uuid,
        username: newName,
      })

      return response.data
    } catch (err: any) {
      console.error('Ошибка изменения пользователя:', err)
      throw err
    }
  }

  const {
    show,
  } = useSnackbar()

  const handleCopyKey = () => {
    navigator.clipboard.writeText(data.subscriptionUrl)
    show('Успешно скопировано')
  }

  const subscriptionStatusUI = useMemo(() => {
    if (data.status === 'ACTIVE') {
      return {
        headerBgColor: '#DFEEFF',
        headerText: 'Активна',
        headerTextColor: '#00336A',
        dateColor: 'var(--color-blue)',

      }
    }

    return {
      headerBgColor: '#FDEDED',
      headerText: 'Подписка истекла',
      headerTextColor: '#5F2120',
      dateColor: 'var(--color-red)',
    }
  }, [data.status])

  return (
    <>
      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 1,
          border: '1px solid',
          borderColor: 'divider',
          background: 'var(--color-bgGray)',
        }}
      >
        {/* Header — ключ + статус */}
        <Box
          sx={{
            bgcolor: subscriptionStatusUI.headerBgColor,
            px: 2,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 3,
            justifyContent: 'space-between',
          }}
        >
          <EditableUsername
            initialName={data.username || 'q4wex901'}
            onSave={handleChangeName}
          />
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
          >
            <CheckCircleOutlineRounded
              sx={{
                color: subscriptionStatusUI.dateColor,
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 400,
                color: subscriptionStatusUI.headerTextColor,
                fontSize: '18px',
              }}
            >
              {subscriptionStatusUI.headerText}
            </Typography>
          </Box>
        </Box>

        {/* Основная информация */}
        <Box sx={{
          p: 2,
        }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
          >
            {/* Параметры подписки */}
            <Box>
              <CardSubscribeContainer title="Ваша подписка">
                <Box
                  sx={{
                    py: 1,
                    px: 2,
                    background: '#FFFFFF',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{
                      color: 'var(--color-blue)',
                      fontWeight: 400,
                      fontSize: '18px',
                      cursor: 'pointer',
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={data.subscriptionUrl}
                    onClick={handleCopyKey}
                  >
                    {data.subscriptionUrl}
                  </Typography>

                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  >
                    <Divider
                      flexItem
                      sx={{
                        borderColor: 'divider',
                        mr: 1,
                      }}
                      orientation="vertical"
                    />
                    <IconButton
                      size="small"
                      sx={{
                        mr: 1,
                        color: 'var(--color-blue)',
                      }}
                      onClick={handleCopyKey}
                    >
                      <ContentCopy />
                    </IconButton>

                    {/* QR-код: предполагаем, что у вас есть data.qrCodeUrl или генерируете его */}
                    <IconButton
                      size="small"
                      sx={{
                        mr: 1,
                        color: 'var(--color-blue)',
                      }}
                      onClick={() => setIsQrOpen(true)}
                    >
                      <QrCode />
                    </IconButton>
                  </Box>
                </Box>

                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: '#666666',
                    mt: 1,
                    ml: 0.5,
                  }}
                >
                  Поделитесь этой ссылкой для подключения устройств к вашей подписке
                </Typography>
              </CardSubscribeContainer>

              <CardSubscribeContainer title="Параметры подписки">
                <Box
                  sx={{
                    py: 1,
                    px: 2,
                    background: '#FFFFFF',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack spacing={1.5} mt={1} width="100%">
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                      {/* Тариф */}
                      <Stack direction="column">
                        <Typography
                          sx={{
                            fontSize: '13px',
                          }}
                          color="text.secondary"
                        >
                          Тариф
                        </Typography>
                        <Typography
                          fontWeight={500}
                          color="text.primary"
                          sx={{
                            fontSize: '.9rem',
                          }}
                        >
                          {data.tariff_name}
                        </Typography>
                      </Stack>

                      <Divider orientation="vertical" flexItem />

                      {/* Группа */}
                      <Stack direction="column">
                        <Typography
                          sx={{
                            fontSize: '13px',
                          }}
                          color="text.secondary"
                        >
                          Группа
                        </Typography>
                        <Typography
                          fontWeight={500}
                          color="text.primary"
                          sx={{
                            fontSize: '.9rem',
                          }}
                        >
                          {data.hwidDeviceLimit}
                          {' '}
                          устройства
                        </Typography>
                      </Stack>

                      <Divider orientation="vertical" flexItem />

                      {/* Устройств */}
                      <Stack direction="column">
                        <Typography
                          sx={{
                            fontSize: '13px',
                          }}
                          color="text.secondary"
                        >
                          Устройств
                        </Typography>
                        <Typography
                          fontWeight={500}
                          color="text.primary"
                          sx={{
                            fontSize: '.9rem',
                          }}
                        >
                          {data.devices_count}
                          {' '}
                          из
                          {data.hwidDeviceLimit}
                        </Typography>
                      </Stack>

                      <Divider orientation="vertical" flexItem />

                      {/* Дата окончания подписки */}
                      <Stack direction="column">
                        <Typography
                          sx={{
                            fontSize: '13px',
                          }}
                          color="text.secondary"
                        >
                          Дата окончания подписки
                        </Typography>
                        <Typography
                          fontWeight={500}
                          color="text.primary"
                          sx={{
                            fontSize: '.9rem',
                          }}
                        >
                          {formattedDate}
                          {' '}
                          <span
                            style={{
                              color: subscriptionStatusUI.dateColor,
                              fontWeight: 500,
                            }}
                          >
                            (
                            {daysLeft}
                            {' '}
                            {daysWord}
                            )
                          </span>
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
              </CardSubscribeContainer>
            </Box>

          </Box>
          {/* Кнопки действия */}
          <CardSubscribeContainer title="Управление подпиской">

            <Box sx={{
              display: 'flex',
              gap: 1,
            }}
            >
              <Box sx={{
                bgcolor: '#FFFFFF',
                p: 2,
                width: '218px',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
              >
                <IconButton
                  sx={{
                    bgcolor: 'var(--color-blue)',
                    width: '52px',
                    height: '32px',
                    borderRadius: 12.5,
                    alignSelf: 'flex-end',
                    mb: 3,
                    '&:hover svg': {
                      color: 'var(--color-blue)',
                    },
                  }}
                  component="a"
                  href={data.subscriptionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Add sx={{
                    color: '#FFFFFF',
                  }}
                  />
                </IconButton>
                <Typography sx={{
                  textTransform: 'uppercase',
                  color: 'var(--color-blue)',
                  fontSize: '14px',
                }}
                >
                  Подключить устройство
                </Typography>
              </Box>

              <Box sx={{
                bgcolor: '#FFFFFF',
                p: 2,
                width: '218px',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
              >
                <IconButton
                  sx={{
                    bgcolor: 'var(--color-blue)',
                    width: '52px',
                    height: '32px',
                    borderRadius: 12.5,
                    alignSelf: 'flex-end',
                    mb: 3,
                    '&:hover svg': {
                      color: 'var(--color-blue)',
                    },
                  }}
                  onClick={onClickSetDevices}
                >
                  <Devices sx={{
                    color: '#FFFFFF',
                  }}
                  />
                </IconButton>
                <Typography sx={{
                  textTransform: 'uppercase',
                  color: 'var(--color-blue)',
                  fontSize: '14px',
                }}
                >
                  Подключенные устройства
                </Typography>
              </Box>

            </Box>
          </CardSubscribeContainer>

          <Button
            variant="contained"
            fullWidth
            startIcon={<AddIcon />}
            onClick={onClickProlong}
            sx={{
              borderRadius: 1,
              fontWeight: 600,
              bgcolor: 'var(--color-pink)',
              fontSize: '0,8125rem',
              '&:hover': {
                bgcolor: 'var(--color-pink-hover)',
              },
              ml: {
                sm: 'auto',
              },
            }}
          >
            Продлить
          </Button>
        </Box>
      </Box>
      <QrModal
        open={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        subcriptionLink={data.subscriptionUrl}
      />
    </>
  )
}

export default SubscriptionCard
