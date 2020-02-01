<template>
    <ul class="quality-evaluation-container">
        <li v-for="menu in menuList">
            <div class="title">{{menu.title}}</div>
            <el-divider></el-divider>
            <div class="quality-class-list" >
                <span class="quality-class-item"
                      v-for="(child , index) in menu.children" v-bind:name="index"
                      v-on:click="handleMenuClick(child)"
                >{{child.title}}</span>
            </div>
        </li>
    </ul>
</template>

<script>
    import {ajaxWithoutParams} from "../../components/util";
    import _ from 'lodash' ;
    function getCurQuotaList(quotaOptionsStr,allQuotaList){
        let retInfos = [] ;
        let infos = quotaOptionsStr.split(',') ;
        for(let i = 0 ; i < infos.length ; i ++){
            let info = infos[i] ;
            let ttt =  _.find(allQuotaList, function(o) { return (o.id+'')  === info; });
            if(ttt !== undefined){
                retInfos.push({id:ttt.id +'',title:ttt.title}) ;
            }
        }
        return retInfos ;
    }

    export default {
        name: "qualityEvaluationList",
        data: function(){
            return {
                menuList:[],  //菜单集合
                quotaList:[], //指标集合
                classList1:[], //行政班级
                classList2:[] // 普通班级
            } ;
        },
        mounted: function () {
            let {teacherNumber,campusNumber} = this.$route.params;
            let url = `/api/yiClassAndStudent/initQualityEvaluationMenuPage/${teacherNumber}/${campusNumber}` ;
            //let url = '/api/yiClassAndStudent/initQualityEvaluationMenuPage/130192/2' ;
            let ajaxing = ajaxWithoutParams(url) ;
            ajaxing.then((data) =>{
                let {menuList,quotaList,classList1,classList2} = data ;
                console.info('menuList : ', menuList)
                this.menuList = menuList ;
                this.quotaList = quotaList ;
                this.classList1 = classList1 ;
                this.classList2 = classList2 ;
                window.console.info('menuList : ' , menuList)
            }).catch( (error) => {
                window.console.error(error)
                // Message({
                //     message: '加载综合素质评价菜单出错!',
                //     type: 'error'
                // });
            }) ;
        },
        methods:{
            handleMenuClick:function (item) {

                let {teacherNumber,campusNumber} = this.$route.params;
                let quotaOptions = item.quotaOptions ;
                this.$router.push({
                    name:'qualityEvaluationDetail',
                    params:{
                        classList1:this.classList1,
                        classList2:this.classList2,
                        quotaList:this.quotaList,
                        teacherNumber:teacherNumber,
                        campusNumber:campusNumber,
                        itemType: item.itemType,
                        quotaOptions: getCurQuotaList(item.quotaOptions,this.quotaList),
                    }}) ;
            }
        }
    }
</script>

<style scoped lang="less">
    .quality-evaluation-container{
        list-style: none;
        padding-inline-start: 0px;
        .title{
            font-size: 16px;
            font-weight: 600;
            color: #337ab7;
            margin: 5px 0px;
        }
        .quality-class-list{
            display: flex;
            flex-wrap: wrap;
            .quality-class-item{
                cursor: pointer;
                width: 33%;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #eee;
                font-size: 14px;
                font-weight: 600;
            }
        }
        .el-divider--horizontal{
            margin: 5px 1px;
        }
    }
</style>