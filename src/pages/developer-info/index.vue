<template>
  <view style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <image v-if="QRCodeSrc" :src="QRCodeSrc" mode="aspectFit" @longpress="bindLongTab" style="height: 700rpx; width: 700rpx;" />
    <view>
      <span>客服电话：13407192232</span>
    </view>
    <view>
      <span>公司邮箱（email）：13407192232@163.com</span>
    </view>
    <view>
      <span>公司地址：苏州市吴中区嘉瑞巷8号乐嘉大厦西栋2617</span>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      QRCodeSrc: '/static/images/qrcode.jpg'
    }
  },

  methods: {
    bindLongTab () {
      console.log(1)
      wx.previewImage({
        current: this.QRCodeSrc,
        urls: [this.QRCodeSrc],
        success: function (res) {
          console.log(res)
        }
      })
      wx.getImageInfo({
        src: this.QRCodeSrc,
        success: function (res) {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style>

</style>
