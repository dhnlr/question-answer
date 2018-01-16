import Vue from 'vue'
import Router from 'vue-router'
//  import QuestionList from '@/components/questionlist'
// import QuestionItem from '@/components/questionitem'
// import EditQuestion from '@/components/editquestion'
import Signin from '@/components/signin'
import Signup from '@/components/signup'
import auth from '@/components/auth'
// import Profile from '@/components/profile'
const NewQuestion = () => import(/* webpackChunkName: "NewQuestion" */ '@/components/newquestion')
const QuestionList = () => import(/* webpackChunkName: "QuestionList" */ '@/components/questionlist')
const QuestionItem = () => import(/* webpackChunkName: "QuestionItem" */ '@/components/questionitem')
const EditQuestion = () => import(/* webpackChunkName: "EditQuestion" */ '@/components/editquestion')
// const Signin = () => import(/* webpackChunkName: "Signin" */ '@/components/signin')
// const Signup = () => import(/* webpackChunkName: "Signup" */ '@/components/signup')
// const auth = () => (/* webpackChunkName: "Auth" */ '@/components/auth')
const Profile = () => (/* webpackChunkName: "Profile" */ '@/components/profile')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: QuestionList
    },
    {
      path: 'auth',
      component: auth,
      children: [
        {
          path: '',
          name: 'Auth',
          component: Signin
        },
        {
          path: 'signin',
          name: 'Signin',
          component: Signin
        },
        {
          path: 'signup',
          name: 'Signup',
          component: Signup
        }
      ]
    },
    {
      path: '/add/question',
      name: 'AddQuestion',
      component: NewQuestion
    },
    {
      path: '/edit/:question',
      name: 'EditQuestion',
      component: EditQuestion
    },
    {
      path: '/:question',
      name: 'Question',
      component: QuestionItem
    },
    {
      path: 'user/:userId',
      name: 'Profile',
      component: Profile
    }
  ]
})
