<template>
  <view style="background: #F0F0F0; height: 100%; width: 100%;">

    <van-cell
      :border="false"
    >
      <view slot="title" style="font-size: 12pt;">
        <span style="color: #56bab7;">{{ '| ' }}</span>
        <span style="color: #479f99;">意见反馈</span>
      </view>
    </van-cell>
    <view style="height: 1px; width: 100%; background: #F0F0F0;"></view>

    <view style="background: white; height: 30%; width: 100%">
      <view style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
        <view style="background: #F0F0F0; height: 100%; width: 90%; display: flex; justify-content: center; align-items: center;">
          <view style="height: 92%; width: 94%; font-size: 11pt;">
            <textarea
              v-model="feedback"
              style="height: 100%; width: 100%;"
              maxlength="128"
              placeholder="请输入您宝贵的意见！"
            />
          </view>
        </view>
      </view>
    </view>

    <van-field
      inputAlign="right"
      :value="wordCount + '/128'"
      :border="false"
    >
    </van-field>
    <view style="height: 1px; width: 100%; background: #D0D0D0;"></view>

    <view style="width: 100%; margin: 6px 0; display: flex; justify-content: center; align-items: center;">
      <view style="width: 90%;">
        <van-button type="primary" size="large" @click="submitFeedback">{{ '提 交' }}</van-button>
      </view>
    </view>

    <van-toast id="van-toast" />
  </view>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'

export default {
  data () {
    return {
      feedback: String,
      wordCount: Number,
      pressed: null
    }
  },

  onLoad () {
    this.feedback = ''
    this.wordCount = 0
    this.pressed = false
  },

  watch: {
    feedback (newValue) {
      this.wordCount = ((newValue === '' || newValue == null) ? 0 : newValue.length)
    }
  },

  methods: {
    submitFeedback () {
      if (this.feedback == null || this.feedback === '') {
        Toast('请您输入反馈内容！')
        return
      }
      if (this.pressed) {
        return
      }
      this.pressed = true
      var context = this
      wx.showLoading({
        title: '正在反馈',
        mask: true
      })
      wx.request({
        url: 'http://localhost:8080/user/userFeedback',
        data: {
          wechatId: this.globalData.userInfo.wechatId,
          feedback: this.feedback
        },
        method: 'POST',
        success: function (res) {
          context.pressed = false
          wx.hideLoading()
          if (res.statusCode === 200) {
            wx.showModal({
              title: '温馨提示',
              showCancel: false,
              content: '成功提交，谢谢您的反馈！',
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../user-center/main'
                  })
                }
              }
            })
          } else if (res.data.status === 500) {
            wx.showModal({
              title: '温馨提示',
              showCancel: false,
              content: res.data.error
            })
          }
        }
      })
    }
  }
}
</script>

<style>
page {
  background: #F0F0F0;
  height: 100%;
  width: 100%;
}
</style>
