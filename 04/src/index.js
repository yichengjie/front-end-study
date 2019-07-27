import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css' ;
import './App.scss' ;
import SubjectEvaluation from './views/subject-evaluation/index' ;
import WeeklyDutyCheck from './views/weekly-duty-check/index' ;


ReactDOM.render(
    <div className="App container-fluid">
        <Router>
            <Route exact path="/" component={App} />
            <Route path="/subject-evaluation" component={SubjectEvaluation} />
            <Route path="/weekly-duty-check" component={WeeklyDutyCheck} />
        </Router>
    </div>
    , document.getElementById('root'));

