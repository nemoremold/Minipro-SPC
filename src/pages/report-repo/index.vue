<template>
  <div>
    <repo-element-list :elements="reports"></repo-element-list>
  </div>
</template>

<script>
import RepoElementList from '@/components/repo-element-list'
// import SPCApi from '@/apis/SPCBEServiceHandler'

export default {
  components: {
    'repo-element-list': RepoElementList
  },

  data () {
    return {
      reports: [],
      weChatId: null,
      timestamp: null,
      top: null
    }
  },

  onLoad () {
    this.weChatId = null
    // this.reports = SPCApi.SPCBEServiceHandler.getSPCReportsWithWeChatId(this.weChatId)
    this.reports = [
      {
        weChatId: 'testId1',
        displayedName: 'displayedName1',
        time: '2018-10-01 00:00:00',
        type: 'deluxe'
      },
      {
        weChatId: 'testId2',
        displayedName: 'displayedName2',
        time: '2018-10-11 01:11:24',
        type: 'express'
      }
    ]
  }
}
</script>

<style>

</style>
