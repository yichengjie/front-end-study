import React,{Component} from 'react' ;
import ExaminationHeader from './header' ;
import ExaminationBody from './body' ;
import {Drawer, Input, Modal,Checkbox} from "antd";
const { TextArea } = Input;

class RoutineExamination extends Component{
    constructor(props){
        super(props) ;
        let { title,classType,itemType } = this.props.location.state ;
        document.title = title;
        this.state = {
            examinationType:'1' , //年级,级部门
            examinationGrade:'2' ,//高几级
            examinationDate:'2019/07/30',
            classList:[],
            ////////////////////////
            markingVisible: false,
            markingIndex:-1,
            markingContent:'',
            ////////////////////////
            unqualifiedVisible:false,
            unqualifiedIndex:-1,
            quotaVisible:false
        } ;

        console.info("classType : " + classType + " , itemType : " + itemType)
        this.handleHeaderChangeInput = this.handleHeaderChangeInput.bind(this) ;
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
        //备注内容输入处理函数
        this.handleMarkingContentInput = this.handleMarkingContentInput.bind(this) ;
        //显示不合格理由对话框
        this.showUnqualifiedSelectDialog = this.showUnqualifiedSelectDialog.bind(this) ;
        //隐藏不合格理由对话框
        this.hideUnqualifiedSelectDialog = this.hideUnqualifiedSelectDialog.bind(this) ;
        this.showQuotaDialog = this.showQuotaDialog.bind(this) ;
        this.okQuotaDialog = this.okQuotaDialog.bind(this) ;
        this.hideQuotaDialog = this.hideQuotaDialog.bind(this) ;
        this.handleChangeQuotaStatus = this.handleChangeQuotaStatus.bind(this) ;
    }

    handleHeaderChangeInput(name,value){
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
            markingContent:'',
            markingIndex:-1
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
        //显示指标对话框时将，不合格对话框隐藏
        this.setState({quotaVisible:true,unqualifiedVisible:false}) ;
    }

    okQuotaDialog(){
        this.setState({quotaVisible:false}) ;
    }

    hideQuotaDialog(){
        this.setState({quotaVisible:false}) ;
    }

    //备注输入框输入处理
    handleMarkingContentInput(e){
        let value =  e.target.value ;
        this.setState({markingContent:value}) ;
    }

    //改变指标状态时
    handleChangeQuotaStatus(e){
        console.log(`checked = ${e.target.checked}`);
    }


    //不合格时请选中弹出框
    renderUnqualifiedSelectDialog(){
        return (
            <Drawer
                className="y-unqualified-dialog"
                height="125"
                closable={false}
                placement="bottom"
                onClose={this.hideUnqualifiedSelectDialog}
                visible={this.state.unqualifiedVisible}
            >
                <div className="y-unqualified-container">
                    <div className="y-unqualified-item"
                         onClick={this.showQuotaDialog}
                    >指标</div>
                    <div className="y-unqualified-item"

                    >拍照</div>
                    <div className="y-unqualified-item"
                         onClick={this.hideUnqualifiedSelectDialog}
                    >取消</div>
                </div>
            </Drawer>
        ) ;
    }

    renderMarkContentDialog(){
        return (
            <Modal
                title="自定义原因"
                visible={this.state.markingVisible}
                onOk={this.okMarkingDialog}
                onCancel={this.hideMarkingDialog}
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

    renderQuotaDialog(){
        return (
            <Modal
                className="y-quota-dialog"
                title="请选择"
                visible={this.state.quotaVisible}
                onOk={this.okQuotaDialog}
                onCancel={this.hideQuotaDialog}
                okText="确认"
                cancelText="取消"
            >
                <Checkbox className="y-quota-item" onChange={this.handleChangeQuotaStatus}>队伍、队形</Checkbox><br/>
                <Checkbox className="y-quota-item" onChange={this.handleChangeQuotaStatus}>缺人</Checkbox><br/>
                <Checkbox className="y-quota-item" onChange={this.handleChangeQuotaStatus}>其他</Checkbox><br/>
                <Checkbox className="y-quota-item" onChange={this.handleChangeQuotaStatus}>迟到</Checkbox><br/>
                <Checkbox className="y-quota-item" onChange={this.handleChangeQuotaStatus}>没穿号砍</Checkbox>
            </Modal>
        ) ;
    }



    render() {

        return (
            <div>
                <ExaminationHeader
                    examinationType ={this.state.examinationType}
                    examinationGrade ={this.state.examinationGrade}
                    examinationDate = {this.state.examinationDate}
                    handleHeaderChangeInput = {this.handleHeaderChangeInput}
                    handleHeaderSubmitForm = {this.handleHeaderSubmitForm}
                />
                <ExaminationBody
                    classList ={this.state.classList}
                    handleBodyUpdateClassList = {this.handleBodyUpdateClassList}
                    handleBodyChangeItemValue = {this.handleBodyChangeItemValue}
                    showMarkingDialog = {this.showMarkingDialog}
                    showUnqualifiedSelectDialog = {this.showUnqualifiedSelectDialog}
                />
                {this.renderMarkContentDialog()}
                {this.renderUnqualifiedSelectDialog()}
                {this.renderQuotaDialog()}
            </div>
        ) ;
    }
}

export default RoutineExamination ;