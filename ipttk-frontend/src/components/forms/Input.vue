<template>
  <label>
    {{ label }}
    <input :type="type" :name="name" :value="value" @input="update" :placeholder="placeholder"/>
  </label>
</template>

<script>
export default {
  name: 'custom-input',
  props: {
    value: String,
    name: String,
    label: String,
    placeholder: String,
    type: {
      default: 'text',
      type: String
    }},
  methods: {
    update (event) {
      this.$emit('input', event.target.value)
    }
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
</style>
