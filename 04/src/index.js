import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import EntryMenu from './views/entry-menu/entry-menu' ;

import ElectronicClassCard from './views/electronic-class-card/electronic-class-card' ;
import QualityEvaluationList from './views/quality-evaluation/index' ;
import RoutineExaminationList from './views/routine-examination/index' ;
//////////////
import QualityEvaluationDetail from './views/quality-evaluation/detail/quality-evaluation' ;
import RoutineExaminationDetail from './views/routine-examination/detail/routine-examination' ;
/////////////
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css' ;


ReactDOM.render(
    <div className="container-fluid">
        <Router>
            <Route exact path="/" component={EntryMenu} />
            <Route path="/electronic-class-card" component={ElectronicClassCard} />
            {/*-----------*/}
            <Route path="/quality-evaluation-list" component={QualityEvaluationList} />
            <Route path="/routine-examination-list" component={RoutineExaminationList} />
            {/*-----------*/}
            <Route path="/quality-evaluation-detail" component={QualityEvaluationDetail} />
            <Route path="/routine-examination-detail" component={RoutineExaminationDetail} />

        </Router>
    </div>
    , document.getElementById('root'));

