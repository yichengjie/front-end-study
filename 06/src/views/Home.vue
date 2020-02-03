<template>
    <div id="nav">
        <el-row class="demo-avatar demo-basic">
            <el-col :span="8">
                <router-link to="/qualityEvaluationList/130192/2">
                    <MenuListItem msg ="综合素质评价"   icon="el-icon-user" />
                </router-link>
            </el-col>
            <el-col :span="8">
                <router-link to="/routineExaminationList/130192/2">
                    <MenuListItem msg ="常规检查" bg-color="#67C23A" icon="el-icon-check" />
                </router-link>
            </el-col>
            <el-col :span="8">
                <router-link to="/electronicClassCard/130192/2">
                    <MenuListItem msg ="电子班牌" bg-color="#F56C6C" icon="el-icon-chat-dot-square" />
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import MenuListItem from './HomeListItem.vue' ;
export default {
    name: 'home',
    components: {
        MenuListItem
    },
    mounted() {
        document.title = "智慧校园";
    }
}
</script>

<style lang="less">
#nav {
    text-align: center;
    padding: 15px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
