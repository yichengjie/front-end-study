<template>
    <div>
        <div class="row" style="margin-top: 20px">
            <div class="label">消息类型：</div>
            <el-select v-model="activityType" placeholder="请选择"
                       size="small" style="flex: 1" v-on:change="handleChangeActivityType">
                <el-option label="班级通知" value="1" />
                <el-option label="班级风采" value="2" />
            </el-select>
        </div>
        <div class="row">
            <div class="label">显示天数：</div>
            <el-input-number v-model="effectiveTime" size="small"
                     style="flex: 1" :min="1" :max="30" label="显示天数" />
        </div>
        <div class="row">
            <el-input type="textarea" :rows="8" :placeholder="contentPlaceHolder"
                    v-model="activityDescribe">
            </el-input>
        </div>
        <div class="row">
            <div class="label">图片发布</div>
            <div class="right">{{pictureInfoList.length}}/6</div>
        </div>
        <div class="row" v-if="activityType === '2'">
            <el-upload
                    action="/api/upload/uploadSubmit"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :limit="6"
                    multiple
                    :on-success="handleUploadSuccess"
                    :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        <el-button type="primary" style="width: 100%;margin-top: 15px" v-on:click="handleSubmitBtnClick">发布</el-button>
    </div>
</template>

<script>
    import _ from 'lodash' ;
    import { Loading } from 'element-ui';
    import {ajaxWithComplexParams,convertDataToString , dateAddNum} from "../../components/util";
    export default {
        name: "electronicClassCard",
        data:function () {
            return{
                activityType:'1',
                effectiveTime:7,
                activityDescribe:'',
                pictureInfoList:[],//上传照片地址
                contentPlaceHolder:'请输入通知内容',
                dialogImageUrl: '',
                dialogVisible: false,
            } ;
        },
        mounted(){
            document.title = "活动发布";
        },
        methods:{
            handleChangeActivityType(value){
                if(value === '1'){
                    this.contentPlaceHolder = '请输入通知内容' ;
                }else {
                    this.contentPlaceHolder = "请输入班级风采介绍" ;
                }
            },
            handleRemove(file, fileList) {
                let newList =  _.filter(this.pictureInfoList,item => item.key !== file.url) ;
                this.pictureInfoList = newList ;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleUploadSuccess(res, file, fileList){
                let key =  file.url ;
                let value = res.url ;
                this.pictureInfoList.push({key:key,value:value}) ;
            },
            handleSubmitBtnClick(){
                let {teacherNumber,campusNumber} = this.$route.params;
                let activityType = this.activityType ;
                let effectiveTime = this.effectiveTime ;
                let activityDescribe = this.activityDescribe ;
                let pictureInfoList = this.pictureInfoList ;
                //班级通知，则通知内容必填
                if(activityType ==='1'){
                    if(_.trim(activityDescribe) === ''){
                        this.$message.error("通知内容不能为空!")
                        return false;
                    }
                }else if(activityType === '2'){//班级风采则必须上传图片
                    if(pictureInfoList.length == 0){
                        this.$message.error("图片发布不能为空!")
                        return false;
                    }
                }
                let curDate = new Date();
                let startTime = convertDataToString(curDate);
                let endTime = convertDataToString(dateAddNum(curDate,effectiveTime)) ;
                let fileList = _.map(this.pictureInfoList,item=> item.value) ;

                let formData = {
                    teacherNumber,
                    campusNumber,
                    activityType,
                    startTime,
                    endTime,
                    activityDescribe,
                    fileList:fileList
                } ;
                let url = '/api/yiClassAndStudent/submitElectronicClassCardForm' ;
                let loadingObj = Loading.service({ fullscreen: true });
                let ajaxing = ajaxWithComplexParams(url,formData) ;
                ajaxing.then((data) =>{
                    console.info("resp data : " , data)
                    loadingObj.close() ;
                    if(data.flag === 'false'){
                        this.$message.error("提交电子班牌数据报错!") ;
                    }
                }).catch((error) =>{
                    loadingObj.close() ;
                    this.$message.error("提交电子班牌数据报错!") ;
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .row{
        display: flex;
        margin-bottom: 12px;
        .right{
            width: 100%;
            height: 32px;
            line-height: 32px;
            text-align: right;
            padding-right: 5px;
        }
    }
    .label{
        font-weight: 600;
        height: 32px;
        line-height: 32px;
        width: 80px;
    }
</style>
