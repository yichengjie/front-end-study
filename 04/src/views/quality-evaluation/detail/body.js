import React,{Component,Fragment} from 'react' ;
import { Spin } from 'antd';

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
                scoreArr:["1","0","0","0"]
            },{
                nameAndNo:"张三11182763",
                scoreArr:["1","1","0","0"]
            },{
                nameAndNo:"李四11182764",
                scoreArr:["1","0","1","0"]
            },{
                nameAndNo:"王五11182765",
                scoreArr:["1","1","0","1"]
            },{
                nameAndNo:"赵六11182766",
                scoreArr:["1","1","1","1"]
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
        let {evaluationFields} = this.props.confInfo ;
        return (
            <tr>
                <th width="109" style={{textAlign:'center'}} >姓名/学号</th>
                {
                    evaluationFields.map((item,index)=>{
                        return <th key={index} style={{textAlign:'center'}}>{item}</th> ;
                    })
                }
            </tr>
        ) ;
    }
    renderTableBody(){
        let {evaluationFields} = this.props.confInfo ;
        return this.props.studentList.map((item,index) =>{
            return (
                <EvaluationListItem key={index}
                    rowIndex = {index}
                    itemData = {item}
                    evaluationFields = {evaluationFields}
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

    getCurrentFieldChecked(scoreArr =[],index){
        if(scoreArr.length-1 < index){
            return false ;
        }
        return (scoreArr[index] === '1') ||  (scoreArr[index] === 1)
    }

    handleBodyChangeFieldCheckStatus(rowIndex,columnIndex){
        return (e) => {
            let checkedStatus = e.target.checked ? "1" : "0";
            this.props.handleBodyChangeFieldCheckStatus(rowIndex,columnIndex,checkedStatus) ;
        }
    }

    render() {
        let { evaluationFields,itemData, rowIndex }  = this.props ;
        let { nameAndNo, scoreArr } = itemData ;

        return (
            <tr>
                <td align="center">{nameAndNo}</td>
                {
                    evaluationFields.map((item,columnIndex)=>{
                        return (
                            <td key={columnIndex} align="center">
                                <input type="checkbox"
                                       checked={this.getCurrentFieldChecked(scoreArr,columnIndex)}
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

