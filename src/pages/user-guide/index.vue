<template>
  <view style="background: #F0F0F0;">
    <view style="background: white;">
      <van-panel>

        <view>
          <van-cell
            clickable
            url="../terms-of-service/main"
          >
            <view style="height: 100%; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
              <view style="height: 100%; width: 80%; display:flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
                <span style="font-size: 11pt">用户协议</span>
                <span style="font-size: 9pt; color: grey;">2018-10-02 22:00</span>
              </view>
              <view style="height: 100%; width: 20%; display:flex; justify-content: flex-end; align-items: center;">
                <van-tag type="success" plain="true" style="display: flex; justify-content: flex-start; align-items: center;">版本 1.0</van-tag>
              </view>
            </view>
          </van-cell>
        </view>

        <view>
          <van-cell
            clickable
            url="usage-guide/main"
            :border="false"
          >
            <view style="height: 100%; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
              <view style="height: 100%; width: 80%; display:flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
                <span style="font-size: 11pt">可学养老金计算器使用指南</span>
                <span style="font-size: 9pt; color: grey;">2018-09-26 22:00</span>
              </view>
              <view style="height: 100%; width: 20%; display:flex; justify-content: flex-end; align-items: center;">
                <van-tag plain="true" style="display: flex; justify-content: flex-start; align-items: center;">版本 0.1</van-tag>
              </view>
            </view>
          </van-cell>
        </view>

      </van-panel>
    </view>
    <view style="height: 1px; margin: 6px 0;">
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
