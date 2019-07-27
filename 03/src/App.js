import React from 'react';
import 'bootstrap/dist/css/bootstrap.css' ;
import 'element-theme-default';
import './App.scss' ;
import SubjectEvaluation from './views/subject-evaluation/index' ;
import WeeklyDutyCheck from './views/weekly-duty-check/index' ;

let MyView = WeeklyDutyCheck ;
function App() {
  return (
      <div className="App container-fluid">
        <MyView />
      </div>
  );
}

export default App;
