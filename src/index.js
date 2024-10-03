import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './page/1.ADMIN/AdminPage';
import HomePage from './page/1.ADMIN/HomePage';
import IntroComponent from './page/0.INTRO/IntroComponent';
<<<<<<< HEAD
=======
import RefereePage from './page/3.REFEREE/RefereePage';
>>>>>>> origin/updateAdminPage
import RegisterPage from './page/2.LOGIN/RegisterPage';
import LoginPage from './page/2.LOGIN/LoginPage';
import LoginForm from './page/2.LOGIN/LoginForm';
import Referee from './page/3.REFEREE/Referee';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/admin" element={<AdminPage/>}/>
        </Route>
        <Route path="/referee" element={<RefereePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
   {/* <AdminPage/> */}
   {/* <RefereePage/> */}
   {/* <LoginPage/> */}
   {/* <IntroComponent/> */}
<<<<<<< HEAD
   {/* <div>
     <Referee/>
   </div> */}
=======

  {/* //test */}
   <div >
   <RefereePage/>
   </div>
>>>>>>> origin/updateAdminPage
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
