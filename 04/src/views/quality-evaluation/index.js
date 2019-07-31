import React,{Component} from 'react' ;
import { Link } from "react-router-dom";

class QualityEvaluationList extends Component{
    constructor(props){
        super(props) ;
        document.title = "综合素质评价";
    }

    render() {
        return (
            <div>
                <div className="y-sub-menu-container">
                    <div className="y-sub-title">德育评价</div>
                    <div className="y-sub-body">
                        <div className="y-row">
                            <Link className="y-item" to="/quality-evaluation-detail">
                                值周班检查
                            </Link>
                            <Link className="y-item" to="/quality-evaluation-detail">
                                班主任检查
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="y-sub-menu-container">
                    <div className="y-sub-title">学科评价</div>
                    <div className="y-sub-body">
                        <div className="y-row">
                            <Link className="y-item" to="/quality-evaluation-detail">
                                语文学科
                            </Link>
                            <Link className="y-item" to="/quality-evaluation-detail">
                                数学学科
                            </Link>
                            <div className="y-item">
                                英语学科
                            </div>
                        </div>
                        <div className="y-row">
                            <Link className="y-item" to="/quality-evaluation-detail">
                                物理学科
                            </Link>
                            <Link className="y-item" to="/quality-evaluation-detail">
                                化学学科
                            </Link>
                            <div className="y-item">
                                生命学科
                            </div>
                        </div>
                        <div className="y-row">
                            <Link className="y-item" to="/quality-evaluation-detail">
                                思品学科
                            </Link>
                            <Link className="y-item" to="/quality-evaluation-detail">
                                地理学科
                            </Link>
                            <div className="y-item">
                                历史学科
                            </div>
                        </div>
                        <div className="y-row">
                            <Link className="y-item" to="/quality-evaluation-detail">
                                劳动学科
                            </Link>
                            <Link className="y-item" to="/quality-evaluation-detail">
                                美术学科
                            </Link>
                            <div className="y-item">
                                信息学科
                            </div>
                        </div>
                        <div className="y-row">
                            <Link className="y-item" to="/quality-evaluation-detail">
                                心理学科
                            </Link>
                            <Link className="y-item" to="/quality-evaluation-detail">
                                音乐学科
                            </Link>
                            <div className="y-item">
                                体育学科
                            </div>
                        </div>
                        <div className="y-row">
                            <Link className="y-item" to="/quality-evaluation-detail">
                                科学学科
                            </Link>
                            <Link className="y-item" to="/quality-evaluation-detail">
                                社会学科
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        ) ;
    }

}

export  default QualityEvaluationList ;