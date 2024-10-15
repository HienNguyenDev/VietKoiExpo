import * as React from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './CalendarComponent.scss'; // Import SCSS file
import { Col, Row } from 'antd';

const CalendarComponent = ({ locale, onDateChange, backgroundColor, hoverColor, selectedColor, buttonBackgroundColor, buttonTextColor, buttonHoverBackgroundColor, width,height}) => {
    const [state, setState] = React.useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const handleSubmit = () => {
        console.log(state[0]); 
        onDateChange(state[0]); 
    };

    return (
        <div 
            className="calendar-component" 
            style={{ 
                '--background-color': backgroundColor, 
                '--hover-color': hoverColor, 
                '--selected-color': selectedColor, 
                '--button-background-color': buttonBackgroundColor, 
                '--button-text-color': buttonTextColor, 
                '--button-hover-background-color': buttonHoverBackgroundColor,
                '--width': width,
                '--height': height
            }}
        >
            <Row>
                <Col span={24}>
                <DateRangePicker
                locale={locale}
                onChange={item => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
                className="custom-date-range-picker"
            />
                </Col>
            <Col span={24} offset={24}>  <button className="submit-button" onClick={handleSubmit}>Submit</button> </Col>
            </Row>
        </div>
    );
}

export default CalendarComponent;