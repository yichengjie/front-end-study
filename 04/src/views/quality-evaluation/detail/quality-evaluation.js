import React,{Component} from 'react' ;
import EvaluationHeader from './header' ;
import EvaluationBody from './body' ;


class QualityEvaluation  extends Component{
    constructor(props){
        super(props) ;
        this.state = {
            evaluationDate:'2019/07/30',
            evaluationClass:'2',
            studentList:[],
        } ;
        let { title } = this.props.location.state ;
        let {teacherNumber,campusNumber} = this.props.match.params;
        document.title = title;

        console.info('teacherNumber: ' ,teacherNumber) ;
        console.info('campusNumber: ' ,campusNumber) ;

        this.handleBodyChangeFieldCheckStatus = this.handleBodyChangeFieldCheckStatus.bind(this) ;
        this.handleBodySubmitFormData = this.handleBodySubmitFormData.bind(this) ;
        this.handleBodyUpdateList = this.handleBodyUpdateList.bind(this) ;
        this.handleHeaderChangeInput= this.handleHeaderChangeInput.bind(this) ;
    }
    //更新list数据
    handleBodyUpdateList(studentList){
        this.setState({studentList}) ;
    }
    //点击每一项checkbox的时候更新checkbox的状态
    handleBodyChangeFieldCheckStatus(rowIndex,columnIndex,checkedStatus){
        let newList = [...this.state.studentList] ;
        let obj = newList[rowIndex] ;
        let newscoreArr =  [...obj.scoreArr] ;
        newscoreArr[columnIndex] = checkedStatus ;
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


    render() {
        let {classType,itemType,quotaOptions} = this.props.location.state ;
        let confInfo = {classType,itemType,quotaOptions} ;
        return (
            <div>
                <EvaluationHeader
                    evaluationDate = {this.state.evaluationDate}
                    evaluationClass= {this.state.evaluationClass}
                    handleHeaderChangeInput = {this.handleHeaderChangeInput}
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

