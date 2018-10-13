<template>
  <!-- <div>
    <navigator open-type="switchTab" url="../user-center/main">SPC Report Deluxe Edition</navigator>
  </div> -->
  <view v-if="backgroundSrc" style="height: 100%; width: 100%; background: #2ebeb8 url('/static/images/background.jpeg') round; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; overflow: hidden;">
    <image v-if="backgroundSrc" :src="backgroundSrc" mode="aspectFill" style="z-index: 0; position: fixed; top: 0; left: 0; height: 100%; width: 100%;" />
    <view :style="'height: ' + viewData.title.height + 'rpx; width: ' + viewData.title.width + 'rpx; z-index: 2; display: flex; flex-direction: column; justify-content: flex-end; align-items: center;'">
      <view style="height: 95%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <view :style="'position: fixed; left: 30rpx; background: #087376; height: ' + (viewData.title.height * 0.95) + 'rpx; width: ' + (viewData.title.height * 0.95) + 'rpx; border-radius: 50%;'"></view>
        <view :style="'position: fixed; height: ' + (viewData.title.height * 0.55) + 'rpx; width: 750rpx; background: #087376;'"></view>
        <view :style="'position: fixed; left: 30rpx; height: ' + (viewData.title.height * 0.95) + 'rpx; width: ' + (viewData.title.height * 0.95) + 'rpx; border-radius: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center;'">
          <view style="height: 90%; width: 90%; background: white; border-radius: 50%;"></view>
        </view>
        <view :style="'position: fixed; height: ' + (viewData.title.height * 0.55) + 'rpx; width: 750rpx; display: flex; flex-direction: column; justify-content: center; align-items: center;'">
          <view style="height: 85%; width: 750rpx; background: white; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <view style="height: 98%; width: 750rpx; background: #087376; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
              <view :style="'width: ' + ((750 - (viewData.title.height * 0.95 + 30)) * 100 / 750) + '%; height: 96%;'">
                <view style="width: 100%; height: 50%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                  <span style="font-size: 13pt; font-weight: bold; color: white;">养老金测算报告（简版）</span>
                </view>
                <view style="width: 100%; height: 50%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
                  <view style="width: 100%; height: 50%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                    <span style="font-size: 12pt; color: white;">{{ '&ensp;' + report[0][0].value + '&emsp;' + report[0][1].value + '&emsp;' + report[0][2].value + '岁' }}</span>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view :style="'position: fixed; left: 30rpx; height: ' + (viewData.title.height * 0.95) + 'rpx; width: ' + (viewData.title.height * 0.95) + 'rpx; border-radius: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center;'">
          <view style="height: 90%; width: 90%; border-radius: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <view style="height: 98%; width: 98%; border-radius: 50%; background: #087376; display: flex; flex-direction: column; justify-content: center; align-items: center;">
              <view style="height: 75%; width: 75%; border-radius: 50%; background: white;">
                <image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" mode="aspectFill" style="height: 100%; width: 100%; border-radius: 50%;" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view :style="'height: ' + viewData.firstMonthPension.height + 'rpx; width: ' + viewData.firstMonthPension.width + 'rpx; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;'">
      <view :style="'position: fixed; left: 50rpx; right: 50rpx; height: ' + viewData.firstMonthPension.height + 'rpx; margin: 8px 0;'">
        <view style="width: 100%; height: 20%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
          <view style="width: 65%; height: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
            <span style="font-size: 13pt; font-weight: bold;">退休首年月领养老金</span>
          </view>
          <view style="width: 35%; height: 100%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
            <span style="font-size: 13pt; font-weight: bold; color: white;">{{ report[2][0].value }}</span>
            <span style="font-size: 13pt; font-weight: bold;">{{ '&ensp;元' }}</span>
          </view>
        </view>
        <view style="height: 80%; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
          <view style="height: 100%; width: 40%;">
            <ec-canvas class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
          </view>
          <view style="height: 100%; width: 60%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <view style="margin: 2px 0; height: 25px; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
              <view style="height: 100%; width: 15%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
                <view style="height: 12px; width: 100%; background: #e66c5a; border-radius: 30%; margin: 0 5px;"></view>
              </view>
              <view style="height: 100%; width: 50%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                <span style="font-size: 8pt; color: #333;">社保基础养老金</span>
              </view>
              <view style="height: 100%; width: 35%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
                <span style="font-size: 8pt; color: #333;">{{ report[2][1].value + '元' }}</span>
              </view>
            </view>
            <view style="margin: 2px 0; height: 25px; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
              <view style="height: 100%; width: 15%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
                <view style="height: 12px; width: 100%; background: #fbb513; border-radius: 30%; margin: 0 5px;"></view>
              </view>
              <view style="height: 100%; width: 50%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                <span style="font-size: 8pt; color: #333;">社保个人帐户养老金</span>
              </view>
              <view style="height: 100%; width: 35%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
                <span style="font-size: 8pt; color: #333;">{{ report[2][2].value + '元' }}</span>
              </view>
            </view>
            <view style="margin: 2px 0; height: 25px; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
              <view style="height: 100%; width: 15%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
                <view style="height: 12px; width: 100%; background: #017e8d; border-radius: 30%; margin: 0 5px;"></view>
              </view>
              <view style="height: 100%; width: 50%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                <span style="font-size: 8pt; color: #333;">社保过渡性养老金</span>
              </view>
              <view style="height: 100%; width: 35%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
                <span style="font-size: 8pt; color: #333;">{{ report[2][3].value + '元' }}</span>
              </view>
            </view>
            <view style="margin: 2px 0; height: 25px; width: 100%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
              <view style="height: 100%; width: 15%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
                <view style="height: 12px; width: 100%; background: #8ac5c6; border-radius: 30%; margin: 0 5px;"></view>
              </view>
              <view style="height: 100%; width: 50%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                <span style="font-size: 8pt; color: #333;">企业年金</span>
              </view>
              <view style="height: 100%; width: 35%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
                <span style="font-size: 8pt; color: #333;">{{ report[2][4].value + '元' }}</span>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view :style="'height: ' + viewData.pensionGap.height + 'rpx; width: ' + viewData.pensionGap.width + 'rpx; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;'">
      <view :style="'position: fixed; left: 50rpx; right: 50rpx; height: ' + viewData.pensionGap.height + 'rpx;'">
        <view style="margin: 3px 0; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
          <view style="width: 65%; height: 100%;">
            <span style="font-size: 13pt; font-weight: bold;">退休养老金总缺口</span>
          </view>
          <view style="width: 35%; height: 100%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
            <span style="font-size: 13pt; font-weight: bold; color: white;">{{ report[1][0].value }}</span>
            <span style="font-size: 13pt; font-weight: bold;">{{ '&ensp;元' }}</span>
          </view>
        </view>
        <view style="margin: 3px 0; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
          <view style="width: 70%; height: 100%;">
            <span style="font-size: 10pt;">{{ '&ensp;补充养老金准备年数' }}</span>
          </view>
          <view style="width: 30%; height: 100%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
            <picker
                :value="pickerId"
                :range="report[1][1].options"
                @change="bindPickerChange"
            >
              <van-button size="mini" style="height: 90%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
                <span style="font-size: 10pt;">{{ report[1][1].value }}</span>
              </van-button>
            </picker>
            <span style="font-size: 10pt;">{{ '&ensp;年' }}</span>
          </view>
        </view>
        <view style="margin: 3px 0; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
          <view style="width: 70%; height: 100%;">
            <span style="font-size: 10pt;">{{ '&ensp;每年准备补充养老金所需金额' }}</span>
          </view>
          <view style="width: 30%; height: 100%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
            <span style="font-size: 10pt;">{{ report[1][2].value }}</span>
            <span style="font-size: 10pt;">{{ '&ensp;元' }}</span>
          </view>
        </view>
      </view>
    </view>
    <view :style="'height: ' + viewData.desc.height + 'rpx; width: ' + viewData.desc.width + 'rpx; z-index: 0; display: flex; flex-direction: column; justify-content: flex-end; align-items: center;'">
      <image v-if="decoSrc" :src="decoSrc" mode="aspectFit" style="height: 100%; width: 100%;" />
    </view>
    <view :style="'height: ' + viewData.button.height + 'rpx; width: ' + viewData.button.width + 'rpx; z-index: 2; background: #f0bc26; display: flex; flex-direction: row; justify-content: center; align-items: center;'" @click="generateDeluxeReport">
      <span style="color: #e6551c; font-weight: bold; font-size: 17pt;">点击生成专业版报告 1.00元</span>
    </view>
  </view>
</template>

<script>
import entityDefinitions from '@/common/staticData/entityDefinitions'

export default {
  data () {
    return {
      backgroundSrc: '/static/images/background.jpeg',
      logoSrc: '/static/images/logo.png',
      decoSrc: '/static/images/express-report-deco.png',
      viewData: {
        sysWidth: Number,
        sysHeight: Number,
        sysHeightRpx: Number,
        title: {
          width: Number,
          height: Number
        },
        firstMonthPension: {
          width: Number,
          heigth: Number
        },
        pensionGap: {
          width: Number,
          height: Number
        },
        desc: {
          width: Number,
          height: Number
        },
        button: {
          width: Number,
          height: Number
        }
      },
      weChatId: null,
      reportId: null,
      report: [],
      options: entityDefinitions.CHART_OPTIONS,
      ec: null,
      pickerId: null,
      userInfo: null
    }
  },

  onLoad (options) {
    var sysInfo = wx.getSystemInfoSync()
    if (sysInfo != null) {
      this.viewData.sysWidth = sysInfo.windowWidth
      this.viewData.sysHeight = sysInfo.windowHeight
      this.viewData.sysHeightRpx = 750 * this.viewData.sysHeight / this.viewData.sysWidth
      this.viewData.title.height = this.viewData.sysHeightRpx * 0.24
      this.viewData.title.width = 750
      this.viewData.firstMonthPension.height = this.viewData.sysHeightRpx * 0.29
      this.viewData.firstMonthPension.width = 750
      this.viewData.pensionGap.height = this.viewData.sysHeightRpx * 0.16
      this.viewData.pensionGap.width = 750
      this.viewData.desc.height = this.viewData.sysHeightRpx * 0.22
      this.viewData.desc.width = 750
      this.viewData.button.height = this.viewData.sysHeightRpx * 0.09
      this.viewData.button.width = 750
    }

    this.weChatId = options.weChatId
    this.reportId = options.reportId
    this.report = entityDefinitions.EXPRESS_REPORT_FIELDS_DEFINITION.sections
    this.report[0][0].value = options.name
    this.report[0][1].value = options.gender
    this.report[0][2].value = options.age
    this.report[1][0].value = options.gap
    this.report[1][2].value = parseInt(options.gap / this.report[1][1].value)
    this.report[2][0].value = options.p0
    this.report[2][1].value = options.p1
    this.report[2][2].value = options.p2
    this.report[2][3].value = options.p3
    this.report[2][4].value = options.p4
    this.report[2][5].value = [options.p1, options.p2, options.p3, options.p4]
    this.options.series[0].data[0].value = options.p1
    this.options.series[0].data[1].value = options.p2
    this.options.series[0].data[2].value = options.p3
    this.options.series[0].data[3].value = options.p4
    this.ec = {
      options: this.options
    }
    this.pickerId = 3

    this.userInfo = this.globalData.userInfo
  },

  methods: {
    bindPickerChange (e) {
      let newValue = e.mp.detail.value
      this.pickerId = newValue
      this.report[1][1].value = this.report[1][1].options[newValue]
      this.report[1][2].value = parseInt(this.report[1][0].value / this.report[1][1].value)
    },

    generateDeluxeReport () {
      var context = this
      if (this.globalData.userInfo != null) {
        wx.request({
          url: 'https://miniprogram.xluyun.com/user/checkRegister',
          data: {
            wechatId: this.globalData.userInfo.wechatId
          },
          method: 'GET',
          success: function (res) {
            if (res.data.result === true) {
              wx.showModal({
                title: '温馨提示',
                showCancel: false,
                content: '正在生成专业报告！',
                success: function (res) {
                  var detailedRes = context.globalData.details.getDetailedReportData()
                  console.log(detailedRes)
                  wx.request({
                    url: 'http://localhost:8080/report/setReportData',
                    data: context.globalData.calculateFactors,
                    method: 'POST',
                    success: function (res) {
                      console.log(res)
                    }
                  })
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../user-center/main',
                      success: function () {
                        wx.navigateTo({
                          url: '../report-repo/main'
                        })
                      }
                    })
                  }
                }
              })
            } else {
              wx.navigateTo({
                url: '../user-logon/main?proxy=report'
              })
            }
          }
        })
      } else {
        wx.showModal({
          title: '温馨提示',
          content: '该功能需要用户信息授权！'
        })
      }
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

ec-canvas {
  width: 100%;
  height: 100%;
}
</style>
