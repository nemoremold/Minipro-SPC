<template>
  <view style="background: #F0F0F0;">
    <view style="top: 0; left: 0; height: 150px; width: 100%; margin: 0; display: flex; justify-content: flex-start; align-items: center; background: #2ebeb8;">
      <view style="height: 100%; width: 10%;"></view>
      <view style="height: 100%; width: 55%; display: flex; justify-content: center; align-items: center;">
        <view style="height: 50%; width: 100%; display: flex; justify-content: flex-start; align-items: center;">
          <image style="height: 50px; width: 50px; border-radius: 50%; background: white;" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" mode="scaleToFill" />
          <view style="height: 100%; width: 5px;"></view>
          <view style="height: 100%; width: 100px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
            <div style="font-size: 10pt;">{{ userInfo.nickName }}</div>
            <div style="font-size: 8pt;">{{ '专业报告数：' + reportCount }}</div>
          </view>
        </view>
      </view>
      <view style="height: 100%; width: 30%; display: flex; justify-content: center; align-items: center;">
        <image v-if="logoSrc" :src="logoSrc" style="height: 100px; width: 100px;" />
      </view>
      <view style="height: 100%; width: 5%;"></view>
    </view>

    <view style="background: white; top: 150px;">
      <van-panel>

        <view v-for="(item, index) in reports" :key="index">
          <van-cell
            clickable
            :url="'../spc-report-deluxe/main?reportId=' + item.reportId"
          >
            <view style="height: 100%; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
              <view style="height: 100%; width: 80%; display:flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
                <span style="font-size: 11pt">{{ item.displayedName }}</span>
                <span style="font-size: 9pt; color: grey;">{{ item.time }}</span>
              </view>
              <view style="height: 100%; width: 20%; display:flex; justify-content: flex-end; align-items: center;">
                <van-tag type="success" plain="true" style="display: flex; justify-content: flex-start; align-items: center;">{{ '查看' }}</van-tag>
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
import RepoElementList from '@/components/repo-element-list'
// import SPCApi from '@/apis/SPCBEServiceHandler'

export default {
  components: {
    'repo-element-list': RepoElementList
  },

  data () {
    return {
      reports: [],
      weChatId: null,
      timestamp: null,
      top: null,
      logoSrc: '/static/images/logo.png',
      userInfo: null,
      reportCount: null
    }
  },

  onLoad () {
    this.weChatId = null
    // this.reports = SPCApi.SPCBEServiceHandler.getSPCReportsWithWeChatId(this.weChatId)
    this.reports = [
      {
        reportId: 'testId1',
        displayedName: 'displayedName1',
        time: '2018-10-01 00:00:00',
        type: 'deluxe'
      },
      {
        reportId: 'testId2',
        displayedName: 'displayedName2',
        time: '2018-10-11 01:11:24',
        type: 'express'
      }
    ]
    this.userInfo = this.globalData.userInfo
    this.reportCount = 0
    var context = this
    wx.request({
      url: 'https://miniprogram.xluyun.com/report/getReportCount',
      data: {
        wechatId: this.userInfo.wechatId
      },
      method: 'GET',
      success: function (res) {
        context.reportCount = res.data.result
      }
    })
  },

  onPullDownRefresh () {
    wx.showNavigationBarLoading()
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
