import React,{Component} from 'react' ;
import { Select,DatePicker } from 'antd';
import moment from 'moment';
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

class EvaluationHeader  extends Component{

    constructor(props) {
        super(props);
        this.handleChangeEvaluationClass = this.handleChangeEvaluationClass.bind(this) ;
        this.handleChangeEvaluationDate = this.handleChangeEvaluationDate.bind(this) ;
    }


    handleChangeEvaluationDate(value,valueStr){
        this.props.handleHeaderChangeInput('evaluationDate',valueStr) ;
    }

    handleChangeEvaluationClass(value){
        this.props.handleHeaderChangeInput('evaluationClass',value) ;
    }
    handleChangeEvaluationClassType(value){
        this.props.handleHeaderChangeClassType(value) ;
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
                        <Option value="1">高2018级(1)班</Option>
                        <Option value="2">高2018级(2)班</Option>
                        <Option value="3">高2018级(3)班</Option>
                    </Select>
                </div>
            </div>

    );
    }
}

export default EvaluationHeader ;

