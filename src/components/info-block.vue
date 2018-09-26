<template>
  <div>
    <li>{{ displayedName + ': ' + type }}</li>
    <li>{{ time }}</li>
  </div>
</template>

<script>
export default {
  props: {
    displayedName: String,
    type: String,
    time: String,
    default () {
      return {}
    }
  }
}
</script>

<style>

</style>
