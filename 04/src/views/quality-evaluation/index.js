import React,{Component} from 'react' ;
import { Link } from "react-router-dom";
import {ajaxWithoutParams} from "components/common/util";
import {message} from 'antd'

class QualityEvaluationList extends Component{
    constructor(props){
        super(props) ;
        document.title = "综合素质评价";
        this.state = {
            classTypeList:[]
        } ;
    }
    componentDidMount() {
        let {teacherNumber,campusNumber} = this.props.match.params;
        ///api/classAndStudent/getClassCheckEvaluation/130052/2
        let url = `/api/classAndStudent/getClassCheckEvaluation/${teacherNumber}/${campusNumber}` ;
        ajaxWithoutParams(url)
        .then((data) =>{
            this.setState({classTypeList:data}) ;
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
            if(time === count && surplus === 1){
                rows.push(
                    <div key={i} className="y-row">
                        <Link className="y-item" to={{
                                pathname: "/quality-evaluation-detail/" + teacherNumber +"/" +campusNumber ,
                                state: {
                                    classType:classType,
                                    title: itemList[i].title,
                                    itemType:itemList[i].itemType,
                                    evaluationFields:itemList[i].evaluationFields
                                }
                            }}>
                            {itemList[i].title}
                        </Link>
                    </div>
                ) ;
            }else if(time === count && surplus === 2){
                rows.push(
                    <div key={i} className="y-row">
                        <Link className="y-item" to={{
                            pathname: "/quality-evaluation-detail/" + teacherNumber +"/" +campusNumber,
                            state: {
                                classType:classType,
                                title: itemList[i].title,
                                itemType:itemList[i].itemType,
                                evaluationFields:itemList[i].evaluationFields
                            }
                        }}>
                            {itemList[i].title}
                        </Link>
                        <Link className="y-item" to={{
                            pathname: "/quality-evaluation-detail/" + teacherNumber +"/" +campusNumber,
                            state: {
                                classType:classType,
                                title: itemList[i+1].title,
                                itemType:itemList[i+1].itemType,
                                evaluationFields:itemList[i+1].evaluationFields
                            }
                        }}>
                            {itemList[i+1].title}
                        </Link>
                    </div>
                ) ;
            } else{
                rows.push(
                    <div key={i} className="y-row">
                        <Link className="y-item" to={{
                            pathname: "/quality-evaluation-detail/" + teacherNumber +"/" +campusNumber,
                            state: {
                                classType:classType,
                                title: itemList[i].title,
                                itemType:itemList[i].itemType,
                                evaluationFields:itemList[i].evaluationFields
                            }
                        }}>
                            {itemList[i].title}
                        </Link>
                        <Link className="y-item" to={{
                            pathname: "/quality-evaluation-detail/" + teacherNumber +"/" +campusNumber,
                            state: {
                                classType:classType,
                                title: itemList[i+1].title,
                                itemType:itemList[i+1].itemType,
                                evaluationFields:itemList[i+1].evaluationFields
                            }
                        }}>
                            {itemList[i+1].title}
                        </Link>
                        <Link className="y-item" to={{
                            pathname: "/quality-evaluation-detail/" + teacherNumber +"/" +campusNumber,
                            state: {
                                classType:classType,
                                title: itemList[i+2].title,
                                itemType:itemList[i+2].itemType,
                                evaluationFields:itemList[i+2].evaluationFields
                            }
                        }}>
                            {itemList[i+2].title}
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

export  default QualityEvaluationList ;