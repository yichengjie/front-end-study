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
        this.handleHeaderChangeInput = this.handleHeaderChangeInput.bind(this) ;
        this.handleHeaderSubmitForm = this.handleHeaderSubmitForm.bind(this) ;
        this.handleBodyUpdateClassList = this.handleBodyUpdateClassList.bind(this) ;
        this.handleBodyChangeExaminationStatus = this.handleBodyChangeExaminationStatus.bind(this) ;
        this.handleBodyChangeAllStatus = this.handleBodyChangeAllStatus.bind(this) ;
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

    handleBodyChangeExaminationStatus(index,value){
        let newArr = [...this.state.classList] ;
        let obj = newArr[index] ;
        obj.score = value ;
        this.setState({classList:newArr}) ;
    }

    handleBodyChangeAllStatus(value){
        let newArr = [...this.state.classList] ;
        newArr.forEach(item=>{
            item.score = value ;
        }) ;
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
                    handleBodyChangeAllStatus = {this.handleBodyChangeAllStatus}
                />
            </div>
        ) ;
    }
}

export default RoutineExamination ;