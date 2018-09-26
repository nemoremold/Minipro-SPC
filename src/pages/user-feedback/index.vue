<template>
  <view style="background: #F0F0F0; height: 100%; width: 100%;">
    <view style="position: fixed; background: white; height: 60%; width: 100%">
      <van-panel
        title="意见反馈"
        use-footer-slot
      >
        <view>
          <van-field
            type="text"
            maxlength="500"
            placeholder="请在这里输入您的宝贵意见"
            :border="false"
          />
        </view>
        <view slot="footer" style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
          <van-button size="small" style="margin: 0 5px;">清空</van-button>
          <van-button type="primary" size="small">提交</van-button>
        </view>
      </van-panel>
    </view>
    <view style="position: fixed; top: 60%; background: white: height: 40%; width: 100%;">
      <van-panel
        title="联系方式"
      >
        <view style="bottom: 0; display: flex; flex-direction: column; justify-content: flex-end; align-items: center;">
          <view style="height: 30%; width: 80%;">
            <span style="color: grey; font-size: 10pt;">客服电话</span>
          </view>
          <view style="height: 30%; width: 80%;">
            <span style="color: grey; font-size: 10pt;">发送邮件</span>
          </view>
          <view style="height: 30%; width: 80%;">
            <span style="color: grey; font-size: 10pt;">公司地址</span>
          </view>
        </view>
      </van-panel>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style>
page {
  background: #F0F0F0;
  height: 100%;
  width: 100%;
}
</style>
