<<<<<<< HEAD:src/page/3.REFEREE/Referee.jsx
// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { createTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// const NAVIGATION = [
//   {
//     segment: 'dashboard',
//     title: 'Dashboard',
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: 'orders',
//     title: 'Orders',
//     icon: <ShoppingCartIcon />,
//   },
//   {
//     segment: 'reports',
//     title: 'Reports',
//     icon: <BarChartIcon />,
//   },
// ];
=======
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Account, AuthenticationContext, SessionContext } from '@toolpad/core';
import CustomMenu from '../../component/AccountMenu/CustomMenu2';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  { 
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
  },
];
>>>>>>> origin/updateAdminPage:src/page/3.REFEREE/RefereePage.jsx

// const Theme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: 'data-toolpad-color-scheme',
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function DemoPageContent({ pathname }) {
//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
//     >
//       <Typography>Dashboard content for {pathname}</Typography>
//     </Box>
//   );
// }

// DemoPageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

<<<<<<< HEAD:src/page/3.REFEREE/Referee.jsx
// function Referee(props) {
//   const { window } = props;
=======
const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

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
>>>>>>> origin/updateAdminPage:src/page/3.REFEREE/RefereePage.jsx

//   const [pathname, setPathname] = React.useState('/dashboard');

<<<<<<< HEAD:src/page/3.REFEREE/Referee.jsx
//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path) => setPathname(String(path)),
//     };
//   }, [pathname]);

  
//   return (
//     <AppProvider
//       navigation={NAVIGATION}
//       branding={{
//         logo: <img src="https://mui.com/static/logo.png" alt="VietKoiExpo logo" />,
//         title: 'VietKoiExpo',
//       }}
//       router={router}
//       theme={Theme}

//     >
//       <DashboardLayout >
//         <DemoPageContent pathname={pathname} />
//       </DashboardLayout>
//     </AppProvider>
//   );
// }



// export default Referee;
=======
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
      navigation={NAVIGATION}
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
>>>>>>> origin/updateAdminPage:src/page/3.REFEREE/RefereePage.jsx
