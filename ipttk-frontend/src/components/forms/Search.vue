<template>
  <div class="search" :class="{ active: isActive }">
    <label>
      {{ label }}
      <input type="search" :value="value" :name="name" @input="update" :placeholder="placeholder" autocomplete="off" ref="input" />
    </label>
    <ul class="list" :style="{ top: this.position.top + 'px', left: this.position.left + 'px', width: this.position.width + 'px' }">
      <li v-for="result in results" :key="result.shortId" @click="selectResult(result.shortId, result.name)" @keypress="selectResult(result.shortId, result.name)">{{result.name}}</li>
      <li v-if="isLoading">Wczytywanie...</li>
      <li v-if="error">{{error}}</li>
    </ul>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import request from '@/utils/request'

export default {
  name: 'search',
  props: {
    value: String,
    name: String,
    label: String,
    placeholder: String,
    date: String
  },
  data () {
    return {
      results: [],
      error: '',
      isLoading: false,
      isActive: false,
      position: {
        top: 0,
        left: 0,
        width: 250
      }
    }
  },
  created () {
    this.debounced = debounce(this.fetchPoints, 100)
    document.addEventListener('click', this.handleBlur)
    document.addEventListener('resize', this.updatePosition)
  },
  mounted () {
    this.updatePosition()
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleBlur)
    document.removeEventListener('resize', this.updatePosition)
  },
  methods: {
    update (event) {
      this.$emit('input', event.target.value)
      this.debounced()
      this.isActive = true
    },
    handleBlur () {
      this.isActive = false
    },
    selectResult (id, name) {
      this.isActive = false
      this.$emit('input', name)
      this.$emit('select', {name: name, value: id})
    },
    fetchPoints () {
      this.results = []
      this.error = null
      this.isLoading = true
      request('/points?name=' + this.value + '&date=' + this.date)
        .then(data => {
          this.results = data
          this.error = null
          this.isLoading = false
        }).catch(err => {
          this.results = []
          this.error = err.message
          this.isLoading = false
        })
    },
    updatePosition () {
      const { top, left, width, height } = this.$refs.input.getBoundingClientRect()
      this.position.width = width
      this.position.top = top + height
      this.position.left = left
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search {
    position: relative;
    max-width: 250px;
    margin: 20px 0;
  }

  label {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }

  input {
    height: 40px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 0 8px;
    margin-top: 8px;
    font-family: 'Roboto', sans-serif;
  }

  input:focus {
    outline: none;
  }

  input:hover, input:focus {
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.08);
  }

  .list {
    display: none;
    margin: 0;
    position: fixed;
    max-height: 200px;
    overflow: auto;
    top: 100%;
    background: var(--white);
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.12);
    border-radius: 0 0 8px 8px;
    list-style: none;
    width: 100%;
    padding: 0;
    font-size: 14px;
    z-index: 10;
  }

  .list li {
    padding: 8px 16px;
    cursor: pointer;
  }

  .list li:hover {
    background: #eee;
  }

  .active .list {
    display: block;
  }

  .active input {
    border-radius: 8px 8px 0 0;
  }
</style>
