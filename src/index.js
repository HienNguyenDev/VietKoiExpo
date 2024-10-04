import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './page/1.ADMIN/AdminPage';
import HomePage from './page/1.ADMIN/HomePage';
import IntroComponent from './page/0.INTRO/IntroComponent';
// import RefereePage from './page/3.REFEREE/RefereePage';
import RegisterPage from './page/2.LOGIN/RegisterPage';
import LoginPage from './page/2.LOGIN/LoginPage';
import LoginForm from './page/2.LOGIN/LoginForm';
import { Provider } from 'react-redux';
import { store } from './store/configStore';
import ManageContests from './component/ManageContest/ManageContestsPage';
import ManageUsers from './component/ManageUser/ManageUsers';
import CreateUser from './component/ManageUser/CreateUser';
import UpdateUsers from './component/ManageUser/UpdateUsers';
import ManageUserPermissons from './component/ManageUser/MangeUserPermissions';
import ViewUser from './component/ManageUser/ViewUser';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route path="admin" element={<AdminPage />}>
          <Routes>
            <Route path="home" element={<HomePage />} />
                <Route path='manage-user' element={<ManageUsers/>}>
                 <Routes>
                  <Route path='create-user' element={<CreateUser/>}></Route>
                    <Route path='update-users' element={<UpdateUsers/>}></Route>
                    <Route path='permissions-users' element={<ManageUserPermissons/>}></Route>
                    <Route path='view-user' element={<ViewUser/>}></Route>
                 </Routes>
                </Route>
          </Routes>
             
            </Route>

          <Route path="create-contest" element={<ManageContests/>}></Route>
        </Route>
        {/* <Route path="/referee" element={<RefereePage/>}/> */}
        <Route path="login" element={<LoginPage/>}/>
        <Route path='register' element={<RegisterPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
