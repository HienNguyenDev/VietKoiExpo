import { Col, Row } from 'antd'
import React, { useState } from 'react'
import CalendarComponent from '../../component/shared/diagram/calendar/CalendarComponent'
import dayjs from 'dayjs';
import { enUS } from 'date-fns/locale' 
import axios from 'axios'
const ManagementTask = () => {
    const [dateRange, setDateRange] = useState([
        dayjs('2024-10-1'),
        dayjs('2024-10-5'),
    ]);
    const handleDateChange = async (range) => {
        setDateRange([dayjs(range.startDate), dayjs(range.endDate)]);

        // Format the dates to a string format that your API expects
        const startDate = dayjs(range.startDate).format('YYYY-MM-DD');
        const endDate = dayjs(range.endDate).format('YYYY-MM-DD');

        try {
            const response = await axios.get(`https://your-api-url.com/projects?start=${startDate}&end=${endDate}`);
            const projects = response.data;
            // Now you have the projects within the selected date range
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

  return (
    <div>
        <Row className='headerManageTask'></Row>
        <Row>
            <Col className='canlendar'>
                // từ lịch sẽ coi ngày đó sẽ có task nào
                <CalendarComponent locale={enUS} onDateChange={handleDateChange}/>
            </Col>
            <Col className='urgentTask'>
                {/* các task cần hoàn thành */}
                {/* gọi từ api ra */}
            </Col>
        </Row>
        <Row>
            <Col className='projectDirectory'>
                //hiển thị các dự án , khi bấm vô sẽ coi được dự án đó nội dung như nào, ai quản lí, tiến trình hoạt đông tới đâu
            </Col>
            <Col className='New Comment'></Col>
            <Col className='teamDirectory'>
                //hiển thị các team, và thành viên trong team, task của họ và đang tham gia vào dự án nào
            </Col>
        </Row>
    </div>
  )
}

export default ManagementTask