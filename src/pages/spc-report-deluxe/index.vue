<template>
  <view v-if="reportSrc && showRep" style="position: fixed; width: 100%; height: 100%; background: #2ebeb8; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
    <image v-if="reportSrc && showRep" :src="reportSrc" @tap="bindTap" mode="aspectFit" style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;" />
  </view>
</template>

<script>
export default {
  data () {
    return {
      reportId: {
        wechatId: null,
        timestamp: null
      },
      reportSrc: null,
      showRep: null
    }
  },

  onLoad (options) {
    this.reportId.wechatId = options.wechatId
    this.reportId.timestamp = options.timestamp
    this.reportSrc = null
    this.showRep = false
    if (options == null || options.wechatId == null || options.timestamp == null) {
      this.showRep = false
    }
    var context = this
    wx.request({
      url: 'https://miniprogram.xluyun.com/report/getReport',
      data: {
        wechatId: this.reportId.wechatId,
        timestamp: this.reportId.timestamp
      },
      method: 'GET',
      success: function (res) {
        if (res.data.status === 400) {
          wx.showModal({
            title: '温馨提示',
            showCancel: false,
            content: '获取专业报告失败，报告不存在！'
          })
        } else if (res.data.status === 500) {
          wx.showModal({
            title: '温馨提示',
            showCancel: false,
            content: res.data.error
          })
        } else {
          var array = wx.base64ToArrayBuffer(res.data.result)
          var base64 = wx.arrayBufferToBase64(array)
          context.reportSrc = 'data:image/png;base64,' + base64
          context.showRep = true
        }
      }
    })
  },

  methods: {
    bindTap () {
      var context = this
      wx.previewImage({
        urls: [context.reportSrc]
      })
    }
  }
}
</script>

<style>
page {
  background: #2ebeb8;
  height: 100%;
  width: 100%;
}
</style>
