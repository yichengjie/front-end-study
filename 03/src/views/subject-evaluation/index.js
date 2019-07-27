import React,{Component} from 'react' ;
import YNavbar from '../../components/y-navbar' ;
import EvaluationHeader from './header' ;
import EvaluationBody from './body' ;

class SubjectEvaluation  extends Component{
    render() {
        return (
            <div>
                <YNavbar title ="语文学科"/>
                <EvaluationHeader/>
                <EvaluationBody />
            </div>
        );
    }
}

export default SubjectEvaluation ;

