import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  Button, Select,Option, Dialog,DatePicker,
  Checkbox, Upload, Loading, Row, Col,
  Icon,Input, Message, Avatar, Drawer,
  Radio, Divider, Form, FormItem,Cascader,
  Tag, InputNumber
} from 'element-ui';
import FastClick from 'fastclick'


Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Select);
Vue.use(Option) ;
Vue.use(Dialog) ;
Vue.use(DatePicker) ;
Vue.use(Checkbox) ;
Vue.use(Upload) ;
Vue.use(Loading) ;
Vue.use(Row) ;
Vue.use(Col)
Vue.use(Icon) ;
Vue.use(Input) ;
Vue.use(Loading.directive);
Vue.use(Avatar) ;
Vue.use(Drawer) ;
Vue.use(Radio) ;
Vue.use(Divider) ;
Vue.use(Form) ;
Vue.use(FormItem) ;
Vue.use(Cascader) ;
Vue.use(Tag) ;
Vue.use(InputNumber) ;

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

FastClick.attach(document.body);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
