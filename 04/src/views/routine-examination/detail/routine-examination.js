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
        this.handleBodyChangeItemValue = this.handleBodyChangeItemValue.bind(this) ;
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
    //列表项中的值改变的时候
    handleBodyChangeItemValue(index,name,value){
        let newArr = [...this.state.classList] ;
        let obj = newArr[index] ;
        obj[name] = value ;
        //当后面的radio被点击时，顺便勾选每一行前面的checkbox
        if(name === 'score' || name === 'markingContent'){ //
            obj.examinationFlag = "1" ; //1:选中，0:非选中
        }
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
                    handleBodyChangeItemValue = {this.handleBodyChangeItemValue}
                />
            </div>
        ) ;
    }
}

export default RoutineExamination ;