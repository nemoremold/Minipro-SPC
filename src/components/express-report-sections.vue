<template>
  <div>
    <er-section-one :name="sections[0][0]"></er-section-one>
    <er-section-two :comps="sections[1]"></er-section-two>
    <er-section-three :comps="sections[2]"></er-section-three>
  </div>
</template>

<script>
import ErSectionOne from '@/components/er-section-one'
import ErSectionTwo from '@/components/er-section-two'
import ErSectionThree from '@/components/er-section-three'

export default {
  components: {
    'er-section-one': ErSectionOne,
    'er-section-two': ErSectionTwo,
    'er-section-three': ErSectionThree
  },

  props: {
    sections: Array,
    default () {
      return {}
    }
  }
}
</script>

<style>

</style>
