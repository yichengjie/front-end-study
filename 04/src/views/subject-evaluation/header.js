import React,{Component} from 'react' ;
import { Select,DatePicker } from 'antd';
const { Option } = Select;

class EvaluationHeader  extends Component{

    constructor(props) {
        super(props);
        this.state = {
            value1:null,
            value2:'1'
        } ;
    }

    handleInputChange(name){
        return (value) => {
            this.setState({[name]:value})
        }
    }

    render() {

        return (
            <div className="y-form">
                <div className="y-row" style={{marginTop:"5px"}}>
                    <div className="y-label">
                        评价日期&nbsp;:
                    </div>
                    <DatePicker className="y-input"
                        value={this.state.value1}
                        onChange={this.handleInputChange('value1')}/>
                </div>

                <div className="y-row">
                    <div className="y-label">
                        评价班级&nbsp;:
                    </div>
                    <Select className="y-input"
                        value={this.state.value2}
                        onChange={this.handleInputChange('value2')}>
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

