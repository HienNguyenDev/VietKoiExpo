// src/MainPage.jsx
import React, { useEffect } from 'react';
 
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from './Slider';
import Experience from './Experience';
import Header from './Header';
import Category from './Category';
import AboutSection from './CateriaSection';
import StatisticsAndNews from './StaticsticAndNews';
import InfoSection from './InforSection';
import PredictionComp from '../../component/ManagePrediction/ViewPrediction';
import { fetchUserByIdActionApi } from '../../store/redux/action/userAction';
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {
  const dispatch = useDispatch();
  const userLogin=useSelector((state)=>state.userReducer.userLogin);
  useEffect(() => {
    if (userLogin && userLogin.userId) {
      dispatch(fetchUserByIdActionApi(userLogin.userId)); // Re-fetch user data
    }
  }, [userLogin, dispatch]);
  return (
    <div>                                                                                                                   <Header/>                                 
      <Slider />
      <Experience/>
      <Category/>
      <AboutSection/>
      <PredictionComp/>
      <StatisticsAndNews/>
      <InfoSection/>
    </div>
  );
};

export default MainPage;