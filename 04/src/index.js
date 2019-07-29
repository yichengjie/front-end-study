import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import EntryMenu from './views/entry-menu/entry-menu' ;
import QualityEvaluation from './views/quality-evaluation/detail/quality-evaluation' ;
import RoutineExaminationDetail from './views/routine-examination/detail/routine-examination' ;
import ElectronicClassCard from './views/electronic-class-card/electronic-class-card' ;
import RoutineExaminationList from './views/routine-examination/index' ;
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css' ;


ReactDOM.render(
    <div className="container-fluid">
        <Router>
            <Route exact path="/" component={EntryMenu} />
            <Route path="/quality-evaluation" component={QualityEvaluation} />
            <Route path="/routine-examination" component={RoutineExaminationList} />
            <Route path="/electronic-class-card" component={ElectronicClassCard} />
            <Route path="/routine-examination-detail" component={RoutineExaminationDetail} />
        </Router>
    </div>
    , document.getElementById('root'));

