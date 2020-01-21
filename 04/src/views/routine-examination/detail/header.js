import React ,{Component} from 'react' ;
import {ajaxWithoutParams} from "components/common/util";
//import { Select,DatePicker,message } from 'antd';
import {Select,DatePicker,Message} from 'element-react' ;
const { Option } = Select;
//const dateFormat = 'YYYY/MM/DD';

class ExaminationHeader extends Component{
    constructor(props){
        super(props) ;
        this.state = {
            gradeOrLevelDepartmentType:'grade',
            gradeOrLevelDepartmentValue:'',
            examinationDate:this.convertDataToString(new Date()),
            gradeAndLevelDepartmentCodeBook:{
                grade:{defaultValue:'',options:[]},
                levelDepartment:{defaultValue:'',options:[]}
            }
        } ;
        this.handleGradeOrLevelDepartmentTypeChange =this.handleGradeOrLevelDepartmentTypeChange.bind(this) ;
        this.handleGradeOrLevelDepartmentValueChange = this.handleGradeOrLevelDepartmentValueChange.bind(this) ;
        this.handleCheckDateChange = this.handleCheckDateChange.bind(this) ;
        this.handleHeaderSubmitForm = this.handleHeaderSubmitForm.bind(this) ;
    }

    updateClassListData(){
        let {gradeOrLevelDepartmentType,gradeOrLevelDepartmentValue,examinationDate} = this.state ;
        console.info('gradeOrLevelDepartmentType : ' + gradeOrLevelDepartmentType) ;
        console.info('gradeOrLevelDepartmentValue : ' + gradeOrLevelDepartmentValue) ;
        console.info('examinationDate : ' + examinationDate) ;
        this.props.handlerHeaderChangeFormData(gradeOrLevelDepartmentType,
            gradeOrLevelDepartmentValue,examinationDate) ;
    }

    componentDidMount() {
        let {teacherNumber,campusNumber} = this.props ;
        let url = `/api/yiClassAndStudent/getGradeAndSubordinateDepartment/${teacherNumber}/${campusNumber}` ;
        let ajax = ajaxWithoutParams(url) ;
        ajax.then((data) =>{
            let gradeOrLevelDepartmentValue = data[this.state.gradeOrLevelDepartmentType]['defaultValue'] ;
            this.setState({gradeAndLevelDepartmentCodeBook:data,gradeOrLevelDepartmentValue},()=>{
                this.updateClassListData() ;
            }) ;
        })
        .catch(function (error) {
            Message.error("加载年级/级部信息出错!") ;
        }) ;
    }


    handleGradeOrLevelDepartmentTypeChange(value){
        let defaultValue = this.state.gradeAndLevelDepartmentCodeBook[value].defaultValue ;
        this.setState({gradeOrLevelDepartmentType:value,gradeOrLevelDepartmentValue:defaultValue},()=>{
            this.updateClassListData() ;
        }) ;
    }
    handleGradeOrLevelDepartmentValueChange(value){
        this.setState({gradeOrLevelDepartmentValue:value},()=>{
            this.updateClassListData() ;
        }) ;
    }

    handleCheckDateChange(value){
        let valueStr = this.convertDataToString(value) ;
        this.setState({'examinationDate':valueStr},()=>{
            this.updateClassListData() ;
        }) ;
    }

    handleHeaderSubmitForm(){
        this.props.handleHeaderSubmitForm(this.state.examinationDate) ;
    }

    convertStringToData(dateString) {
        if (dateString !== undefined && dateString !== null && dateString.length > 0) {
            let date = new Date(dateString.replace(/-/,"/"))
            return date;
        }
        return null ;
    }

    convertDataToString(date) {
        if(date === null || date === undefined){
            return null ;
        }
        let year = date.getFullYear();//获取完整的年份(4位,1970-????)
        let month = date.getMonth() + 1;//获取当前月份(0-11,0代表1月)
        let day = date.getDate();//获取当前日(1-31)
        if (month < 10) {
            month ="0" + month;
        }
        if (day < 10) {
            day ="0" + day;
        }
        let dateString = year +"-" + month + "-" + day;
        return dateString ;
    }
    render() {
        let {gradeOrLevelDepartmentType,gradeOrLevelDepartmentValue,examinationDate} = this.state ;
        let optionList = this.state.gradeAndLevelDepartmentCodeBook[gradeOrLevelDepartmentType].options || [] ;

        return (
            <div className="y-form">

                <div className="y-row" >
                    <Select className="y-input"
                            value={gradeOrLevelDepartmentType}
                            onChange={this.handleGradeOrLevelDepartmentTypeChange}
                            style={{marginRight: "15px"}}>
                        <Option value="grade" label="年级" />
                        <Option value="levelDepartment" label="级部" />
                    </Select>

                    <Select className="y-input"
                            value={gradeOrLevelDepartmentValue}
                            onChange={this.handleGradeOrLevelDepartmentValueChange}
                            style={{marginRight: "15px"}}>
                        {optionList.map((item,index) =>
                            (<Option key={index} value={item.value} label={item.label} />))
                        }
                    </Select>
                </div>

                <div className="y-row" >
                    <div className="y-label">
                        检查日期&nbsp;:
                    </div>
                    <DatePicker
                        value={this.convertStringToData(examinationDate)}
                        onChange={this.handleCheckDateChange}
                    />
                    <button type="button"
                            style={{marginLeft: "5px"}}
                            className="btn btn-success"
                            onClick={this.handleHeaderSubmitForm}
                    >上报</button>
                </div>

            </div>
        ) ;
    }

}

export default ExaminationHeader ;
