import React,{Component} from 'react';
import { Link } from "react-router-dom";

class Index extends Component{

    render() {
        return (
            <div className="y-index-container">
                <div className="y-title">
                    智慧校园
                </div>
                <div className="y-content">

                </div>

                <ul>
                    <li>
                        <Link to="/">主页</Link>
                    </li>
                    <li>
                        <Link to="/subject-evaluation">科目评价</Link>
                    </li>
                    <li>
                        <Link to="/weekly-duty-check">值周生检查</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Index ;