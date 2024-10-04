import React from 'react'
import { Steps, Timeline, Row, Col,Config } from 'antd';
import styles from '../../../asset/scss/ContentAdminPage.module.scss'
import NotificationBlock from '../../../component/shared/notification/NotificationBlock'
import StatisticComp from '../../../component/shared/statistic/Statistic'
import StatisticDiagram from '../../../component/shared/diagram/StatisticDiagram'
import NewsComp from '../../../component/shared/news/NewsComp';
import ProgressChart from '../../../component/shared/diagram/progresspresentbypiechart/ProgressChart';
import { height, style } from '@mui/system';
import Timeline2 from '../../../component/shared/timeline/TimeLine2';
const description1="dự án hoàn thành 10%"
const description2="dự án hoàn thành 60%"
const description3="dự án hoàn thành 100%"
const ContentAdminHomePage = () => {
  return (
    <div className={styles.container} style={{ background: 'linear-gradient(111.1deg, rgb(0, 40, 70) -4.8%, rgb(255, 115, 115) 82.7%, rgb(255, 175, 123) 97.2%)',width:'100%',minHeight:'100vh',paddingBottom:'5em',overflow:'auto'}}>
        <Row style={{}}>
                <Col span={24}>
                <div className={styles.header}>
                        <div className={styles.alert_block}>
                                <div className='NotificationBlock'>
                                        <NotificationBlock/>
                                </div>
                        </div>
                </div>
                </Col>
        </Row>
        <Row style={{}}>
                 <Col span={12}  style={{}}>
                 <Row>
                 <Col span={24} style={{height:'200px'}}>
                 <div className={styles.status_bar} style={{background: 'linear-gradient(111.1deg, rgb(0, 40, 70) -4.8%, rgb(255, 115, 115) 82.7%, rgb(255, 175, 123) 97.2%)',width:'80%',position:'relative',top:'40px',left:'88px',padding:'20px'}}>
                        <Steps className={styles.custom_steps} current={1} items={[{title:'Finished',description:description1},{title:'In progress',description:description2},{title:'Waiting',description:description3}]} style={{width:"100%"}} ></Steps>
                </div>
                 </Col>
                 </Row>
                
                <Row >
                      <Col span={24} style={{background: '',height:'300px'}}>
                        <div className='progresschart' style={{border:'1px solid red',borderRadius:'30px',backgroundColor:'' }}>
                                <ProgressChart/>
                        </div>
                        </Col>
                </Row>
                <Row  style={{}}>
                        <Col span={24} style={{background:'green',height:'200px',alignContent:'center',padding:'0px 20px'}}>
                        <StatisticComp/>
                        </Col>
                </Row>
                 </Col>
                <Col style={{paddingRight:'30px',paddingLeft:'30px',paddingTop:'30px',height:'700px'}} span={12}>
                        <div className='timeline' style={{backdropFilter: "blur(10px)", 
  backgroundColor: "rgba(185, 174, 174, 0.308",color:'#ffffff', padding:'20px', border:'2px solid red', borderRadius:'20px',height:'100%'}}>
                                <Timeline2/>
                        </div>
                </Col>
        </Row> 
        <Row style={{height:'600px',paddingTop:'30px'}} >
                        <Col span={12} style={{width:'100%',height:'100%'}}>
                               <div style={{height:'100%',backdropFilter: "blur(10px)", 
  backgroundColor: "rgba(255, 255, 255, 2)",boxShadow: '-10px 10px 39px rgba(41, 37, 43, 0.4)',border:'2px solid red', borderRadius:'20px',position:'relative',top:'18px'}}>
                               <StatisticDiagram/>
                               </div>
                        </Col>
                        <Col span={12} style={{height:'100%',width:'100%'}} >       
                                <div className='' style={{ backdropFilter: "blur(10px)", 
  backgroundColor: "rgba(255, 255, 255, 2)",boxShadow: '-10px 10px 39px rgba(41, 37, 43, 0.4)',height:'600px',padding:'20px', border:'2px solid red', borderRadius:'20px',width:'80%',position:'relative',left:'120px'}}>
                                        <NewsComp/>
                                </div>
                        </Col>
        </Row>

       
{/*         
        <div className='dashboard'>
                <div className='overview'>
                        <div className='line_chart'></div>
                        <div className='pie_chart'></div>

                </div>
                <div className='specifics'></div>
        </div>
        
        <div className='stastitis'></div> */}
    </div>
  )
}

export default ContentAdminHomePage