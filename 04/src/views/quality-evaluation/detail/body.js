import React,{Component} from 'react' ;
//import { Spin } from 'antd';
import {Loading,Button} from 'element-react' ;
import _ from 'lodash' ;

class EvaluationBody  extends Component{

    renderTableHeader(){
        let {quotaOptions} = this.props.confInfo ;
        return (
            <tr>
                <th width="122" style={{textAlign:'center'}} >姓名/学号</th>
                {
                    quotaOptions.map((item,index)=>{
                        return <th key={index} style={{textAlign:'center'}}>{item.title}</th> ;
                    })
                }
            </tr>
        ) ;
    }
    renderTableBody(){
        let {quotaOptions} = this.props.confInfo ;
        return this.props.studentList.map((item,index) =>{
            return (
                <EvaluationListItem key={index}
                    rowIndex = {index}
                    itemData = {item}
                    quotaOptions = {quotaOptions}
                    handleBodyChangeFieldCheckStatus={this.props.handleBodyChangeFieldCheckStatus}
                />
            ) ;
        }) ;
    }

    renderTable(){
        let {bodyLoading} = this.props ;
        return (
            <Loading loading={bodyLoading} text="拼命加载中">
                <table className="table table-bordered table-striped">
                    <thead>
                    {this.renderTableHeader()}
                    </thead>
                    <tbody>
                        {this.renderTableBody()}
                    </tbody>
                </table>
                <Button type="success" style={{width:"100%"}}
                        onClick={this.props.handleBodySubmitFormData}
                >提交</Button>
            </Loading>
        ) ;
    }

    render() {
        return (
            <div className="y-body">
                <div className="y-title">评价学生&nbsp;:</div>
                { this.renderTable()}
            </div>
        );
    }
}

class EvaluationListItem extends Component{
    getCurrentFieldChecked(scoreArr =[],item){
        let obj = _.find(scoreArr,score => score === item.id) ;
        return obj !== undefined ;
    }

    handleBodyChangeFieldCheckStatus(rowIndex,columnIndex){
        return (e) => {
            let checkedStatus = e.target.checked ;
            let value = e.target.value ;
            this.props.handleBodyChangeFieldCheckStatus(rowIndex,checkedStatus,value) ;
        }
    }

    render() {
        let { quotaOptions,itemData, rowIndex }  = this.props ;
        let { studentName,studentNo, scoreArr } = itemData ;

        return (
            <tr>
                <td align="center">{studentName +'/' + studentNo}</td>
                {
                    quotaOptions.map((item,columnIndex)=>{
                        return (
                            <td key={columnIndex} align="center">
                                <input type="checkbox"
                                       value={item.id}
                                       checked={this.getCurrentFieldChecked(scoreArr,item)}
                                       onChange={this.handleBodyChangeFieldCheckStatus(rowIndex,columnIndex)}
                                />
                            </td>) ;
                    })
                }
            </tr>
        ) ;
    }
}

export default EvaluationBody ;

