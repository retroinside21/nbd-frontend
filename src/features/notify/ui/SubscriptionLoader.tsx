/* eslint-disable id-length */
import React from 'react'
import {
  Box, Skeleton, Stack,
} from '@mui/material'

const SubscriptionLoader = () => {
  return (
    <Box sx={{
      p: 4,
      maxWidth: 702,
      mx: 'auto',
    }}
    >
      {/* Карточка с текущей подпиской */}
      <Box
        sx={{
          bgcolor: '#f8f9ff',
          borderRadius: 3,
          p: 3,
          mb: 4,
          border: '1px solid #e6e8ff',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Skeleton
            width={120}
            height={40}
            sx={{
              borderRadius: 8,
            }}
          />
          <Skeleton
            width={140}
            height={32}
            sx={{
              borderRadius: 4,
            }}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Skeleton width="40%" height={24} />
          <Skeleton width="35%" height={24} />
        </Stack>

        {/* Табы групп */}
        <Stack direction="row" spacing={2} mt={3} mb={2}>
          <Skeleton
            width={80}
            height={36}
            sx={{
              borderRadius: 3,
            }}
          />
          <Skeleton
            width={80}
            height={36}
            sx={{
              borderRadius: 3,
            }}
          />
          <Skeleton
            width={80}
            height={36}
            sx={{
              borderRadius: 3,
            }}
          />
        </Stack>

        {/* Инфобокс с описанием */}
        <Box
          sx={{
            bgcolor: '#f3e8ff',
            border: '1px solid #e1c4ff',
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          <Skeleton width="100%" height={20} />
          <Skeleton
            width="85%"
            height={20}
            sx={{
              mt: 1,
            }}
          />
        </Box>
      </Box>

    </Box>
  )
}

export default SubscriptionLoader
