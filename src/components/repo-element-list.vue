<template>
  <div>
    <div v-for="(item, index) in elements" :key="index">
      <repo-element :element="item"></repo-element>
    </div>
  </div>
</template>

<script>
import RepoElement from '@/components/repo-element'

export default {
  components: {
    'repo-element': RepoElement
  },

  props: {
    elements: {
      type: Array,
      default () {
        return []
      }
    }
  },

  onLoad () {
    console.log(this.elements)
  }
}
</script>

<style>

</style>
