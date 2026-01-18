// components/ui/InfoBlock.tsx
import {
  Stack, Typography, StackProps,
} from '@mui/material'

interface InfoBlockProps extends Omit<StackProps, 'direction'> {
  label: string;
  value: React.ReactNode;
}

export const InfoBlock = ({
  label, value, ...props
}: InfoBlockProps) => (
  <Stack {...props}>
    <Typography
      sx={{
        color: 'var(--color-secondary2)',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: '157%',
        mb: '2px',
      }}
    >
      {label}
    </Typography>
    <Typography
      color="text.primary"
      sx={{
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: '175%',
      }}
    >
      {value}
    </Typography>
  </Stack>
)
