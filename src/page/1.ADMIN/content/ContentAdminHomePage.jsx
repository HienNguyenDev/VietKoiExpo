import React from 'react'
import {Steps,Flex,Progress, Timeline, Row, Col} from 'antd'
import PlaceHolder from '../../../component/placeholder/PlaceHolder'
import styles from '../../../asset/scss/ContentAdminPage.module.scss'
import NotificationBlock from '../../../component/notification/NotificationBlock'
import TimelineDemo from '../../../component/timeline/Timeline'
import StatisticComp from '../../../component/statistic/Statistic'
import StatisticDiagram from '../../../component/diagram/StatisticDiagram'
const description="vĩnh nguyên là số mấy nhỉ?"
const ContentAdminHomePage = () => {
  return (
    <div className={styles.container} style={{width:'100vw'}}>
        <Row>
                <Col span={24}>
                <div className='header'>
                        <div className='allert block'>
                        </div>
                </div>
                </Col>
        </Row>
        <Row>
                 <Col span={12}>
                 <Row>
                 <Col span={24}>
                 <div className='status_bar'>
                        <Steps className='custom_steps' current={1} items={[{title:'Finished',description},{title:'In progress',description,subTitle:'Left 00:02:10'},{title:'Waiting',description}]} style={{width:"60%"}} ></Steps>
                </div>
                 </Col>
                 </Row>
                <Row>
                        <Col span={12}>
                        <StatisticComp/>
                        </Col>
                </Row>
                 </Col>
                <Col span={12}>
                <div className='timeline'>
                <TimelineDemo/>
        </div>
                </Col>
        </Row> 
        <Row>
                <Col span={12}>
                        <StatisticDiagram/>
                </Col>
                <Col span={12}>
                <div className={styles.performance_bar}>
                
                {/*  //demo phần biểu hiện performance */}
                 {/* <div className={styles.demoPerformance}>
                 <Flex gap={'small'}  wrap>
                         <Progress type="circle" percent={75} />
                         <Progress type="circle" percent={70} status="exception" />
                         <Progress type="circle" percent={100} />
                 </Flex>
                 </div> */}
                  {/* // phần này sẽ được thay thế bằng component khác */}
                 <div className='cash_deposits'></div>
                 <div className='invest_divident'></div>
                 <div className='capital_gains'></div>
                 <div className='total_access'></div>
 
 
         </div>
                </Col>
        </Row>

       
        
        <div className='dashboard'>
                <div className='overview'>
                        <div className='line_chart'></div>
                        <div className='pie_chart'></div>

                </div>
                <div className='specifics'></div>
        </div>
        
        <div className='stastitis'></div>
    </div>
  )
}

export default ContentAdminHomePage