import  {React, useRef } from 'react';
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
import ManageKoiEntriesPage from './component/ManageKoiEntries/ManageKoiEntries1';
import ReviewKoiEntries from './component/ManageKoiEntries/ReviewKoiEntries';
import ManageKoiCheckIn from './component/ManageCheckInKoi/ManageKoiCheckIn';
import ReviewKoiCheckIn from './component/ManageCheckInKoi/ReviewKoiCheckIn';

import ApproveKoiEntries from './component/ManageKoiEntries/ApproveKoiEntries';
import ForgetPass from './page/2.LOGIN/ForgetPass';
import WireframeCompetitionBracket from './page/5.MEMBER/WireFrame';
import ViewContests from './component/ManageContest/ViewContests';
import UploadKoiForm from './page/5.MEMBER/uploadKoi/UploadKoiForm';
import MyKoi from './component/ManageKoiEntries/ApproveKoiEntries';
import ViewKoiEntries from './component/ManageKoiEntries/ViewKoiEntries';
import UserViewResultsPage from './component/ManageJudging/UserViewResult';
import CheckIn from './page/5.MEMBER/competition/CheckIn';
import NewsPage from './page/5.MEMBER/news/NewsPage';
import ResetPage from './page/2.LOGIN/ResetPage';
import KoiListForCompetition from './page/5.MEMBER/competition/CheckIn';
import Dashboard from './component/shared/DashBoard/dashBoard';
import ResetPasswordPage from './page/2.LOGIN/ResetPage';
const App = () => {
  const location = useLocation();
  const nodeRef = useRef(null); 
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} nodeRef={nodeRef} classNames="fade" timeout={700}>
        <div ref={nodeRef}>
        <Routes location={location}>
          <Route path="/"  element={<MemberPage/>}/>
          <Route path='home' element={<MemberPage />}>
           
          </Route>
          <Route path='home/register-koi' element={<ApproveKoiEntries/>}></Route>
            <Route path='view-contest' element={< ViewContests/>} />
            <Route path="view-koi" element={<ReviewKoiEntries />} />
          
          {/* Main Route for Managing */}
          <Route path="admin" element={<AdminPage />}>
          
            <Route path="manage-contests" element={<ManageContestsPage />} />
            <Route path="manage-users" element={<ManageUsersPage />} />
            <Route path="view-contest-reports" element={<StatisticDiagram />} />
            <Route path="assign-judges-to-contest" element={<AsssignJugingProcess />} />
            <Route path="finalize-contest-results" element={<FinalizeContestResults />} />
            <Route path="manage-news" element={<ManageNewsUpdatesPage />} />
            <Route path="manage-judging-criteria" element={<ManageJudgingCriteria />} />
            <Route path="manage-task-allocation" element={<AssignTaskPage />} />
            <Route path="manage-task-allocation/process/:compID" element={<TaskAllocationProcess />} />
            
            <Route path="manage-koi-entries" element={<ManageKoiEntriesPage />} />
            <Route path="manage-koi-entries/review-koi-entries/:compName" element={<ReviewKoiEntries />} />

            <Route path="manage-koi-checkin" element={<ManageKoiCheckIn />} />
            <Route path="manage-koi-checkin/review-koi-checkin/:compName" element={<ReviewKoiCheckIn />} />
          </Route>
          

          
          <Route path="assignKoi" element={<ApproveKoiEntries />} />
          <Route path="referee" element={<RefereePage />}>
            {/* Step 1: Show all contests */}
            <Route path="manage-judging" element={<ManageShowJudgingPage />} />
            <Route path="manage-judging/comp/:compName" element={<ManageKoiJudgingPage />} />
            <Route path="manage-judging/scoring/:koiId" element={<ManageScoringProcess />} />
          </Route>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='notif' element={<NotificationPage />} />
          <Route path='fishkoi' element={<FishKoiEventDetail />} />
          <Route path="/competition" >
            <Route path="landing" element={<LandingPage />} />
            <Route path="/competition/:compId" element={<CompetitionBracket />} />
            <Route path="advancement" element={<AdvancementView />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="announcement" element={<Announcement />} />
            <Route path="admin" element={<AdminPanel />} />
            
        </Route>
        <Route path="notifications" element={<NotificationPage />} />
        home/view-koi
        <Route path="/results/:compId" element={<UserViewResultsPage />} />
        <Route path='home/view-koi' element={<ViewKoiEntries/>}></Route>
        <Route path='home/view-contests' element={<ApproveKoiEntries/>}></Route>
          <Route path='/forget-password' element={<ForgetPass/>}></Route>
          <Route path="/checkin/:competitionId" element={<KoiListForCompetition />} />
          <Route path="/competitionMatch/:compId" element={<CompetitionPage />} />
          <Route path="/news/:newsTypeId" element={<NewsPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/dashboard/:compId" element={<Dashboard />} />
        </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
 
);

reportWebVitals();