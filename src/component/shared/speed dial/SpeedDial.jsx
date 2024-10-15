import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '../../../template/theme/ThemeContext'; // Import useTheme
import CustomizedProgressBars from '../../shared/loading/CustomizeProgressBar'; // Import CustomizedProgressBars component

const ControlledOpenSpeedDialCustom = () => {
  const [open, setOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // Add loading state
  const navigate = useNavigate();
  const { toggleTheme } = useTheme(); // Use the theme context

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    handleClose();
  };

  const navigateHome = () => {
    setLoading(true); // Set loading state to true
    setTimeout(() => {
      navigate('/home');
      setLoading(false); // Set loading state to false after navigation
    }, 2000); // Simulate a delay for loading
    handleClose();
  };

  const actions = [
    { icon: <EditIcon />, name: 'Edit Mode', onClick: toggleEditMode },
    { icon: <SaveIcon />, name: 'Save', onClick: () => console.log('Save clicked') },
    { icon: <Brightness4Icon />, name: 'Change Theme', onClick: toggleTheme },
    { icon: <HomeIcon />, name: 'Home', onClick: navigateHome },
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
      ariaLabel="SpeedDial controlled open example"
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