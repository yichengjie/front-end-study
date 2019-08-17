#### 常规检查头部数据结构
    ```let gradeAndLevelDepartmentCodeBook  = {
      grade:{
          defaultValue:'2017',
          options:[
              {label:'高2017级',value:"2017"},
              {label:'高2018级',value:"2018"},
              {label:'高2019级',value:"2019"}
          ]
      },
      levelDepartment:{
          defaultValue:'21',
          options: [
              {label:'高二1部',value:'21'},
              {label:'高二2部',value:'22'},
              {label:'高三1部',value:'31'}
          ]
      }
  }```
  
#### 常规检查列表项数据结构
  ```let options = [
    {
        examinationFlag:"0",
        examinationClassLabel:'01班',
        examinationClassValue:'1' ,
        score:'0',
        markingContent:'',
        quotaList:['1','3','4'],
        photoUrl:''
    },{
        examinationFlag:"0",
        examinationClassLabel:'02班',
        examinationClassValue:'2' ,
        score:'0',
        markingContent:'',
        quotaList:['1','3','4'],
        photoUrl:''
    },{
        examinationFlag:"0",
        examinationClassLabel:'03班',
        examinationClassValue:'3' ,
        score:'0',
        markingContent:'',
        quotaList:['1','2','3'],
        photoUrl:''
    },{
        examinationFlag:"0",
        examinationClassLabel:'04班',
        examinationClassValue:'4' ,
        score:'0',
        markingContent:'',
        photoUrl:''
    },{
        examinationFlag:"0",
        examinationClassLabel:'05班',
        examinationClassValue:'5' ,
        score:'0',
        markingContent:'',
        quotaList:['1','3'],
        photoUrl:''
    },
    {
        examinationFlag:"0",
        examinationClassLabel:'15班',
        examinationClassValue:'15' ,
        score:'0',
        markingContent:'',
        quotaList:['1','4'],
        photoUrl:''
    },
] ;
```

#### 常规检查菜单数据结构

```let options = [
    {
        classType:"1",
        title:"德育常规检查",
        children:[
            {
                title:'早操',
                itemType:"1"
            },{
                title:'眼操',
                itemType:"2"
            },{
                title:'早餐纪律检查',
                itemType:"3"
            },{
                title:'午餐纪律检查',
                itemType:"4"
            },{
                title:'晚餐厅纪律检查',
                itemType:"5"
            },{
                title:'晚一自习学习状态',
                itemType:"6"
            },{
                title:'大型会议次序',
                itemType:"7"
            },{
                title:'小型会议次序',
                itemType:"7"
            },
        ]
    },

] ;
```

#### 综合素质评价菜单数据结构
```angular2
let options = [
       {
           classType:"1",
           title:"德育评价",
           children:[
               {
                   title:'值周班检查',
                   itemType:"1",
                   evaluationFields:["走操","违纪","缺勤"]
               },{
                   title:'班主任检查',
                   itemType:"2",
                   evaluationFields:["就寝违纪","课堂违纪","校服发型","文明课间"]
               },
           ]
       },{
           classType:"2",
           title:"学科评价",
           children:[
               {
                   title:'语文学科',
                   itemType:"1",
                   evaluationFields:["加分","违纪","作业","缺勤"]
               },{
                   title:'数学学科',
                   itemType:"2",
                   evaluationFields:["加分","违纪","作业","缺勤"]
               }, {
                   title:'英语学科',
                   itemType:"3",
                   evaluationFields:["加分","违纪","作业","缺勤"]
               }, {
                   title:'物理学科',
                   itemType:"4",
                   evaluationFields:["加分","违纪","作业","缺勤"]
               },{
                   title:'化学学科',
                   itemType:"5",
                   evaluationFields:["加分","违纪","作业","缺勤"]
               },{
                   title:'地理学科',
                   itemType:"5",
                   evaluationFields:["加分","违纪","作业","缺勤"]
               },
           ]
       },] ;
```
#### 不合格指标数据结构

``` // quotaOptions: [
           //     {label:'队形',value:'1'} ,
           //     {label:'缺人',value:'2'},
           //     {label:'其他',value:'3'},
           //     {label:'迟到',value:'4'},
           //     {label:'没穿号砍',value:'5'}
           // ]
```






