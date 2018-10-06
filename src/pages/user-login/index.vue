<template>
  <view style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <view style="height: 80%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <image v-if="logoSrc" :src="logoSrc" mode="aspectFit" />
    </view>
    <view style="height: 20%; width: 100% display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <button open-type="getUserInfo" type="primary" @getuserinfo="onGotUserInfo" style="background: #1eaea8;">进入小程序</button>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      logoSrc: '/static/images/logo.png'
    }
  },

  onReady () {
    var context = this
    wx.getSetting({
      success: function (res) {
        var appContext = context
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              appContext.globalData.userInfo = res.userInfo
            }
          })
          wx.switchTab({
            url: '../sp-calculator/main'
          })
        }
      }
    })
  },

  methods: {
    onGotUserInfo (e) {
      this.globalData.userInfo = e.mp.detail.userInfo
      wx.switchTab({
        url: '../sp-calculator/main'
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
