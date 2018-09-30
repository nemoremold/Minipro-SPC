<template>
  <view style="background: #F0F0F0;">
    <view style="height: 150px; width: 100%; margin: 0; display: flex; justify-content: flex-start; align-items: center;">
      <view style="height: 100%; width: 10%;"></view>
      <view style="height: 100%; width: 55%; display: flex; justify-content: center; align-items: center;">
        <view style="height: 50%; width: 100%; background: silver; display: flex; justify-content: flex-start; align-items: center;">
          <image style="height: 50px; width: 50px; border-radius: 50%; background: white;" v-if="logoSrc" :src="logoSrc" mode="scaleToFill" />
          <view style="height: 100%; width: 5px;"></view>
          <view style="height: 100%; width: 100px;">
            <div style="font-size: 10pt;">用户名四五六七八九十一二三四五六</div>
            <div style="font-size: 8pt;">自定义数据栏</div>
          </view>
        </view>
      </view>
      <view style="height: 100%; width: 30%; display: flex; justify-content: center; align-items: center;">
        <image v-if="logoSrc" :src="logoSrc" style="height: 100px; width: 100px;" />
      </view>
      <view style="height: 100%; width: 5%;"></view>
    </view>
    <view style="background: white; margin: 0 0 6px 0;">
      <van-panel>
        <view slot="header">
          <van-cell
            clickable
            url="../report-repo/main"
            center="true"
            :border="false"
          >
            <view style="height: 100%; width: 100%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
              <van-icon name="records" style="display: flex; flex-direction: row; justify-content: center; align-items: center;" />
              <span style="font-weight: bold">&nbsp;历史专业版养老金报告</span>
            </view>
          </van-cell>
        </view>
        <view style="height: 1px; width: 100%; background: #F0F0F0;"></view>
        <view style="display: flex;">
          <view style="width: 50%;">
            <van-cell
              clickable
              :border="false"
            >
              <view style="height: 100%; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                <view style="width: 25%;">
                  <van-icon name="points-mall" style="display: flex; flex-direction: row; justify-content: center; align-items: center;" />
                </view>
                <view style="width: 75%; display: flex; flex-direction: row; justify-content: flex-start;">
                  <span>待定测试功能1</span>
                </view>
              </view>
            </van-cell>
          </view>
          <view style="width: 50%;">
            <van-cell
              clickable
              :border="false"
            >
              <view style="height: 100%; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                <view style="width: 25%;">
                  <van-icon name="cart" style="display: flex; flex-direction: row; justify-content: center; align-items: center;" />
                </view>
                <view style="width: 75%; display: flex; flex-direction: row; justify-content: flex-start;">
                  <span>待定测试功能2</span>
                </view>
              </view>
            </van-cell>
          </view>
        </view>

        <view style="display: flex;">
          <view style="width: 50%;">
            <van-cell
              clickable
              :border="false"
            >
              <view style="height: 100%; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                <view style="width: 25%;">
                  <van-icon name="discount" style="display: flex; flex-direction: row; justify-content: center; align-items: center;" />
                </view>
                <view style="width: 75%; display: flex; flex-direction: row; justify-content: flex-start;">
                  <span>待定功能3</span>
                </view>
              </view>
            </van-cell>
          </view>
          <view style="width: 50%;">
            <van-cell
              clickable
              :border="false"
            >
              <view style="height: 100%; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                <view style="width: 25%;">
                  <van-icon name="wap-home" style="display: flex; flex-direction: row; justify-content: center; align-items: center;" />
                </view>
                <view style="width: 75%; display: flex; flex-direction: row; justify-content: flex-start;">
                  <span>待定功能4</span>
                </view>
              </view>
            </van-cell>
          </view>
        </view>
      </van-panel>
    </view>
    <view style="background: white; margin: 6px 0;">
      <van-panel
        title="资料"
      >
        <van-cell-group :border="false">
          <van-cell
            title="历史订单"
            is-link
            url="../purchase-history/main"
            icon="completed"
          />
          <van-cell
            title="我的信息"
            is-link
            url="../userinfo-setting/main"
            icon="contact"
            :border="false"
          />
        </van-cell-group>
      </van-panel>
    </view>
    <view style="background: white; margin: 6px 0;">
      <van-panel
        title="帮助"
      >
        <van-cell-group :border="false">
          <van-cell
            title="用户指南"
            is-link
            url="../user-guide/main"
            icon="like-o"
          />
          <van-cell
            title="开发者信息"
            is-link
            url="../developer-info/main"
            icon="idcard"
            :border="true"
          />
          <van-cell
            title="用户反馈"
            is-link
            url="../user-feedback/main"
            icon="pending-evaluate"
            :border="false"
          />
        </van-cell-group>
      </van-panel>
    </view>
    <view style="height: 6px; margin: 6px 0;"></view>
  </view>
</template>

<script>
import viewSetting from '@/common/staticData/viewSettings'
import OptionTab from '@/components/option-tab'

export default {
  components: {
    'option-tab': OptionTab
  },

  data () {
    return {
      optionTabs: [],
      logoSrc: '/static/images/logo.png'
    }
  },

  onLoad () {
    this.optionTabs = viewSetting.USER_CENTER_SETTING.optionTabs
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
