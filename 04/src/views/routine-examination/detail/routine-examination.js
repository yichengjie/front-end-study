import React,{Component} from 'react' ;
import ExaminationHeader from './header' ;
import ExaminationBody from './body' ;
import { ajaxWithSimpleParams,ajaxWithComplexParams } from "components/common/util";
import _ from 'lodash' ;
//import { Input,  Checkbox, Modal, message, Upload, Drawer} from "antd";
//const { TextArea } = Input;
import {Input,Checkbox,Dialog ,Button, Message ,Upload} from 'element-react' ;

let uploadPhotoProps = {
    name: 'file',
    action: '/api/upload/uploadSubmit',
    headers: {
        authorization: 'authorization-text',
    }
} ;

class RoutineExamination extends Component{
    constructor(props){
        super(props) ;
        let { title,itemType ,quotaOptions} = this.props.location.state ;
        console.info('itemType : ' + itemType)
        document.title = title;
        this.state = {
            bodyLoading:false,
            classList:[],
            quotaOptions:quotaOptions,
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
        //当输入头部输入框内容有变化的时候更新班级列表
        this.handlerHeaderChangeFormData = this.handlerHeaderChangeFormData.bind(this) ;
        this.handleBodyChangePhotoUrl = this.handleBodyChangePhotoUrl.bind(this) ;
        this.showLoading = this.showLoading.bind(this) ;
    }

    componentDidMount() {
        //页面加载完成以后
        //1.查询教师所带的年级和
    }

    showLoading(){
        this.setState({bodyLoading:true}) ;
    }

    //简单键值属性修改
    handleSimpleValue(name,value){
        this.setState({[name]:value}) ;
    }

    handleHeaderSubmitForm(examinationDate){
        this.setState({bodyLoading:true}) ;
        let {teacherNumber} = this.props.match.params;
        let {classList} = this.state ;
        let selectedList = _.filter(classList, function(o) { return o.examinationFlag === '1'; });
        //如果一个都没选中，则不提交表单
        if(selectedList.length === 0){
            return ;
        }
        let url = '/api/yiClassAndStudent/submitRoutineExaminationForm' ;
        let params = {list:selectedList ,checkDate:examinationDate,submitTeacher:teacherNumber} ;
        let ajaxing = ajaxWithComplexParams(url,params) ;
        ajaxing.then((json) =>{
            this.setState({bodyLoading:false}) ;
        }).catch(function (err) {
            Message.error('保存信息出错!') ;
        })
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
    //年级:教师工号、年级id、校区
    //http://wx.ideamerry.com/api/classAndStudent/getClassInfoByGradeId/130052/2018/2
    //级部:教师工号、级部id、校区
    //http://wx.ideamerry.com/api/classAndStudent/getClassInfoByLevelDepartment/130052/2/2
    handlerHeaderChangeFormData(gradeOrLevelDepartmentType,gradeOrLevelDepartmentValue,examinationDate){
        let {teacherNumber,campusNumber} = this.props.match.params;
        let { itemType } = this.props.location.state ;
        let url =  '';
        //年级
        if(gradeOrLevelDepartmentType === 'grade'){
            url = `/api/yiClassAndStudent/getClassInfoByGradeId/${teacherNumber}/${gradeOrLevelDepartmentValue}/${campusNumber}` ;
        }else if(gradeOrLevelDepartmentType === 'levelDepartment'){
            url = `/api/yiClassAndStudent/getClassInfoByLevelDepartment/${teacherNumber}/${gradeOrLevelDepartmentValue}/${campusNumber}` ;
        }
        this.setState({bodyLoading:true}) ;
        let params = {checkDate:examinationDate,itemType:itemType} ;
        let ajaxing = ajaxWithSimpleParams(url,params) ;
        ajaxing.then((data) =>{
            this.setState({bodyLoading:false,classList:data}) ;
        }).catch(function (error) {
            Message.error("加载年级/级部信息出错!") ;
        }) ;
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
        let { title } = this.props.location.state ;
        let quotaOptions = this.state.quotaOptions || [];
        if(quotaOptions.length > 0){
            let obj = this.state.classList[this.state.unqualifiedIndex] ;
            let curQuotaList = obj.quotaList || [] ;
            //显示指标对话框时将，不合格对话框隐藏
            this.setState({
                quotaVisible:true,
                unqualifiedVisible:false,
                curQuotaList:curQuotaList
            }) ;
        }else{
            Message.error("【"+ title +"】对应的指标基础数据不存在!")
        }
    }

    okQuotaDialog(){
        this.setState({quotaVisible:false,curQuotaList:[]}) ;
        let newArr = [...this.state.classList] ;
        let obj = newArr[this.state.unqualifiedIndex] ;
        obj.quotaList = [...this.state.curQuotaList] ;
        this.setState({classList:newArr}) ;
    }

    handleBodyChangePhotoUrl(url){
        let newArr = [...this.state.classList] ;
        let obj = newArr[this.state.unqualifiedIndex] ;
        obj.photoUrl = url ;
        this.setState({classList:newArr,unqualifiedVisible:false,bodyLoading:false}) ;
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
        let {teacherNumber,campusNumber} = this.props.match.params;
        return (
            <div>
                <ExaminationHeader
                    handleSimpleValue = {this.handleSimpleValue}
                    handleHeaderSubmitForm = {this.handleHeaderSubmitForm}
                    handlerHeaderChangeFormData = {this.handlerHeaderChangeFormData}
                    teacherNumber = {teacherNumber}
                    campusNumber ={campusNumber}
                />

                    <ExaminationBody
                        classList ={this.state.classList}
                        handleBodyUpdateClassList = {this.handleBodyUpdateClassList}
                        handleBodyChangeItemValue = {this.handleBodyChangeItemValue}
                        showMarkingDialog = {this.showMarkingDialog}
                        showUnqualifiedSelectDialog = {this.showUnqualifiedSelectDialog}
                        bodyLoading ={this.state.bodyLoading}
                        quotaOptions = {this.state.quotaOptions}
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
                    handleBodyChangePhotoUrl = {this.handleBodyChangePhotoUrl}
                    showLoading = {this.showLoading}
                />
                <QuotaDialog
                    quotaVisible = {this.state.quotaVisible}
                    okQuotaDialog = {this.okQuotaDialog}
                    hideQuotaDialog = {this.hideQuotaDialog}
                    curQuotaList = {this.state.curQuotaList}
                    handleChangeQuotaStatus = {this.handleChangeQuotaStatus}
                    quotaOptions ={this.state.quotaOptions}
                />
            </div>
        ) ;
    }
}


//不合格选择时弹出对话框
class UnqualifiedSelectDialog extends Component{
    constructor(props){
        super(props) ;
        //this.handlePhotoClick = this.handlePhotoClick.bind(this) ;
        this.handlePhotoChange = this.handlePhotoChange.bind(this) ;
        //this.myPhotoRef = createRef();
    }
    // handlePhotoClick(e){
    //     this.myPhotoRef.current.click();
    //     this.props.hideUnqualifiedSelectDialog() ;
    // }
    handlePhotoChange(info){
        this.props.showLoading() ;
        this.props.hideUnqualifiedSelectDialog() ;
        if (info.file.status === 'done') {
            //message.success(`图片上传成功`);
            let photoUrl  = info.file.response.url ;
            this.props.handleBodyChangePhotoUrl(photoUrl) ;
            console.info('photoUrl: ' ,photoUrl)
        } else if (info.file.status === 'error') {
            Message.error(`图片上传失败.`);
        }
    }

    render() {
        let {unqualifiedVisible,hideUnqualifiedSelectDialog,showQuotaDialog} = this.props ;
        return (
            <div className="y-unqualified-container">
                <div className="y-unqualified-item"
                     onClick={showQuotaDialog}
                >指标</div>
                <Upload  className="y-unqualified-item"
                         {...uploadPhotoProps}
                         showUploadList = {false}
                        onChange={this.handlePhotoChange}
                    >
                    <div className="y-photo">拍照</div>
                </Upload>
                <div className="y-unqualified-item"
                     onClick={hideUnqualifiedSelectDialog}
                >取消</div>
            </div>
        ) ;
    }
}


//不合格-备注时弹出对话框
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
            <Dialog
                title="自定义原因"
                size="tiny"
                visible={ markingVisible }
                onCancel={ hideMarkingDialog }
                lockScroll={ false }
            >
                <Dialog.Body>
                    <Input type="textarea" rows={4}
                           value={markingContent}
                           onChange={this.handleMarkingContentInput}
                    />
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={ hideMarkingDialog}>取消</Button>
                    <Button type="primary" onClick={ okMarkingDialog }>确定</Button>
                </Dialog.Footer>
            </Dialog>
        );
    }
}


//不合格-指标时弹出对话框
class QuotaDialog extends Component{

    constructor(props) {
        super(props);
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
          if(list[i] === (item +'')){
              return true ;
          }
       }
       return false;
    }

    render() {
        let {quotaVisible,okQuotaDialog,hideQuotaDialog,curQuotaList,quotaOptions} = this.props ;
        return (
            <Dialog
                title="请选择"
                size="tiny"
                visible={ quotaVisible }
                onCancel={ hideQuotaDialog }
                lockScroll={ false }
            >
                <Dialog.Body>
                    {
                        quotaOptions.map((item,index) =>{
                            return (
                                <Checkbox key ={index}
                                  className="y-quota-item"
                                  value={item.id +''}
                                  checked={this.containsItem(curQuotaList,item.id)}
                                  onChange={this.handleChangeQuotaStatus}
                                  label={item.title}/>
                            ) ;
                        })
                    }
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={ hideQuotaDialog}>取消</Button>
                    <Button type="primary" onClick={ okQuotaDialog }>确定</Button>
                </Dialog.Footer>
            </Dialog>
        );
    }
}


export default RoutineExamination ;
