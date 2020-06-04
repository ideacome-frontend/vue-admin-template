import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import Search from '@/components/Search/Search'
import SearchItem from '@/components/Search/SearchItem'
import Pagination from '@/components/Pagination'

Vue.use(ElementUI)

// customer components global register
Vue.component(Search.name, Search)
Vue.component(SearchItem.name, SearchItem)
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
