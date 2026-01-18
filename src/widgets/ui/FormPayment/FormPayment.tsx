import React from 'react'
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material'

interface IProps {
    value: string,
    onChangePayment:(event: React.ChangeEvent<HTMLInputElement>) => void
}
const FormPayment = ({
  value,
  onChangePayment,
}: IProps) => {
  return (
    <>
      <Typography variant="subtitle1" mb={1}>
        Способ оплаты
      </Typography>
      <RadioGroup
        value={value}
        onChange={onChangePayment}
        sx={{
          mb: 2,
        }}
      >
        <FormControlLabel value="СБП" control={<Radio />} label="СБП/СберPay/T-Pay" />
        <FormControlLabel value="Международная карта" control={<Radio />} label="Международная карта" />
        <FormControlLabel value="Криптовалюта" control={<Radio />} label="Криптовалюта" />
      </RadioGroup>
    </>
  )
}

export default FormPayment
