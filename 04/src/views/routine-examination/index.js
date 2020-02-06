import React,{Component} from 'react' ;
import { Link } from "react-router-dom";
import {ajaxWithoutParams} from "components/common/util";
//import {message, Spin} from 'antd' ;
import { Message ,Loading } from 'element-react';

class RoutineExaminationList extends Component{
    constructor(props){
        super(props) ;
        document.title = "常规检查";
        this.state ={
            classTypeList:[],
            quotaMap:{},
            loading:false
        };
    }
    componentDidMount() {
        //let {teacherNumber,campusNumber} = this.props.match.params;
        ///api/classAndStudent/getClassCheck/130052/2
        let url = `/api/yiClassAndStudent/initRoutineExaminationMenuPage` ;
        let ajaxing = ajaxWithoutParams(url) ;
        this.setState({loading:true}) ;
        ajaxing.then((data) => {
            let {menuList,quotaMap} = data ;
            this.setState({classTypeList:menuList,quotaMap:quotaMap,loading:false}) ;
        }).catch(function (err) {
            Message({
                message: '获取常规检查菜单出错!',
                type: 'error'
            });
        }) ;
    }

    renderItemType(classType,itemList){
        let {teacherNumber,campusNumber} = this.props.match.params;
        let quotaMap = this.state.quotaMap ;
        let rows = [] ;
        let step = 2;
        let surplus = itemList.length %  step ;
        let count = Math.ceil(itemList.length / step) ;
        let time = 0 ;
        for(let i = 0 ; i < itemList.length ;i = i+step){
            time ++ ;
            if(surplus > 0 && time === count){
                let itemType = itemList[i].itemType ;
                let quotaList = quotaMap[itemType] || [] ;
                rows.push(
                    <div key={i} className="y-row">
                        <Link className="y-item" to={{
                            pathname: "/routine-examination-detail/" + teacherNumber +"/" +campusNumber,
                            state: {
                                classType:classType,
                                title: itemList[i].title,
                                itemType:itemType,
                                quotaOptions : quotaList
                            }
                        }}>
                            {itemList[i].title}
                        </Link>
                    </div>
                ) ;
            }else{

                let itemType1 = itemList[i].itemType ;
                let itemType2 = itemList[i+1].itemType ;
                let quotaList1 = quotaMap[itemType1] || [] ;
                let quotaList2 = quotaMap[itemType2] || [] ;

                rows.push(
                    <div key={i} className="y-row">
                        <Link className="y-item" to={{
                            pathname: "/routine-examination-detail/" + teacherNumber +"/" +campusNumber ,
                            state: {
                                classType:classType,
                                title: itemList[i].title,
                                itemType:itemType1,
                                quotaOptions : quotaList1
                            }
                        }}>
                            {itemList[i].title}
                        </Link>
                        <Link className="y-item" to={{
                            pathname: "/routine-examination-detail/" + teacherNumber +"/" +campusNumber,
                            state: {
                                classType:classType,
                                title: itemList[i+1].title,
                                itemType:itemType2,
                                quotaOptions : quotaList2
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
                       <Loading text="拼命加载中" loading={this.state.loading}>
                           {this.renderItemType(item.classType,item.children)}
                       </Loading>
                   </div>
               </div>
           ) ;
        }) ;

    }

    render() {
        return (
            <div className="y-sub-menu-container">
                    { this.renderClassType()}
            </div>
        ) ;
    }


}

export  default RoutineExaminationList ;
