import React,{Component} from 'react' ;
import ExaminationHeader from './header' ;
import ExaminationBody from './body' ;

class RoutineExamination extends Component{
    constructor(props){
        super(props) ;
        let {title,classType,itemType} = this.props.match.params ;
        document.title = title;
        console.info('classType : '+ classType) ;
        console.info('itemType : '+ itemType) ;
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