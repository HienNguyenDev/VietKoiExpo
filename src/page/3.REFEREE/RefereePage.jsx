import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Account, AuthenticationContext, SessionContext } from '@toolpad/core';
import CustomMenu from '../../component/shared/AccountMenu/CustomMenu2';
import HomePage from '../1.ADMIN/HomePage'; 
import AdminPage from '../1.ADMIN/AdminPage'; 
import { Outlet, useNavigate } from 'react-router-dom'; // Import useNavigate
import ManageJudgingPage from '../../component/ManageJudging/ManageJudingPage';

const NAVIGATION = [
  { 
    segment: 'referee/manage-judging',//
    title: 'Manage Judging',
    icon: <AssignmentIcon />,
    
  },
];

const Theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function PageContent() {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
        {/* The Outlet component will render the current route's child components */}
        <Outlet/>
    </Box>
  );
}

const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
    role: 'Referee',
  },
};

// Append role to user name for display
demoSession.user.name = demoSession.user.role === 'Referee' 
  ? `${demoSession.user.name} (Referee)` 
  : demoSession.user.name;

function RefereePage() {
  const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(() => ({
    signIn: () => {
      setSession(demoSession);
    },
    signOut: () => {
      setSession(null);
    },
  }), []);

  const navigate = useNavigate(); // Use navigate from react-router

  const AccountComponent = React.useCallback(() => (
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={session}>
        <Account
          slots={{
            menuItems: CustomMenu,
          }}
        />
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  ), [authentication, session]);

  return (
    <AppProvider
      session={session}
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://imgur.com/V1zXtZN.jpg" alt="VietKoiExpo Logo" />,
        title: 'VietKoiExpo',
      }}
      theme={Theme}
    >   
      <DashboardLayout slots={{ toolbarActions: AccountComponent }}>
        <PageContent />
      </DashboardLayout>
    </AppProvider>
  );
}

export default RefereePage;
