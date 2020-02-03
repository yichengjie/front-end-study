<template>
    <ul class="routine-examination-container">
        <li v-for="menu in classTypeList">
            <div class="title">{{menu.title}}</div>
            <el-divider></el-divider>
            <div class="routine-class-list" >
                <span class="routine-class-item"
                      v-for="(child ) in menu.children"
                      v-on:click="handleMenuClick(child)"
                >{{child.title}}</span>
            </div>
        </li>
    </ul>
</template>

<script>
    import {ajaxWithoutParams} from "../../components/util";
    export default {
        name: "routineExaminationList",
        data:function(){
          return{
              classTypeList:[] ,
              quotaMap:{}
          } ;
        },
        mounted: function () {
            let url = `/api/yiClassAndStudent/initRoutineExaminationMenuPage` ;
            let ajaxing = ajaxWithoutParams(url) ;
            ajaxing.then((data) => {
                let {menuList,quotaMap} = data ;
                this.classTypeList = menuList ;
                this.quotaMap = quotaMap ;
            }).catch(function (err) {
                this.$message.error('获取常规检查菜单出错!');
            }) ;
        },
        methods:{
            handleMenuClick:function (item) {
                let {teacherNumber,campusNumber,} = this.$route.params;
                let itemType = item.itemType ;
                let quotaOptions = this.quotaMap[itemType] ;
                //console.info(item)
                this.$router.push({
                    name:'routineExaminationDetail',
                    params:{
                        teacherNumber:teacherNumber,
                        campusNumber:campusNumber,
                        itemType:itemType,
                        quotaOptions:quotaOptions
                    }
                }) ;
            }
        }
    }
</script>

<style scoped lang="less">
    .routine-examination-container{
        list-style: none;
        padding-inline-start: 0px;
        .title{
            font-size: 16px;
            font-weight: 600;
            color: #337ab7;
            margin: 5px 0px;
        }
        .routine-class-list{
            display: flex;
            flex-wrap: wrap;
            .routine-class-item{
                cursor: pointer;
                width: 50%;
                height: 40px;
                line-height: 40px;
                text-align: center;
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
