import React ,{Component} from 'react' ;
import { Select,DatePicker } from 'antd';
import moment from 'moment';
const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

function onChange(date, dateString) {
    console.log(date, dateString);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}


class ExaminationHeader extends Component{

    constructor(props){
        super(props) ;
        this.state ={
            value1:'1',
            value2:'2',
            value3: new Date()
        }
    }

    render() {
        return (
            <div className="y-form">

                <div className="y-row" >
                    <Select className="y-input"
                            defaultValue="1"
                            onChange={handleChange}
                            style={{marginRight: "15px"}}>
                        <Option value="1">年级</Option>
                        <Option value="2">级部</Option>
                    </Select>

                    <Select className="y-input"
                            defaultValue="1"
                            onChange={handleChange}
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
                    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                    <button type="button" style={{marginLeft: "15px"}} className="btn btn-success">上报</button>
                </div>

            </div>
        ) ;
    }

}

export default ExaminationHeader ;
