import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Account, AuthenticationContext, SessionContext } from '@toolpad/core';
import CustomMenu from '../../component/shared/AccountMenu/CustomMenu2';
import { Outlet, useNavigate } from 'react-router-dom'; // Import useNavigate

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    segment: 'referee',
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Manage Judging',
  },
  {
    title: 'Manage Judging',
    icon: <AssignmentIcon />,
    segment: 'referee/manage-judging',
    children: [
      {
        title: 'Đang diễn ra',
        segment: 'ongoing',
      },
      {
        title: 'Sắp diễn ra',
        segment: 'upcoming',
      },
      {
        title: 'Đã kết thúc',
        segment: 'completed',
      },
      {
        title: 'All',
        segment: '',
      },
    ],
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
      <Outlet />
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

demoSession.user.name = demoSession.user.role === 'Referee'
  ? `${demoSession.user.name} (Referee)`
  : demoSession.user.name;

function RefereePage({ children }) {
  const [session, setSession] = React.useState(demoSession);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const authentication = React.useMemo(() => ({
    signIn: () => {
      setSession(demoSession);
    },
    signOut: () => {
      setSession(null);
    },
  }), []);

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

  // Hàm điều hướng bằng cách sử dụng navigate
  const handleNavigationClick = (segment) => {
    navigate(`/${segment}`); // Điều hướng đến URL tương ứng mà không reload trang
  };

  return (
    <AppProvider
      session={session}
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: () => handleNavigationClick(item.segment), // Điều hướng mỗi khi nhấn vào item
      }))}
      branding={{
        logo: <img src="https://imgur.com/V1zXtZN.jpg" alt="VietKoiExpo Logo" />,
        title: 'VietKoiExpo',
      }}
      theme={Theme}
    >
      <DashboardLayout
        slots={{ toolbarActions: AccountComponent }}
      >
        <PageContent />
      </DashboardLayout>
      {children}
    </AppProvider>
  );
}

RefereePage.propTypes = {
  children: PropTypes.node,
};

export default RefereePage;
