/* eslint-disable id-length */
import {
  Box, IconButton, Modal,
} from '@mui/material'
import React, {
  ReactNode,
} from 'react'
import CloseIcon from '@mui/icons-material/Close'

interface IProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}
const ModalContainer = ({
  open,
  onClose,
  children,
}: IProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 760,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 4,
          p: 4,
          outline: 'none',
        }}
      >

        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: '32px',
            top: '32px',
            p: 0,
            color: 'var(--color-blue)',
            bgcolor: 'background.default',
            '&:hover': {
              bgcolor: 'action.hover',
            },
            width: 34,
            height: 34,
          }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Modal>
  )
}

export default ModalContainer
