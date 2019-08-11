import React ,{Component} from 'react' ;
import { Spin} from 'antd';

class ExaminationBody extends Component{

    constructor(props){
        super(props) ;
        this.state = {
            loading:true,
        } ;
    }
    componentDidMount() {
        let options = [
            {
                examinationFlag:"0",
                examinationClassLabel:'01班',
                examinationClassValue:'1' ,
                score:'0',
                markingContent:'',
                quotaList:['1','3','4']
            },{
                examinationFlag:"0",
                examinationClassLabel:'02班',
                examinationClassValue:'2' ,
                score:'0',
                markingContent:'',
                quotaList:['1','3','4']
            },{
                examinationFlag:"0",
                examinationClassLabel:'03班',
                examinationClassValue:'3' ,
                score:'0',
                markingContent:'',
                quotaList:['1','2','3']
            },{
                examinationFlag:"0",
                examinationClassLabel:'04班',
                examinationClassValue:'4' ,
                score:'0',
                markingContent:'',
            },{
                examinationFlag:"0",
                examinationClassLabel:'05班',
                examinationClassValue:'5' ,
                score:'0',
                markingContent:'',
                quotaList:['1','3']
            },
            {
                examinationFlag:"0",
                examinationClassLabel:'15班',
                examinationClassValue:'15' ,
                score:'0',
                markingContent:'',
                quotaList:['1','4']
            },
        ] ;

        setTimeout(()=>{
            this.setState({
                loading:false,
            }) ;
            this.props.handleBodyUpdateClassList([...options]) ;
        },200) ;
    }

    renderTableHeader(){
        return (
            <tr>
                <th width="80"></th>
                <th width="60" align="center" style={{textAlign: "center"}}>
                    <span className="label y-hand"
                          style={{backgroundColor: "#a9823e"}}>优秀</span>
                </th>
                <th width="60" align="center" style={{textAlign: "center"}}>
                    <span className="label label-success y-hand">合格</span>
                </th>
                <th>
                    <span style={{marginLeft:"5px"}} className="label label-danger y-hand">不合格</span>
                </th>
                <th width="60"></th>
            </tr>
        ) ;
    }

    renderTableBody(){
        let list = this.props.classList ;
        return list.map((item,index) =>{
            return (
                <ExaminationListItem key ={index}
                     itemData = {item}
                     index = {index}
                     handleBodyChangeItemValue = {this.props.handleBodyChangeItemValue}
                     showMarkingDialog = {this.props.showMarkingDialog}
                     showUnqualifiedSelectDialog = {this.props.showUnqualifiedSelectDialog}
                />
            ) ;
        }) ;

    }

    renderTable(){
        return (
            <table className="table">
                <thead>
                    {this.renderTableHeader()}
                </thead>
                <tbody>
                    {this.renderTableBody()}
                </tbody>
            </table>
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
                {this.state.loading ?  this.renderLoading() : this.renderTable()}

            </div>
        ) ;
    }
}



class ExaminationListItem extends Component{
    constructor(props){
        super(props) ;
        //显示备注对话框处理
        this.showMarkingDialog = this.showMarkingDialog.bind(this) ;
        this.showUnqualifiedSelectDialog = this.showUnqualifiedSelectDialog.bind(this) ;
        //----------------------------------------------------------//
        //改变改变检查状态--优秀-合格-不合格
        this.handleChangeExaminationStatus = this.handleChangeExaminationStatus.bind(this) ;
        //改变检查项是否选中
        this.handleChangeExaminationFlag = this.handleChangeExaminationFlag.bind(this) ;
        //-----------------------------------------------------------//
    }

    //改变改变检查状态--优秀-合格-不合格
    handleChangeExaminationStatus(e){
        let index = this.props.index ;
        let value = e.target.value ;
        let name = 'score' ;
        this.props.handleBodyChangeItemValue(index,name,value) ;
    }
    //改变检查项是否选中
    handleChangeExaminationFlag(e){
        let index = this.props.index ;
        let value = e.target.checked ? "1" : "0" ;
        let name = "examinationFlag" ;
        this.props.handleBodyChangeItemValue(index,name,value) ;
    }
    //显示备注对话框
    showMarkingDialog() {
        let index = this.props.index ;
        let value = this.props.itemData.markingContent ;
        this.props.showMarkingDialog(index,value) ;
    }

    showUnqualifiedSelectDialog(){
        let index = this.props.index ;
        this.props.showUnqualifiedSelectDialog(index) ;
    }

    render() {
        let itemData = this.props.itemData ;
        return (
            <tr>
                <td align="center">
                    <input type="checkbox"
                           className="y-examination-class"
                           checked={itemData.examinationFlag === '1'}
                           onChange={this.handleChangeExaminationFlag}
                    />
                    &nbsp;{itemData.examinationClassLabel}
                </td>
                <td align="center">
                    <input type="radio" value="1"
                           name={"name_"+itemData.examinationClassValue}
                           checked={itemData.score === '1'}
                           onChange={this.handleChangeExaminationStatus}
                    />
                </td>
                <td align="center">
                    <input type="radio" value="2"
                           name={"name_"+itemData.examinationClassValue}
                           checked={itemData.score === '2'}
                           onChange={this.handleChangeExaminationStatus}
                    />
                </td>
                <td >
                    <input type="radio" value="3"
                           style={{marginLeft:"20px"}}
                           name={"name_"+itemData.examinationClassValue}
                           checked={itemData.score === '3'}
                           onChange={this.handleChangeExaminationStatus}
                    />
                    {
                        itemData.score === '3' ?
                            (<span className="text-success y-hand"
                                   style={{marginLeft:"5px"}}
                                   onClick={this.showUnqualifiedSelectDialog}
                            >
                                    请选择
                                </span>)
                            : null
                    }
                </td>
                <td><div className="y-hand text-info"
                         onClick={this.showMarkingDialog}
                    >备注</div>
                </td>
            </tr>
        ) ;
    }

}

export default ExaminationBody ;