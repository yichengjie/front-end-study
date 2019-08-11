import React,{Component,createRef} from 'react' ;
import ExaminationHeader from './header' ;
import ExaminationBody from './body' ;
import {Drawer, Input, Modal,Checkbox} from "antd";

const { TextArea } = Input;


class RoutineExamination extends Component{
    constructor(props){
        super(props) ;
        let {teacherNumber,campusNumber} = this.props.match.params;

        console.info('teacherNumber: ' ,teacherNumber) ;
        console.info('campusNumber: ' ,campusNumber) ;

        let { title,classType,itemType } = this.props.location.state ;
        document.title = title;
        this.state = {
            classList:[],
            ////////////////////////
            markingVisible: false,
            markingContent:'',
            markingIndex:-1,
            ////////////////////////
            unqualifiedVisible:false,
            unqualifiedIndex:-1,
            quotaVisible:false,
            curQuotaList:[], //当前编辑行的指标集合

        } ;

        console.info("classType : " + classType + " , itemType : " + itemType)
        this.handleSimpleValue = this.handleSimpleValue.bind(this) ;
        this.handleHeaderSubmitForm = this.handleHeaderSubmitForm.bind(this) ;
        this.handleBodyUpdateClassList = this.handleBodyUpdateClassList.bind(this) ;
        //每一行后面的radio按钮选中事件
        this.handleBodyChangeItemValue = this.handleBodyChangeItemValue.bind(this) ;
        //显示备注对话框
        this.showMarkingDialog = this.showMarkingDialog.bind(this) ;
        //隐藏备注对话框处理
        this.hideMarkingDialog = this.hideMarkingDialog.bind(this) ;
        //点击备注确认时事件处理
        this.okMarkingDialog = this.okMarkingDialog.bind(this) ;
        //显示不合格理由对话框
        this.showUnqualifiedSelectDialog = this.showUnqualifiedSelectDialog.bind(this) ;
        //隐藏不合格理由对话框
        this.hideUnqualifiedSelectDialog = this.hideUnqualifiedSelectDialog.bind(this) ;
        this.showQuotaDialog = this.showQuotaDialog.bind(this) ;
        this.okQuotaDialog = this.okQuotaDialog.bind(this) ;
        this.hideQuotaDialog = this.hideQuotaDialog.bind(this) ;
        this.handleChangeQuotaStatus = this.handleChangeQuotaStatus.bind(this) ;
    }

    componentDidMount() {
        //页面加载完成以后
        //1.查询教师所带的年级和ji
    }


    //简单键值属性修改
    handleSimpleValue(name,value){
        this.setState({[name]:value}) ;
    }

    handleHeaderSubmitForm(e){
        console.info(this.state)
    }

    handleBodyUpdateClassList(classList){
        this.setState({classList}) ;
    }
    //列表项中的值改变的时候
    handleBodyChangeItemValue(index,name,value){
        let newArr = [...this.state.classList] ;
        let obj = newArr[index] ;
        obj[name] = value ;
        //当后面的radio被点击时，顺便勾选每一行前面的checkbox
        if(name === 'score' || name === 'markingContent'){ //
            obj.examinationFlag = "1" ; //1:选中，0:非选中
        }
        this.setState({classList:newArr}) ;
    }

    showMarkingDialog(index,value){
        this.setState({
            markingVisible:true,
            markingContent:value,
            markingIndex:index
        })
    }

    //隐藏备注对话框
    hideMarkingDialog(){
        this.setState({
            markingVisible: false,
            markingContent:''
        });
    }
    //备注确认对话框
    okMarkingDialog(){
        let index = this.state.markingIndex ;
        let name = "markingContent" ;
        let value = this.state.markingContent ;
        this.hideMarkingDialog() ;
        this.handleBodyChangeItemValue(index,name,value) ;
    }

    showUnqualifiedSelectDialog(index){
        this.setState({unqualifiedVisible:true,unqualifiedIndex:index}) ;
    }

    hideUnqualifiedSelectDialog(){
        this.setState({unqualifiedVisible:false}) ;
    }

    //显示指标对话框
    showQuotaDialog(){
        let obj = this.state.classList[this.state.unqualifiedIndex] ;
        let curQuotaList = obj.quotaList || [] ;
        //显示指标对话框时将，不合格对话框隐藏
        this.setState({
            quotaVisible:true,
            unqualifiedVisible:false,
            curQuotaList:curQuotaList
        }) ;
    }

    okQuotaDialog(){
        let curQuotaList = this.state.curQuotaList ;
        this.setState({quotaVisible:false,curQuotaList:[]}) ;
        let newArr = [...this.state.classList] ;
        let obj = newArr[this.state.unqualifiedIndex] ;
        obj.quotaList = [...this.state.curQuotaList] ;
        this.setState({classList:newArr}) ;
    }

    hideQuotaDialog(){
        this.setState({quotaVisible:false,curQuotaList:[]}) ;
    }

    handleChangeQuotaStatus(checked,value){
        let curQuotaList = this.state.curQuotaList ;
        if(checked){
            this.setState({curQuotaList:[...curQuotaList,value]}) ;
        }else {
            let newArr = [] ;
            for(let i = 0 ; i < curQuotaList.length ; i ++){
                if(curQuotaList[i] !== value){
                    newArr.push(curQuotaList[i]) ;
                }
            }
            this.setState({curQuotaList:newArr}) ;
        }
    }

    render() {

        return (
            <div>
                <ExaminationHeader
                    handleSimpleValue = {this.handleSimpleValue}
                    handleHeaderSubmitForm = {this.handleHeaderSubmitForm}
                />
                <ExaminationBody
                    classList ={this.state.classList}
                    handleBodyUpdateClassList = {this.handleBodyUpdateClassList}
                    handleBodyChangeItemValue = {this.handleBodyChangeItemValue}
                    showMarkingDialog = {this.showMarkingDialog}
                    showUnqualifiedSelectDialog = {this.showUnqualifiedSelectDialog}
                />
                <MarkContentDialog
                    markingVisible = {this.state.markingVisible}
                    markingContent = {this.state.markingContent}
                    okMarkingDialog = {this.okMarkingDialog}
                    hideMarkingDialog = {this.hideMarkingDialog}
                    handleSimpleValue = {this.handleSimpleValue}
                />
                <UnqualifiedSelectDialog
                    unqualifiedVisible ={this.state.unqualifiedVisible}
                    hideUnqualifiedSelectDialog ={this.hideUnqualifiedSelectDialog}
                    showQuotaDialog = {this.showQuotaDialog}
                />
                <QuotaDialog
                    quotaVisible = {this.state.quotaVisible}
                    okQuotaDialog = {this.okQuotaDialog}
                    hideQuotaDialog = {this.hideQuotaDialog}
                    curQuotaList = {this.state.curQuotaList}
                    handleChangeQuotaStatus = {this.handleChangeQuotaStatus}
                />
            </div>
        ) ;
    }
}



class UnqualifiedSelectDialog extends Component{

    constructor(props){
        super(props) ;
        this.handlePhotoClick = this.handlePhotoClick.bind(this) ;
        this.myPhotoRef = createRef();
    }

    handlePhotoClick(e){
        console.info("拍照被点击....")
        this.myPhotoRef.current.click();
        this.props.hideUnqualifiedSelectDialog() ;
    }

    handlePhotoChange(e){
        let value = e.target.value ;
        console.info(value)
    }

    render() {
        let {unqualifiedVisible,hideUnqualifiedSelectDialog,showQuotaDialog} = this.props ;
        return (
            <Drawer
                className="y-unqualified-dialog"
                height="125"
                closable={false}
                placement="bottom"
                onClose={hideUnqualifiedSelectDialog}
                visible={unqualifiedVisible}
            >
                <div className="y-unqualified-container">
                    <div className="y-unqualified-item"
                         onClick={showQuotaDialog}
                    >指标</div>
                    <div className="y-unqualified-item" onClick={this.handlePhotoClick}>
                        拍照
                        <input ref={this.myPhotoRef} type="file"
                               style={{display: "none"}}
                               onChange={this.handlePhotoChange}
                        />
                    </div>
                    <div className="y-unqualified-item"
                         onClick={hideUnqualifiedSelectDialog}
                    >取消</div>
                </div>
            </Drawer>
        ) ;
    }
}



class MarkContentDialog extends Component{

    constructor(props){
        super(props) ;
        this.handleMarkingContentInput = this.handleMarkingContentInput.bind(this) ;
    }

    //备注输入框输入处理
    handleMarkingContentInput(e){
        let value =  e.target.value ;
        this.props.handleSimpleValue('markingContent',value) ;
    }

    render() {
        let {markingVisible,markingContent,okMarkingDialog,hideMarkingDialog} = this.props ;
        return (
            <Modal
                title="自定义原因"
                visible={markingVisible}
                onOk={okMarkingDialog}
                onCancel={hideMarkingDialog}
                okText="确认"
                cancelText="取消"
            >
                <TextArea rows={4}
                    value={markingContent}
                    onChange={this.handleMarkingContentInput}
                />
            </Modal>
        );
    }
}



class QuotaDialog extends Component{

    constructor(props) {
        super(props);
        this.state = {
            quotaOptions: [
                {label:'队形',value:'1'} ,
                {label:'缺人',value:'2'},
                {label:'其他',value:'3'},
                {label:'迟到',value:'4'},
                {label:'没穿号砍',value:'5'}
            ]
        }
        this.handleChangeQuotaStatus = this.handleChangeQuotaStatus.bind(this) ;
    }


    //改变指标状态时
    handleChangeQuotaStatus(e){
        let checked = e.target.checked ;
        let value = e.target.value ;
        this.props.handleChangeQuotaStatus(checked,value) ;
    }

    containsItem(list,item){
       for(let i =0 ; i < list.length ; i++){
          if(list[i] === item ){
              return true ;
          }
       }
       return false;
    }


    render() {
        let {quotaVisible,okQuotaDialog,hideQuotaDialog,curQuotaList} = this.props ;
        return (
            <Modal
                className="y-quota-dialog"
                title="请选择"
                visible={quotaVisible}
                onOk={okQuotaDialog}
                onCancel={hideQuotaDialog}
                okText="确认"
                cancelText="取消"
            >
                {
                    this.state.quotaOptions.map((item,index) =>{
                        return (
                            <Checkbox key ={index}
                                className="y-quota-item"
                                value={item.value}
                                checked={this.containsItem(curQuotaList,item.value)}
                                onChange={this.handleChangeQuotaStatus}>
                                {item.label}
                            </Checkbox>
                        ) ;
                    })
                }
            </Modal>
        );
    }
}


export default RoutineExamination ;