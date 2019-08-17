import React,{Component} from 'react' ;
import { Input ,Upload, Icon, message,Button} from 'antd';
import {ajaxWithComplexParams} from "components/common/util";
const { TextArea } = Input;


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class ElectronicClassCard extends Component{
    constructor(props){
        super(props) ;
        document.title = "活动发布";
        this.state = {
            loading: false,
        };
    }

    componentDidMount() {
        let url = '/api/classAndStudent/addInfo';
        let params = {username:'yicj'} ;
        let ajaxing = ajaxWithComplexParams(url,params) ;
        ajaxing.then((data) =>{
            console.info(data);
        }).catch(function (e) {
            console.info(e) ;
        })
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };


    render() {

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;

        return(
            <div className="y-form">
                <div className="y-row">
                    <Input size="large" placeholder="请输入活动标题" />
                </div>
                <div className="y-row">
                    <TextArea rows={8} placeholder="请输入活动内容" />
                </div>

                <div className="y-row y-upload-status">
                    <div className="y-title">图片发布</div>
                    <div className="y-content">0/9</div>
                </div>

                <div className="y-row">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </div>

                <div className="y-row" style={{marginTop:"30px"}}>
                    <Button type="primary" block size="large">
                        发布
                    </Button>
                </div>
            </div>
        ) ;
    }
}

export default ElectronicClassCard ;
