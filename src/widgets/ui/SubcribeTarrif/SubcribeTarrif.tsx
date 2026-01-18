import {
  Tariff,
  useTariffStore,
} from '@/entities/tariff'
import PlanCard from '@/shared/ui/planCard/PlanCard'
import {
  IPlan,
} from '@/shared/ui/planCard/types'
import {
  Box,
} from '@mui/material'
import React, {
  Dispatch, SetStateAction,
} from 'react'

const PRICE_ONE_DEVICE = 70

interface IProps {
  activeDevice: number,
  setTarrifState: Dispatch<SetStateAction<Tariff | null>>,
}

const SubcribeTarrif = ({
  activeDevice,
  setTarrifState,
}: IProps) => {
  const data = useTariffStore((service) => service.data)
  console.log(data)
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}
    >
      {
          data?.tariffs.map((tarrif) => {
            const amountMonths = tarrif.duration_days / 30

            const priceMemo = activeDevice <= 1 ? tarrif.price_rub
              : tarrif.price_rub + ((PRICE_ONE_DEVICE * (activeDevice - 1)) * amountMonths)
            const discount = Math.ceil(priceMemo / amountMonths)
            const plan: IPlan = {
              duration: tarrif.name,
              price: Math.ceil(priceMemo),
              perMonth: discount,
              label: tarrif.subgroup_title,
            }

            return <PlanCard onClick={() => setTarrifState(tarrif)} plan={plan} key={tarrif.id} />
          })
        }
    </Box>
  )
}

export default SubcribeTarrif
