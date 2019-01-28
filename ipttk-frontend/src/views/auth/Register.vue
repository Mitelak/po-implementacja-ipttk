<template>
  <section class="section">
    <h2>Rejestracja</h2>
    <form @submit.prevent="handleSubmit">
      <Input name="email" label="Email" v-model="form.email"/>
      <Input type="password" name="password" label="Hasło" v-model="form.password" />
      <Input type="password" name="confirm-password" label="Powtórz hasło" v-model="confirmPassword" />
      <Input name="pesel" label="Pesel" v-model="form.pesel" />
      <Input name="firstName" label="Imię" v-model="form.firstName" />
      <Input name="lastName" label="Nazwisko" v-model="form.lastName" />
      <label>
        Zdjęcie profilowe
        <input type="file"
          ref="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          @change="handleImage"
        >
        <img ref="preview" src="" />
      </label>
      <button :disabled="req.isLoading">Zarejestruj</button>
      <p class="form-error">{{ req.error }}</p>
    </form>
  </section>
</template>

<script>
import Input from '@/components/forms/Input'
import request from '@/utils/request'

export default {
  name: 'register',
  data () {
    return {
      confirmPassword: '',
      form: {
        email: '',
        password: '',
        pesel: '',
        firstName: '',
        lastName: ''
      },
      image: '',
      req: {
        data: null,
        error: null,
        isLoading: false
      }
    }
  },
  methods: {
    handleImage () {
      const file = this.$refs.avatar.files[0]
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.$refs.preview.src = reader.result
        this.image = reader.result
      }, false)

      if (file) {
        reader.readAsDataURL(file)
      }
    },
    handleSubmit (event) {
      if (this.confirmPassword !== this.form.password) {
        this.req.error = 'Hasła są różne'
      } else {
        this.req.error = null
        this.req.isLoading = true
        const formData = this.form
        if (this.image) {
          formData.image = this.image
          formData.type = 0
        }
        request('/user/register', {method: 'POST'}, formData)
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
