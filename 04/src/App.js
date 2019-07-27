import React from 'react';
import 'bootstrap/dist/css/bootstrap.css' ;
import './App.scss' ;
import SubjectEvaluation from './views/subject-evaluation/index' ;
import WeeklyDutyCheck from './views/weekly-duty-check/index' ;

let MyView = SubjectEvaluation ;
function App() {
  return (
      <div className="App container-fluid">
        <MyView />
      </div>
  );
}

export default App;
