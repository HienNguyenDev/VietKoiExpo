import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CustomizedProgressBars from '../../shared/loading/CustomizeProgressBar';

const ControlledOpenSpeedDialCustom = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userReducer.userLogin);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigateHome = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/home');
      setLoading(false);
    }, 1000);
    handleClose();
  };

  const navigateToRole = () => {
    setLoading(true);
    setTimeout(() => {
      switch (userLogin?.roleId) {
        case 'manager':
          navigate('/admin');
          break;
        case 'judge':
          navigate('/judge');
          break;
        case 'staff':
          navigate('/staff');
          break;
        default:
          navigate('/member');
      }
      setLoading(false);
    }, 1000);
    handleClose();
  };

  const actions = [
    { icon: <HomeIcon />, name: 'Home', onClick: navigateHome },
    { icon: <DashboardIcon />, name: 'Dashboard', onClick: navigateToRole },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <CustomizedProgressBars />
      </div>
    );
  }

  return (
    <SpeedDial
      ariaLabel="Navigation SpeedDial"
      sx={{ position: 'fixed', bottom: 30, right: 40 }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default ControlledOpenSpeedDialCustom;