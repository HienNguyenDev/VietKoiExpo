import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/configStore';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

//Page
import IntroComponent from './page/0.INTRO/IntroComponent';
import WaveAnimation from './page/0.INTRO/wave/WaveAnimation';
import AdminPage from './page/1.ADMIN/AdminPage';
import HomePage from './page/1.ADMIN/HomePage';
import RegisterPage from './page/2.LOGIN/RegisterPage';
import LoginPage from './page/2.LOGIN/LoginPage';
import RefereePage from './page/3.REFEREE/RefereePage';
import FishKoiEventDetail from './page/5.MEMBER/FishKoiEventDetail';
import MemberPage from './page/5.MEMBER/MemberPage';
import KoiFishCompetition from './page/5.MEMBER/KoiFishCompetition';
//ManageUser
import ManageUsers from './component/ManageUser/ManageUsers';
import CreateUser from './component/ManageUser/CreateUser';
import UpdateUsers from './component/ManageUser/UpdateUsers';
import ManageUserPermissons from './component/ManageUser/MangeUserPermissions';
import ViewUser from './component/ManageUser/ViewUser';
import ManageUsersPage from './component/ManageUser/ManageUsers';

//ManageTaskAllocation
import AssignTaskPage from './component/ManageTaskAllocation/AssignTaskPage';
import TaskAllocationProcess from './component/ManageTaskAllocation/TaskAllocationProcess';
//ManageContest
import ManageContestsPage from './component/ManageContest/ManageContestsPage';

// import ManagementTask from './component/ManageTaskAllocation/ManagementTask';

//ManageSystemRport
import ManageJudgingCriteria from './component/ManageSystemSetting/ManageJudgingCriteria';
//ManageJudging
import ManageShowJudgingPage from './component/ManageJudging/ManageShowJudgingPage';
import ManageScoringProcess from './component/ManageJudging/ManageScoringProcess';
import ManageKoiJudgingPage from './component/ManageJudging/ManageKoiJudgingPage';
import FinalizeContestResults from './component/ManageJudging/FinalizeContestResults';
import AsssignJugingProcess from './component/ManageJudging/AssignJudgingProcess';
//ManageKoiEntries
import ManageKoiEntriesPage from './component/ManageKoiEntries/ManageKoiEntries';
import ApproveKoiEntries from './component/ManageKoiEntries/ApproveKoiEntries';




import NotificationPage from './component/shared/notification/NotificationPage';
import NotificationBlock from './component/shared/notification/NotificationBlock';
import ManageNewsUpdatesPage from './component/ManageNewsnUpdates/ManageNewsUpdatesPage';
import { ThemeProvider } from './template/theme/ThemeContext';
import NewsComp from './component/shared/news/NewsComp';
import './index.css';
import StatisticDiagram from './component/shared/diagram/StatisticDiagram';

const App = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={700}>
        <Routes location={location}>
          <Route path="/"  element={<LoginPage/>}/>
          <Route path='home' element={<MemberPage />} />
          {/* Main Route for Managing */}
          <Route path="admin" element={<AdminPage />}>
            {/* <Route path='manage-task' element={<ManagementTask />} /> */}
            {/* Manage Contests Group */}
            <Route path='notifications' element={<NotificationPage />} />
            
            <Route path="manage-contests" element={<ManageContestsPage />} />
            {/* Manage Users Group */}
            <Route path="manage-users" element={<ManageUsersPage />} />
            {/*Manage Predict */}
            <Route path='manage-predict' />
            <Route path='view-contest-reports' element={<StatisticDiagram/>} />
            {/*Manage Judging Process */}
            <Route path="assign-judges-to-contest" element={<AsssignJugingProcess />} />
            <Route path="finalize-contest-results" element={<FinalizeContestResults />} />


            {/* Manage new */} 
            <Route path='manage-news' element={<ManageNewsUpdatesPage />} />
            {/* Manage system report */} 
            <Route path='manage-judging-criteria' element={<ManageJudgingCriteria />} />
             {/* Manage Task allocation  */}
            
              <Route path="manage-task-allocation" element={<AssignTaskPage />} />
              {/* Route con cho Task Allocation Process với tham số compID */}
              <Route path="manage-task-allocation/:compID" element={<TaskAllocationProcess />} />

            



            <Route path='koiManage' element={<ManageKoiEntriesPage />} />
          </Route>

          {/* Main Route for Refering */}
          <Route path='koiManage' element={<ManageKoiEntriesPage />}>
            <Route path='assignKoi' element={<ApproveKoiEntries />} />
          </Route>

          
          <Route path="referee" element={<RefereePage />}>
            {/* Step 1: Show all contests */}
            <Route path="manage-judging" element={<ManageShowJudgingPage />} />
            
            {/* Step 2: View Koi entries for selected show */}
            <Route path="manage-judging/:status/:id" element={<ManageKoiJudgingPage />} />
            
            {/* Step 3: Score a Koi entry */}
            <Route path="manage-judging/scoring/:koiId" element={<ManageScoringProcess />} />
          </Route>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='notif' element={<NotificationPage />} />
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