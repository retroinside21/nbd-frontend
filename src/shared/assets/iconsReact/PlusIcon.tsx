import {
  SvgIcon, SvgIconProps,
} from '@mui/material'
import React from 'react'

const PlusIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path
      d="M11.9992 3C13.7451 2.99968 15.4535 3.50731 16.916 4.46103C18.3786 5.41474 19.5321 6.77335 20.2361 8.37126C20.9401 9.96917 21.164 11.7374 20.8807 13.4604C20.5974 15.1834 19.8191 16.7867 18.6406 18.0751M11.9992 8.40002V15.6001M15.5988 12H8.39951M3.44996 9.18753C3.1632 10.0593 3.01146 10.9699 3 11.8875M3.74693 15.6001C4.25224 16.7627 4.99744 17.8055 5.93373 18.6601M5.37218 5.91151C5.6233 5.63812 5.89108 5.38053 6.17401 5.14021M8.97905 20.4781C11.2232 21.2776 13.6927 21.1546 15.8463 20.1361"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export default PlusIcon
