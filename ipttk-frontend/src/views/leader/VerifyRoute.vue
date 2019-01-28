<template>
  <section class="section">
    <h2>Weryfikacja trasy</h2>
    <p v-if="route.isLoading">Ładownie...</p>
    <div v-if="!route.isLoading">
      <div class="headerList">
        <span>Trasa</span>
        <span>Data przejścia</span>
        <span>Czas przejścia</span>
      </div>
      <ul class="routesList">
        <li>
          <span class="fromToPoint">
            <span class="fromPoint">{{route.data.segments[0].startPoint[0].name}}</span>
            <img class="arrow" src="../../assets/arrow-left-right.svg">
            <span
              class="toPoint"
            >{{route.data.segments[route.data.segments.length -1].endPoint[0].name}}</span>
          </span>
          <span class="dateRoutes">{{route.data.date.split('T')[0]}}</span>
          <span class="totalTimeRoute">{{ totalTime(route.data) }} minut</span>
        </li>
      </ul>
      <span class="subtitle">Punkty:</span>
      <ul class="detailsRoute">
        <li :key="segment.shortId" v-for="segment in route.data.segments">
          <span class="point">{{segment.startPoint[0].name}}</span>
          <span class="timeBetweenPoints">{{segment.time}} minut</span>
        </li>
        <li>{{route.data.segments[route.data.segments.length -1].endPoint[0].name}}</li>
      </ul>
      <div class="comment">
        <span>Uwagi:</span>
        <textarea rows="5" v-model="comment"></textarea>
      </div>
      <div class="actions">
        <button :disabled="req.isLoading" name="acceptButton" @click="handleSubmit">Akcjeptuj</button>
        <button :disabled="req.isLoading" name="declineButton" @click="handleSubmit">Odrzuć</button>
      </div>
      <p class="form-error"  v-if="req.error">{{req.error}}</p>
    </div>
  </section>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'route-verify',
  data () {
    return {
      route: {
        data: null,
        error: null,
        isLoading: false
      },
      req: {
        data: null,
        error: null,
        isLoading: false
      },
      comment: ''
    }
  },
  created () {
    this.route.isLoading = true
    request('/routes/verify/' + this.$route.params.id)
      .then(data => {
        this.route.data = data
        this.route.isLoading = false
      })
      .catch(err => {
        this.route.error = err.message
        this.route.isLoading = false
      })
  },
  methods: {
    totalTime (route) {
      let totalTime = 0
      route.segments.forEach(segment => (totalTime += segment.time))
      return totalTime
    },
    handleSubmit (event) {
      this.req.data = null
      this.req.error = null
      this.req.isLoading = true

      const formData = {
        comment: this.comment,
        shortId: this.$route.params.id,
        accepted: event.target.name === 'acceptButton'
      }
      request('/routes/verify/accept', {method: 'PATCH'}, formData)
        .then(data => {
          this.$router.push('/verify-routes')
        }).catch(err => {
          this.req.error = err.message
          this.req.isLoading = false
        })
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
  display: inline-block;
  font-size: 14px;
  color: #666;
  padding-top: 12px;
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
.headerList,
.comment > span {
  font-size: 14px;
  color: #666;
}
.routesList {
  font-size: 14px;
  padding-left: 0px;
  list-style: none;
  list-style-position: inside;
}
.routesList > li {
  position: relative;
  border: 1px solid #7d09e2;
  border-radius: 10px 10px;
  padding: 10px;
  padding-left: 36px;
  margin: 10px 0px;
}
.routesList > li::before {
  content: "";
  position: absolute;
  left: 14px;
  top: 12px;
  height: 12px;
  width: 12px;
  background-image: url("../../assets/elipse.svg");
}
.routesList > li > span,
.headerList > span {
  display: inline-block;
}
.routesList > li > span:nth-child(1) {
  width: 250px;
}
.headerList > span:nth-child(1) {
  width: 285px;
}
.routesList > li > span:nth-child(2),
.headerList > span:nth-child(2) {
  width: 200px;
}
.routesList > li > span:nth-child(3),
.headerList > span:nth-child(3) {
  width: 200px;
}
.detailsRoute {
  margin-top: -10px;
  padding-left: 0px;
  list-style: none;
  position: relative;
}
.detailsRoute::before {
  content: "";
  top: 28px;
  left: 19px;
  bottom: 28px;
  width: 2px;
  position: absolute;
  background-color: #000;
}
.detailsRoute > li {
  position: relative;
  padding: 24px;
  padding-left: 36px;
}
.detailsRoute > li:before {
  content: "";
  position: absolute;
  left: 14px;
  top: 28px;
  height: 12px;
  width: 12px;
  background-color: #fff;
  background-image: url("../../assets/elipse.svg");
}
.detailsRoute > li > .timeBetweenPoints {
  position: absolute;
  font-size: 12px;
  top: 60px;
  left: 24px;
}
.verifyAction a {
  color: #7d09e2;
  font-weight: bold;
  text-decoration: none;
}
.verifyAction a:hover {
  color: rgb(159, 105, 207);
}
.comment > textarea {
  margin: 8px 0;
  padding: 10px;
  display: block;
  border: 1px solid #7d09e2;
  border-radius: 10px 10px;
  width: 800px;
  color: #666;
  font-family: "Roboto";
  font-size: 13px;
}
.actions {
  margin-top: 20px;
}
.actions button {
  width: 120px;
  height: 40px;
}
.actions button:hover {
  cursor: pointer;
}
.actions button:first-child {
  background-color: #1b8123;
}
.actions button:first-child:hover {
  background-color: rgb(55, 160, 64);
}
.actions button:nth-child(2) {
  background-color: #9a0303;
  margin-left: 14px;
}
.actions button:nth-child(2):hover {
  background-color: rgb(189, 36, 36);
}
</style>
