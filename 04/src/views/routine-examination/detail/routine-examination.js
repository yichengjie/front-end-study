import React,{Component} from 'react' ;
import ExaminationHeader from './header' ;
import ExaminationBody from './body' ;

class RoutineExamination extends Component{
    constructor(props){
        super(props) ;
        document.title = "德育常规检查";
    }
    render() {
        return (
            <div>
                <ExaminationHeader />
                <ExaminationBody />
            </div>
        ) ;
    }
}

export default RoutineExamination ;