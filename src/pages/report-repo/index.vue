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

    <view style="background: white; margin: 0 0 6px 0;">
      <van-cell>
        <view slot="title" style="font-size: 10pt;">
          <span>提示：下拉刷新列表，上拉加载更多报告，长按重新生成报告。</span>
        </view>
      </van-cell>
    </view>

    <view class="weui-loadmore" v-if="isPullDownRefreshing">
      <view class="weui-loading"></view>
      <view class="weui-loadmore__tips">正在加载</view>
    </view>

    <view style="background: white; top: 150px;">
      <van-panel>

        <view v-for="(item, index) in reports" :key="index">
          <van-cell
            v-if="item"
            clickable
            :url="'../spc-report-deluxe/main?wechatId=' + userInfo.wechatId + '&timestamp=' + item.timestamp"
            @longpress="longPress(userInfo.wechatId, item.timestamp)"
          >
            <view style="height: 100%; width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
              <view style="height: 100%; width: 80%; display:flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
                <span style="font-size: 11pt">{{ item.name }}</span>
                <span style="font-size: 9pt; color: grey;">{{ item.time }}</span>
              </view>
              <view style="height: 100%; width: 20%; display:flex; justify-content: flex-end; align-items: center;">
                <van-tag type="success" plain="true" style="display: flex; justify-content: flex-start; align-items: center;">{{ '点击查看' }}</van-tag>
              </view>
            </view>
          </van-cell>
        </view>

      </van-panel>
    </view>

    <view class="weui-loadmore" v-if="isPullDownRefreshing == false && isLoadMore">
      <view class="weui-loading"></view>
      <view class="weui-loadmore__tips">加载更多</view>
    </view>
    <view class="weui-loadmore" v-if="isPullDownRefreshing == false && isLoadMore == false && isMore">
      <view class="weui-loadmore__tips">上拉加载更多</view>
    </view>
    <view class="weui-loadmore" v-if="isPullDownRefreshing == false && isLoadMore == false && isMore == false">
      <view class="weui-loadmore__tips">加载完毕</view>
    </view>

    <view style="height: 1px; margin: 6px 0;">
    </view>
  </view>
</template>

<script>
import RepoElementList from '@/components/repo-element-list'
import Details from '@/utils/details'
import dataFormatter from '@/utils/dataFormatter'

export default {
  components: {
    'repo-element-list': RepoElementList
  },

  data () {
    return {
      reports: [],
      top: null,
      skip: null,
      logoSrc: '/static/images/logo.png',
      userInfo: null,
      reportCount: null,
      isPullDownRefreshing: null,
      isLoadMore: null,
      isMore: null,
      pressed: null
    }
  },

  onShareAppMessage () {
    return {
      title: '可学养老金计算器',
      path: 'pages/user-login/main'
    }
  },

  onLoad () {
    wx.showShareMenu({
      withShareTicket: true
    })
    this.top = 0
    this.skip = 15
    this.isPullDownRefreshing = true
    this.isLoadMore = false
    this.isMore = false
    this.reports = []
    this.userInfo = this.globalData.userInfo
    this.reportCount = 0
    var context = this
    this.pressed = false
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
    wx.request({
      url: 'https://miniprogram.xluyun.com/report/getReportDataList',
      data: {
        wechatId: this.userInfo.wechatId,
        top: context.top,
        skip: this.skip
      },
      method: 'GET',
      success: function (res) {
        for (var i = 0; i < res.data.result.length; ++i) {
          res.data.result[i].time = dataFormatter.formatTime(new Date(parseInt(res.data.result[i].timestamp)))
        }
        context.reports = res.data.result
        context.isPullDownRefreshing = false
        if (context.reports.length < context.reportCount) {
          context.isMore = true
        }
      }
    })
  },

  onPullDownRefresh () {
    wx.showNavigationBarLoading()
    var context = this
    this.reports = []
    this.reportCount = 0
    this.isMore = false
    this.isPullDownRefreshing = true
    this.isLoadMore = false
    this.top = 0
    wx.request({
      url: 'https://miniprogram.xluyun.com/report/getReportCount',
      data: {
        wechatId: this.userInfo.wechatId
      },
      method: 'GET',
      success: function (res) {
        context.reportCount = res.data.result
        wx.request({
          url: 'https://miniprogram.xluyun.com/report/getReportDataList',
          data: {
            wechatId: context.userInfo.wechatId,
            top: context.top,
            skip: context.skip
          },
          method: 'GET',
          success: function (res) {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            context.isPullDownRefreshing = false
            for (var i = 0; i < res.data.result.length; ++i) {
              res.data.result[i].time = dataFormatter.formatTime(new Date(parseInt(res.data.result[i].timestamp)))
            }
            context.reports = res.data.result
            if (context.reports.length < context.reportCount) {
              context.isMore = true
            }
          }
        })
      }
    })
  },

  onReachBottom () {
    var context = this
    if (this.reports.length < this.reportCount) {
      this.top = this.top + this.skip
      this.isMore = false
      this.isLoadMore = true
      wx.request({
        url: 'https://miniprogram.xluyun.com/report/getReportDataList',
        data: {
          wechatId: context.userInfo.wechatId,
          top: context.top,
          skip: context.top + context.skip
        },
        method: 'GET',
        success: function (res) {
          context.isLoadMore = false
          const index = context.reports.length
          for (var i = 0; i < res.data.result.length; ++i) {
            context.reports[index + i + 1] = res.data.result[i]
            context.reports[index + i + 1].time = dataFormatter.formatTime(new Date(parseInt(res.data.result[i].timestamp)))
          }
          if (context.reports.length < context.reportCount) {
            context.isMore = true
          }
        }
      })
    }
  },

  methods: {
    longPress (wechatId, timestamp) {
      if (this.pressed === true) {
        return
      }
      var context = this
      wx.showModal({
        title: '温馨提示',
        content: '重新生成该报告。',
        success: function (res) {
          if (res.confirm) {
            context.pressed = true
            wx.showLoading({
              title: '重新生成中',
              mask: true
            })
            wx.request({
              url: 'https://miniprogram.xluyun.com/report/getReportData',
              data: {
                wechatId: wechatId,
                timestamp: timestamp
              },
              method: 'GET',
              success: function (res) {
                const resData = res.data.result
                var data = {
                  'personal-salary-before-tax': parseInt(resData.incomeWithTax),
                  'expected-retirement-age': parseInt(resData.expectedRetirementAge),
                  'age': parseInt(resData.age),
                  'pension-investment-rate-of-return': (resData.pensionBenefitRate / 100),
                  'life-expectancy': parseInt(resData.expectedLife),
                  'successive-length-of-service-by-date': resData.continuousWork,
                  'start-date': resData.workingMonths,
                  'local-average-salary-last-year': parseInt(resData.averageIncomePerMonth),
                  'time-for-participation': resData.insuredMonths,
                  'monthly-taxable-wage': parseInt(resData.incomeWithMonth),
                  'social-security-pension-account-balance': parseInt(resData.pensionBalance),
                  'target-pension-replacement-rate': parseInt(resData.pensionReplacementRate) / 100,
                  'supplementary-pension': resData.supplementaryPension
                }
                var details = new Details(data)
                var detailedRes = details.getDetailedReportData()
                detailedRes.wechatId = context.userInfo.wechatId
                detailedRes.timestamp = resData.timestamp
                detailedRes.generate_time = dataFormatter.formatDate(new Date())
                detailedRes.avatar_url = context.userInfo.avatarUrl
                detailedRes['target-name'] = resData.name
                detailedRes.gender = resData.gender
                detailedRes.age = resData.age
                detailedRes['start-date'] = resData.workingMonths
                detailedRes['mandatory-age-for-retirement'] = resData.legalRetirementAge
                detailedRes['expected-retirement-age'] = resData.expectedRetirementAge
                detailedRes['time-for-participation'] = resData.insuredMonths
                detailedRes['social-security-location'] = resData.province
                detailedRes['company-type'] = resData.jobType
                detailedRes['personal-salary-before-tax'] = resData.incomeWithTax
                detailedRes['local-average-salary-last-year'] = resData.averageIncomePerMonth
                detailedRes['social-security-pension-account-balance'] = resData.pensionBalance
                wx.request({
                  url: 'https://miniprogram.xluyun.com/report/generateReport',
                  data: detailedRes,
                  method: 'POST',
                  success: function (res) {
                    context.pressed = false
                    wx.hideLoading()
                    if (res.data.result === 'success') {
                      wx.showModal({
                        title: '温馨提示',
                        showCancel: false,
                        content: '成功重新生成报告！',
                        success: function (res) {
                          if (res.confirm) {
                            wx.navigateTo({
                              url: '../spc-report-deluxe/main?wechatId=' + context.userInfo.wechatId + '&timestamp=' + detailedRes.timestamp
                            })
                          }
                        }
                      })
                    } else {
                      wx.showModal({
                        title: '温馨提示',
                        showCancel: false,
                        content: '生成失败！'
                      })
                    }
                  },
                  fail: function (res) {
                    context.pressed = false
                    wx.hideLoading()
                    wx.showModal({
                      title: '温馨提示',
                      showCancel: false,
                      content: '生成失败！'
                    })
                  }
                })
              }
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

.weui-loading {
  margin: 0 5px;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  -webkit-animation: weuiLoading 1s steps(12, end) infinite;
  animation: weuiLoading 1s steps(12, end) infinite;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
  background-size: 100%;
}

.weui-loadmore {
  width: 65%;
  margin: 1.5em auto;
  line-height: 1.6em;
  font-size: 14px;
  text-align: center;
  color: grey;
}

.weui-loadmore__tips {
  display: inline-block;
  vertical-align: middle;
}
</style>
