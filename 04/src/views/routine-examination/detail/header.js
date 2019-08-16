import React ,{Component} from 'react' ;
import { Select,DatePicker,message } from 'antd';
import moment from 'moment';
import {ajaxWithoutParams} from "components/common/util";
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';



class ExaminationHeader extends Component{
    constructor(props){
        super(props) ;
        this.state = {
            gradeOrLevelDepartmentType:'levelDepartment',
            gradeOrLevelDepartmentValue:'',
            examinationDate:'2019/07/30',
            gradeAndLevelDepartmentCodeBook:{
                grade:{defaultValue:'',options:[]},
                levelDepartment:{defaultValue:'',options:[]}
            }
        } ;
        this.handleGradeOrLevelDepartmentTypeChange =this.handleGradeOrLevelDepartmentTypeChange.bind(this) ;
        this.handleGradeOrLevelDepartmentValueChange = this.handleGradeOrLevelDepartmentValueChange.bind(this) ;
        this.handleCheckDateChange = this.handleCheckDateChange.bind(this) ;
    }

    updateClassListData(){
        let {gradeOrLevelDepartmentType,gradeOrLevelDepartmentValue,examinationDate} = this.state ;
        this.props.handlerHeaderChangeFormData(gradeOrLevelDepartmentType,
            gradeOrLevelDepartmentValue,examinationDate) ;
    }

    componentDidMount() {
        let {teacherNumber,campusNumber} = this.props ;
        let url = `/api/classAndStudent/getGradeAndSubordinateDepartment/${teacherNumber}/${campusNumber}` ;
        let ajax = ajaxWithoutParams(url) ;
        ajax.then((data) =>{
            let gradeOrLevelDepartmentValue = data[this.state.gradeOrLevelDepartmentType]['defaultValue'] ;
            this.setState({gradeAndLevelDepartmentCodeBook:data,gradeOrLevelDepartmentValue},()=>{
                this.updateClassListData() ;
            }) ;
        })
        .catch(function (error) {
            message.error("加载年级/级部信息出错!") ;
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

    handleCheckDateChange(value,valueStr){
        this.setState({'examinationDate':valueStr},()=>{
            this.updateClassListData() ;
        }) ;
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
                        <Option value="grade">年级</Option>
                        <Option value="levelDepartment">级部</Option>
                    </Select>

                    <Select className="y-input"
                            value={gradeOrLevelDepartmentValue}
                            onChange={this.handleGradeOrLevelDepartmentValueChange}
                            style={{marginRight: "15px"}}>
                        {optionList.map((item,index) =>
                            (<Option key={index} value={item.value}>
                                {item.label}
                            </Option>))
                        }
                    </Select>
                </div>

                <div className="y-row" >
                    <div className="y-label">
                        检查日期&nbsp;:
                    </div>
                    <DatePicker
                        value={examinationDate === '' ? null : moment(examinationDate, dateFormat)}
                        format={dateFormat}
                        onChange={this.handleCheckDateChange}
                    />
                    <button type="button"
                            style={{marginLeft: "5px"}}
                            className="btn btn-success"
                            onClick={this.props.handleHeaderSubmitForm}
                    >上报</button>
                </div>

            </div>
        ) ;
    }

}

export default ExaminationHeader ;
