import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import QualityEvaluationList from '../views/quality-evaluation/QualityEvaluationList.vue' ;
//import QualityEvaluationDetail from '../views/quality-evaluation/QualityEvaluationDetail.vue' ;
//import RoutineExaminationList from '../views/routine-examination/RoutineExaminationList.vue' ;
//import RoutineExaminationDetail from '../views/routine-examination/RoutineExaminationDetail.vue' ;
//import ElectronicClassCard from '../views/electronic-class-card/ElectronicClassCard.vue' ;


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/qualityEvaluationList/:teacherNumber/:campusNumber',
    name: 'qualityEvaluationList',
    //component: QualityEvaluationList
    component: () => import('../views/quality-evaluation/QualityEvaluationList.vue')
  },
  {
    path: '/qualityEvaluationDetail/:teacherNumber/:campusNumber',
    name: 'qualityEvaluationDetail',
    //component: QualityEvaluationDetail
    component: () => import('../views/quality-evaluation/QualityEvaluationDetail.vue')
  },
  {
    path: '/routineExaminationList/:teacherNumber/:campusNumber',
    name: 'routineExaminationList',
    //component: RoutineExaminationList
    component: () => import('../views/routine-examination/RoutineExaminationList.vue')
  },
  {
    path: '/routineExaminationDetail/:teacherNumber/:campusNumber',
    name: 'routineExaminationDetail',
    //component: RoutineExaminationDetail
    component:() => import('../views/routine-examination/RoutineExaminationDetail.vue')
  },
  {
    path: '/electronicClassCard/:teacherNumber/:campusNumber',
    name: 'electronicClassCard',
    //component: ElectronicClassCard
    component:() => import('../views/electronic-class-card/ElectronicClassCard.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
