<template>
  <section class="section">
    <h2>Dodaj nowy odcinek</h2>
    <form @submit.prevent="handleSubmit">
      <div class="points">
        <Search name="startPoint" label="Punkt startowy" v-model="search.startPoint" :value="search.startPoint" :date="form.startDate" @select="handleSelect('startPoint', $event)" />
        <span>-></span>
        <Search name="endPoint" label="Punkt końcowy" v-model="search.endPoint" :date="form.startDate" @select="handleSelect('endPoint', $event)" />
      </div>
      <Input type="number" name="gotPoints" label="Punkty GOT" v-model="form.gotPoints" />
      <Input type="date" name="date" label="Dostępny od" v-model="form.startDate" />
      <Dropdown name="mountainGroup" label="Grupa górska" v-model="form.mountainGroup" :options="groups" />
      <button :disabled="req.isLoading">Dodaj nowy odcinek</button>
      <p class="form-error" v-if="req.error">{{req.error}}</p>
      <p class="form-success" v-if="req.data">Utworzono nowy punkt {{req.data.name}}</p>
    </form>
  </section>
</template>

<script>
import Input from '@/components/forms/Input'
import Textarea from '@/components/forms/Textarea'
import Search from '@/components/forms/Search'
import Dropdown from '@/components/forms/Dropdown'
import { GROUPS } from '@/consts'
import request from '@/utils/request'

export default {
  name: 'segment-add',
  data () {
    return {
      groups: GROUPS,
      search: {
        startPoint: '',
        endPoint: ''
      },
      form: {
        startPoint: '',
        endPoint: '',
        gotPoints: '0',
        startDate: new Date().toISOString().split('T')[0],
        mountainGroup: GROUPS[0]
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
      const formData = {
        ...this.form,
        mountainGroup: this.form.mountainGroup.value,
        startDate: new Date(this.form.startDate).toISOString()
      }
      request('/segments', {method: 'POST'}, formData)
        .then(data => {
          this.req.data = data
          this.req.isLoading = false
          this.search = {startPoint: '', endPoint: ''}
          this.form = {
            startPoint: '',
            endPoint: '',
            startDate: this.form.startDate,
            mountainGroup: this.form.mountainGroup,
            gotPoints: '0'
          }
        }).catch(err => {
          this.req.error = err.message
          this.req.isLoading = false
        })
    },
    handleSelect (where, point) {
      this.form[where] = point.value
    }
  },
  components: {
    Input,
    Textarea,
    Search,
    Dropdown
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .points {
    display: flex;
    align-items: center;
    margin: -20px 0;
  }
  .points > span {
    margin: 30px 10px 0 10px;
  }
</style>
