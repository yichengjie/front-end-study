import React,{Component} from 'react' ;
import { Input ,Upload, Icon, message,Button,Modal ,Select,DatePicker } from 'antd';
import moment from 'moment';
const { Option } = Select;
//import {ajaxWithComplexParams} from "components/common/util";
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
            startTime:'',
            endTime:'',
            activityDescribe:'',//活动介绍
            activityDescribePlaceholder:'请输入通知内容',
            //发布图片部分
            previewVisible: false,
            previewImage: '',
            fileList: []
        };
        this.handleSimpleInputChange = this.handleSimpleInputChange.bind(this) ;
        this.handleCancelPreview = this.handleCancelPreview.bind(this) ;
        this.handlePreview = this.handlePreview.bind(this) ;
        this.handleChangePhoto = this.handleChangePhoto.bind(this) ;
        this.handleSubmitForm = this.handleSubmitForm.bind(this) ;
        this.handleChangeActivityType = this.handleChangeActivityType.bind(this) ;
    }

    //简单字段值修改
    handleSimpleInputChange(e){
        let name = e.target.name ;
        let value = e.target.value ;
        this.setState({[name]:value}) ;
    }

    handleChangeActivityType(value){
        let str = '请输入通知内容' ;
        if(value === '2'){
            str = '请输入班级风采介绍' ;
        }
        this.setState({activityType:value,
            activityDescribePlaceholder:str,
            previewVisible:false,
            previewImage:'',
            fileList:[]
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
    handleChangePhoto ({ file }) {
        if (file.status === 'done') {
            console.info('文件上传完成....')
            let photoUrl  = file.response.url ;
            let uid = new Date().getTime() +'' ;
            let obj = {uid: uid, name: 'image.png', status: 'done',
                url: photoUrl,
            } ;
            let newArr = [...this.state.fileList,obj] ;
            this.setState({fileList:newArr}) ;
        } else if (file.status === 'error') {
            message.error(`图片上传失败.`);
        }
    }
    //表单提交
    handleSubmitForm(){
        let {activityType,startTime,endTime,activityDescribe,fileList} = this.state ;
        alert(activityType + ', ' +startTime +', ' +  endTime +' , '+ activityDescribe +' , ' + JSON.stringify(fileList))
    }

    renderPhotoUploadTitle(){
        let {fileList} = this.state ;
        return (
            <div className="y-row y-upload-status">
                <div className="y-title">图片发布</div>
                <div className="y-content">{fileList.length}/6</div>
            </div>
        ) ;
    }

    renderPhotoUploadBody(){
        const { previewVisible, previewImage, fileList } = this.state;
        return (
            <div className="y-row clearfix">
                <Upload {...uploadPhotoProps}
                        onPreview={this.handlePreview}
                        onChange={this.handleChangePhoto}>
                    {fileList.length >= 6 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelPreview}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        ) ;
    }
    handTimeChange(name){
        return  (date, dateString) =>{
            this.setState({[name]:dateString})
        }
    }
    render() {
        let {startTime,endTime} = this.state ;

        return(
            <div className="y-form">
                <div className="y-row">
                    <Select value={this.state.activityType}
                            onChange={this.handleChangeActivityType}
                            style={{ width: "100%" }} >
                        <Option value="1">班级通知</Option>
                        <Option value="2">班级风采</Option>
                    </Select>
                </div>
                <div className="y-row">
                   <DatePicker
                       value={ startTime === ''? null : moment(startTime, dateFormat) }
                       format={dateFormat}
                       onChange={this.handTimeChange('startTime')}
                       style={{width:"49%",marginRight:'1%'}}
                       placeholder="起始时间"
                   />
                   <DatePicker
                       value={ endTime === '' ? null : moment(endTime, dateFormat)  }
                       format={dateFormat}
                       onChange={this.handTimeChange('endTime')}
                       style={{width:"49%",marginLeft:'1%'}}
                       placeholder="截止时间" />
                </div>
                <div className="y-row">
                    <TextArea rows={8}
                              name = "activityDescribe"
                              value={this.state.activityDescribe}
                              onChange={this.handleSimpleInputChange}
                              placeholder={this.state.activityDescribePlaceholder}
                    />
                </div>
                {
                    this.state.activityType === '2' ? this.renderPhotoUploadTitle() : null
                }
                {
                   this.state.activityType === '2' ? this.renderPhotoUploadBody() : null
                }
                <div className="y-row" style={{marginTop:"30px"}}>
                    <Button type="primary" block size="large" onClick={this.handleSubmitForm}>
                        发布
                    </Button>
                </div>
            </div>
        ) ;
    }
}

export default ElectronicClassCard ;
