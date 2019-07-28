import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import EntryMenu from './views/entry-menu/index' ;
import QualityEvaluation from './views/quality-evaluation/index' ;
import RoutineExamination from './views/routine-examination/index' ;
import ElectronicClassCard from './views/electronic-class-card/index' ;
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css' ;


ReactDOM.render(
    <div className="App container-fluid">
        <Router>
            <Route exact path="/" component={EntryMenu} />
            <Route path="/quality-evaluation" component={QualityEvaluation} />
            <Route path="/routine-examination" component={RoutineExamination} />
            <Route path="/electronic-class-card" component={ElectronicClassCard} />
        </Router>
    </div>
    , document.getElementById('root'));

