<template>
  <div>
    <navigator v-if="element.type === 'express'" 
    :url="'../spc-report-express/main?weChatId='+element.weChatId+'&timestamp='+element.time">
      <info-block :displayedName="element.displayedName" :type="element.type" :time="element.time"></info-block>
    </navigator>
    <navigator v-else-if="element.type === 'deluxe'" 
    :url="'../spc-report-deluxe/main?weChatId='+element.weChatId+'&timestamp='+element.timestamp">
      <info-block :displayedName="element.displayedName" :type="element.type" :time="element.time"></info-block>
    </navigator>
  </div>
</template>

<script>
import InfoBlock from '@/components/info-block'

export default {
  components: {
    'info-block': InfoBlock
  },

  props: {
    element: Object,
    default () {
      return {}
    }
  }
}
</script>

<style>

</style>
