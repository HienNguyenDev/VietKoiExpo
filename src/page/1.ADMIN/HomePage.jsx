import React from 'react'
import {Steps} from 'antd'
import PlaceHolder from '../../component/placeholder/PlaceHolder'
const description="vĩnh nguyên là số mấy nhỉ?"
const HomePage = () => {
  return (
    <div className='container' style={{width:'100vw'}}>
        <div className='header'>
                <div className='allert block'></div>
        </div>
        <div className='status bar'>
                <Steps current={1} items={[{title:'Finished',description},{title:'In progress',description,subTitle:'Left 00:02:10'},{title:'Waiting',description}]} ></Steps>
                <PlaceHolder/>
        </div>
        <div className='performance bar'>
                <div className='cash_deposits'></div>
                <div className='invest_divident'></div>
                <div className='capital_gains'></div>
                <div className='total_access'></div>


        </div>
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

export default HomePage