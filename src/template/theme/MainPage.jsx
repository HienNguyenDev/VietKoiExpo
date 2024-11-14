// src/MainPage.jsx
import React from 'react';
 
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from './Slider';
import Experience from './Experience';
import Header from './Header';
import Category from './Category';
import AboutSection from './CateriaSection';
import StatisticsAndNews from './StaticsticAndNews';
import InfoSection from './InforSection';

const MainPage = () => {
  return (
    <div>                                                                                                                   <Header/>                                 
      <Slider />
      <Experience/>
      <Category/>
      <AboutSection/>
      <StatisticsAndNews/>
      <InfoSection/>
    </div>
  );
};

export default MainPage;