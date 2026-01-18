/* eslint-disable id-length */
import ModalContainer from '@/shared/ui/modalContainer/ModalContainer'
import QRCode from 'react-qr-code'

import {
  Box, DialogContent, Typography,
} from '@mui/material'
import React from 'react'

interface IProps {
  open: boolean;
  onClose: () => void;
  subcriptionLink: string;
}
const QrModal = ({
  open,
  onClose,
  subcriptionLink,
}: IProps) => {
  return (
    <ModalContainer open={open} onClose={onClose}>
      <Typography
        sx={{
          fontWeight: 500,
          textAlign: 'center',
          color: 'text.secondary',
          pt: 2,
        }}
      >
        QR-код для подписки
      </Typography>

      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mt: 1,
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: '#fff',
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <QRCode
              value={subcriptionLink}
              size={256}
            />
          </Box>

          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              fontSize: 14,
            }}
          >
            Отсканируйте QR-код для подключения подписки
          </Typography>
        </Box>
      </DialogContent>
    </ModalContainer>
  )
}

export default QrModal
