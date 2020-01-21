import React,{Component} from 'react' ;
import { Link } from "react-router-dom";
import {ajaxWithoutParams} from "components/common/util";
//import {message,Spin} from 'antd'
import { Message ,Loading } from 'element-react';
import _ from 'lodash' ;

class QualityEvaluationList extends Component{
    constructor(props){
        super(props) ;
        document.title = "综合素质评价";
        this.state = {
            menuList:[],
            quotaList:[],
            classList1:[],
            classList2:[],
            loading:false
        } ;
    }
    componentDidMount() {
        let {teacherNumber,campusNumber} = this.props.match.params;
        ///api/classAndStudent/getClassCheckEvaluation/130052/2
        let url = `/api/yiClassAndStudent/initQualityEvaluationMenuPage/${teacherNumber}/${campusNumber}` ;
        this.setState({loading:true}) ;
        let ajaxing = ajaxWithoutParams(url) ;
        ajaxing.then((data) =>{
            let {menuList,quotaList,classList1,classList2} = data ;
            this.setState({menuList,quotaList,classList1,classList2,loading: false}) ;
        }).catch( (error) => {
            this.setState({loading:false}) ;
            Message({
                message: '加载综合素质评价菜单出错!',
                type: 'error'
            });
        }) ;
    }
    renderItemType(classType,itemList){
        let rows = [] ;
        let step = 3;
        let surplus = itemList.length %  step ;
        let count = Math.ceil(itemList.length / step) ;
        let time = 0 ;
        for(let i = 0 ; i < itemList.length ;i = i+step){
            time ++ ;
            let row = null ;
            if(time === count && surplus === 1){
                row =  this.renderRowItems(classType,i ,itemList[i])
            }else if(time === count && surplus === 2){
                row =  this.renderRowItems(classType,i,itemList[i],itemList[i+1])
            } else{
                row = this.renderRowItems(classType,i,itemList[i],itemList[i+1],itemList[i+2])
            }
            rows.push(row) ;
        }
        return rows ;
    }

    getCurQuotaList(quotaOptionsStr,allQuotaList){
        let retInfos = [] ;
        let infos = quotaOptionsStr.split(',') ;
        for(let i = 0 ; i < infos.length ; i ++){
            let info = infos[i] ;
            let ttt =  _.find(allQuotaList, function(o) { return (o.id+'')  === info; });
            if(ttt !== undefined){
                retInfos.push({id:ttt.id +'',title:ttt.title}) ;
            }
        }
        return retInfos ;
    }

    renderRowItems(classType,index,...arr){
        let {teacherNumber,campusNumber} = this.props.match.params;
        let {classList1,classList2} = this.state ;
        let items = arr.map((item,innerIndex) =>{
            let quotaOptionsStr = item.quotaOptions ;
            let quotaOptions =  this.getCurQuotaList(quotaOptionsStr,this.state.quotaList) ;
            return (
                <Link key={innerIndex} className="y-item" to={{
                    pathname: "/quality-evaluation-detail/" + teacherNumber +"/" +campusNumber,
                    state: {
                        classType:classType,
                        title: item.title,
                        itemType:item.itemType,
                        quotaOptions:quotaOptions,
                        classList1: classList1 || [],
                        classList2:classList2 || []
                    }
                }}>
                    {item.title}
                </Link>
            ) ;
        }) ;
        return (
            <div key={index}  className="y-row">
                {items}
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
                {this.renderClassType()}
            </div>
        ) ;
    }

}

export  default QualityEvaluationList ;
