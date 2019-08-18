import React,{Component} from 'react' ;
import EvaluationHeader from './header' ;
import EvaluationBody from './body' ;
import moment from "moment";
const dateFormat = 'YYYY/MM/DD';

class QualityEvaluation  extends Component{
    constructor(props){
        super(props) ;
        let { title,classList1 ,classList2} = this.props.location.state ;
        let classDefaultValue = '' ;
        if(classList1.length > 0){
            classDefaultValue =classList1[0].classId +''  ;
        }
        this.state = {
            evaluationDate:moment().format(dateFormat),
            evaluationClassType:'1', //班级类型：1:行政班级,2:教学班级
            evaluationClass:classDefaultValue,
            studentList:[],
        } ;
        document.title = title;
        this.handleBodyChangeFieldCheckStatus = this.handleBodyChangeFieldCheckStatus.bind(this) ;
        this.handleBodySubmitFormData = this.handleBodySubmitFormData.bind(this) ;
        this.handleBodyUpdateList = this.handleBodyUpdateList.bind(this) ;
        this.handleHeaderChangeInput= this.handleHeaderChangeInput.bind(this) ;
        this.handleHeaderChangeClassType = this.handleHeaderChangeClassType.bind(this) ;
    }
    //更新list数据
    handleBodyUpdateList(studentList){
        this.setState({studentList}) ;
    }
    //点击每一项checkbox的时候更新checkbox的状态
    handleBodyChangeFieldCheckStatus(rowIndex,checkedStatus,value){
        let newList = [...this.state.studentList] ;
        let obj = newList[rowIndex] ;
        let newscoreArr =  [...obj.scoreArr] ;
        if(checkedStatus){//选中，则新增
            newscoreArr.push(value) ;
        }else{
            newscoreArr =  newscoreArr.filter(item => item !==value) ;
        }
        obj.scoreArr = newscoreArr ;
        this.setState({studentList:newList}) ;
    }
    handleBodySubmitFormData(e) {
        let { classType,itemType } = this.props.location.state ;
        console.info("classType: " + classType) ;
        console.info("itemType: " + itemType) ;
        console.info("evaluationDate: " + this.state.evaluationDate) ;
        console.info("evaluationClass: " + this.state.evaluationClass) ;
        this.state.studentList.forEach(item => console.info(item.scoreArr)) ;
    }

    handleHeaderChangeInput(name,value){
        this.setState({[name]:value});
    }

    handleHeaderChangeClassType(value,value2){
        this.setState({evaluationClassType:value,evaluationClass:value2}) ;
    }

    render() {
        let {classType,itemType,quotaOptions ,classList1 ,classList2} = this.props.location.state ;
        let confInfo = {classType,itemType,quotaOptions} ;
        return (
            <div>
                <EvaluationHeader
                    classList1 = {classList1}
                    classList2 = {classList2}
                    evaluationDate = {this.state.evaluationDate}
                    evaluationClass= {this.state.evaluationClass}
                    evaluationClassType = {this.state.evaluationClassType}
                    handleHeaderChangeInput = {this.handleHeaderChangeInput}
                    handleHeaderChangeClassType = {this.handleHeaderChangeClassType}
                />
                <EvaluationBody
                    confInfo ={confInfo}
                    studentList={this.state.studentList}
                    handleBodyChangeFieldCheckStatus = {this.handleBodyChangeFieldCheckStatus}
                    handleBodySubmitFormData = {this.handleBodySubmitFormData}
                    handleBodyUpdateList = {this.handleBodyUpdateList}
                />
            </div>
        );
    }
}

export default QualityEvaluation ;

