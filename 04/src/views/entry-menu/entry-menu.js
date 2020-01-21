import React,{Component} from 'react';
import { Link } from "react-router-dom";
import {Icon} from 'element-react' ;
import './index.scss' ;
//import 'antd/es/avatar/style/css' ;

class EntryMenu extends Component{
    constructor(props){
        super(props) ;
        this.state ={
            //teacherNumber:'130052',
            teacherNumber:'130192',
            campusNumber:'2'
        } ;
    }

    render() {
        let {teacherNumber,campusNumber} = this.state ;
        return (
            <div className="y-entry-container">
                <div className="y-row">
                    <div className="y-item" style={{width: "88px"}}>
                        <Link to={"/quality-evaluation-list/" +teacherNumber +"/"+campusNumber }>
                            <Icon name="menu" />
                            <div className="y-description">综合素质评价</div>
                        </Link>

                    </div>
                    <div className="y-item">
                        <Link to={"/routine-examination-list/" +teacherNumber +"/"+campusNumber}>
                            <Icon name="star-off" />
                            <div className="y-description">常规检查</div>
                        </Link>
                    </div>
                    <div className="y-item">
                        <Link to={"/electronic-class-card/" +teacherNumber +"/"+campusNumber}>
                            <Icon name="picture" />
                            <div className="y-description">电子班牌</div>
                        </Link>
                    </div>
                </div>

            </div>
        );
    }
}

export default EntryMenu ;
