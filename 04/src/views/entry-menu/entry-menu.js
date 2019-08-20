import React,{Component} from 'react';
import { Link } from "react-router-dom";
import { Avatar } from 'antd';
import './index.scss' ;

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
                    <div className="y-item" style={{width: "85px"}}>
                        <Link to={"/quality-evaluation-list/" +teacherNumber +"/"+campusNumber }>
                            <Avatar icon="user" size="large" />
                            <div className="y-description">综合素质评价</div>
                        </Link>

                    </div>
                    <div className="y-item">
                        <Link to={"/routine-examination-list/" +teacherNumber +"/"+campusNumber}>
                            <Avatar style={{ backgroundColor: '#87d068' }}
                                    icon="check-square" size="large"/>
                            <div className="y-description">常规检查</div>
                        </Link>
                    </div>
                    <div className="y-item">
                        <Link to={"/electronic-class-card/" +teacherNumber +"/"+campusNumber}>
                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                                    icon="slack-square" size="large"/>
                            <div className="y-description">电子班牌</div>
                        </Link>
                    </div>
                </div>

            </div>
        );
    }
}

export default EntryMenu ;