<template>
    <div>
        <el-form ref="form"  label-width="80px">
            <el-form-item label="班级/级部">
                <el-cascader v-model="gradeOrLevelDepartmentValue"
                             :options="options" size="small" style="width: 70%;"
                             @change="handleGradeOrLevelDepartmentChange"/>
            </el-form-item>

            <el-form-item label="检查日期">
                <el-date-picker type="date" format="yyyy-MM-dd"  placeholder="选择日期" size="small"
                        v-model="examinationDate" style="width: 70%;"
                        v-on:change="handleExaminationDateChange" />
                <el-button type="primary" style="margin-left: 10px"
                        size="small" v-on:click="handleSubmitBtnClick">保存</el-button>
            </el-form-item>
        </el-form>

        <table class="table table-striped">
            <thead>
            <tr>
                <th width="55"></th>
                <th width="50" align="center" style="text-align: center">
                    <el-tag type="warning" effect="dark" size="small">优秀</el-tag>
                </th>
                <th width="50" align="center" style="text-align:center">
                    <el-tag type="success" effect="dark" size="small">合格</el-tag>
                </th>
                <th style="text-align: left;">
                    <el-tag type="danger" effect="dark" size="small">不合格</el-tag>
                </th>
                <th width="80"></th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in tableData">
                    <td>
                        <input type ="checkbox" value ="true"
                                v-model ="item.checked"/>
                        {{item.label}}
                    </td>
                    <td>
                        <input type="radio" :name ="'name' + index" value ="1"
                               v-model="item.score" @click="handleClickRadioItem(item)"/>
                    </td>
                    <td>
                        <input type="radio" :name ="'name' + index" value ="2"
                               v-model="item.score" @click="handleClickRadioItem(item)"/>
                    </td>
                    <td style="text-align: left;padding-left: 15px">
                        <input type="radio" :name ="'name' + index" value ="3"
                               v-model="item.score" @click="handleClickRadioItem(item)"/>
                        <span class="text-info" v-if="item.score === '3'" v-on:click="handleOpenUnqualifiedDialog(index)">请选择</span>
                    </td>
                    <td>
                        <span class="text-info"  @click="handleOpenRemarksDialog(index)">
                          {{item.orgData.markingContent==='' ? "备注": item.orgData.markingContent}}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <el-dialog title="自定义原因"  class="test" :visible.sync="remarksDialogVisible"
                   width="90%" >
            <span >
                <el-input type="textarea" :rows="2" placeholder="请输入内容"  v-model="remarksItemContent"/>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="remarksDialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleRemarksConfirm" size="small">确 定</el-button>
            </span>
        </el-dialog>

        <el-drawer title="我是标题" direction="btt" :with-header="false" size="122px"
                :visible.sync="unqualifiedDialogVisible">
            <div class="y-unqualified-container">
                <div class="y-unqualified-item" v-on:click="handleOpenQuotaDialog">指标</div>
                <div class="y-unqualified-item border">拍照</div>
                <div class="y-unqualified-item">取消</div>
            </div>
        </el-drawer>

        <el-dialog title="请选择" :visible.sync="quotaDialogVisible"
                   width="90%" >
            <div class="quota-container">
                <div class="quota-item" v-for="(op, opIndex) in quotaOptions">
                    <input :id ="'opIndex'+opIndex" type="checkbox" :value="op.id" v-model='quotaItemArr' />
                    <label :for="'opIndex'+opIndex">{{op.title}}</label>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="quotaDialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleQuotaConfirm" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {ajaxWithoutParams,ajaxWithSimpleParams,ajaxWithComplexParams,convertDataToString} from "../../components/util";
    import _ from 'lodash' ;
    function dealTableData4Resp(respData) {
        return _.map(respData,item=>{
            //console.info(item)
            let checked = item.examinationFlag === '1' ;
            let label = item.examinationClassLabel.replace(/高\d{4}级/,'') ;
            label = label.replace("（","") ;
            label = label.replace("）","") ;
            label = label.replace("(","") ;
            label = label.replace(")","") ;
            let data = {label:label, checked:checked,score:item.score,orgData:item} ;
            return data ;
        }) ;
    }

    export default {
        name: "RoutineExaminationDetail",
        data() {
            return {
                value: [],
                examinationDate: new Date(),
                gradeOrLevelDepartmentType:'grade',
                gradeOrLevelDepartmentValue:[],
                options: [{
                    label:'年级',
                    value: 'grade',
                },{
                    label:'级部',
                    value:'levelDepartment',
                }],
                tableData:[],
                quotaOptions: [],//不合格指标选项
                operItemIndex: -1, //当前特殊操作数据index
                //1.备注相关
                remarksDialogVisible: false,//备注对话框显示隐藏
                remarksItemContent: '',
                //2.不合格相关
                //2.1 不合格类型选择
                unqualifiedDialogVisible:false,
                //2.2 不合格指标
                quotaDialogVisible: false,
                quotaItemArr:[],//当前选中指标集合
            }
        },
        mounted() {
            let {teacherNumber,campusNumber,quotaOptions} = this.$route.params ;
            this.quotaOptions = _.map(quotaOptions,item =>{
                item.id = item.id +'' ;
                return item ;
            }) ;
            console.info('quotaOptions : ' ,quotaOptions)
            let url = `/api/yiClassAndStudent/getGradeAndSubordinateDepartment/${teacherNumber}/${campusNumber}` ;
            let ajax = ajaxWithoutParams(url) ;
            ajax.then((data) =>{
                let {grade,levelDepartment} = data ;
                let gradeDefaultValue = grade.defaultValue ;
                let levelDepartmentDefaultValue = levelDepartment.defaultValue ;
                let defaultValueMap = {grade:gradeDefaultValue,levelDepartment:levelDepartmentDefaultValue} ;
                let defaultValue = defaultValueMap[this.gradeOrLevelDepartmentType] ;
                this.gradeOrLevelDepartmentValue = [gradeDefaultValue,levelDepartmentDefaultValue] ;
                let gradeOptionObj = {
                    label:'年级',
                    value: 'grade',
                    children: grade.options
                }
                let levelDepartmentObj = {
                    label:'级部',
                    value:'levelDepartment',
                    children: levelDepartment.options
                } ;
                let options = [gradeOptionObj,levelDepartmentObj] ;
                this.options = options ;
                //设置默认值
                this.gradeOrLevelDepartmentValue = [this.gradeOrLevelDepartmentType,defaultValue] ;
                //第一次进入页面是自动查询
                this.queryClassInfo4FormDataChange(this.gradeOrLevelDepartmentType,defaultValue) ;
            }).catch(function (error) {
                console.error(error) ;
               // Message.error("加载年级/级部信息出错!") ;
            }) ;
        },
        methods:{
            queryClassInfo4FormDataChange(gradeOrLevelDepartmentType,gradeOrLevelDepartmentValue){
                let {teacherNumber,campusNumber,itemType} = this.$route.params;
                let url =  '';
                if(gradeOrLevelDepartmentType === 'grade'){
                    url = `/api/yiClassAndStudent/getClassInfoByGradeId/${teacherNumber}/${gradeOrLevelDepartmentValue}/${campusNumber}` ;
                }else if(gradeOrLevelDepartmentType === 'levelDepartment'){
                    url = `/api/yiClassAndStudent/getClassInfoByLevelDepartment/${teacherNumber}/${gradeOrLevelDepartmentValue}/${campusNumber}` ;
                }
                let examinationDateStr = convertDataToString(this.examinationDate || new Date());
                let params = {checkDate:examinationDateStr,itemType:itemType} ;
                let ajaxing = ajaxWithSimpleParams(url,params) ;
                ajaxing.then((data) =>{
                    //console.info('data' ,data) ;
                    this.tableData = dealTableData4Resp(data) ;
                }).catch(function (error) {
                    console.error(error)
                    //Message.error("加载年级/级部信息出错!") ;
                }) ;
            },
            handleGradeOrLevelDepartmentChange(value){//班级、级部选择框变更
                let gradeOrLevelDepartmentType = value[0] ;
                let gradeOrLevelDepartmentValue = value[1] ;
                this.queryClassInfo4FormDataChange(gradeOrLevelDepartmentType,gradeOrLevelDepartmentValue) ;
            },
            handleExaminationDateChange(){
                let gradeOrLevelDepartmentType = this.gradeOrLevelDepartmentValue[0] || '';
                let gradeOrLevelDepartmentValue = this.gradeOrLevelDepartmentValue[1] || '';
                this.queryClassInfo4FormDataChange(gradeOrLevelDepartmentType,gradeOrLevelDepartmentValue) ;
            },
            handleClickRadioItem(item){//点击合格/优秀/不合格时处理函数
               item.checked = true ;
            },
            handleOpenRemarksDialog(index){//打开添加备注对话框
                this.remarksDialogVisible = true ;
                this.operItemIndex = index ;
                this.remarksItemContent = this.tableData[this.operItemIndex].orgData.markingContent || '' ;
            },
            handleOpenUnqualifiedDialog(index){//打开不合格类型对话框
                this.unqualifiedDialogVisible = true ;
                this.operItemIndex = index ;
            },
            handleOpenQuotaDialog(){//打开不合格指标对话框
                this.unqualifiedDialogVisible = false ;
                this.quotaDialogVisible = true ;
                let oldQuotaList = this.tableData[this.operItemIndex].orgData.quotaList ;
                //console.info('oldQuotaList : ' ,oldQuotaList)
                this.quotaItemArr = oldQuotaList ;
            },
            handleRemarksConfirm(){//点击添加备注确认按钮
                this.remarksDialogVisible = false ;
                //将remark的值保存起来
                this.tableData[this.operItemIndex].orgData.markingContent = this.remarksItemContent ;
            },
            handleQuotaConfirm(){//点击不合格指标确认按钮
                this.quotaDialogVisible = false ;
                let copyArr = _.map(this.quotaItemArr,item => item);
                this.tableData[this.operItemIndex].orgData.quotaList = copyArr ;
            },
            handleSubmitBtnClick(){
                let {teacherNumber,campusNumber,itemType} = this.$route.params;
                let selectedList = _.filter(this.tableData, o => o.checked);
                let newList = _.map(selectedList,o =>{
                    let orgData = o.orgData ;
                    orgData.score = o.score ;
                    return orgData ;
                }) ;
                //如果一个都没选中，则不提交表单
                if(selectedList.length === 0){
                    return ;
                }
                let url = '/api/yiClassAndStudent/submitRoutineExaminationForm' ;
                let examinationDateStr = convertDataToString(this.examinationDate || new Date());
                let params = {list:newList ,checkDate:examinationDateStr,submitTeacher:teacherNumber} ;
                let ajaxing = ajaxWithComplexParams(url,params) ;
                ajaxing.then((data) =>{
                   console.info(data)
                }).catch(function (err) {
                    console.error(err) ;
                    //Message.error('保存信息出错!') ;
                }) ;
            }
        }
    }
</script>

<style scoped lang="less">
    .el-form-item{
        margin-bottom: 5px;
    }
    .table{
        font-size: 12px;
        font-weight: 400;
    }

    .table > thead > tr > th{
        padding: 5px;
        text-align: center;
    }
    .table > tbody > tr > td{
        padding: 4px;
        text-align: center;
    }
    .text-info {
        color: #31708f;
    }
    .y-unqualified-container{
        .y-unqualified-item{
            height: 40px;
            line-height: 40px;
            padding: 0px 15px;
            text-align: center;
        }
        .border{
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
        }
    }
    .quota-container{
        padding: 0 20px;
        .quota-item{
            height: 40px;
            line-height: 40px;
        }
    }
</style>
