<template>
  <div>
    {{ name.label + ' ' + name.value }}
  </div>
</template>

<script>
export default {
  props: {
    name: Object,
    default () {
      return {}
    }
  }
}
</script>

<style>

</style>
