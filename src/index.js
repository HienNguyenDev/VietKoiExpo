import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './page/1.ADMIN/AdminPage';
import HomePage from './page/1.ADMIN/HomePage';
import RegisterPage from './page/2.LOGIN/RegisterPage';
import LoginPage from './page/2.LOGIN/LoginPage';
import { Provider } from 'react-redux';
import { store } from './store/configStore';
import ManageContestsPage from './component/ManageContest/ManageContestsPage';
import ManageUsers from './component/ManageUser/ManageUsers';
import CreateUser from './component/ManageUser/CreateUser';
import UpdateUsers from './component/ManageUser/UpdateUsers';
import ManageUserPermissons from './component/ManageUser/MangeUserPermissions';
import ViewUser from './component/ManageUser/ViewUser';
import { Outlet } from 'react-router-dom';
import CreateContest from './component/ManageContest/CreateContest';
import UpdateContest from './component/ManageContest/UpdateContest';
import ViewContests from './component/ManageContest/ViewContests';
import DeleteContests from './component/ManageContest/DeleteContests';
import ManageUsersPage from './component/ManageUser/ManageUsers';
import ManagementTask from './page/1.ADMIN/ManagementTask';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Main Route for Managing */}
      <Route path="admin" element={<AdminPage />}>
        
        <Route path='manangement-task' element={<ManagementTask/>}></Route>

        {/* Manage Contests Group */}
        <Route path="manage-contests" elemenmt={<ManageContestsPage />}>
          <Route path="create-contest" element={<CreateContest />} />
          <Route path="update-contest" element={<UpdateContest />} />
          <Route path="view-contests" element={<ViewContests />} />
          <Route path="delete-contest" element={<DeleteContests />} />
        </Route>

        {/* Manage Users Group */}
        <Route path="manage-users" element={<ManageUsersPage />}>
          <Route path="create-user" element={<CreateUser />} />
          <Route path="view-users" element={<ViewUser />} />
          <Route path="update-user" element={<UpdateUsers />} />
          <Route path="manage-user-roles" element={<ManageUserPermissons />} />
        </Route>

        {/* Reports Group */}
        {/* <Route path="reports" element={<ReportsPage />}>
          <Route path="view-contest-reports" element={<ContestReports />} />
          <Route path="view-user-reports" element={<UserReports />} />
          <Route path="view-prediction-reports" element={<PredictionReports />} />
          <Route path="view-koi-entry-reports" element={<KoiEntryReports />} />
        </Route> */}

        {/* System Settings Group */}
        {/* <Route path="settings" element={<SystemSettings />}>
          <Route path="manage-contest-categories" element={<ManageContestCategories />} />
          <Route path="manage-judging-criteria" element={<ManageJudgingCriteria />} />
        </Route> */}

      </Route>

    </Routes>
  </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
