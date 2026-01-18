/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable id-length */
import {
  IDevice,
  IResponseDevice,
} from '@/shared/models/typesRes'
import InfoPanel from '@/shared/ui/info/info'
import ModalContainer from '@/shared/ui/modalContainer/ModalContainer'
import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  DeleteOutline,
} from '@mui/icons-material'
import DownloadIcon from '@mui/icons-material/Download'
import {
  DateTime,
} from 'luxon'
import {
  InfoBlock,
} from '@/shared/ui/infoBlock/InfoBlock'
import {
  isEmpty,
} from 'lodash'
import EmptyScreen from '@/widgets/ui/EmptyScreen'
import {
  useApi,
} from '@/shared/hooks/useApi'
import {
  IDataKey,
} from '@/app/admin/subscribe/page'
import api from '@/shared/api/api'
import {
  formatDateTimeHwid,
  statusDevices,
} from '@/shared/lib/date/formatDate'
import DevicesSkeleton from '../devicesSkeleton/DevicesSkeleton'

interface IProps {
  open: boolean;
  onClose: () => void;
  dataKey: IDataKey
}

const TetheredDevicesModal = ({
  open, onClose, dataKey: {
    keyUuid, keyTitle: title,
  },
}: IProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const {
    data,
    loading,
    refetch,
  } = useApi<IResponseDevice>(`/hwid/key/${keyUuid}`, {
    method: 'get',
    enabled: Boolean(keyUuid),
  })

  const currentStatus = statusDevices(loading, data?.devices || null)

  const handleDeleteDevice = async (deviceHwid: string) => {
    try {
      await api.post('/hwid/delete', {
        userUuid: keyUuid,
        hwid: deviceHwid,
      })

      refetch()
    } catch (err: any) {
      console.error('Не получилось удалить устройство', err)
      throw err
    }
  }

  return (
    <ModalContainer open={open} onClose={onClose}>
      <Box>
        <Typography variant="h4" mb={2}>
          Привязанные устройства
          {' '}
          {data?.devices.length}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          <Chip
            sx={{
              bgcolor: 'var(--color-blue)',
              pl: 1,
              borderRadius: 2,
            }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.3rem',
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{
          maxHeight: 'calc(100vh - 680px)',
          minHeight: 'calc(100vh - 680px)',
        }}
        >
          {currentStatus === 'loading' && <DevicesSkeleton />}

          {currentStatus === 'empty' && (
          <EmptyScreen
            text="Здесь будут отображаться устройства, на которых используется подписка"
            textButton="Как установить на устройство?"
            handleClick={() => console.log('f')}
            startIcon={<DownloadIcon />}
          />
          )}

          {currentStatus === 'full' && (
          <>
            <InfoPanel
              text="После отвязки устройства, на нём перестанет работать подписка. При необходимости, вы сможете вернуть подписку на отвязанное устройство."
              classNameContainer={{
                mb: 1,
              }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                scrollbarGutter: 'stable both-edges',
                gap: 1,
                mb: 2.8,
                maxHeight: 'calc(100vh - 760px)',
                minHeight: 'calc(100vh - 760px)',
                overflowY: 'auto',
                pr: 1,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'rgba(0,0,0,0.3)',
                },
              }}
            >
              {data?.devices.map(
                (
                  {
                    deviceModel,
                    userAgent,
                    createdAt,
                    updatedAt,
                    osVersion,
                    platform,
                    hwid,
                  },
                  index,
                ) => (
                  <Box
                    key={userAgent}
                    sx={{
                      display: 'flex',
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'var( --color-blue)',
                        py: 2,
                      }}
                    >
                      {index + 1}
                    </Typography>

                    <Accordion
                      expanded={expanded === `panel${index}`}
                      onChange={handleChange(`panel${index}`)}
                      sx={{
                        borderRadius: '16px',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        flex: 1,
                        '&::before': {
                          display: 'none',
                        },
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          variant="h6"
                          color={
                            expanded === `panel${index}`
                              ? 'var(--color-blue)'
                              : 'text.primary'
                          }
                        >
                          {deviceModel}
                        </Typography>
                      </AccordionSummary>
                      <Box
                        sx={{
                          px: 2,
                        }}
                      >
                        <Box>
                          <Box mb={2}>
                            <Typography
                              sx={{
                                color: 'var(--color-secondary2)',
                                fontSize: '0.875rem',
                                lineHeight: '157%',
                                fontWeight: 500,
                                mb: '1px',
                              }}
                            >
                              User-Agent
                            </Typography>
                            <Typography
                              color="text.primary"
                              sx={{
                                fontWeight: 500,
                                fontSize: '1rem',
                                lineHeight: '175%',
                              }}
                            >
                              {userAgent}
                            </Typography>
                          </Box>

                          <Stack
                            direction="row"
                            spacing={6}
                            divider={(
                              <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                  borderColor: 'divider',
                                }}
                              />
                            )}
                            sx={{
                              py: 2,
                            }}
                          >
                            {[
                              {
                                label: 'Создано',
                                value: formatDateTimeHwid(createdAt),
                              },
                              {
                                label: 'Обновлено',
                                value: formatDateTimeHwid(updatedAt),
                              },
                              {
                                label: 'Платформа',
                                value: `${platform} ${osVersion}`,
                              },
                            ].map(({
                              label, value,
                            }) => (
                              <InfoBlock label={label} value={value} />
                            ))}
                          </Stack>
                        </Box>
                      </Box>
                    </Accordion>

                    <Box
                      sx={{
                        cursor: 'pointer',
                        py: 2,
                      }}
                      onClick={() => handleDeleteDevice(hwid)}
                    >
                      <DeleteOutline htmlColor="var(--color-red)" />
                    </Box>
                  </Box>
                ),
              )}
            </Box>

          </>
          )}
        </Box>

      </Box>
    </ModalContainer>
  )
}

export default TetheredDevicesModal
