import React,{Component} from 'react' ;
import YNavbar from '../../components/y-navbar' ;
import EvaluationHeader from './header' ;
import EvaluationBody from './body' ;

class SubjectEvaluation  extends Component{

    componentDidMount() {
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

export default SubjectEvaluation ;

