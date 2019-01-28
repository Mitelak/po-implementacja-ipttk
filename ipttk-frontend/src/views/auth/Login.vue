<template>
  <section class="section">
    <h2>Logowanie</h2>
    <form @submit="handleSubmit">
      <Input name="email" label="Email" v-model="form.email"/>
      <Input type="password" name="password" label="Hasło" v-model="form.password" />
      <button :disabled="req.isLoading">Zaloguj</button>
      <p class="form-error">{{ req.error }}</p>
    </form>
  </section>
</template>

<script>
import Input from '@/components/forms/Input'
import request from '@/utils/request'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      req: {
        data: null,
        error: null,
        isLoading: false
      }
    }
  },
  methods: {
    handleSubmit (event) {
      event.preventDefault()
      this.req.isLoading = true
      request('/user/login', {method: 'POST'}, this.form)
        .then(data => {
          this.req.data = data
          this.req.isLoading = false
          localStorage.setItem('user', JSON.stringify(this.req.data))
          localStorage.setItem('token', this.req.data.token)
          this.$router.push({name: 'index'})
        }).catch(err => {
          this.req.error = err.message
          this.req.isLoading = false
          localStorage.clear()
        })
    }
  },
  components: {
    Input
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
