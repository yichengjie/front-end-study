import React,{Component,Fragment} from 'react' ;
import { Spin } from 'antd';
import _ from 'lodash' ;

class EvaluationBody  extends Component{

    constructor(props){
        super(props) ;
        this.state ={
            loading:true
        }
    }

    componentDidMount() {
        let options2 = [
            {
                nameAndNo:"白婷羽11182762",
                scoreArr:[]
            },{
                nameAndNo:"张三11182763",
                scoreArr:[]
            },{
                nameAndNo:"李四11182764",
                scoreArr:[]
            },{
                nameAndNo:"王五11182765",
                scoreArr:[]
            },{
                nameAndNo:"赵六11182766",
                scoreArr:[]
            }
        ] ;
         setTimeout(()=>{
             this.setState({
                 loading:false
             }) ;
             this.props.handleBodyUpdateList([...options2]) ;
         },200) ;
    }

    renderTableHeader(){
        let {quotaOptions} = this.props.confInfo ;
        return (
            <tr>
                <th width="109" style={{textAlign:'center'}} >姓名/学号</th>
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
        return (
            <Fragment>
                <table className="table table-bordered table-striped">
                    <thead>
                    {this.renderTableHeader()}
                    </thead>
                    <tbody>
                    {this.renderTableBody()}
                    </tbody>
                </table>
                <button type="button"
                        className="btn btn-success btn-block"
                        onClick={this.props.handleBodySubmitFormData}
                >提交</button>
            </Fragment>
        ) ;
    }

    renderLoading(){
        return (
            <div style={{textAlign:"center"}}>
                <Spin size="large" tip="数据加载中，请耐心等待..."/>
            </div>
        ) ;
    }

    render() {
        return (
            <div className="y-body">
                <div className="y-title">评价学生&nbsp;:</div>
                {this.state.loading ?  this.renderLoading() : this.renderTable()}
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
        let { nameAndNo, scoreArr } = itemData ;

        return (
            <tr>
                <td align="center">{nameAndNo}</td>
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

