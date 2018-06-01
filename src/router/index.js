import Vue from 'vue'
import Router from 'vue-router'
import hallOfText from '@/components/hallOfText'
import hallOfIntro from '@/components/hallOfIntro'
import hallOfLetter from '@/components/hallOfLetter'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/hallOfText',
      name: 'hallOfText',
      component: hallOfText
    },
    {
      path: '/hallOfIntro',
      name: 'hallOfIntro',
      component: hallOfIntro
    },
    {
      path: '/hallOfLetter',
      name: 'hallOfLetter',
      component: hallOfLetter
    }
  ]
})
