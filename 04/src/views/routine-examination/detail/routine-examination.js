import React,{Component} from 'react' ;
import ExaminationHeader from './header' ;
import ExaminationBody from './body' ;

class RoutineExamination extends Component{
    constructor(props){
        super(props) ;
        let { title,classType,itemType } = this.props.location.state ;
        document.title = title;
        this.state = {
            examinationType:'1' ,
            examinationGrade:'2' ,
            examinationDate:'2019/07/30',
            classList:[],
        } ;

        console.info("classType : " + classType + " , itemType : " + itemType)
        this.handleHeaderChangeInput = this.handleHeaderChangeInput.bind(this) ;
        this.handleHeaderSubmitForm = this.handleHeaderSubmitForm.bind(this) ;
        this.handleBodyUpdateClassList = this.handleBodyUpdateClassList.bind(this) ;
        //每一行后面的radio按钮选中事件
        this.handleBodyChangeExaminationStatus = this.handleBodyChangeExaminationStatus.bind(this) ;
        //每一行前面的checkbox选中事件
        this.handleBodyChangeExaminationFlag = this.handleBodyChangeExaminationFlag.bind(this) ;
        //每一行添加备注时处理函数
        this.handleBodyMarkingContent = this.handleBodyMarkingContent.bind(this) ;
    }
    handleHeaderChangeInput(name,value){
        this.setState({[name]:value}) ;
    }
    handleHeaderSubmitForm(e){
        console.info(this.state)
    }

    handleBodyUpdateClassList(classList){
        this.setState({classList}) ;
    }

    //每一行后面的radio按钮选中事件
    handleBodyChangeExaminationStatus(index,value){
        let newArr = [...this.state.classList] ;
        let obj = newArr[index] ;
        obj.score = value ;
        //当后面的radio被点击时，顺便勾选每一行前面的checkbox
        obj.examinationFlag = "1" ; //1:选中，0:非选中
        this.setState({classList:newArr}) ;
    }
    //每一行前面的checkbox选中事件
    handleBodyChangeExaminationFlag(index,value){
        let newArr = [...this.state.classList] ;
        let obj = newArr[index] ;
        obj.examinationFlag = value ;
        this.setState({classList:newArr}) ;
    }

    //备注处理函数
    handleBodyMarkingContent(index,value){
        let newArr = [...this.state.classList] ;
        let obj = newArr[index] ;
        obj.markingContent = value ;
        obj.examinationFlag = '1' ;
        this.setState({classList:newArr}) ;
    }

    render() {

        return (
            <div>
                <ExaminationHeader
                    examinationType ={this.state.examinationType}
                    examinationGrade ={this.state.examinationGrade}
                    examinationDate = {this.state.examinationDate}
                    handleHeaderChangeInput = {this.handleHeaderChangeInput}
                    handleHeaderSubmitForm = {this.handleHeaderSubmitForm}
                />
                <ExaminationBody
                    classList ={this.state.classList}
                    handleBodyUpdateClassList = {this.handleBodyUpdateClassList}
                    handleBodyChangeExaminationStatus = {this.handleBodyChangeExaminationStatus}
                    handleBodyChangeExaminationFlag = {this.handleBodyChangeExaminationFlag}
                    handleBodyMarkingContent = {this.handleBodyMarkingContent}
                />
            </div>
        ) ;
    }
}

export default RoutineExamination ;