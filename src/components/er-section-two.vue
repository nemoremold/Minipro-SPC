<template>
  <div>
    <div>
      {{ comps[0].label + ' ' + comps[0].value }}
    </div>
    <div>
      {{ comps[1].label + ' ' + comps[1].value }}
    </div>
    <div>
      {{ comps[2].label + ' ' + comps[2].value }}
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
