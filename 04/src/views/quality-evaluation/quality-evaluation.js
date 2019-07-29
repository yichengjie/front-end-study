import React,{Component} from 'react' ;
import EvaluationHeader from './header' ;
import EvaluationBody from './body' ;

class QualityEvaluation  extends Component{
    constructor(props){
        super(props) ;
        document.title = "值周生检查";
    }
    render() {
        return (
            <div>
                <EvaluationHeader/>
                <EvaluationBody />
            </div>
        );
    }
}

export default QualityEvaluation ;

