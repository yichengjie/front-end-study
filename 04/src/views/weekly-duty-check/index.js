import React,{Component} from 'react' ;
import WeeklyDutyCheckHeader from './header' ;
import WeeklyDutyCheckBody from './body' ;

class WeeklyDutyCheck extends Component{
    componentDidMount() {
        document.title = "语文学科";
    }

    render() {
        return (
            <div>
                <WeeklyDutyCheckHeader />
                <WeeklyDutyCheckBody />
            </div>
        ) ;
    }
}

export default WeeklyDutyCheck ;