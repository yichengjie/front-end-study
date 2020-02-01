import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QualityEvaluationList from '../views/quality-evaluation/QualityEvaluationList.vue' ;
import QualityEvaluationDetail from '../views/quality-evaluation/QualityEvaluationDetail.vue' ;
import RoutineExaminationList from '../views/routine-examination/RoutineExaminationList.vue' ;
import RoutineExaminationDetail from '../views/routine-examination/RoutineExaminationDetail.vue' ;
import ElectronicClassCard from '../views/electronic-class-card/ElectronicClassCard.vue' ;


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
    component: QualityEvaluationList
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/qualityEvaluationDetail/:teacherNumber/:campusNumber',
    name: 'qualityEvaluationDetail',
    component: QualityEvaluationDetail
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/routineExaminationList/:teacherNumber/:campusNumber',
    name: 'routineExaminationList',
    component: RoutineExaminationList
  },
  {
    path: '/routineExaminationDetail/:teacherNumber/:campusNumber',
    name: 'routineExaminationDetail',
    component: RoutineExaminationDetail
  },
  {
    path: '/electronicClassCard/:teacherNumber/:campusNumber',
    name: 'electronicClassCard',
    component: ElectronicClassCard
  },
]

const router = new VueRouter({
  routes
})

export default router
