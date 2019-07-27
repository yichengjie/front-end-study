import React ,{Component} from 'react' ;
import { Select,DatePicker } from 'element-react';

class WeeklyDutyCheckHeader extends Component{

    constructor(props){
        super(props) ;
        this.state ={
            value1:'1',
            value2:'2',
            value3: new Date()
        }
    }

    handleChangeCommonValue(name){
        return  (value) => {
            console.info('value: ' + value)
            this.setState({[name]:value})
        }
    }

    render() {
        return (
            <div className="y-form">

                <div className="y-row" style={{marginTop: "5px"}}>
                    <Select className="y-input"
                            value={this.state.value1}
                            placeholder="请选择"
                            style={{marginRight: "15px"}}
                            onChange={this.handleChangeCommonValue("value1")}>
                        <Select.Option  label="年级" value="1" />
                        <Select.Option  label="级部" value="2" />
                    </Select>
                    <Select className ="y-input"
                            value={this.state.value2}
                            placeholder="请选择"
                            onChange={this.handleChangeCommonValue("value2")}>
                        <Select.Option  label="高2017级" value="1" />
                        <Select.Option  label="高2018级" value="2" />
                        <Select.Option  label="高2019级" value="3" />
                    </Select>
                </div>

                <div className="y-row" style={{marginTop: "5px"}}>
                    <div className="y-label">
                        检查日期&nbsp;:
                    </div>
                    <DatePicker
                        value={this.state.value3}
                        placeholder="选择日期"
                        onChange={date=>{
                            console.debug('DatePicker1 changed: ', date)
                            this.setState({value3: date})
                        }}
                        disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
                    />
                    <button type="button" style={{marginLeft: "15px"}} className="btn btn-success">上报</button>
                </div>

            </div>
        ) ;
    }

}

export default WeeklyDutyCheckHeader ;
