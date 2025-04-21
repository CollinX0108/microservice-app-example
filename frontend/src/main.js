// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource'
import App from '@/components/App'
import router from './router'
import store from './store'
import Auth from './auth'
import Zipkin from './zipkin'

// Configuración básica
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(Auth)
Vue.use(Zipkin)

Vue.config.productionTip = false
Vue.config.devtools = true

// Agregar manejo de errores global
Vue.config.errorHandler = function (err, vm, info) {
  console.error('Error:', err)
  console.error('Info:', info)
}

// Agregar logs de inicialización
console.log('Inicializando Vue...')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
