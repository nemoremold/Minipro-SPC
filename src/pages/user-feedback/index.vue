<template>
  <view style="background: #F0F0F0; height: 100%; width: 100%;">
    <view style="background: white; height: 60%; width: 100%">
      <van-panel
        title="意见反馈"
        use-footer-slot
      >
        <view style="height: 50%;">
          <van-field
            label="test"
            type="textarea"
            maxlength="128"
            placeholder="请在这里输入您的宝贵意见"
            :border="false"
            autosize="true"
          />
        </view>
        <view slot="footer" style="bottom: 60%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
          <van-button size="small" style="margin: 0 5px;">清空</van-button>
          <van-button type="primary" size="small">提交</van-button>
        </view>
      </van-panel>
    </view>
    <view style="background: white; height: 100px; width: 200px;">
      <input
        type="text"
        step="background: red;"
      />
    </view>
    <view style="background: white; height: 40%; width: 100%;">
      <input
        type="text"
        step="background: red;"
      />
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
