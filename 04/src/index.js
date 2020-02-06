import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
/*import EntryMenu  from './views/entry-menu/entry-menu' ;
import ElectronicClassCard from './views/electronic-class-card/electronic-class-card' ;
import QualityEvaluationList from './views/quality-evaluation/index' ;
import RoutineExaminationList from './views/routine-examination/index' ;
import QualityEvaluationDetail from './views/quality-evaluation/detail/quality-evaluation' ;
import RoutineExaminationDetail from './views/routine-examination/detail/routine-examination' ;*/
/////////////
import 'element-theme-default';
import './index.scss';
const  EntryMenu =  React.lazy(() => import('./views/entry-menu/entry-menu'));
const ElectronicClassCard = React.lazy(() => import('./views/electronic-class-card/electronic-class-card'));
const QualityEvaluationList = React.lazy(() => import('./views/quality-evaluation/index'));
const RoutineExaminationList = React.lazy(() => import('./views/routine-examination/index'));
const QualityEvaluationDetail = React.lazy(() => import('./views/quality-evaluation/detail/quality-evaluation'));
const RoutineExaminationDetail = React.lazy(() => import('./views/routine-examination/detail/routine-examination'));




ReactDOM.render(
    <div className="container-fluid">
        <Router>
            <Suspense fallback={<div>loading...</div>}>
                <Route exact path="/" component={EntryMenu} />
                <Route path="/electronic-class-card/:teacherNumber/:campusNumber" component={ElectronicClassCard} />
                {/*-----------*/}
                <Route path="/quality-evaluation-list/:teacherNumber/:campusNumber" component={QualityEvaluationList} />
                <Route path="/routine-examination-list/:teacherNumber/:campusNumber" component={RoutineExaminationList} />
                {/*-----------*/}
                <Route path="/quality-evaluation-detail/:teacherNumber/:campusNumber" component={QualityEvaluationDetail} />
                <Route path="/routine-examination-detail/:teacherNumber/:campusNumber" component={RoutineExaminationDetail} />
            </Suspense>
        </Router>
    </div>, document.getElementById('root'));

