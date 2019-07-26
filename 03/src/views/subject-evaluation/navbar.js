import React,{Component} from 'react' ;

class EvaluationNavbar  extends Component{
    render() {
        return (
            <div className="y-header">
                <div className="y-title">
                    <span className="y-close">
                        <i className="glyphicon glyphicon-remove"></i>
                    </span>
                    <span className="y-content">语文学科</span>
                </div>
                <div className="y-more">
                    <i className="glyphicon glyphicon-option-horizontal"></i>
                </div>
            </div>
        );
    }
}

export default EvaluationNavbar ;

