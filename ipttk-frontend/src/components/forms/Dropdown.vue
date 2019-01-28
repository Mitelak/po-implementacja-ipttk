<template>
  <label class="dropdown">
    {{ label }}
    <!-- <Dropdown :options="options" :selected="value" :name="name" @updateOption="update" /> -->
    <li @click="toggleMenu()" class="dropdown-toggle" ref="dropdown">
      <span>{{ value.name || (options.length > 0 ? placeholder : emptyPlaceholder) }}</span>
      <span class="caret"></span>
    </li>

    <ul class="list" v-if="showMenu" :style="{ top: this.position.top + 'px', left: this.position.left + 'px', width: this.position.width + 'px' }">
      <li :key="option.value" v-for="option in options" @click="update(option)">
        {{ option.name }}
      </li>
    </ul>
  </label>
</template>

<script>
import Dropdown from 'vue-dropdowns'

export default {
  name: 'custom-dropdown',
  props: {
    options: Array,
    value: {
      type: Object,
      default: () => ({})
    },
    label: String,
    placeholder: String,
    emptyPlaceholder: String
  },
  data () {
    return {
      showMenu: false,
      position: {
        top: 0,
        left: 0,
        width: 250
      }
    }
  },
  beforeUpdate () {
    if (this.$refs.dropdown) {
      this.updatePosition()
    }
  },
  created () {
    document.addEventListener('resize', this.updatePosition)
  },
  mounted () {
    this.updatePosition()
  },
  beforeDestroy () {
    document.removeEventListener('resize', this.updatePosition)
  },
  methods: {
    update (option) {
      this.showMenu = false
      this.$emit('input', option)
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    updatePosition () {
      const { top, left, width, height } = this.$refs.dropdown.getBoundingClientRect()
      this.position.width = width
      this.position.top = top + height
      this.position.left = left
    }
  },
  components: {
    Dropdown
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  label {
    display: flex;
    flex-direction: column;
    max-width: 250px;
    margin: 20px 0;
    position: relative;
  }

  .dropdown-toggle {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 0 8px;
    margin-top: 8px;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
  }

  input:focus {
    outline: none;
  }

  input:hover, input:focus {
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.08);
  }

  .dropdown-toggle:hover {
    background: #eee;
    cursor: pointer;
  }

  .list {
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
  }

  .list li {
    padding: 8px 16px;
    cursor: pointer;
  }

  .list li:hover {
    background: #eee;
  }

  .caret {
    width: 0;
    height: 0;
    margin-left: 2px;
    border-top: 4px dashed;
    border-top: 4px solid \9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }

  li {
    list-style: none;
  }
</style>
