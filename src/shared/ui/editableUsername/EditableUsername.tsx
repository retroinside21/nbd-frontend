'use client'

import {
  useState, useRef, useEffect,
} from 'react'
import {
  Stack,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material'
import {
  EditIcon,
} from '@/shared/assets/iconsReact'
import CloseIcon from '@mui/icons-material/Close'

interface EditableUsernameProps {
  initialName: string;
  onSave: (newName: string) => Promise<void>;
}

export default function EditableUsername({
  initialName, onSave,
}: EditableUsernameProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(initialName || 'q4wex901')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Фокус на инпут при начале редактирования
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleStartEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setName(initialName || 'q4wex901')
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (name.trim() === '' || name === initialName) {
      handleCancel()
      return
    }

    setLoading(true)
    try {
      await onSave(name.trim())
      setIsEditing(false)
    } catch (err) {
      console.error('Ошибка при сохранении имени:', err)
      // Можно добавить snackbar с ошибкой
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      handleSave()
    } else if (ev.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      {isEditing ? (
        <TextField
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          size="small"
          inputRef={inputRef}
          sx={{
            maxWidth: '400px',
            '& .MuiInputBase-input': {
              fontWeight: 600,
              fontSize: '1.25rem',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleSave}
                  disabled={loading || name.trim() === '' || name === initialName}
                  sx={{
                    color: 'success.main',
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={handleCancel} disabled={loading}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              color: '#00336A',
            }}
          >
            {name}
          </Typography>

          <IconButton
            size="small"
            onClick={handleStartEdit}
            sx={{
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </Stack>
  )
}
