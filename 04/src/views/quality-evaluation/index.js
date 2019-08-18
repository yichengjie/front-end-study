import React,{Component} from 'react' ;
import { Link } from "react-router-dom";
import {ajaxWithoutParams} from "components/common/util";
import {message} from 'antd'

class QualityEvaluationList extends Component{
    constructor(props){
        super(props) ;
        document.title = "综合素质评价";
        this.state = {
            menuList:[],
            quotaList:[]
        } ;
    }
    componentDidMount() {
        //let {teacherNumber,campusNumber} = this.props.match.params;
        ///api/classAndStudent/getClassCheckEvaluation/130052/2
        let url = `/api/yiClassAndStudent/initQualityEvaluationMenuPage` ;
        let ajaxing = ajaxWithoutParams(url) ;
        ajaxing.then((data) =>{
            let {menuList,quotaList} = data ;
            this.setState({menuList,quotaList}) ;
            console.info(data) ;
        }).catch(function () {
            message.error('加载综合素质评价菜单出错!') ;
        }) ;
    }
    renderItemType(classType,itemList){
        let {teacherNumber,campusNumber} = this.props.match.params;
        let rows = [] ;
        let step = 3;
        let surplus = itemList.length %  step ;
        let count = Math.ceil(itemList.length / step) ;
        let time = 0 ;
        for(let i = 0 ; i < itemList.length ;i = i+step){
            time ++ ;
            let row = null ;
            if(time === count && surplus === 1){
                row =  this.renderRowItems(teacherNumber,campusNumber,classType,i ,itemList[i])
            }else if(time === count && surplus === 2){
                row =  this.renderRowItems(teacherNumber,campusNumber,classType,i,itemList[i],itemList[i+1])
            } else{
                row = this.renderRowItems(teacherNumber,campusNumber,classType,i,itemList[i],itemList[i+1],itemList[i+2])
            }
            rows.push(row) ;
        }
        return rows ;
    }

    renderRowItems(teacherNumber,campusNumber,classType,index,...arr){
        return (
            <div key={index}  className="y-row">
                {
                    arr.map((item,index) =>{
                        return (
                            <Link key={index} className="y-item" to={{
                                pathname: "/quality-evaluation-detail/" + teacherNumber +"/" +campusNumber,
                                state: {
                                    classType:classType,
                                    title: item.title,
                                    itemType:item.itemType,
                                    evaluationFields:item.evaluationFields || []
                                }
                            }}>
                                {item.title}
                            </Link>
                        ) ;
                    })
                }
            </div>
        ) ;
    }

    renderClassType(){
        let menuList = this.state.menuList ;
        return menuList.map((item,index) =>{
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

export  default QualityEvaluationList ;