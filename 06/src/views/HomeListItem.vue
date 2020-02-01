<template>
    <div class="menu-list-item">
        <div>
            <el-avatar v-bind:icon="icon"  :style="{'background-color':bgColor}"></el-avatar>
        </div>
        <span style="font-size: 14px;font-weight: 400;">{{msg}}</span>
    </div>
</template>

<script>
    export default {
        name: "homeListItem",
        props: {
            msg: String,
            icon: String,
            bgColor: String
        },
        data() {
          return {
            drawer: false,
            direction: 'rtl',
          };
        }
    }
</script>

<style scoped>
    .menu-list-item{
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-self: center;
    }
</style>