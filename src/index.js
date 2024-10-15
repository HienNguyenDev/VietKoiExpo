import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/configStore';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

//Page
import AdminPage from './page/1.ADMIN/AdminPage';
import HomePage from './page/1.ADMIN/HomePage';
import RegisterPage from './page/2.LOGIN/RegisterPage';
import LoginPage from './page/2.LOGIN/LoginPage';
import RefereePage from './page/3.REFEREE/RefereePage';

//ManageUser
import ManageUsers from './component/ManageUser/ManageUsers';
import CreateUser from './component/ManageUser/CreateUser';
import UpdateUsers from './component/ManageUser/UpdateUsers';
import ManageUserPermissons from './component/ManageUser/MangeUserPermissions';
import ViewUser from './component/ManageUser/ViewUser';
import ManageUsersPage from './component/ManageUser/ManageUsers';

//ManageContest
import ManageContestsPage from './component/ManageContest/ManageContestsPage';

import ManagementTask from './page/1.ADMIN/ManagementTask';
//ManageJudging
import ManageShowJudingPage from './component/ManageJudging/ManageShowJudgingPage';
import ManageScoringProcess from './component/ManageJudging/ManageScoringProcess';
import ManageKoiJudgingPage from './component/ManageJudging/ManageKoiJudgingPage';
import AsssignJugingProcess from './component/ManageJudging/AssignJudgingProcess';
import IntroComponent from './page/0.INTRO/IntroComponent';
import WaveAnimation from './page/0.INTRO/wave/WaveAnimation';
import KoiFishCompetition from './page/5.MEMBER/KoiFishCompetition';
import ManageKoiEntriesPage from './component/ManageKoiEntries/ManageKoiEntries';
import ApproveKoiEntries from './component/ManageKoiEntries/ApproveKoiEntries';
import NewsComp from './component/shared/news/NewsComp';
import FishKoiEventDetail from './page/5.MEMBER/FishKoiEventDetail';
import NotificationBlock from './component/shared/notification/NotificationBlock';
import ManageNewsUpdatesPage from './component/ManageNewsnUpdates/ManageNewsUpdatesPage';
import { ThemeProvider } from './template/theme/ThemeContext';
import MemberPage from './page/5.MEMBER/MemberPage';

import './index.css';

const App = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={700}>
        <Routes location={location}>
          <Route path="/" />
          <Route path='home' element={<MemberPage />} />
          {/* Main Route for Managing */}
          <Route path="admin" element={<AdminPage />}>
            <Route path='manange-task' element={<ManagementTask />} />
            {/* Manage Contests Group */}
            <Route path="manage-contests" element={<ManageContestsPage />} />
            {/* Manage Users Group */}
            <Route path="manage-users" element={<ManageUsersPage />} />
            {/*Manage Predict */}
            <Route path='manage-predict' />
            {/* Manage new */}
            <Route path='manage-news' element={<ManageNewsUpdatesPage />} />
            <Route path='koiManage' element={<ManageKoiEntriesPage />} />
          </Route>
          {/* Main Route for Refering */}
          <Route path='koiManage' element={<ManageKoiEntriesPage />}>
            <Route path='assignKoi' element={<ApproveKoiEntries />} />
          </Route>
          <Route path="referee" element={<RefereePage />}>
            <Route path='manage-judging' element={<ManageShowJudingPage />} />
          </Route>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='notif' element={<NotificationBlock />} />
          <Route path='fishkoi' element={<FishKoiEventDetail />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();