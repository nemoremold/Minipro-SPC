<template>
  <div>
    <navigator :url="url">{{ label }}</navigator>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    url: String,
    default () {
      return {}
    }
  }
}
</script>

<style>

</style>
