<template>
  <section class="section">
    <h2>Trasy oczekujące na weryfikację</h2>
    <p v-if="list.isLoading">Ładownie...</p>
    <div v-else>
      <div class="headerList">
        <span>Trasa</span>
        <span>Data przejścia</span>
        <span>Czas przejścia</span>
        <span>Akcja</span>
      </div>
      <ul class="routesList">
        <li :key="route.shortId" v-for="route in list.data">
          <span class="fromToPoint">
            <span class="fromPoint">{{route.segments[0].startPoint[0].name}}</span><img class="arrow" src="../../assets/arrow-left-right.svg"/>
            <span class="toPoint">{{route.segments[route.segments.length -1].endPoint[0].name}}</span>
          </span>
          <span class="dateRoutes">{{route.date.split('T')[0]}}</span>
          <span class="totalTimeRoute">{{totalTime(route)}} minut</span>
          <span class="verifyAction"><router-link :to="{path: `/verify-routes/${route.shortId}`}">Weryfikuj</router-link></span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'route-verify',
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
    request('/routes/verify')
      .then(data => {
        this.list.data = data
        this.list.isLoading = false
      }).catch(err => {
        this.list.error = err.message
        this.list.isLoading = false
      })
  },
  methods: {
    totalTime (route) {
      let totalTime = 0
      route.segments.forEach((segment) => { totalTime += segment.time })
      return totalTime
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .arrow {
    margin: 0 5px;
    height: 8px;
    width: 8px;
  }
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
  .headerList {
    font-size: 14px;
    color: #666;
    display: flex;
  }
  .routesList {
    font-size: 14px;
    padding-left: 0px;
    list-style: none;
    list-style-position: inside;
  }
  .routesList > li {
    display: flex;
    width: 100%;
    position: relative;
    border: 1px solid #7D09E2;
    border-radius: 10px 10px;
    padding: 10px;
    padding-left: 36px;
    align-items: center;
  }
  .routesList > li::before {
    content: '';
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    height: 12px;
    width: 12px;
    background-image: url('../../assets/elipse.svg');
  }
  .routesList > li > span, .headerList > span {
    /* display: inline; */
  }
  .routesList > li > span:nth-child(1){
    width: 350px;
  }
  .headerList > span:nth-child(1) {
    width: 385px;
  }
  .routesList > li > span:nth-child(2), .headerList > span:nth-child(2) {
    width: 200px;
  }
  .routesList > li > span:nth-child(3), .headerList > span:nth-child(3) {
    width: 200px;
  }
  .verifyAction a{
    color: #7D09E2;
    font-weight: bold;
    text-decoration: none;
  }
  .verifyAction a:hover {
    color: rgb(159, 105, 207);
  }
</style>
