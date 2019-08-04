import React ,{Component} from 'react' ;
import { Select,DatePicker } from 'antd';
import moment from 'moment';
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';


class ExaminationHeader extends Component{

    constructor(props){
        super(props) ;
        this.handleCheckDateChange = this.handleCheckDateChange.bind(this) ;
    }

    handleSelectChange(name){
        return (value) => {
            this.props.handleHeaderChangeInput(name,value) ;
        }
    }

    handleCheckDateChange(value,valueStr){
        this.props.handleHeaderChangeInput('examinationDate',valueStr) ;
    }

    render() {
        return (
            <div className="y-form">

                <div className="y-row" >
                    <Select className="y-input"
                            value={this.props.examinationType}
                            onChange={this.handleSelectChange('examinationType')}
                            style={{marginRight: "15px"}}>
                        <Option value="1">年级</Option>
                        <Option value="2">级部</Option>
                    </Select>

                    <Select className="y-input"
                            value={this.props.examinationGrade}
                            onChange={this.handleSelectChange('examinationGrade')}
                            style={{marginRight: "15px"}}>
                        <Option value="1">高2017级</Option>
                        <Option value="2">高2018级</Option>
                        <Option value="3">高2019级</Option>
                    </Select>
                </div>

                <div className="y-row" >
                    <div className="y-label">
                        检查日期&nbsp;:
                    </div>
                    <DatePicker value={this.props.examinationkDate === ''
                                        ? null
                                        : moment(this.props.examinationDate, dateFormat)}
                                format={dateFormat}
                                onChange={this.handleCheckDateChange}
                    />
                    <button type="button"
                            style={{marginLeft: "15px"}}
                            className="btn btn-success"
                            onClick={this.props.handleHeaderSubmitForm}
                    >上报</button>
                </div>

            </div>
        ) ;
    }

}

export default ExaminationHeader ;
