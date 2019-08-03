import React,{Component} from 'react' ;
import EvaluationHeader from './header' ;
import EvaluationBody from './body' ;

class QualityEvaluation  extends Component{
    constructor(props){
        super(props) ;
        let { title } = this.props.location.state ;
        document.title = title;
    }
    render() {
        let {classType,itemType,list} = this.props.location.state ;
        let confInfo = {classType,itemType,list} ;
        return (
            <div>
                <EvaluationHeader/>
                <EvaluationBody confInfo ={confInfo} />
            </div>
        );
    }
}

export default QualityEvaluation ;

