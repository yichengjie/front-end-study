import React ,{Component} from 'react' ;
import { Spin, Modal, Input, Drawer, Upload, Button, Icon ,message} from 'antd';
const { TextArea } = Input;


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
                markingContent:''
            },{
                examinationFlag:"0",
                examinationClassLabel:'02班',
                examinationClassValue:'2' ,
                score:'0',
                markingContent:''
            },{
                examinationFlag:"0",
                examinationClassLabel:'03班',
                examinationClassValue:'3' ,
                score:'0',
                markingContent:''
            },{
                examinationFlag:"0",
                examinationClassLabel:'04班',
                examinationClassValue:'4' ,
                score:'0',
                markingContent:''
            },{
                examinationFlag:"0",
                examinationClassLabel:'05班',
                examinationClassValue:'5' ,
                score:'0',
                markingContent:''
            },
            {
                examinationFlag:"0",
                examinationClassLabel:'15班',
                examinationClassValue:'15' ,
                score:'0',
                markingContent:''
            },
        ] ;

        setTimeout(()=>{
            this.setState({
                loading:false,
            }) ;
            this.props.handleBodyUpdateClassList([...options]) ;
        },1500) ;
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
                     index = {index}/>
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


    renderMarkContentDialog(){
        return (
            <Modal
                title="自定义原因"
                visible={this.state.marking}
                onOk={this.okMarkingModal}
                onCancel={this.hideMarkingModal}
                okText="确认"
                cancelText="取消"
            >
                <TextArea rows={4}
                          value={this.state.markingContent}
                          onChange={this.handleMarkingContentInput}
                />
            </Modal>
        ) ;
    }

    //不合格时请选中弹出框
    renderUnqualifiedSelectDialog(){
        return (
            <Drawer
                className="y-unqualified-dialog"
                height="125"
                closable={false}
                placement="bottom"
                onClose={this.hideUnqualifiedSelectModal}
                visible={this.state.unqualifiedVisible}
            >
                <div className="y-unqualified-container">
                    <div className="y-unqualified-item"

                        >指标</div>
                    <div className="y-unqualified-item"

                        >拍照</div>
                    <div className="y-unqualified-item"
                         onClick={this.hideUnqualifiedSelectModal}
                        >取消</div>
                </div>
            </Drawer>
        ) ;
    }

    render() {
        return (
            <div className="y-body">
                {this.state.loading ?  this.renderLoading() : this.renderTable()}
                {this.renderMarkContentDialog()}
                {this.renderUnqualifiedSelectDialog()}
            </div>
        ) ;
    }
}



class ExaminationListItem extends Component{
    constructor(props){
        super(props) ;
        this.state = {
            marking: false,
            markingIndex:0,
            markingContent:'',
            unqualifiedVisible:false,
            unqualifiedIndex: -1
        } ;
        //显示备注对话框处理
        this.showMarkingModal = this.showMarkingModal.bind(this) ;
        //隐藏备注对话框处理
        this.hideMarkingModal = this.hideMarkingModal.bind(this) ;
        //点击备注确认时事件处理
        this.okMarkingModal = this.okMarkingModal.bind(this) ;
        //备注内容输入处理函数
        this.handleMarkingContentInput = this.handleMarkingContentInput.bind(this) ;
        //----------------------------------------------------------//
        //改变改变检查状态--优秀-合格-不合格
        this.handleBodyChangeExaminationStatus = this.handleBodyChangeExaminationStatus.bind(this) ;
        //改变检查项是否选中
        this.handleBodyChangeExaminationFlag = this.handleBodyChangeExaminationFlag.bind(this) ;
        //-----------------------------------------------------------//
        //显示不合格理由对话框
        this.showUnqualifiedSelectModal = this.showUnqualifiedSelectModal.bind(this) ;
        //隐藏不合格理由对话框
        this.hideUnqualifiedSelectModal = this.hideUnqualifiedSelectModal.bind(this) ;
    }

    handleBodyChangeExaminationStatus(e){
        let index = this.props.index ;
        let value = e.target.value ;
        console.info('index: ' + index + ", value: " + value) ;
    }

    handleBodyChangeExaminationFlag(e){
        let index = this.props.index ;
        let value = e.target.checked ? "1" : "0" ;
        console.info('index: ' + index + ", value: " + value) ;
    }
    //显示备注对话框
    showMarkingModal() {
        let index = this.props.index ;
        let obj = this.props.classList[index] ;
        let value = obj.markingContent ;
        this.setState({
            marking: true,
            markingIndex:index,
            markingContent:value,
        });
    }
    //隐藏备注对话框
    hideMarkingModal(){
        this.setState({
            marking: false,
            markingContent:'',
            markingIndex:0
        });
    }
    //备注确认对话框
    okMarkingModal(){
        let index = this.state.markingIndex ;
        let content = this.state.markingContent ;
        this.props.handleBodyMarkingContent(index,content) ;
        this.hideMarkingModal() ;
    }
    //备注输入框输入处理
    handleMarkingContentInput(e){
        let value =  e.target.value ;
        this.setState({markingContent:value}) ;
    }


    showUnqualifiedSelectModal(){
        let index = this.props.index ;
        this.setState({unqualifiedVisible:true,unqualifiedIndex:index}) ;
    }

    hideUnqualifiedSelectModal(){
        this.setState({unqualifiedVisible:false,unqualifiedIndex:-1}) ;
    }

    render() {
        let itemData = this.props.itemData ;
        let index = this.props.index ;
        return (
            <tr>
                <td align="center">
                    <input type="checkbox"
                           className="y-examination-class"
                           checked={itemData.examinationFlag === '1'}
                           onChange={this.handleBodyChangeExaminationFlag}
                    />
                    &nbsp;{itemData.examinationClassLabel}
                </td>
                <td align="center">
                    <input type="radio" value="1"
                           name={"name_"+itemData.examinationClassValue}
                           checked={itemData.score === '1'}
                           onChange={this.handleBodyChangeExaminationStatus}
                    />
                </td>
                <td align="center">
                    <input type="radio" value="2"
                           name={"name_"+itemData.examinationClassValue}
                           checked={itemData.score === '2'}
                           onChange={this.handleBodyChangeExaminationStatus}
                    />
                </td>
                <td >
                    <input type="radio" value="3"
                           style={{marginLeft:"20px"}}
                           name={"name_"+itemData.examinationClassValue}
                           checked={itemData.score === '3'}
                           onChange={this.handleBodyChangeExaminationStatus}
                    />
                    {
                        itemData.score === '3' ?
                            (<span className="text-success y-hand"
                                   style={{marginLeft:"5px"}}
                                   onClick={this.showUnqualifiedSelectModal}
                            >
                                    请选择
                                </span>)
                            : null
                    }
                </td>
                <td><div className="y-hand text-info"
                         onClick={this.showMarkingModal}
                    >备注</div>
                </td>
            </tr>
        ) ;
    }

}

export default ExaminationBody ;