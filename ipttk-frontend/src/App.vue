<template>
  <div id="app">
    <Topbar :user-name="req.data.firstName" :user-type="req.data.type" :is-authorized="isAuthorized" :user-photo="req.data.image" />
    <main class="main">
      <template v-if="!req.isLoading">
        <Sidebar v-if="isAuthorized" :user-type="req.data.type" />
        <p v-if="req.error">{{req.error}}</p>
        <router-view v-else />
      </template>
      <div class="loader" v-else />
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import request from '@/utils/request'

export default {
  name: 'App',
  data () {
    return {
      isAuthorized: false,
      req: {
        data: {},
        error: null,
        isLoading: false
      }
    }
  },
  methods: {
    isLogged () {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        this.req.data = user
        this.isAuthorized = true
      } else {
        this.req.data = {}
        this.isAuthorized = false
      }
    },
    fetchUser () {
      this.req.isLoading = true
      this.req.error = null
      request('/user')
        .then(data => {
          this.req.data = data
          this.req.isLoading = false
          this.isAuthorized = true
        }).catch(err => {
          this.req.error = err.message
          this.req.isLoading = false
          this.isAuthorized = false
        })
    }
  },
  watch: {
    $route: 'isLogged'
  },
  created () {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.fetchUser()
    }
  },
  components: {
    Sidebar,
    Topbar
  }
}
</script>

<style>
:root {
  --primary-color: #7D09E2;
  --text-color: #14213D;
  --white: #fff;
  --disabled-color: #888;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #F5F5F5;
  height: 100vh;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
}

.main {
  display: flex;
  padding: 40px;
  padding-top: 104px;
  min-height: 100vh;
}

.section {
  background: var(--white);
  border-radius: 16px;
  width: 100%;
  padding: 40px;
}

.section h2 {
  font-weight: 700;
  font-size: 22px;
}

.form-error {
  font-size: 14px;
  color: red;
}

.form-success {
  font-size: 14px;
  color: green;
}

button {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-size: 14px;
  padding: 10px 20px;
  background: var(--primary-color);
  border: none;
  border-radius: 8px;
  color: var(--white);
  outline: none;
}

button:hover, button:focus {
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.08);
}

button:disabled {
  background: var(--disabled-color);
}

.loader {
  border: 16px solid #dddddd;
  border-top: 16px solid var(--primary-color);
  border-radius: 50%;
  width: 96px;
  height: 96px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
