import React from 'react'

import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SvgIcon from '@mui/material/SvgIcon';
import { IconHome } from '../../asset/SVGMUI/IconSVGMUI';
import AccountMenu from '../login/AccountMenu';

const NotificationBlock = () => {
  return (
    <div>
      
      <div className='accountMenu'>
        {<AccountMenu/>}
      </div>
    </div>
  )
}

export default NotificationBlock;
