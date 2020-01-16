import React from "react";
import {DatePicker, List} from "antd-mobile";
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class DateHello extends React.Component {
    state = {
        date: now,
    }
    render() {
        return (
            <div className="App">
                <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                    <DatePicker
                        mode="date"
                        title="Select Date"
                        extra="Optional"
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">Date</List.Item>
                    </DatePicker>
                </List>
            </div>
        );
    }
}

export default DateHello ;