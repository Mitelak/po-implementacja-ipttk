<template>
  <section class="section">
    <h2>Dodaj nową trasę</h2>
    <p class="subtitle">Wybierz datę odbycia wycieczki. Wyszukaj punktu początkowego, a następnie wybieraj kolejne punkty,<br>
    które odwiedziłeś w trakcie swojej wędrówki. Utworzoną w ten sposób trasę zatwierdź przyciskiem.<p>
    <form @submit.prevent="handleSubmit">
      <Input name="name" label="Nazwa" v-model="form.name" />
      <Input type="date" name="date" label="Data odbycia wycieczki" v-model="form.date" :value="form.date" />
      <Search name="startPoint" label="Punkt startowy" v-model="startPoint" :date="form.date" @select="fetchFirst" placeholder="Wyszukaj punkt" />

      <ul class="detailsRoute" v-if="route.length">
        <li>
          <span class="point">{{startPoint}}</span>
        </li>
        <li :key="point.value" v-for="point in route">
          <span class="timeBetweenPoints">{{point.time}} minut</span>
          <span class="point">{{point.name}}</span>
        </li>
      </ul>

      <p v-if="segments.isLoading">Ładowanie...</p>
      <div class="form-inline" v-if="segments.data">
        <Dropdown label="Następny punkt" :options="actualPoint.available" v-model="actualPoint.chosen" placeholder="Wybierz punkt" emptyPlaceholder="Brak punktów" />
        <Input class="time-input" type="number" label="W ile minut" v-model="actualPoint.time" />
        <button @click.prevent="addPoint" :disabled="!actualPoint.chosen.value || actualPoint.time == ''">Dodaj</button>
      </div>
      <p class="form-error">{{segments.error === 'Not found segments' ? 'Nie ma więcej punktów na trasie' : segments.error}}</p>

      <button :disabled="created.isLoading" @click.prevent="handleSubmit">Zapisz trasę</button>
      <p class="form-error"  v-if="created.error">{{created.error}}</p>
      <p class="form-success" v-if="created.data"> Dodano nową trasę {{created.data.name}} składającą się z {{created.data.segments.length}} punktów</p>

    </form>
  </section>
</template>

<script>
import Input from '@/components/forms/Input'
import Textarea from '@/components/forms/Textarea'
import Search from '@/components/forms/Search'
import Dropdown from '@/components/forms/Dropdown'
import request from '@/utils/request'

export default {
  name: 'route-add',
  data () {
    return {
      form: {
        name: '',
        date: new Date().toISOString().split('T')[0]
      },
      created: {
        data: null,
        error: null,
        isLoading: false
      },
      startPoint: '',
      actualPoint: {
        chosen: {},
        available: [],
        time: ''
      },
      segments: {
        data: null,
        error: null,
        isLoading: false
      },
      route: []
    }
  },
  methods: {
    handleSubmit (event) {
      this.created.data = null
      this.created.error = null
      this.created.isLoading = true
      const formData = {
        ...this.form,
        segments: this.route.map(point => ({shortId: point.segmentId, time: point.time})),
        date: new Date(this.form.date).toISOString()
      }

      request('/routes', {method: 'POST'}, formData)
        .then(data => {
          this.created.data = data
          this.created.isLoading = false
          this.form = {
            name: '',
            date: new Date().toISOString().split('T')[0]
          }
          this.route = []
          this.startPoint = ''
          this.actualPoint = {
            chosen: {},
            available: [],
            time: ''
          }
          this.segments = {
            data: null,
            error: null,
            isLoading: false
          }
        }).catch(err => {
          this.created.error = err.message
          this.created.isLoading = false
        })
    },
    fetchSegments (point) {
      request('/segments?startPoint=' + point.value + '&date=' + this.form.date)
        .then(data => {
          this.segments.data = data
          this.actualPoint.available = data.map(segment => ({name: segment.endPoint[0].name, value: segment.endPoint[0].shortId, segmentId: segment.shortId}))
        }).catch(err => {
          this.segments.error = err.message
          this.segments.isLoading = false
        })
    },
    fetchFirst (point) {
      this.route = []
      this.form.segments = []
      this.fetchSegments(point)
    },
    choseActualPoint (point) {
      this.actualPoint.chosen = point
    },
    addPoint () {
      const { chosen, time } = this.actualPoint
      if (chosen.value && time !== '') {
        this.route = [...this.route, { ...chosen, time }]

        this.actualPoint.chosen = {}
        this.actualPoint.available = []
        this.actualPoint.time = ''

        this.fetchSegments(chosen)
      }
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
  .subtitle {
    font-size: 14px;
    color: #333;
  }
  .time-input {
    width: 140px;
  }
  .form-inline {
    display: flex;
    align-items: flex-end;
  }
  .form-inline button {
    margin: 20px 0;
    height: 40px;
  }
  .form-inline label {
    margin-right: 10px;
  }
  .form-inline label:first-child {
    width: 100%;
  }

  .detailsRoute {
    margin-top: -10px;
    padding-left: 0;
    list-style: none;
    position: relative;
  }

  .detailsRoute:before {
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
    top: -5px;
    left: 36px;
  }
</style>
