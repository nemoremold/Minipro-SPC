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
import WXBizDataCrypt from '../../utils/cryptojs/WXBizDataCrypt'

export default {
  data () {
    return {
      logoSrc: '/static/images/logo.png',
      AppId: 'wx3aa20d7fa2827d31'
    }
  },

  onReady () {
    var context = this
    wx.getSetting({
      success: function (res) {
        var appContext = context
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (jsCodeRes) {
              wx.request({
                url: 'https://miniprogram.xluyun.com/user/login',
                data: {
                  code: jsCodeRes.code
                },
                method: 'GET',
                success: function (sessionRes) {
                  var pc = new WXBizDataCrypt(appContext.AppId, sessionRes.data.result.session_key)
                  wx.getUserInfo({
                    success: function (res) {
                      appContext.globalData.userInfo = res.userInfo
                      var data = pc.decryptData(res.encryptedData, res.iv)
                      appContext.globalData.userInfo.wechatId = data.openId
                    }
                  })
                }
              })
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
      if (e.mp.detail.errMsg === 'getUserInfo:fail auth deny') {
        wx.showModal({
          title: '温馨提示',
          showCancel: false,
          content: '小程序的使用需要您的用户基本信息：用户头像、用户名。'
        })
        return
      }
      this.globalData.userInfo = e.mp.detail.userInfo
      var appContext = this
      wx.login({
        success: function (jsCodeRes) {
          wx.request({
            url: 'https://miniprogram.xluyun.com/user/login',
            data: {
              code: jsCodeRes.code
            },
            method: 'GET',
            success: function (sessionRes) {
              var pc = new WXBizDataCrypt(appContext.AppId, sessionRes.data.result.session_key)
              wx.getUserInfo({
                success: function (res) {
                  var data = pc.decryptData(res.encryptedData, res.iv)
                  appContext.globalData.userInfo.wechatId = data.openId
                }
              })
            }
          })
        }
      })
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
