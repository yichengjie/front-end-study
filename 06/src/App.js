import React from 'react';
import './App.css';
import { DatePicker, List } from 'antd-mobile';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);


class Demo extends React.Component {
    state = {
        date: now,
    }
    render() {
        return (
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
        );
    }
}

function App() {
  return (
    <div className="App">
        hello world <br/>
        <Demo />
    </div>
  );
}

export default App;
