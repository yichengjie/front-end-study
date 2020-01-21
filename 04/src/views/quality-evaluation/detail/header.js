import React,{Component} from 'react' ;
//import { Select,DatePicker } from 'antd';
import {Select, DatePicker} from 'element-react' ;
import moment from 'moment';
const { Option } = Select;
//const dateFormat = 'YYYY/MM/DD';



class EvaluationHeader  extends Component{

    constructor(props) {
        super(props);
        let {classList1} = props ;
        this.state = {
            classList: classList1
        } ;
        this.handleChangeEvaluationClass = this.handleChangeEvaluationClass.bind(this) ;
        this.handleChangeEvaluationDate = this.handleChangeEvaluationDate.bind(this) ;
        this.handleChangeEvaluationClassType = this.handleChangeEvaluationClassType.bind(this) ;
    }

    handleChangeEvaluationDate(value){
        let valueStr = this.convertDataToString(value)
        this.props.handleHeaderChangeInput('evaluationDate',valueStr) ;
    }

    handleChangeEvaluationClass(value){
        this.props.handleHeaderChangeInput('evaluationGradeAndClass',value) ;
    }

    handleChangeEvaluationClassType(value){
        let {classList1,classList2} = this.props ;
        let classList = [] ;
        let defaultClassValue = '' ;
        if(value === '1'){
            classList = classList1 ;
        }else{
            classList = classList2 ;
        }
        if(classList.length > 0){
            defaultClassValue = classList[0].gradeId + ',' + classList[0].classId  ;
        }
        this.setState({classList:classList}) ;
        this.props.handleHeaderChangeClassType(value,defaultClassValue) ;
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

        return (
            <div className="y-form">
                <div className="y-row" >
                    <div className="y-label">
                        评价日期&nbsp;:
                    </div>
                    <DatePicker
                        className="y-input"
                        value={this.convertStringToData(this.props.evaluationDate)}
                        onChange={this.handleChangeEvaluationDate}/>
                </div>

                <div className="y-row">
                    <div className="y-label">
                        班级类型&nbsp;:
                    </div>
                    <Select className="y-input"
                            value={this.props.evaluationClassType}
                            onChange={this.handleChangeEvaluationClassType}>
                        <Option key="1" label="行政班级" value="1" />
                        <Option key="2" label="教学班级" value="2" />
                    </Select>
                </div>

                <div className="y-row">
                    <div className="y-label">
                        评价班级&nbsp;:
                    </div>
                    <Select className="y-input"
                        value={this.props.evaluationGradeAndClass}
                        onChange={this.handleChangeEvaluationClass}>
                        {
                            this.state.classList.map((item,index) =>{
                               return(<Option key ={index} label={item.name} value={item.gradeId + ',' + item.classId } />)
                            })
                        }
                    </Select>
                </div>
            </div>

    );
    }
}

export default EvaluationHeader ;

