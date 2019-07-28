import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import EntryMenu from './views/entry-menu/index' ;
import SubjectEvaluation from './views/subject-evaluation/index' ;
import WeeklyDutyCheck from './views/weekly-duty-check/index' ;
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css' ;


ReactDOM.render(
    <div className="App container-fluid">
        <Router>
            <Route exact path="/" component={EntryMenu} />
            <Route path="/subject-evaluation" component={SubjectEvaluation} />
            <Route path="/weekly-duty-check" component={WeeklyDutyCheck} />
        </Router>
    </div>
    , document.getElementById('root'));

