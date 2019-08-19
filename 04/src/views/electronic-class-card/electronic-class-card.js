import React,{Component} from 'react' ;
import { Input ,Upload, Icon, message,Button,Modal } from 'antd';
import {ajaxWithComplexParams} from "components/common/util";
const { TextArea } = Input;

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
    listType:"picture-card"
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
            loading: false,
            activityTitle:'', //活动标题
            activityContent:'',//活动内容
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
    }

    //简单字段值修改
    handleSimpleInputChange(e){
        let name = e.target.name ;
        let value = e.target.value ;
        this.setState({[name]:value}) ;
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
        let {activityTitle,activityContent,fileList} = this.state ;
        console.info('activityTitle : ' + activityTitle) ;
        console.info('activityTitle : ' + activityContent) ;
        console.info('fileList : ' ,fileList)
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        return(
            <div className="y-form">
                <div className="y-row">
                    <Input size="large"
                           name = "activityTitle"
                           value={this.state.activityTitle}
                           onChange={this.handleSimpleInputChange}
                           placeholder="请输入活动标题" />
                </div>
                <div className="y-row">
                    <TextArea rows={8}
                              name = "activityContent"
                              value={this.state.activityContent}
                              onChange={this.handleSimpleInputChange}
                              placeholder="请输入活动内容"
                    />
                </div>

                <div className="y-row y-upload-status">
                    <div className="y-title">图片发布</div>
                    <div className="y-content">{fileList.length}/6</div>
                </div>

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
