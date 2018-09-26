<template>
  <div>
    <div v-for="(item, index) in comps" :key="index">
      <div v-if="index < 5">
        {{ item.label + ' ' + item.value }}
      </div>
    </div>
    <div>
      {{ comps[5].label + ' ' + comps[5].value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comps: Array,
    default () {
      return []
    }
  }
}
</script>

<style>

</style>
