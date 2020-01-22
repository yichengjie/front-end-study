import React,{Component,Fragment} from 'react' ;
//import {Input, Upload, Icon, message,InputNumber,Button,Modal ,Select,Spin } from 'antd';
import {Input,InputNumber,Upload,Icon,Message,Button,Dialog,Select,Loading} from 'element-react' ;
import moment from 'moment';
import {ajaxWithComplexParams} from "components/common/util";
import _ from 'lodash' ;
const { Option } = Select;
//const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
let uploadPhotoProps = {
    name: 'file',
    action: '/api/upload/uploadSubmit',
    headers: {
        authorization: 'authorization-text',
    },
    listType:"picture-card",
} ;

const uploadButton = (
    <div>
        <Icon name="plus" />
        <div className="ant-upload-text">上传图片</div>
    </div>
);
class ElectronicClassCard extends Component{
    constructor(props){
        super(props) ;
        document.title = "活动发布";
        this.state = {
            activityType: '1',//活动类型
            effectiveTime: 7,
            activityDescribe:'',//活动介绍
            //发布图片部分
            previewVisible: false,
            previewImage: '',
            fileList: [],
            loading:false,
            photoUploading:false ,//照片上传中
        };
        this.handleSimpleInputChange = this.handleSimpleInputChange.bind(this) ;
        this.handleCancelPreview = this.handleCancelPreview.bind(this) ;
        this.handlePreview = this.handlePreview.bind(this) ;
        this.handleChangePhoto = this.handleChangePhoto.bind(this) ;
        this.handleSubmitForm = this.handleSubmitForm.bind(this) ;
        this.handleChangeActivityType = this.handleChangeActivityType.bind(this) ;
        this.handleEffectiveTimeChange = this.handleEffectiveTimeChange.bind(this) ;
    }

    //简单字段值修改
    handleSimpleInputChange(name){
        return (value) =>{
            this.setState({[name]:value}) ;
        }
    }
    handleEffectiveTimeChange(value){
        this.setState({effectiveTime:value}) ;
    }

    handleChangeActivityType(value){
        this.setState({activityType:value,
            previewVisible:false,
            previewImage:'',
            fileList:[],
            activityDescribe:'',
            photoUploading:false
        }) ;
    }

    //取消预览
    handleCancelPreview () {
        this.setState({ previewVisible: false });
    }
    //预览
    async handlePreview (file) {
        console.info('file.url : ' + file.url)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    }
    handleChangePhoto ({fileList}) {
        let newFileList = [...fileList];
        newFileList = newFileList.slice(-6);
        let uploadingFlag = false;
        newFileList = newFileList.map(file => {
            if(file.status ==='uploading'){
                uploadingFlag = true ;
            }
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        this.setState({ fileList:newFileList,photoUploading:uploadingFlag });
    }
    //表单提交
    handleSubmitForm(){
        let {teacherNumber,campusNumber} = this.props.match.params;
        let {activityType,effectiveTime,activityDescribe,fileList} = this.state ;
        fileList = _.filter(fileList,item => item.url !== undefined);
        let formFileList = _.map(fileList,item => item.url) ;
        //班级通知，则通知内容必填
        if(activityType ==='1'){
            if(_.trim(activityDescribe) === ''){
                Message.error("通知内容不能为空!")
                return false;
            }
        }else if(activityType === '2'){//班级风采则必须上传图片
            if(formFileList.length == 0){
                Message.error("图片发布不能为空!")
                return false;
            }
        }
        let curDate = moment() ;
        let startTime = curDate.format(dateFormat) ;
        let endTime = curDate.add(effectiveTime,'days').format(dateFormat) ;
        let formData = {
            teacherNumber,
            campusNumber,
            activityType,
            startTime,
            endTime,
            activityDescribe,
            fileList:formFileList
        } ;
        this.setState({loading:true}) ;
        let url = '/api/yiClassAndStudent/submitElectronicClassCardForm' ;
        let ajaxing = ajaxWithComplexParams(url,formData) ;
        ajaxing.then((data) =>{
            this.setState({loading:false}) ;
            if(data.flag === 'false'){
                Message.error("提交电子班牌数据报错!") ;
            }
        }).catch((error) =>{
            this.setState({loading:false}) ;
            Message.error("提交电子班牌数据报错!") ;
        });

    }
    handleRemove(file, fileList) {
        console.log(file, fileList);
    }
    //班级风采图片
    renderPhotoUploadBody(){
        const { previewVisible, previewImage, fileList } = this.state;
        const fileList2 = [
            {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'},
            {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'}
        ]
        return (
            <Fragment>
                <div className="y-row y-upload-status">
                    <div className="y-title">图片发布</div>
                    <div className="y-content">{fileList.length}/6</div>
                </div>
                <div className="y-row clearfix">
                    <Upload
                        className="upload-demo"
                        action="//jsonplaceholder.typicode.com/posts/"
                        onPreview={this.handlePreview}
                        onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                        fileList={fileList2}
                        listType="picture"
                        tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
                    >
                        <Button size="small" type="primary">点击上传</Button>
                    </Upload>

                    {/*<Upload {...uploadPhotoProps}
                            multiple={true}
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChangePhoto}>
                        {fileList.length >= 6 ? null : uploadButton}
                    </Upload>*/}
                    {/*<Modal visible={previewVisible} footer={null} onCancel={this.handleCancelPreview}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>*/}
                </div>
            </Fragment>
        ) ;
    }

    render() {
        let {activityType} = this.state ;
        let contentPlaceHolder = '请输入通知内容' ;
        if(activityType === '2'){
            contentPlaceHolder = '请输入班级风采介绍' ;
        }
        console.info("===========> " , this.state.effectiveTime)
        return(
            <Loading loading={this.state.loading || this.state.photoUploading }>
                <div className="y-form">
                    <div className="y-row">
                        <div className="y-label" >消息类型：</div>
                        <div className="y-input">
                            <Select value={this.state.activityType}
                                    onChange={this.handleChangeActivityType}
                                    style={{ width: "100%" }} >
                                <Option value="1" label="班级通知" />
                                <Option value="2" label="班级风采"/>
                            </Select>
                        </div>
                    </div>
                    <div className="y-row">
                        <div className="y-label" >显示天数：</div>
                        <div className="y-input">
                            <InputNumber
                                 defaultValue={this.state.effectiveTime}
                                 value={this.state.effectiveTime}
                                 style={{width:'100%'}}
                                 onChange={this.handleEffectiveTimeChange}
                                 min="1" max="30" />
                        </div>
                    </div>
                    <div className="y-row">
                     <Input
                         type="textarea"
                         autosize={{ minRows: 8, maxRows: 8}}
                         value={this.state.activityDescribe}
                         onChange={this.handleSimpleInputChange('activityDescribe')}
                         placeholder={contentPlaceHolder}/>
                    </div>
                    {this.state.activityType === '2' ? this.renderPhotoUploadBody() : null}
                    <div className="y-row" style={{marginTop:"30px"}}>
                        <Button type="primary"
                                onClick={this.handleSubmitForm}
                                style={{width:"100%"}}
                            >
                            发布
                        </Button>
                    </div>
                </div>
            </Loading>
        ) ;
    }
}

export default ElectronicClassCard ;
