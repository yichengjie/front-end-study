import React from 'react';
import './App.css';
//import {DatePicker} from "antd";
import DatePicker from 'antd/es/date-picker'; // 加载 JS
import 'antd/es/date-picker/style/css'; // 加载 CSS

//import Button from 'antd/lib/button';

function App() {
  return (
    <div className="App">
        hello world <br/>
        <DatePicker />
    </div>
  );
}

export default App;
