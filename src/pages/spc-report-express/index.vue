<template>
  <div>
    <express-report-sections :sections="report"></express-report-sections>
    <navigator open-type="switchTab" :url="'../user-center/main'">simple report</navigator>
  </div>
</template>

<script>
import ExpressReportSections from '@/components/express-report-sections'
import entityDefinitions from '@/common/staticData/entityDefinitions'

export default {
  components: {
    'express-report-sections': ExpressReportSections
  },

  data () {
    return {
      weChatId: null,
      reportId: null,
      report: []
    }
  },

  onLoad (options) {
    this.weChatId = options.weChatId
    this.reportId = options.reportId
    this.report = entityDefinitions.EXPRESS_REPORT_FIELDS_DEFINITION.sections
    console.log(this.report)
  }
}
</script>

<style>

</style>
