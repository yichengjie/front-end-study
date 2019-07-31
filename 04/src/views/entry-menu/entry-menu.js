import React,{Component} from 'react';
import { Link } from "react-router-dom";
import { Avatar } from 'antd';
import './index.scss' ;
class EntryMenu extends Component{

    render() {
        return (
            <div className="y-entry-container">
                <div className="y-row">
                    <div className="y-item">
                        <Link to="/quality-evaluation-list">
                            <Avatar icon="user" size="large" />
                            <div className="y-description">素质评价</div>
                        </Link>

                    </div>
                    <div className="y-item">
                        <Link to="/routine-examination-list">
                            <Avatar style={{ backgroundColor: '#87d068' }}
                                    icon="check-square" size="large"/>
                            <div className="y-description">常规检查</div>
                        </Link>
                    </div>
                    <div className="y-item">
                        <Link to="/electronic-class-card">
                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                                    icon="slack-square" size="large"/>
                            <div className="y-description">电子班牌</div>
                        </Link>
                    </div>
                    <div className="y-item">
                        <Avatar style={{ backgroundColor: '#87d068' }}
                                icon="codepen" size="large"/>
                        <div className="y-description">其他检查</div>
                    </div>
                </div>

            </div>
        );
    }
}

export default EntryMenu ;