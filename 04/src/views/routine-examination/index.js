import React,{Component} from 'react' ;
import { Link } from "react-router-dom";

class RoutineExaminationList extends Component{
    constructor(props){
        super(props) ;
        document.title = "常规检查";
    }

    render() {
        return (
            <div className="y-sub-menu-container">
                <div className="y-sub-title">德育常规检查</div>
                <div className="y-sub-body">
                    <div className="y-row">
                        <Link className="y-item" to="/routine-examination-detail">
                            早操
                        </Link>
                        <Link className="y-item" to="/routine-examination-detail">
                            眼操
                        </Link>

                    </div>
                    <div className="y-row">
                        <Link className="y-item" to="/routine-examination-detail">
                            早餐纪律检查
                        </Link>
                        <Link className="y-item" to="/routine-examination-detail">
                            午餐纪律检查
                        </Link>

                    </div>

                    <div className="y-row">
                        <Link className="y-item" to="/routine-examination-detail">
                            晚餐厅纪律检查
                        </Link>
                        <Link className="y-item" to="/routine-examination-detail">
                            晚一自习学习状态
                        </Link>
                    </div>
                    <div className="y-row">
                        <Link className="y-item" to="/routine-examination-detail">
                            大型会议次序
                        </Link>
                    </div>

                </div>
            </div>
        ) ;
    }


}

export  default RoutineExaminationList ;