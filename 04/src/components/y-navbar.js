import React,{Component} from 'react' ;

class YNavbar  extends Component{
    render() {
        let title = this.props.title ;
        return (
            <div className="y-header">
               <span className="y-close">
                   <i className="glyphicon glyphicon-remove"></i>
               </span>
                <span className="y-title">{title}</span>
                <div className="y-more">
                    <i className="glyphicon glyphicon-option-horizontal"></i>
                </div>
            </div>
        );
    }
}

export default YNavbar ;

