import {
  Tab,
  Tabs,
} from '@mui/material'
import React from 'react'

interface IProps {
    tabValue: number,
    handleChange: (_event: React.SyntheticEvent, newValue: number) => void
    nameTabs: string[],
}

const TabsBar = ({
  tabValue,
  handleChange,
  nameTabs,
}: IProps) => {
  return (
    <Tabs
      value={tabValue}
      onChange={handleChange}
      indicatorColor="primary"
      variant="fullWidth"
      sx={{
        '& .MuiTab-root': {
          // textTransform: 'none',
          color: 'var(--color-blue)',
          fontWeight: 500,
        },
      }}
    >
      {
        nameTabs.map((name) => {
          return <Tab label={name} key={name} />
        })
      }
    </Tabs>
  )
}

export default TabsBar
