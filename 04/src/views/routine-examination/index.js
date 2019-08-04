import React,{Component} from 'react' ;
import { Link } from "react-router-dom";


let options = [
    {
        classType:"1",
        title:"德育常规检查",
        children:[
            {
                title:'早操',
                itemType:"1"
            },{
                title:'眼操',
                itemType:"2"
            },{
                title:'早餐纪律检查',
                itemType:"3"
            },{
                title:'午餐纪律检查',
                itemType:"4"
            },{
                title:'晚餐厅纪律检查',
                itemType:"5"
            },{
                title:'晚一自习学习状态',
                itemType:"6"
            },{
                title:'大型会议次序',
                itemType:"7"
            },{
                title:'小型会议次序',
                itemType:"7"
            },
        ]
    },

] ;

class RoutineExaminationList extends Component{
    constructor(props){
        super(props) ;
        document.title = "常规检查";
    }

    renderItemType(classType,itemList){
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
                            pathname: "/routine-examination-detail",
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
                            pathname: "/routine-examination-detail",
                            state: {
                                classType:classType,
                                title: itemList[i].title,
                                itemType:itemList[i].itemType,
                            }
                        }}>
                            {itemList[i].title}
                        </Link>
                        <Link className="y-item" to={{
                            pathname: "/routine-examination-detail",
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

export  default RoutineExaminationList ;