import React,{Component} from 'react' ;
import EvaluationNavbar from './navbar' ;
import EvaluationHeader from './header' ;
import EvaluationBody from './body' ;
import './index.scss' ;

class SubjectEvaluation  extends Component{
    render() {
        return (
            <div>
                <EvaluationNavbar />
                <EvaluationHeader/>
                <EvaluationBody />
            </div>
        );
    }
}

export default SubjectEvaluation ;

