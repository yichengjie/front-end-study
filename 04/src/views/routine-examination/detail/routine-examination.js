import React,{Component} from 'react' ;
import ExaminationHeader from './header' ;
import ExaminationBody from './body' ;
import {Drawer, Input, Modal} from "antd";
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
            unqualifiedIndex:-1
        } ;

        console.info("classType : " + classType + " , itemType : " + itemType)
        this.handleHeaderChangeInput = this.handleHeaderChangeInput.bind(this) ;
        this.handleHeaderSubmitForm = this.handleHeaderSubmitForm.bind(this) ;
        this.handleBodyUpdateClassList = this.handleBodyUpdateClassList.bind(this) ;
        //每一行后面的radio按钮选中事件
        this.handleBodyChangeItemValue = this.handleBodyChangeItemValue.bind(this) ;
        //显示备注对话框
        this.showMarkingModal = this.showMarkingModal.bind(this) ;
        //隐藏备注对话框处理
        this.hideMarkingModal = this.hideMarkingModal.bind(this) ;
        //点击备注确认时事件处理
        this.okMarkingModal = this.okMarkingModal.bind(this) ;
        //备注内容输入处理函数
        this.handleMarkingContentInput = this.handleMarkingContentInput.bind(this) ;
        //显示不合格理由对话框
        this.showUnqualifiedSelectModal = this.showUnqualifiedSelectModal.bind(this) ;
        //隐藏不合格理由对话框
        this.hideUnqualifiedSelectModal = this.hideUnqualifiedSelectModal.bind(this) ;
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

    showMarkingModal(index,value){
        this.setState({
            markingVisible:true,
            markingContent:value,
            markingIndex:index
        })
    }

    //隐藏备注对话框
    hideMarkingModal(){
        this.setState({
            markingVisible: false,
            markingContent:'',
            markingIndex:-1
        });
    }
    //备注确认对话框
    okMarkingModal(){
        let index = this.state.markingIndex ;
        let name = "markingContent" ;
        let value = this.state.markingContent ;
        this.hideMarkingModal() ;
        this.handleBodyChangeItemValue(index,name,value) ;
    }
    //备注输入框输入处理
    handleMarkingContentInput(e){
        let value =  e.target.value ;
        this.setState({markingContent:value}) ;
    }

    showUnqualifiedSelectModal(index){
        this.setState({unqualifiedVisible:true,unqualifiedIndex:index}) ;
    }

    hideUnqualifiedSelectModal(){
        this.setState({unqualifiedVisible:false}) ;
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

    renderMarkContentDialog(){
        return (
            <Modal
                title="自定义原因"
                visible={this.state.markingVisible}
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
                    showMarkingModal = {this.showMarkingModal}
                    showUnqualifiedSelectModal = {this.showUnqualifiedSelectModal}
                />
                {this.renderMarkContentDialog()}
                {this.renderUnqualifiedSelectDialog()}
            </div>
        ) ;
    }
}

export default RoutineExamination ;