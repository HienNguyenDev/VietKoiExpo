import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/configStore';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NotificationPage from './component/shared/notification/NotificationPage';
import NotificationBlock from './component/shared/notification/NotificationBlock';
import ManageNewsUpdatesPage from './component/ManageNewsAndUpdates/ManageNewsUpdatesPage';
import { ThemeProvider } from './template/theme/ThemeContext';
import NewsComp from './component/shared/news/NewsComp';
import './index.css';
import StatisticDiagram from './component/shared/diagram/StatisticDiagram';
import CompetitionPage from './page/5.MEMBER/CompetitionPage';
import LandingPage from './page/5.MEMBER/LandingPage';
import CompetitionBracket from './page/5.MEMBER/CompetitionBracket';
import AdvancementView from './page/5.MEMBER/AdvancementView';
import Leaderboard from './page/5.MEMBER/Leaderboard';
import Announcement from './page/5.MEMBER/Announcement';
import AdminPanel from './page/5.MEMBER/AdminPanel';
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
import ManageUsersPage from './component/ManageUser/ManageUsers';
import AssignTaskPage from './component/ManageTaskAllocation/AssignTaskPage';
import TaskAllocationProcess from './component/ManageTaskAllocation/TaskAllocationProcess';
import ManageContestsPage from './component/ManageContest/ManageContestsPage';
import ManageJudgingCriteria from './component/ManageSystemSetting/ManageJudgingCriteria';
import ManageShowJudgingPage from './component/ManageJudging/ManageShowJudgingPage';
import ManageScoringProcess from './component/ManageJudging/ManageScoringProcess';
import ManageKoiJudgingPage from './component/ManageJudging/ManageKoiJudgingPage';
import FinalizeContestResults from './component/ManageJudging/FinalizeContestResults';
import AsssignJugingProcess from './component/ManageJudging/AssignJudgingProcess';
import ManageKoiEntriesPage from './component/ManageKoiEntries/ManageKoiEntries';
import ApproveKoiEntries from './component/ManageKoiEntries/ApproveKoiEntries';
import ForgetPass from './page/2.LOGIN/ForgetPass';
import WireframeCompetitionBracket from './page/5.MEMBER/WireFrame';

const App = () => {
  const location = useLocation();

  return (

        <Routes location={location}>
          <Route path="/"  element={<LoginPage/>}/>
          <Route path='home' element={<MemberPage />} />
          {/* Main Route for Managing */}
          <Route path="admin" element={<AdminPage />}>
            <Route path="notifications" element={<NotificationPage />} />
            <Route path="manage-contests" element={<ManageContestsPage />} />
            <Route path="manage-users" element={<ManageUsersPage />} />
            <Route path="view-contest-reports" element={<StatisticDiagram />} />
            <Route path="assign-judges-to-contest" element={<AsssignJugingProcess />} />
            <Route path="finalize-contest-results" element={<FinalizeContestResults />} />
            <Route path="manage-news" element={<ManageNewsUpdatesPage />} />
            <Route path="manage-judging-criteria" element={<ManageJudgingCriteria />} />
            <Route path="manage-task-allocation" element={<AssignTaskPage />} />
            <Route path="manage-task-allocation/:compID" element={<TaskAllocationProcess />} />
            <Route path="koiManage" element={<ManageKoiEntriesPage />} />
          </Route>
          <Route path="koiManage" element={<ManageKoiEntriesPage />}>
            
          </Route>
          <Route path="assignKoi" element={<ApproveKoiEntries />} />
          <Route path="referee" element={<RefereePage />}>
            {/* Step 1: Show all contests */}
            <Route path="manage-judging" element={<ManageShowJudgingPage />} />
            <Route path="manage-judging/:status/:id" element={<ManageKoiJudgingPage />} />
            <Route path="manage-judging/scoring/:koiId" element={<ManageScoringProcess />} />
          </Route>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='notif' element={<NotificationPage />} />
          <Route path='fishkoi' element={<FishKoiEventDetail />} />
          <Route path="/competition" element={<CompetitionPage />}>
            <Route path="landing" element={<LandingPage />} />
            <Route path="competition" element={<CompetitionBracket />} />
            <Route path="advancement" element={<AdvancementView />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="announcement" element={<Announcement />} />
            <Route path="admin" element={<AdminPanel />} />
        </Route>
          
        </Routes>
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