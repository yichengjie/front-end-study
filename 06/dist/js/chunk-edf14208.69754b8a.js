(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-edf14208"],{3886:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{ref:"form",attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"班级/级部"}},[a("el-cascader",{staticStyle:{width:"70%"},attrs:{options:e.options,size:"small"},on:{change:e.handleGradeOrLevelDepartmentChange},model:{value:e.gradeOrLevelDepartmentValue,callback:function(t){e.gradeOrLevelDepartmentValue=t},expression:"gradeOrLevelDepartmentValue"}})],1),a("el-form-item",{attrs:{label:"检查日期"}},[a("el-date-picker",{staticStyle:{width:"70%"},attrs:{type:"date",format:"yyyy-MM-dd",placeholder:"选择日期",size:"small"},on:{change:e.handleExaminationDateChange},model:{value:e.examinationDate,callback:function(t){e.examinationDate=t},expression:"examinationDate"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small"},on:{click:e.handleSubmitBtnClick}},[e._v("保存")])],1)],1),a("table",{staticClass:"table table-striped"},[a("thead",[a("tr",[a("th",{attrs:{width:"55"}}),a("th",{staticStyle:{"text-align":"center"},attrs:{width:"50",align:"center"}},[a("el-tag",{attrs:{type:"warning",effect:"dark",size:"small"}},[e._v("优秀")])],1),a("th",{staticStyle:{"text-align":"center"},attrs:{width:"50",align:"center"}},[a("el-tag",{attrs:{type:"success",effect:"dark",size:"small"}},[e._v("合格")])],1),a("th",{staticStyle:{"text-align":"left"}},[a("el-tag",{attrs:{type:"danger",effect:"dark",size:"small"}},[e._v("不合格")])],1),a("th",{attrs:{width:"80"}})])]),a("tbody",e._l(e.tableData,(function(t,i){return a("tr",[a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.checked,expression:"item.checked"}],attrs:{type:"checkbox",value:"true"},domProps:{checked:Array.isArray(t.checked)?e._i(t.checked,"true")>-1:t.checked},on:{change:function(a){var i=t.checked,r=a.target,n=!!r.checked;if(Array.isArray(i)){var o="true",l=e._i(i,o);r.checked?l<0&&e.$set(t,"checked",i.concat([o])):l>-1&&e.$set(t,"checked",i.slice(0,l).concat(i.slice(l+1)))}else e.$set(t,"checked",n)}}}),e._v(" "+e._s(t.label)+" ")]),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.score,expression:"item.score"}],attrs:{type:"radio",name:"name"+i,value:"1"},domProps:{checked:e._q(t.score,"1")},on:{click:function(a){return e.handleClickRadioItem(t,"1")},change:function(a){return e.$set(t,"score","1")}}})]),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.score,expression:"item.score"}],attrs:{type:"radio",name:"name"+i,value:"2"},domProps:{checked:e._q(t.score,"2")},on:{click:function(a){return e.handleClickRadioItem(t,"2")},change:function(a){return e.$set(t,"score","2")}}})]),a("td",{staticStyle:{"text-align":"left"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.score,expression:"item.score"}],attrs:{type:"radio",name:"name"+i,value:"3"},domProps:{checked:e._q(t.score,"3")},on:{click:function(a){return e.handleClickRadioItem(t,"3")},change:function(a){return e.$set(t,"score","3")}}}),"3"===t.score?a("span",{staticClass:"text-info",on:{click:function(t){return e.handleOpenUnqualifiedDialog(i)}}},[e._v(" "+e._s(0===t.quotaLabelList.length?"请选择":t.quotaLabelList.join(","))+" "),a("i",{class:""===t.orgData.photoUrl?"":"el-icon-picture-outline"})]):e._e()]),a("td",[a("span",{staticClass:"text-info",on:{click:function(t){return e.handleOpenRemarksDialog(i)}}},[e._v(" "+e._s(""===t.orgData.markingContent?"备注":t.orgData.markingContent)+" ")])])])})),0)]),a("el-dialog",{attrs:{title:"自定义原因",visible:e.remarksDialogVisible,width:"90%"},on:{"update:visible":function(t){e.remarksDialogVisible=t}}},[a("span",[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:e.remarksItemContent,callback:function(t){e.remarksItemContent=t},expression:"remarksItemContent"}})],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.remarksDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.handleRemarksConfirm}},[e._v("确 定")])],1)]),a("el-drawer",{attrs:{title:"我是标题",direction:"btt","with-header":!1,size:"122px",visible:e.unqualifiedDialogVisible},on:{"update:visible":function(t){e.unqualifiedDialogVisible=t}}},[a("div",{staticClass:"y-unqualified-container"},[a("div",{staticClass:"y-unqualified-item",on:{click:e.handleOpenQuotaDialog}},[e._v("指标")]),a("div",{staticClass:"y-unqualified-item border"},[a("el-upload",{staticClass:"y-unqualified-upload-photo",attrs:{action:"/api/upload/uploadSubmit","show-file-list":!1,"on-success":e.handlePhotoUploadSuccess}},[a("div",{staticStyle:{width:"100%"}},[e._v("照片")])])],1),a("div",{staticClass:"y-unqualified-item",on:{click:function(t){e.unqualifiedDialogVisible=!1}}},[e._v("取消")])])]),a("el-dialog",{attrs:{title:"请选择",visible:e.quotaDialogVisible,width:"90%"},on:{"update:visible":function(t){e.quotaDialogVisible=t}}},[a("div",{staticClass:"quota-container"},e._l(e.quotaOptions,(function(t,i){return a("div",{staticClass:"quota-item"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.quotaItemArr,expression:"quotaItemArr"}],attrs:{id:"opIndex"+i,type:"checkbox"},domProps:{value:t.id,checked:Array.isArray(e.quotaItemArr)?e._i(e.quotaItemArr,t.id)>-1:e.quotaItemArr},on:{change:function(a){var i=e.quotaItemArr,r=a.target,n=!!r.checked;if(Array.isArray(i)){var o=t.id,l=e._i(i,o);r.checked?l<0&&(e.quotaItemArr=i.concat([o])):l>-1&&(e.quotaItemArr=i.slice(0,l).concat(i.slice(l+1)))}else e.quotaItemArr=n}}}),a("label",{attrs:{for:"opIndex"+i}},[e._v(e._s(t.title))])])})),0),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.quotaDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.handleQuotaConfirm}},[e._v("确 定")])],1)])],1)},r=[],n=(a("99af"),a("4de4"),a("d81d"),a("ac1f"),a("5319"),a("be4f"),a("450d"),a("896a")),o=a.n(n),l=a("b33c"),s=a("2ef0"),c=a.n(s);function u(e,t){return c.a.map(e,(function(e){var a="1"===e.examinationFlag,i=e.examinationClassLabel.replace(/高\d{4}级/,"");i=i.replace("（",""),i=i.replace("）",""),i=i.replace("(",""),i=i.replace(")","");var r=c.a.map(e.quotaList,(function(e){return t[e]}));r=c.a.filter(r,(function(e){return void 0!==e}));var n={label:i,checked:a,score:e.score,quotaLabelList:r,orgData:e};return n}))}var d={name:"RoutineExaminationDetail",data:function(){return{value:[],examinationDate:new Date,gradeOrLevelDepartmentType:"grade",gradeOrLevelDepartmentValue:[],options:[{label:"年级",value:"grade"},{label:"级部",value:"levelDepartment"}],tableData:[],quotaOptions:[],quotaLabelMap:{},operItemIndex:-1,remarksDialogVisible:!1,remarksItemContent:"",unqualifiedDialogVisible:!1,quotaDialogVisible:!1,quotaItemArr:[],fileList:[]}},mounted:function(){var e=this,t=this.$route.params,a=t.teacherNumber,i=t.campusNumber,r=t.quotaOptions,n=t.itemTitle;document.title=n,this.quotaOptions=c.a.map(r,(function(e){return e.id=e.id+"",e}));var s={};c.a.each(r,(function(e){s[e.id+""]=e.title})),this.quotaLabelMap=s;var u=o.a.service({fullscreen:!0}),d="/api/yiClassAndStudent/getGradeAndSubordinateDepartment/".concat(a,"/").concat(i),m=Object(l["c"])(d);m.then((function(t){u.close();var a=t.grade,i=t.levelDepartment,r=a.defaultValue,n=i.defaultValue,o={grade:r,levelDepartment:n},l=o[e.gradeOrLevelDepartmentType];e.gradeOrLevelDepartmentValue=[r,n];var s={label:"年级",value:"grade",children:a.options},c={label:"级部",value:"levelDepartment",children:i.options},d=[s,c];e.options=d,e.gradeOrLevelDepartmentValue=[e.gradeOrLevelDepartmentType,l],e.queryClassInfo4FormDataChange(e.gradeOrLevelDepartmentType,l)})).catch((function(e){u.close(),this.$message.error("加载年级/级部信息出错!")}))},methods:{queryClassInfo4FormDataChange:function(e,t){var a=this,i=this.$route.params,r=i.teacherNumber,n=i.campusNumber,s=i.itemType,c="";"grade"===e?c="/api/yiClassAndStudent/getClassInfoByGradeId/".concat(r,"/").concat(t,"/").concat(n):"levelDepartment"===e&&(c="/api/yiClassAndStudent/getClassInfoByLevelDepartment/".concat(r,"/").concat(t,"/").concat(n));var d=Object(l["d"])(this.examinationDate||new Date),m={checkDate:d,itemType:s},h=o.a.service({fullscreen:!0}),p=Object(l["b"])(c,m);p.then((function(e){h.close(),a.tableData=u(e,a.quotaLabelMap)})).catch((function(e){h.close(),this.$message.error("加载年级/级部信息出错!")}))},handleGradeOrLevelDepartmentChange:function(e){var t=e[0],a=e[1];this.queryClassInfo4FormDataChange(t,a)},handleExaminationDateChange:function(){var e=this.gradeOrLevelDepartmentValue[0]||"",t=this.gradeOrLevelDepartmentValue[1]||"";this.queryClassInfo4FormDataChange(e,t)},handleClickRadioItem:function(e,t){e.checked=!0,"1"!==t&&"2"!==t||(this.quotaItemArr=[],e.orgData.quotaList=[])},handleOpenRemarksDialog:function(e){this.remarksDialogVisible=!0,this.operItemIndex=e,this.remarksItemContent=this.tableData[this.operItemIndex].orgData.markingContent||""},handleOpenUnqualifiedDialog:function(e){this.unqualifiedDialogVisible=!0,this.operItemIndex=e},handleOpenQuotaDialog:function(){this.unqualifiedDialogVisible=!1,this.quotaDialogVisible=!0;var e=this.tableData[this.operItemIndex].orgData.quotaList;this.quotaItemArr=e},handleRemarksConfirm:function(){this.remarksDialogVisible=!1,this.tableData[this.operItemIndex].orgData.markingContent=this.remarksItemContent},handleQuotaConfirm:function(){var e=this;this.quotaDialogVisible=!1;var t=c.a.map(this.quotaItemArr,(function(e){return e}));this.tableData[this.operItemIndex].orgData.quotaList=t;var a=c.a.map(t,(function(t){return e.quotaLabelMap[t]}));a=c.a.filter(a,(function(e){return void 0!==e})),this.tableData[this.operItemIndex].quotaLabelList=a},handleSubmitBtnClick:function(){var e=this.$route.params,t=e.teacherNumber,a=(e.campusNumber,e.itemType,c.a.filter(this.tableData,(function(e){return e.checked}))),i=c.a.map(a,(function(e){var t=e.orgData;return t.score=e.score,t}));if(0!==a.length){var r="/api/yiClassAndStudent/submitRoutineExaminationForm",n=Object(l["d"])(this.examinationDate||new Date),s={list:i,checkDate:n,submitTeacher:t},u=o.a.service({fullscreen:!0}),d=Object(l["a"])(r,s);d.then((function(e){u.close()})).catch((function(e){u.close(),this.$message.error("保存信息出错!")}))}},handlePhotoUploadSuccess:function(e,t){this.unqualifiedDialogVisible=!1,this.tableData[this.operItemIndex].orgData.photoUrl=e.url}}},m=d,h=(a("9793"),a("2877")),p=Object(h["a"])(m,i,r,!1,null,"2b8114b5",null);t["default"]=p.exports},"4de4":function(e,t,a){"use strict";var i=a("23e7"),r=a("b727").filter,n=a("1dde"),o=a("ae40"),l=n("filter"),s=o("filter");i({target:"Array",proto:!0,forced:!l||!s},{filter:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},8297:function(e,t,a){},8418:function(e,t,a){"use strict";var i=a("c04e"),r=a("9bf2"),n=a("5c6c");e.exports=function(e,t,a){var o=i(t);o in e?r.f(e,o,n(0,a)):e[o]=a}},9793:function(e,t,a){"use strict";var i=a("8297"),r=a.n(i);r.a},"99af":function(e,t,a){"use strict";var i=a("23e7"),r=a("d039"),n=a("e8b5"),o=a("861d"),l=a("7b0b"),s=a("50c4"),c=a("8418"),u=a("65f0"),d=a("1dde"),m=a("b622"),h=a("2d00"),p=m("isConcatSpreadable"),f=9007199254740991,v="Maximum allowed index exceeded",g=h>=51||!r((function(){var e=[];return e[p]=!1,e.concat()[0]!==e})),b=d("concat"),D=function(e){if(!o(e))return!1;var t=e[p];return void 0!==t?!!t:n(e)},k=!g||!b;i({target:"Array",proto:!0,forced:k},{concat:function(e){var t,a,i,r,n,o=l(this),d=u(o,0),m=0;for(t=-1,i=arguments.length;t<i;t++)if(n=-1===t?o:arguments[t],D(n)){if(r=s(n.length),m+r>f)throw TypeError(v);for(a=0;a<r;a++,m++)a in n&&c(d,m,n[a])}else{if(m>=f)throw TypeError(v);c(d,m++,n)}return d.length=m,d}})},d81d:function(e,t,a){"use strict";var i=a("23e7"),r=a("b727").map,n=a("1dde"),o=a("ae40"),l=n("map"),s=o("map");i({target:"Array",proto:!0,forced:!l||!s},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-edf14208.69754b8a.js.map