import React,{Component} from 'react' ;
import { Link } from "react-router-dom";
import httpUtil from "components/common/HttpClientUtil";
import $ from 'jquery' ;


class RoutineExaminationList extends Component{
    constructor(props){
        super(props) ;
        document.title = "常规检查";
        this.state ={
            classTypeList:[]
        };
    }

    componentDidMount() {
        let {teacherNumber,campusNumber} = this.props.match.params;
        ///api/classAndStudent/getClassCheck/130052/2
        let url = `/api/classAndStudent/getClassCheck/${teacherNumber}/${campusNumber}` ;
        let ajaxing = httpUtil.dealAjaxRequestWithoutParam(url) ;
        $.when(ajaxing).then((data) => {
            this.setState({classTypeList:data})
        }) ;
    }

    renderItemType(classType,itemList){
        let {teacherNumber,campusNumber} = this.props.match.params;
        let rows = [] ;
        let step = 2;
        let surplus = itemList.length %  step ;
        let count = Math.ceil(itemList.length / step) ;
        let time = 0 ;
        for(let i = 0 ; i < itemList.length ;i = i+step){
            time ++ ;
            if(surplus > 0 && time === count){
                rows.push(
                    <div key={i} className="y-row">
                        <Link className="y-item" to={{
                            pathname: "/routine-examination-detail/" + teacherNumber +"/" +campusNumber,
                            state: {
                                classType:classType,
                                title: itemList[i].title,
                                itemType:itemList[i].itemType,
                            }
                        }}>
                            {itemList[i].title}
                        </Link>
                    </div>
                ) ;
            }else{
                rows.push(
                    <div key={i} className="y-row">
                        <Link className="y-item" to={{
                            pathname: "/routine-examination-detail/" + teacherNumber +"/" +campusNumber ,
                            state: {
                                classType:classType,
                                title: itemList[i].title,
                                itemType:itemList[i].itemType,
                            }
                        }}>
                            {itemList[i].title}
                        </Link>
                        <Link className="y-item" to={{
                            pathname: "/routine-examination-detail/" + teacherNumber +"/" +campusNumber,
                            state: {
                                classType:classType,
                                title: itemList[i+1].title,
                                itemType:itemList[i+1].itemType,
                            }
                        }}>
                            {itemList[i+1].title}
                        </Link>
                    </div>
                ) ;
            }
        }
        return rows ;
    }

    renderClassType(){
        let classTypeList = this.state.classTypeList ;
        return classTypeList.map((item,index) =>{
           return (
               <div key={index} className="y-class-type-container">
                   <div className="y-sub-title">{item.title}</div>
                   <div className="y-sub-body">
                       {this.renderItemType(item.classType,item.children)}
                   </div>
               </div>
           ) ;
        }) ;

    }

    render() {
        return (
            <div className="y-sub-menu-container">
                {this.renderClassType()}
            </div>
        ) ;
    }


}

export  default RoutineExaminationList ;