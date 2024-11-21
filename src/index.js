import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/configStore';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NotificationPage from './component/shared/notification/NotificationPage';
import MyProfile from './component/shared/userProfile/MyProfile';
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
import ManageAllKoiPage from './component/ManageAllKoi/ManageAllKoiPage';
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
import PrivateRoute from './private/PrivateRoute'; // Import the PrivateRoute component
import ResultPage from './page/5.MEMBER/ResultPage';
import MainPage from './template/theme/MainPage';
import HistoryComp from './template/theme/HistoryComp';
import ListCompetitionComp from './page/5.MEMBER/ListCompetitionComp';

const App = () => {
  const location = useLocation();
  const nodeRef = useRef(null); 
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} nodeRef={nodeRef} classNames="fade" timeout={700}>
        <div ref={nodeRef}>
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route path="home" element={<MainPage />} />
          <Route path="home/register-koi" element={<ApproveKoiEntries />} />
          <Route path="view-contest" element={<ViewContests />} />
          <Route path="view-koi" element={<ReviewKoiEntries />} />
          
          {/* Main Route for Manager */}
          <Route path="admin" element={<PrivateRoute element={AdminPage} />}>
            <Route path="manage-contests" element={<PrivateRoute element={ManageContestsPage} />} />
            <Route path="manage-users" element={<PrivateRoute element={ManageUsersPage} />} />
            <Route path="view-contest-reports" element={<PrivateRoute element={StatisticDiagram} />} />
            <Route path="assign-judges-to-contest" element={<PrivateRoute element={AsssignJugingProcess} />} />
            <Route path="finalize-contest-results" element={<PrivateRoute element={FinalizeContestResults} />} />
            <Route path="manage-news" element={<PrivateRoute element={ManageNewsUpdatesPage} />} />
            <Route path="manage-judging-criteria" element={<PrivateRoute element={ManageJudgingCriteria} />} />
            <Route path="manage-task-allocation" element={<PrivateRoute element={AssignTaskPage} />} />
            <Route path="manage-task-allocation/process/:compID" element={<PrivateRoute element={TaskAllocationProcess} />} />
            <Route path="manage-koi-entries" element={<PrivateRoute element={ManageKoiEntriesPage} />} />
            <Route path="manage-koi-entries/review-koi-entries/:compName" element={<PrivateRoute element={ReviewKoiEntries} />} />
            <Route path="manage-koi-checkin" element={<PrivateRoute element={ManageKoiCheckIn} />} />
            <Route path="manage-koi-checkin/review-koi-checkin/:compName" element={<PrivateRoute element={ReviewKoiCheckIn} />} />
            <Route path="manage-all-koi" element={<PrivateRoute element={ManageAllKoiPage} />} />
          </Route>
          
          <Route path="assignKoi" element={<PrivateRoute element={ApproveKoiEntries} />} />
          <Route path="referee" element={<PrivateRoute element={RefereePage} />}>
            {/* Step 1: Show all contests */}
            <Route path="manage-judging" element={<PrivateRoute element={ManageShowJudgingPage} />} />
            <Route path="manage-judging/comp/:compName" element={<PrivateRoute element={ManageKoiJudgingPage} />} />
            <Route path="manage-judging/scoring/:koiId" element={<PrivateRoute element={ManageScoringProcess} />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="notif" element={<PrivateRoute element={NotificationPage} />} />
          <Route path="fishkoi" element={<PrivateRoute element={FishKoiEventDetail} />} />
          <Route path="/competition">
            <Route path="landing" element={<PrivateRoute element={LandingPage} />} />
            <Route path="/competition/:compId" element={<PrivateRoute element={CompetitionBracket} />} />
            <Route path="advancement" element={<PrivateRoute element={AdvancementView} />} />
            <Route path="leaderboard" element={<PrivateRoute element={Leaderboard} />} />
            <Route path="announcement" element={<PrivateRoute element={Announcement} />} />
            <Route path="admin" element={<PrivateRoute element={AdminPanel} />} />
          </Route>
          <Route path="notifications" element={<PrivateRoute element={NotificationPage} />} />
          <Route path="myprofile" element={<PrivateRoute element={MyProfile} />} />
          <Route path="/results/:compId" element={<PrivateRoute element={UserViewResultsPage} />} />
          <Route path="home/view-koi" element={<PrivateRoute element={ViewKoiEntries} />} />
          <Route path="home/view-contests" element={<PrivateRoute element={ApproveKoiEntries} />} />
          <Route path="/forget-password" element={<ForgetPass />} />
          <Route path="/checkin/:competitionId" element={<PrivateRoute element={KoiListForCompetition} />} />
          <Route path="/competitionMatch/:compId" element={<PrivateRoute element={CompetitionPage} />} />
          <Route path="/news/:newsTypeId" element={<PrivateRoute element={NewsPage} />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/dashboard/:compId" element={<PrivateRoute element={Dashboard} />} />
          <Route path='/competition-results' element={<PrivateRoute element={ResultPage} />} />
          <Route path='view-all-contest' element={<ListCompetitionComp/>}/>
          <Route path='history' element={<HistoryComp/>}></Route>
          {/* Catch-all route to redirect to home */}
          <Route path="slider" element={<MainPage/>}></Route>
          <Route path="*" element={<Navigate to="/" />} />
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