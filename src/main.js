import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import './permission'
import locale from 'element-ui/lib/locale/lang/en'
import '@/style/index.scss'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(ElementUI, { locale })
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')