import React,{Component} from 'react';
import { Link } from "react-router-dom";
import { Avatar } from 'antd';
import './index.scss' ;
//./configure --prefix=/Users/yicj/install/nginx-1.17.2
class Index extends Component{

    render() {
        return (
            <div className="y-entry-container">
                <div className="y-row">
                    <div className="y-item">
                        <Link to="/subject-evaluation">
                            <Avatar icon="user" size="large" />
                            <div className="y-description">素质评价</div>
                        </Link>

                    </div>
                    <div className="y-item">
                        <Link to="/weekly-duty-check">
                            <Avatar style={{ backgroundColor: '#87d068' }}
                                    icon="check-square" size="large"/>
                            <div className="y-description">常规检查</div>
                        </Link>

                    </div>
                    <div className="y-item">
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                                icon="slack-square" size="large"/>
                        <div className="y-description">电子班牌</div>
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

export default Index ;