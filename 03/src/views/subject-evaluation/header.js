import React,{Component} from 'react' ;
import { DatePicker ,Select} from 'element-react';

var options = [{
        value: '1',
        label: '高2018级(1)班'
    }, {
        value: '2',
        label: '高2018级(2)班'
    }, {
        value: '3',
        label: '高2018级(3)班'
    }] ;

class EvaluationHeader  extends Component{

    constructor(props) {
        super(props);
        this.state = {
            value1:null,
            value2:''
        } ;
    }


    render() {

        return (
            <div className="y-form">
                <div className="y-row" style={{marginTop:"5px"}}>
                    <div className="y-label">
                        评价日期&nbsp;:
                    </div>
                    <DatePicker
                        className ="y-input"
                        value={this.state.value1}
                        placeholder="选择日期"
                        onChange={date=>{
                            console.debug('DatePicker1 changed: ', date)
                            this.setState({value1: date})
                        }}
                        disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
                    />
                </div>

                <div className="y-row">
                    <div className="y-label">
                        评价班级&nbsp;:
                    </div>
                    <Select
                        value={this.state.value2}
                        className="y-input"
                        placeholder="请选择">
                        {
                            options.map(el => {
                                return (
                                    <Select.Option
                                       key={el.value}
                                       label={el.label}
                                       value={el.value}
                                    />
                                )
                            })
                        }
                    </Select>
                </div>
            </div>

    );
    }
}

export default EvaluationHeader ;

