<template>
  <label>
    {{ label }}
    <textarea :name="name" :value="value" @input="update"></textarea>
  </label>
</template>

<script>
export default {
  name: 'custom-textarea',
  props: ['value', 'name', 'label'],
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

  textarea {
    height: 120px;
    resize: none;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 8px;
    margin-top: 8px;
  }

  textarea:focus {
    outline: none;
  }

  textarea:hover, textarea:focus {
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.08);
  }
</style>
