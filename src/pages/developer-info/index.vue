<template>
  <view v-if="QRCodeSrc" style="text-align: center; position: fixed; height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
    <view style="background: white; width: 100%; height: 70%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <image v-if="QRCodeSrc" :src="QRCodeSrc" mode="aspectFit" @tap="bindTap" style="height: 700rpx; width: 700rpx;" />
      <view style="width: 90%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <span style="display: flex; flex-direction: column; justify-content: center; align-items: center;">点击二维码,长按,保存图片或转发之后，扫码即可关注可学微信公众号</span>
      </view>
    </view>
    <view style="width: 90%; height: 30%; font-size: 10pt; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <view>
        <span>客服电话：13407192232</span>
      </view>
      <view>
        <span>公司邮箱：13407192232@163.com</span>
      </view>
      <view>
        <span>公司地址：苏州市吴中区嘉瑞巷8号乐嘉大厦西栋2617</span>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      QRCodeSrc: 'https://raw.githubusercontent.com/nemoremold/Minipro-SPC/dev/static/images/qrcode.jpg'
    }
  },

  methods: {
    bindTap () {
      var current = this.QRCodeSrc
      wx.previewImage({
        urls: current.split(',')
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
