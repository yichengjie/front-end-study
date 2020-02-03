import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  Button, Select,Option,
  Dialog,DatePicker,Checkbox ,
  Upload,Alert, Loading,Row,
  Col, Icon,Input,MessageBox,
  Notification,Message,Table, TableColumn,
  Avatar,Drawer,Radio,RadioGroup,Divider,CheckboxGroup,
  Switch,Form,FormItem,Cascader,Tag ,InputNumber
} from 'element-ui';

Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Select);
Vue.use(Option) ;
Vue.use(Dialog) ;
Vue.use(DatePicker) ;
Vue.use(Checkbox) ;
Vue.use(Upload) ;
Vue.use(Loading) ;
Vue.use(Alert) ;
Vue.use(Row) ;
Vue.use(Col)
Vue.use(Icon) ;
Vue.use(Input) ;
Vue.use(Table) ;
Vue.use(TableColumn) ;
Vue.use(Loading.directive);
Vue.use(Avatar) ;
Vue.use(Drawer) ;
Vue.use(Radio) ;
Vue.use(RadioGroup) ;
Vue.use(Divider) ;
Vue.use(CheckboxGroup) ;
Vue.use(Switch) ;
Vue.use(Form) ;
Vue.use(FormItem) ;
Vue.use(Cascader) ;
Vue.use(Tag) ;
Vue.use(InputNumber) ;

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
