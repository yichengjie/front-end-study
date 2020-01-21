import React,{Component} from 'react';
import { Link } from "react-router-dom";
import './index.scss' ;
import 'antd/es/avatar/style/css' ;
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
                            <span className="ant-avatar ant-avatar-lg ant-avatar-circle ant-avatar-icon">
                                <i aria-label="icon: user" className="anticon anticon-user">
                                    <svg viewBox="64 64 896 896" focusable="false"  data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                        <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z">
                                        </path>
                                    </svg>
                                </i>
                            </span>
                            <div className="y-description">综合素质评价</div>
                        </Link>

                    </div>
                    <div className="y-item">
                        <Link to={"/routine-examination-list/" +teacherNumber +"/"+campusNumber}>
                            <span className="ant-avatar ant-avatar-lg ant-avatar-circle ant-avatar-icon" style={{ backgroundColor: '#87d068' }}>
                                <i aria-label="icon: user" className="anticon anticon-user">
                                   <svg viewBox="64 64 896 896" focusable="false" data-icon="check-square" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                        <path d="M433.1 657.7a31.8 31.8 0 0 0 51.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
                                   </svg>
                                </i>
                            </span>
                            <div className="y-description">常规检查</div>
                        </Link>
                    </div>
                    <div className="y-item">
                        <Link to={"/electronic-class-card/" +teacherNumber +"/"+campusNumber}>
                            <span className="ant-avatar ant-avatar-lg ant-avatar-circle ant-avatar-icon"
                                  style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                <i aria-label="icon: user" className="anticon anticon-user">
                                   <svg viewBox="64 64 896 896" focusable="false"  data-icon="check-square" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                       <path d="M433.1 657.7a31.8 31.8 0 0 0 51.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
                                   </svg>
                                </i>
                            </span>
                            <div className="y-description">电子班牌</div>
                        </Link>
                    </div>
                </div>

            </div>
        );
    }
}

export default EntryMenu ;
