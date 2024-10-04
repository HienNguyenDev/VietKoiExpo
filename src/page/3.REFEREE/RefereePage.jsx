import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Account, AuthenticationContext, SessionContext } from '@toolpad/core';
import CustomMenu from '../../component/AccountMenu/CustomMenu2';
import HomePage from '../1.ADMIN/HomePage'; 
import AdminPage from '../1.ADMIN/AdminPage'; 

const NAVIGATION = [
  {
    segment: 'home',
    title: 'Home',
    icon: <HomeIcon />,
    onClick: (router) => router.navigate('/home'),
  },
  {
    segment: 'Competitions',
    title: 'Competitions',
    icon: <EmojiEventsIcon />,
    onClick: (router) => router.navigate('/Competitions'),
    children: [
      {
        segment: 'MyShow',
        title: 'My Show',
        icon: <ShoppingCartIcon />,
        onClick: (router) => router.navigate('/MyShow'),
      },
    ],
  },
  { 
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    onClick: (router) => router.navigate('/MyShow'),
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

function DemoPageContent({ pathname }) {
  let content;
  switch (pathname) {
    case '/home':
      content = <HomePage/>;
      break;
   
    default:
      content = <Typography>Page not found</Typography>;
      break;
  }
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
        {content}

    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
    role: 'Referee',
   
  },
 
};
//Duyệt role + hiển thị
demoSession.user.name = demoSession.user.role === 'Referee' 
  ? `${demoSession.user.name} (Referee)` 
  : demoSession.user.name;


function Referee() {
  const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(() => ({
    signIn: () => {
      setSession(demoSession);
    },
    signOut: () => {
      setSession(null);
    },
  }), []);
  

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);

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
      navigation={NAVIGATION.map((navItem) => ({
        ...navItem,
        onClick: () => navItem.onClick(router), // Kết nối onClick với router
      }))}
      branding={{
        logo: <img src="https://imgur.com/V1zXtZN.jpg" alt="VietKoiExpo Logo" />,
        title: 'VietKoiExpo',
      }}
      router={router}
      theme={Theme}
    >   
      <DashboardLayout slots={{ toolbarActions: AccountComponent }}>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default Referee;