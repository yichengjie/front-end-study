import React,{Component} from 'react' ;
import YNavbar from '../../components/y-navbar' ;
import WeeklyDutyCheckHeader from './header' ;
import WeeklyDutyCheckBody from './body' ;

class WeeklyDutyCheck extends Component{

    render() {
        return (
            <div>
                <YNavbar title ="值周生检查"/>
                <WeeklyDutyCheckHeader />
                <WeeklyDutyCheckBody />
            </div>
        ) ;
    }
}

export default WeeklyDutyCheck ;