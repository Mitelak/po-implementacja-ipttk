<template>
  <section class="section">
    <h2>Moje trasy</h2>
    <p v-if="list.isLoading">Ładownie...</p>
    <ul>
      <li :key="route.shortId" v-for="route in list.data">Trasa <b>{{route.name}}</b> odbyta {{route.date.split('T')[0]}} zawiera {{route.segments.length}} punktów</li>
    </ul>
  </section>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'route-add',
  data () {
    return {
      list: {
        data: null,
        error: null,
        isLoading: false
      }
    }
  },
  created () {
    this.list.isLoading = true
    request('/routes')
      .then(data => {
        this.list.data = data
        this.list.isLoading = false
      }).catch(err => {
        this.list.error = err.message
        this.list.isLoading = false
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .subtitle {
    font-size: 14px;
    color: #333;
  }
  .time-input {
    width: 140px;
  }
  .form-inline {
    display: flex;
  }
  .form-inline label:first-child {
    width: 100%;
    margin-right: 10px;
  }
</style>
