import React,{Component} from 'react' ;
import EvaluationHeader from './header' ;
import EvaluationBody from './body' ;
import moment from "moment";
import {message} from "antd";
import {ajaxWithComplexParams} from "components/common/util";
const dateFormat = 'YYYY/MM/DD';


class QualityEvaluation  extends Component{
    constructor(props){
        super(props) ;
        let { title,classList1 } = this.props.location.state ;
        let evaluationGradeAndClass = '' ;
        if(classList1.length > 0){
            evaluationGradeAndClass = classList1[0].gradeId + ',' + classList1[0].classId   ;
        }
        this.state = {
            evaluationDate:moment().format(dateFormat),
            evaluationClassType:'1', //班级类型：1:行政班级,2:教学班级
            evaluationGradeAndClass: evaluationGradeAndClass,
            studentList:[],
            bodyLoading:false
        } ;
        document.title = title;
        this.handleBodyChangeFieldCheckStatus = this.handleBodyChangeFieldCheckStatus.bind(this) ;
        this.handleBodySubmitFormData = this.handleBodySubmitFormData.bind(this) ;
        this.handleBodyUpdateList = this.handleBodyUpdateList.bind(this) ;
        this.handleHeaderChangeInput= this.handleHeaderChangeInput.bind(this) ;
        this.handleHeaderChangeClassType = this.handleHeaderChangeClassType.bind(this) ;
        this.queryStudentList = this.queryStudentList.bind(this) ;
    }

    componentDidMount() {
        //组件加载完成以后加载一次数据
        this.queryStudentList() ;
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
        this.setState({[name]:value},()=>{
            this.queryStudentList()  ;
        });
    }

    handleHeaderChangeClassType(value,value2){
        this.setState({evaluationClassType:value,evaluationGradeAndClass:value2},()=>{
            this.queryStudentList()  ;
        }) ;
    }
    //根据添加查询学生信息
    queryStudentList(){
        //评论项id
        let { itemType } = this.props.location.state ;
        //教师id，校区id
        let { campusNumber } = this.props.match.params;
        //班级类型 + 评价日期
        let {evaluationClassType,evaluationDate} = this.state ;
        //年级 + 班级
        let evaluationGradeAndClass = this.state.evaluationGradeAndClass ;
        if(evaluationGradeAndClass !== undefined && evaluationGradeAndClass.length > 0){
            let infos = evaluationGradeAndClass.split(',') ;
            let gradeId =infos[0] ;
            let classId =infos[1] ;
            let params =  {itemId:itemType,
                           campus:campusNumber,
                           gradeId:gradeId,
                           classId:classId,
                           classType:evaluationClassType,
                           submitDate:evaluationDate} ;
            let url = '/api/yiClassAndStudent/getStudentByClassIdAndGradeId' ;
            let ajaxing = ajaxWithComplexParams(url,params) ;
            ajaxing.then( (data) => {
                this.setState({studentList:data}) ;
            }).catch(function (error) {
                message.error('查询学生信息出错!',error) ;
            }) ;
        }
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
                    evaluationGradeAndClass= {this.state.evaluationGradeAndClass}
                    evaluationClassType = {this.state.evaluationClassType}
                    handleHeaderChangeInput = {this.handleHeaderChangeInput}
                    handleHeaderChangeClassType = {this.handleHeaderChangeClassType}
                />
                <EvaluationBody
                    confInfo ={confInfo}
                    studentList={this.state.studentList}
                    bodyLoading ={this.state.bodyLoading}
                    handleBodyChangeFieldCheckStatus = {this.handleBodyChangeFieldCheckStatus}
                    handleBodySubmitFormData = {this.handleBodySubmitFormData}
                    handleBodyUpdateList = {this.handleBodyUpdateList}
                />
            </div>
        );
    }
}

export default QualityEvaluation ;

