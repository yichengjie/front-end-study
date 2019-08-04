import React,{Component} from 'react' ;
import { Link } from "react-router-dom";


let options = [
    {
        classType:"1",
        title:"德育评价",
        children:[
            {
                title:'值周班检查',
                itemType:"1",
                evaluationFields:["走操","违纪","缺勤"]
            },{
                title:'班主任检查',
                itemType:"2",
                evaluationFields:["就寝违纪","课堂违纪","校服发型","文明课间"]
            },
        ]
    },{
        classType:"2",
        title:"学科评价",
        children:[
            {
                title:'语文学科',
                itemType:"1",
                evaluationFields:["加分","违纪","作业","缺勤"]
            },{
                title:'数学学科',
                itemType:"2",
                evaluationFields:["加分","违纪","作业","缺勤"]
            }, {
                title:'英语学科',
                itemType:"3",
                evaluationFields:["加分","违纪","作业","缺勤"]
            }, {
                title:'物理学科',
                itemType:"4",
                evaluationFields:["加分","违纪","作业","缺勤"]
            },{
                title:'化学学科',
                itemType:"5",
                evaluationFields:["加分","违纪","作业","缺勤"]
            },{
                title:'地理学科',
                itemType:"5",
                evaluationFields:["加分","违纪","作业","缺勤"]
            },
        ]
    },

] ;

class QualityEvaluationList extends Component{
    constructor(props){
        super(props) ;
        document.title = "综合素质评价";
    }
    renderItemType(classType,itemList){
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
                                pathname: "/quality-evaluation-detail",
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
                            pathname: "/quality-evaluation-detail",
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
                            pathname: "/quality-evaluation-detail",
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
                            pathname: "/quality-evaluation-detail",
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
                            pathname: "/quality-evaluation-detail",
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
                            pathname: "/quality-evaluation-detail",
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
        let classTypeList = options ;
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