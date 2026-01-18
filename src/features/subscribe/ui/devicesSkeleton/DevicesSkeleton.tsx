import {
  Skeleton, Box, Stack, Divider,
  Typography,
} from '@mui/material'
import React from 'react'

const DevicesSkeleton = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      mb: 2.8,
    }}
  >
    {[1].map((i) => ( // 3–5 элементов — оптимально для скелетона
      <Box
        key={`skeleton-${i}`}
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        {/* Номер устройства */}
        <Typography
          variant="h6"
          sx={{
            color: 'var(--color-blue)',
            py: 2,
            width: 32,
            textAlign: 'center',
          }}
        >
          <Skeleton width={20} />
        </Typography>

        {/* Аккордеон-скелетон */}
        <Box
          sx={{
            borderRadius: '16px',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            flex: 1,
            bgcolor: 'background.paper',
          }}
        >
          {/* Заголовок аккордеона */}
          <Box sx={{
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          >
            <Skeleton width="60%" height={32} />
            <Skeleton
              width={24}
              height={24}
              sx={{
                borderRadius: '50%',
              }}
            />
          </Box>

          {/* Содержимое (всегда открыто в скелетоне для имитации раскрытия) */}
          <Box sx={{
            px: 2,
            pb: 2,
          }}
          >
            {/* User-Agent */}
            <Box mb={2}>
              <Skeleton
                width="30%"
                height={20}
                sx={{
                  mb: 0.5,
                }}
              />
              <Skeleton width="90%" height={24} />
            </Box>

            {/* Блок с Создано / Обновлено / Платформа */}
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
              {[1, 2, 3].map((key) => (
                <Box
                  key={key}
                  sx={{
                    flex: 1,
                  }}
                >
                  <Skeleton
                    width="50%"
                    height={18}
                    sx={{
                      mb: 0.5,
                    }}
                  />
                  <Skeleton width="70%" height={22} />
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Кнопка удаления */}
        <Box sx={{
          py: 2,
        }}
        >
          <Skeleton variant="circular" width={24} height={24} />
        </Box>
      </Box>
    ))}
  </Box>
)

export default React.memo(DevicesSkeleton)
