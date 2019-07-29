import React,{Component} from 'react' ;
import { Link } from "react-router-dom";

class RoutineExaminationList extends Component{

    render() {
        return (
            <div className="y-sub-menu-container">
                <div className="y-title">德育常规检查</div>
                <div className="y-body">
                    <div className="y-item">
                        <Link to="/routine-examination-detail">早操</Link>
                    </div>
                    <div className="y-item"> 眼操</div>
                    <div className="y-item">课间操 </div>
                    <div className="y-item">晚操</div>
                    <div className="y-item">早餐纪律检查</div>
                    <div className="y-item">午餐纪律检查</div>
                    <div className="y-item">晚餐厅纪律检查</div>
                    <div className="y-item">大型会议次序</div>
                    <div className="y-item">上午安静课间</div>
                </div>
            </div>
        ) ;
    }


}

export  default RoutineExaminationList ;