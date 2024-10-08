import * as React from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const CalendarComponent = ({ locale, onDateChange }) => {
    const [state, setState] = React.useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const handleSubmit = () => {
        console.log(state[0]); 
        onDateChange(state[0]); // Call onDateChange with the current date range

    };

    return (
        <div>
            <DateRangePicker
                locale={locale}
                onChange={item => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
            />
            <button onClick={handleSubmit}>Submit</button> 
        </div>
    );
}

export default CalendarComponent;