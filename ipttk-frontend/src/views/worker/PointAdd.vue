<template>
  <section class="section">
    <h2>Dodaj nowy punkt</h2>
    <form @submit.prevent="handleSubmit">
      <Input name="name" label="Nazwa" v-model="form.name"/>
      <Input name="coordinates" label="Współrzędne geograficzne" v-model="form.coordinates" placeholder="np.: 51.498134, -0.201755"/>
      <Textarea name="description" label="Opis" v-model="form.description" />
      <Input type="date" name="date" label="Dostępny od" v-model="form.startDate" :value="form.startDate" />
      <button :disabled="req.isLoading">Dodaj nowy punkt</button>
      <p class="form-error"  v-if="req.error">{{req.error}}</p>
      <p class="form-success" v-if="req.data">Utworzono nowy punkt {{req.data.name}}</p>
    </form>
  </section>
</template>

<script>
import Input from '@/components/forms/Input'
import Textarea from '@/components/forms/Textarea'
import Search from '@/components/forms/Search'
import request from '@/utils/request'

export default {
  name: 'point-add',
  data () {
    return {
      search: '',
      form: {
        name: '',
        coordinates: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0]
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
      this.req.data = null
      this.req.error = null
      this.req.isLoading = true

      if (!this.form.startDate) {
        this.req.error = 'Podaj date'
        return
      }

      const formData = {
        ...this.form,
        startDate: new Date(this.form.startDate).toISOString()
      }
      request('/points', {method: 'POST'}, formData)
        .then(data => {
          this.req.data = data
          this.req.isLoading = false
          this.form = {
            name: '',
            coordinates: '',
            description: '',
            startDate: new Date().toISOString().split('T')[0]
          }
        }).catch(err => {
          this.req.error = err.message
          this.req.isLoading = false
        })
    }
  },
  components: {
    Input,
    Textarea,
    Search
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
