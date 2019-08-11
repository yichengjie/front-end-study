import React ,{Component} from 'react' ;
import { Select,DatePicker } from 'antd';
import moment from 'moment';
import axios from "axios";
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';


let gradeAndLevelDepartmentCodeBook  = {
    grade:{
        defaultValue:'2017',
        options:[
            {label:'高2017级',value:"2017"},
            {label:'高2018级',value:"2018"},
            {label:'高2019级',value:"2019"}
        ]
    },
    levelDepartment:{
        defaultValue:'21',
        options: [
            {label:'高二1部',value:'21'},
            {label:'高二2部',value:'22'},
            {label:'高三1部',value:'31'}
        ]
    }
}


class ExaminationHeader extends Component{
    constructor(props){
        super(props) ;
        this.state = {
            gradeOrLevelDepartmentType:'grade',
            gradeOrLevelDepartmentValue:'2018',
            examinationDate:'2019/07/30',
        } ;
        this.handleGradeOrLevelDepartmentTypeChange =this.handleGradeOrLevelDepartmentTypeChange.bind(this) ;
        this.handleGradeOrLevelDepartmentValueChange = this.handleGradeOrLevelDepartmentValueChange.bind(this) ;
        this.handleCheckDateChange = this.handleCheckDateChange.bind(this) ;
    }

    componentDidMount() {
        let {teacherNumber,campusNumber} = this.state ;
        // let url = `http://wx.ideamerry.com/api/classAndStudent/getGradeAndSubordinateDepartment/${teacherNumber}/${campusNumber}` ;
        // axios.get(url)
        //     .then(function (response) {
        //         // handle success
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
        //     .then(function () {
        //         // always executed
        //     });
    }

    handleGradeOrLevelDepartmentTypeChange(value){
        let defaultValue = gradeAndLevelDepartmentCodeBook[value].defaultValue ;
        this.setState({gradeOrLevelDepartmentType:value,gradeOrLevelDepartmentValue:defaultValue}) ;
    }
    handleGradeOrLevelDepartmentValueChange(value){
        this.setState({gradeOrLevelDepartmentValue:value}) ;
    }

    handleCheckDateChange(value,valueStr){
        this.setState({'examinationDate':valueStr})
    }


    render() {
        let {gradeOrLevelDepartmentType,gradeOrLevelDepartmentValue,examinationDate} = this.state ;
        let optionList = gradeAndLevelDepartmentCodeBook[gradeOrLevelDepartmentType].options ;

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
