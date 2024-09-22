import React from 'react';
import { Col, Flex, Progress, Row, Slider, Typography } from 'antd';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

import { PieChart } from '@mui/x-charts';
const ProgressChart = () => {

  const data1=[
    {label:'',value:80},
    {label:'',value:20},
    
  ];  

  const data2=[
    {label:'1',value:60},
    {label:'2',value:30},
    {label:'43',value:5},
    {label:'4',value:5},
  ];  
//   const data=[data1,data2];

  const [stepsCount, setStepsCount] = React.useState(5);
  const [stepsGap, setStepsGap] = React.useState(7);
  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
  }));
  
  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }
  return (
    <>
      <Flex
        wrap
        gap="middle"
        style={{
          marginTop: 16,
          position: 'relative',
            left: '158px',
        }}
      >
        <Row>
        <Col span={24} style={{}}>

         <div style={{marginLeft:'50px'}}>
         <PieChart
        series={[
          {
            paddingAngle: 5,
            innerRadius: 60,
            outerRadius: 80,
            data:data1,
          },
        ]}
        margin={{ right:5 }}
        width={200}
        height={200}
        slotProps={{
          legend: { hidden: true },
        }}
      >
        <PieCenterLabel>80%</PieCenterLabel>
      </PieChart>
         </div>
        </Col>
        <Typography.Title style={{marginTop:'20px',margin:'auto',color:'#ffffff'}} level={5}>Đạt KPI</Typography.Title>
        </Row>
        <Row>
            <Col span={24} >
            <div style={{paddingLeft:'58px'}}>
            <PieChart
        series={[
          {
            startAngle: -90,
            endAngle: 90,
            paddingAngle: 5,
            innerRadius: 60,
            outerRadius: 80,
            data:data2,
          },
        ]}
        margin={{ right: 5 }}
        width={200}
        height={200}
        slotProps={{
          legend: { hidden: true },
        }}
      >
         
      </PieChart>
            </div>
            </Col>
         <Typography.Title  style={{marginTop:'20px',margin:'auto',color:'#ffffff'}} level={5}>Phân lượng</Typography.Title>
        </Row>
      </Flex>
    </>
  );
};
export default ProgressChart;