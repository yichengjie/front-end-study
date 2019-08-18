import React,{Component} from 'react' ;
import { Select,DatePicker } from 'antd';
import moment from 'moment';
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

class EvaluationHeader  extends Component{

    constructor(props) {
        super(props);
        let {classList1,classList2} = props ;
        this.state = {
            classList: classList1
        } ;
        this.handleChangeEvaluationClass = this.handleChangeEvaluationClass.bind(this) ;
        this.handleChangeEvaluationDate = this.handleChangeEvaluationDate.bind(this) ;
        this.handleChangeEvaluationClassType = this.handleChangeEvaluationClassType.bind(this) ;
    }


    handleChangeEvaluationDate(value,valueStr){
        this.props.handleHeaderChangeInput('evaluationDate',valueStr) ;
    }

    handleChangeEvaluationClass(value){
        this.props.handleHeaderChangeInput('evaluationClass',value) ;
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
            defaultClassValue = classList[0].classId +'' ;
        }
        this.setState({classList:classList}) ;
        this.props.handleHeaderChangeClassType(value,defaultClassValue) ;
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
                        value={this.props.evaluationDate === ''
                                ? null
                                : moment(this.props.evaluationDate, dateFormat)}
                        format={dateFormat}
                        onChange={this.handleChangeEvaluationDate}/>
                </div>

                <div className="y-row">
                    <div className="y-label">
                        班级类型&nbsp;:
                    </div>
                    <Select className="y-input"
                            value={this.props.evaluationClassType}
                            onChange={this.handleChangeEvaluationClassType}>
                        <Option value="1">行政班级</Option>
                        <Option value="2">教学班级</Option>
                    </Select>
                </div>

                <div className="y-row">
                    <div className="y-label">
                        评价班级&nbsp;:
                    </div>
                    <Select className="y-input"
                        value={this.props.evaluationClass}
                        onChange={this.handleChangeEvaluationClass}>
                        {
                            this.state.classList.map((item,index) =>{
                               return(<Option key ={index} value={item.classId +""}>{item.name}</Option>)
                            })
                        }
                    </Select>
                </div>
            </div>

    );
    }
}

export default EvaluationHeader ;

