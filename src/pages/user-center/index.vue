<template>
  <div>
    <div v-for="(item, index) in optionTabs" :key="index">
      <option-tab :label="item.label" :url="item.url"></option-tab>
    </div>
  </div>
</template>

<script>
import viewSetting from '@/common/staticData/viewSettings'
import OptionTab from '@/components/option-tab'

export default {
  components: {
    'option-tab': OptionTab
  },

  data () {
    return {
      optionTabs: []
    }
  },

  onLoad () {
    this.optionTabs = viewSetting.USER_CENTER_SETTING.optionTabs
  }
}
</script>

<style>

</style>
