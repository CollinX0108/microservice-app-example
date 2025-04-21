import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
  install (Vue) {
    Vue.prototype.$auth = {
      login (credentials, redirect) {
        return Vue.http.post('/login', credentials)
          .then(response => {
            if (response.body.token) {
              localStorage.setItem('token', response.body.token)
              this.$router.push(redirect || '/')
            }
            return response
          })
      },
      logout () {
        localStorage.removeItem('token')
        this.$router.push('/login')
      },
      isLoggedIn () {
        return !!localStorage.getItem('token')
      }
    }
  }
} 