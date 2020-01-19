import React,{Component,Fragment} from 'react' ;
import { Input ,Upload, Icon, message,InputNumber,Button,Modal ,Select,Spin } from 'antd';
import moment from 'moment';
import {ajaxWithComplexParams} from "components/common/util";
import _ from 'lodash' ;
const { Option } = Select;
const { TextArea } = Input;
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
        <Icon type="plus" />
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
    handleSimpleInputChange(e){
        let name = e.target.name ;
        let value = e.target.value ;
        this.setState({[name]:value}) ;
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
                message.error("通知内容不能为空!")
                return false;
            }
        }else if(activityType === '2'){//班级风采则必须上传图片
            if(formFileList.length === 0){
                message.error("图片发布不能为空!")
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
                message.error("提交电子班牌数据报错!") ;
            }
        }).catch((error) =>{
            this.setState({loading:false}) ;
            message.error("提交电子班牌数据报错!") ;
        });

    }
    //班级风采图片
    renderPhotoUploadBody(){
        const { previewVisible, previewImage, fileList } = this.state;
        return (
            <Fragment>
                <div className="y-row y-upload-status">
                    <div className="y-title">图片发布</div>
                    <div className="y-content">{fileList.length}/6</div>
                </div>
                <div className="y-row clearfix">
                    <Upload {...uploadPhotoProps}
                            multiple={true}
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChangePhoto}>
                        {fileList.length >= 6 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelPreview}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
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
        return(
            <Spin spinning={this.state.loading || this.state.photoUploading } delay={1}>
                <div className="y-form">
                    <div className="y-row">
                        <div className="y-label" >消息类型：</div>
                        <div className="y-input">
                            <Select value={this.state.activityType}
                                    onChange={this.handleChangeActivityType}
                                    style={{ width: "100%" }} >
                                <Option value="1">班级通知</Option>
                                <Option value="2">班级风采</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="y-row">
                        <div className="y-label" >显示天数：</div>
                        <div className="y-input">
                            <InputNumber
                                min={1} max={1000}
                                style={{width:'100%'}}
                                value={this.state.effectiveTime}
                                onChange={this.handleEffectiveTimeChange}
                                placeholder="有效期，单位：天"/>
                        </div>
                    </div>
                    <div className="y-row">
                     <TextArea rows={8}
                               name = "activityDescribe"
                               value={this.state.activityDescribe}
                               onChange={this.handleSimpleInputChange}
                               placeholder={contentPlaceHolder}/>
                    </div>
                    {this.state.activityType === '2' ? this.renderPhotoUploadBody() : null}

                    <div className="y-row" style={{marginTop:"30px"}}>
                        <Button type="primary" block size="large" onClick={this.handleSubmitForm}>
                            发布
                        </Button>
                    </div>
                </div>
            </Spin>
        ) ;
    }
}

export default ElectronicClassCard ;
