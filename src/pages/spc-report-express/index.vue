<template>
  <!-- <div>
    <navigator open-type="switchTab" url="../user-center/main">SPC Report Deluxe Edition</navigator>
  </div> -->
  <view v-if="backgroundSrc" style="height: 100%; width: 100%; background: #2ebeb8; overflow-x: hidden;">
    <image v-if="backgroundSrc" :src="backgroundSrc" mode="aspectFill" style="z-index: 0; position: fixed; top: 0; left: 0; height: 100%; width: 100%;" />
    <view style="height: 100%; width: 100%; background: #2ebeb8; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; overflow: hidden;">
      <view :style="'height: ' + viewData.title.height + 'rpx; width: ' + viewData.title.width + 'rpx; z-index: 2; display: flex; flex-direction: column; justify-content: flex-end; align-items: center;'">
        <view style="height: 95%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <view :style="'position: absolute; left: 30rpx; background: #087376; height: ' + (viewData.title.height * 0.95) + 'rpx; width: ' + (viewData.title.height * 0.95) + 'rpx; border-radius: 50%;'"></view>
          <view :style="'position: absolute; height: ' + (viewData.title.height * 0.55) + 'rpx; width: 750rpx; background: #087376;'"></view>
          <view :style="'position: absolute; left: 30rpx; height: ' + (viewData.title.height * 0.95) + 'rpx; width: ' + (viewData.title.height * 0.95) + 'rpx; border-radius: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center;'">
            <view style="height: 90%; width: 90%; background: white; border-radius: 50%;"></view>
          </view>
          <view :style="'position: absolute; height: ' + (viewData.title.height * 0.55) + 'rpx; width: 750rpx; display: flex; flex-direction: column; justify-content: center; align-items: center;'">
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
          <view :style="'position: absolute; left: 30rpx; height: ' + (viewData.title.height * 0.95) + 'rpx; width: ' + (viewData.title.height * 0.95) + 'rpx; border-radius: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center;'">
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
        <view :style="'position: absolute; left: 50rpx; right: 50rpx; height: ' + viewData.firstMonthPension.height + 'rpx; margin: 8px 0;'">
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
                <view style="height: 100%; width: 55%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                  <span style="font-size: 8pt; color: #333;">社保个人帐户养老金</span>
                </view>
                <view style="height: 100%; width: 30%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
                  <span style="font-size: 8pt; color: #333;">{{ report[2][2].value + '元' }}</span>
                </view>
              </view>
              <view style="margin: 2px 0; height: 25px; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                <view style="height: 100%; width: 15%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
                  <view style="height: 12px; width: 100%; background: #017e8d; border-radius: 30%; margin: 0 5px;"></view>
                </view>
                <view style="height: 100%; width: 55%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
                  <span style="font-size: 8pt; color: #333;">社保过渡性养老金</span>
                </view>
                <view style="height: 100%; width: 30%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
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
        <view :style="'position: absolute; left: 50rpx; right: 50rpx; height: ' + viewData.pensionGap.height + 'rpx;'">
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
        <image v-if="decoSrc" :src="decoSrc" mode="aspectFit" style="height: 80%; width: 80%;" />
      </view>
      <view :style="'buttom: 0; height: ' + viewData.button.height + 'rpx; width: ' + viewData.button.width + 'rpx; z-index: 2; background: #f0bc26; display: flex; flex-direction: row; justify-content: center; align-items: center;'" @click="generateDeluxeReport">
        <span style="color: #e6551c; font-weight: bold; font-size: 20pt;">{{ '点击生成&ensp;' }}</span>
        <span style="color: #e85100; font-weight: bold; font-size: 24pt;">{{ '专业版' }}</span>
        <span style="color: #e6551c; font-weight: bold; font-size: 20pt;">{{ '&ensp;报告' }}</span>
      </view>
    </view>
    <view style="margin: 3px 0; position: absolute; width: 100%; font-size: 6pt; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <view style="width: 94%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
        <!-- <view>
          <span style="font-weight: bold;">&diams;退休首年月领养老金计算公式：</span>
        </view>
        <view>
          <span>&emsp;&bull;公式一</span>
        </view>
        <view>
          <span style="font-weight: bold;">&diams;退休养老金总缺口计算公式：</span>
        </view>
        <view>
          <span>&emsp;&bull;公式二</span>
        </view> -->
        <view>
          <span style="font-weight: bold;">&diams;专业版报告额外提供：</span>
        </view>
        <view>
          <span>&emsp;&bull;缴费工资指数、基础养老金领取比例、个人帐户计发月数、养老金替代率与月度缺口等专业数据，并配有退休前后现金流示意图，比简版更专业、更详尽、更直观。</span>
        </view>
        <view>
          <span>&emsp;&bull;展示沟通工具。金融机构理财顾问可以使用专业版报告与客户进行专业沟通，既体现专业能力，又提高沟通效率。</span>
        </view>
        <view>
          <span>&emsp;&bull;专业版报告既可以打印出来仔细研究，也可以直接发送给客户或朋友，还可以在过往报告中查询。</span>
        </view>
      </view>
    </view>
    <view style="position: absolute; margin: 3px 0; height: 3px; width: 100%;"></view>
  </view>
</template>

<script>
import entityDefinitions from '@/common/staticData/entityDefinitions'
import dataFormatter from '@/utils/dataFormatter'
import MD5Util from '@/utils/md5'

export default {
  data () {
    return {
      backgroundSrc: '/static/images/neo-background.jpg',
      logoSrc: '/static/images/logo.png',
      decoSrc: '/static/images/express-report-deco2.png',
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
      userInfo: null,
      pressed: null
    }
  },

  onShareAppMessage () {
    return {
      title: '可学养老金计算器',
      path: 'pages/user-login/main'
    }
  },

  onLoad (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var sysInfo = wx.getSystemInfoSync()
    this.pressed = false
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
    if (this.globalData.calculateFactors.age < this.globalData.calculateFactors.expectedRetirementAge) {
      this.report[1][1].value = parseInt(this.globalData.calculateFactors.expectedRetirementAge) - parseInt(this.globalData.calculateFactors.age)
      this.report[1][1].options = Array.from(Array(this.report[1][1].value + 10), (v, k) => k + 1)
    }
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
    this.pickerId = this.report[1][1].value - 1

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
      if (this.pressed === true) {
        return
      }
      if (this.globalData.userInfo != null) {
        wx.request({
          url: 'https://miniprogram.xluyun.com/user/checkRegister',
          data: {
            wechatId: this.globalData.userInfo.wechatId
          },
          method: 'GET',
          success: function (res) {
            if (res.data.result === true) {
              context.pressed = true
              wx.showLoading({
                title: '正在准备生成',
                mask: true
              })
              wx.request({
                url: 'https://miniprogram.xluyun.com/getDetailedReportData',
                data: context.globalData.criticalData,
                method: 'POST',
                success: function (resJsonString) {
                  var detailedRes = JSON.parse(resJsonString.data.result)
                  detailedRes.wechatId = context.userInfo.wechatId
                  detailedRes.timestamp = context.globalData.calculateFactors.timestamp
                  detailedRes.generate_time = dataFormatter.formatDate(new Date())
                  detailedRes.avatar_url = context.userInfo.avatarUrl
                  detailedRes['target-name'] = context.globalData.calculateFactors.name
                  detailedRes.gender = context.globalData.calculateFactors.gender
                  detailedRes.age = context.globalData.calculateFactors.age
                  detailedRes['start-date'] = context.globalData.calculateFactors.workingMonths
                  detailedRes['mandatory-age-for-retirement'] = context.globalData.calculateFactors.legalRetirementAge
                  detailedRes['expected-retirement-age'] = context.globalData.calculateFactors.expectedRetirementAge
                  detailedRes['time-for-participation'] = context.globalData.calculateFactors.insuredMonths
                  detailedRes['social-security-location'] = context.globalData.calculateFactors.province
                  detailedRes['company-type'] = context.globalData.calculateFactors.jobType
                  detailedRes['personal-salary-before-tax'] = context.globalData.calculateFactors.incomeWithTax
                  detailedRes['local-average-salary-last-year'] = context.globalData.calculateFactors.averageIncomePerMonth
                  detailedRes['social-security-pension-account-balance'] = context.globalData.calculateFactors.pensionBalance
                  wx.request({
                    url: 'https://miniprogram.xluyun.com/report/setReportData',
                    data: context.globalData.calculateFactors,
                    method: 'POST',
                    success: function (res) {
                      wx.request({
                        url: 'https://miniprogram.xluyun.com/pay/prepay',
                        data: {
                          wechatId: context.userInfo.wechatId
                        },
                        method: 'GET',
                        success: function (res) {
                          var payData = 'appId=' + res.data.appId + '&nonceStr=' + res.data.nonce_str + '&package=prepay_id=' + res.data.prepayId + '&signType=MD5&timeStamp=' + detailedRes.timestamp
                          var tempData = payData + '&key=' + res.data.appKey
                          var paySign = MD5Util.MD5(tempData).toUpperCase()
                          wx.hideLoading()
                          if (res.data.status === 'SUCCESS') {
                            wx.requestPayment({
                              timeStamp: detailedRes.timestamp.toString(),
                              nonceStr: res.data.nonce_str,
                              package: 'prepay_id=' + res.data.prepayId,
                              signType: 'MD5',
                              paySign: paySign,
                              success: function (res) {
                                wx.showLoading({
                                  title: '正在生成报告',
                                  mask: true
                                })
                                wx.request({
                                  url: 'https://miniprogram.xluyun.com/report/generateReport',
                                  data: detailedRes,
                                  method: 'POST',
                                  success: function (res) {
                                    context.pressed = false
                                    wx.hideLoading()
                                    wx.showModal({
                                      title: '温馨提示',
                                      showCancel: false,
                                      content: '专业报告生成成功！',
                                      success: function (res) {
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
                                  }
                                })
                              },
                              fail: function (res) {
                                wx.showLoading({
                                  title: '正在处理',
                                  mask: true
                                })
                                wx.request({
                                  url: 'https://miniprogram.xluyun.com/report/deleteReportData',
                                  data: {
                                    wechatId: detailedRes.wechatId,
                                    timestamp: detailedRes.timestamp
                                  },
                                  method: 'GET',
                                  complete: function (res) {
                                    context.pressed = false
                                    wx.hideLoading()
                                    wx.showModal({
                                      title: '温馨提示',
                                      showCancel: false,
                                      content: '支付失败！'
                                    })
                                  }
                                })
                              }
                            })
                          } else {
                            wx.showLoading({
                              title: '正在处理',
                              mask: true
                            })
                            wx.request({
                              url: 'https://miniprogram.xluyun.com/report/deleteReportData',
                              data: {
                                wechatId: detailedRes.wechatId,
                                timestamp: detailedRes.timestamp
                              },
                              method: 'GET',
                              complete: function (res) {
                                context.pressed = false
                                wx.hideLoading()
                                wx.showModal({
                                  title: '温馨提示',
                                  showCancel: false,
                                  content: '支付失败！'
                                })
                              }
                            })
                          }
                        },
                        fail: function (res) {
                          wx.showLoading({
                            title: '正在处理',
                            mask: true
                          })
                          wx.request({
                            url: 'https://miniprogram.xluyun.com/report/deleteReportData',
                            data: {
                              wechatId: detailedRes.wechatId,
                              timestamp: detailedRes.timestamp
                            },
                            method: 'GET',
                            complete: function (res) {
                              context.pressed = false
                              wx.hideLoading()
                              wx.showModal({
                                title: '温馨提示',
                                showCancel: false,
                                content: '支付失败！'
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                },
                fail: function (res) {
                  context.pressed = false
                  wx.hideLoading()
                  wx.showModal({
                    title: '温馨提示',
                    showCancel: false,
                    content: '计算错误！'
                  })
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
