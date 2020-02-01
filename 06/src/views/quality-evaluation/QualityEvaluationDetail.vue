<template>
    <div>
        <el-form ref="form"  label-width="80px">
            <el-form-item label="评价日期">
                <el-date-picker type="date" format="yyyy-MM-dd"  placeholder="选择日期" size="small"
                    v-model="evaluationDate" style="width: 70%;" />
            </el-form-item>

            <el-form-item label="班级类型">
                <el-select style="width: 70%" v-model="evaluationClassType" size="small"
                           v-on:change = "handleEvaluationClassTypeChange">
                    <el-option label="行政班级" value="1" />
                    <el-option label="教学班级" value="2" />
                </el-select>
            </el-form-item>

            <el-form-item label="评价班级" v-if="evaluationClassType == 1">
                <el-select style="width: 70%" v-model="evaluationGradeAndClass1" size="small"
                           v-on:change = "handleEvaluationGradeAndClassChange">
                    <el-option v-for="item1 in classList1" :label="item1.name"
                               :value="item1.gradeId + ',' +item1.classId" />
                </el-select>
            </el-form-item>

            <el-form-item label="评价班级" v-if="evaluationClassType== 2">
                <el-select style="width: 70%" v-model="evaluationGradeAndClass2" size="small"
                           v-on:change = "handleEvaluationGradeAndClassChange">
                    <el-option v-for="item2 in classList2" :label="item2.name"
                               :value="item2.gradeId +',' + item2.classId" />
                </el-select>
            </el-form-item>
        </el-form>

        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>姓名/学号</th>
                    <th v-for="item in quotaOptions">{{item.title}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableData">
                    <td>{{item.studentName +'/' + item.studentNo}}</td>
                    <td v-for="op in quotaOptions">
                        <input type="checkbox" :value="op.id" v-model='item.scoreArr' />
                    </td>

                </tr>
            </tbody>
        </table>
        <el-button type="primary" style="width: 100%"
                   v-on:click="handleSubmitBtnClick"
            size="small">保存</el-button>
    </div>

</template>

<script>
    import {ajaxWithComplexParams,convertDataToString} from "../../components/util";
    export default {
        name: "QualityEvaluationDetail",
        data() {
            return {
                evaluationDate: new Date(),
                evaluationClassType:'1', //班级类型：1:行政班级,2:教学班级
                evaluationGradeAndClass1: '',
                evaluationGradeAndClass2: '',
                classList1:[], //行政班级
                classList2:[], // 普通班级
                quotaOptions:[], //指标集合
                tableData: [], //学生信息列表,
            }
        },
        methods: {
            handleEvaluationClassTypeChange() {
                this.evaluationGradeAndClass1 = '' ;
                this.evaluationGradeAndClass2 = '' ;
                this.tableData = [] ;
            },
            handleEvaluationGradeAndClassChange(){
                let value = '' ;
                if(this.evaluationClassType == '1'){
                    value = this.evaluationGradeAndClass1 ;
                }else {
                    value = this.evaluationGradeAndClass2 ;
                }
                if(value == undefined || value == ''){
                    return ;
                }
                //查询所有的学生信息
                let {campusNumber,itemType} = this.$route.params;
                let infos = value.split(',') ;
                let gradeId =infos[0] ;
                let classId =infos[1] ;
                let evaluationDateStr = convertDataToString(this.evaluationDate || new Date());

                let params =  {itemId:itemType,
                    campus:campusNumber,
                    gradeId:gradeId,
                    classId:classId,
                    classType:this.evaluationClassType,
                    submitDate:evaluationDateStr} ;
                let url = '/api/yiClassAndStudent/getStudentByClassIdAndGradeId' ;
                let ajaxing = ajaxWithComplexParams(url,params) ;
                ajaxing.then( (data) => {
                    this.tableData = data ;
                    console.info(data)
                }).catch(function (error) {
                    console.error(error) ;
                    // Message({
                    //     message: '查询学生信息出错!',
                    //     type: 'error'
                    // });
                }) ;

            },
            handleSubmitBtnClick(){
                let { itemType,campusNumber,teacherNumber } = this.$route.params ;
                let url =  '/api/yiClassAndStudent/submitQualityEvaluationFormData' ;
                let evaluationGradeAndClass = '' ;
                if(this.evaluationClassType == '1'){
                    evaluationGradeAndClass = this.evaluationGradeAndClass1 ;
                }else {
                    evaluationGradeAndClass = this.evaluationGradeAndClass2 ;
                }
                let infos = evaluationGradeAndClass.split(",") ;
                //评价班级为空直接return
                if(infos[0] === ''){
                    return ;
                }
                //评价学生列表为空，则直接return
                if(this.tableData.length === 0){
                    return ;
                }
                let evaluationDateStr = convertDataToString(this.evaluationDate || new Date());
                let formData = {
                    itemId: itemType,
                    submitDate: evaluationDateStr,
                    campus:campusNumber,
                    gradeId:infos[0],
                    classId:infos[1],
                    lastUpdateUser:teacherNumber,
                    list: this.tableData
                } ;
                let ajaxing = ajaxWithComplexParams(url,formData) ;
                ajaxing.then((data) =>{
                    console.info(data) ;
                }).catch(function (error) {
                    console.error(error) ;
                    // Message({
                    //     message: '保存数据出错!',
                    //     type: 'error'
                    // });
                })

            }
        },
        mounted:function () {
            let {classList1,classList2,quotaOptions} = this.$route.params ;
            this.classList1 = classList1 ;
            this.classList2 = classList2 ;
            this.quotaOptions = quotaOptions ;
            console.info(this.quotaOptions)
        },
        computed:{
            aDouble: function () {

            }
        }
    }
</script>

<style scoped>
    .el-form-item{
        margin-bottom:5px;
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
</style>