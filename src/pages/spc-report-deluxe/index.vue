<template>
  <view style="background: #F0F0F0;">
    <view style="height: 100px; width: 100%; margin: 0;">
      <image v-if="src" :src="src" mode="aspectFill" style="height: 100px; width: 100%;" />
    </view>
    <view style="margin: 3px 5px;">
      <van-cell-group>
        <van-cell
          :title="report[0][0].label"
          :value="report[0][0].value"
        />
      </van-cell-group>
    </view>
    <view style="background: white; margin: 3px 5px;">
      <van-panel>
        <view slot="header">
          <van-cell
            :title="report[1][0].label"
          >
            <view>
              <span style="font-weight: bold; color: #0066FF;">{{ report[1][0].value }}</span>
              元
            </view>
          </van-cell>
        </view>
        <view>
          <van-cell-group>
            <picker
              :value="report[1][1].value + '年'"
              :range="report[1][1].options"
              @change="bindPickerChange"
            >
              <van-field
                inputAlign="right"
                :label="report[1][1].label"
                :value="report[1][1].value + '年'"
                type="number"
                is-link
                disabled
              />
            </picker>
            <van-cell
              :title="report[1][2].label"
              :value="report[1][2].value + '元/年'"
              border="false"
            />
          </van-cell-group>
        </view>
      </van-panel>
    </view>
    <view style="background: white; margin: 3px 5px;">
      <van-panel>
        <view slot="header">
          <van-cell
            :title="report[2][0].label"
          >
            <view>
              <span style="font-weight: bold; color: #0066FF;">{{ report[2][0].value }}</span>
              元
            </view>
          </van-cell>
        </view>
        <van-cell-group>
          <van-cell
            :title="report[2][1].label"
            :value="report[2][1].value + '元'"
          />
          <van-cell
            :title="report[2][2].label"
            :value="report[2][2].value + '元'"
          />
          <van-cell
            :title="report[2][3].label"
            :value="report[2][3].value + '元'"
          />
          <van-cell
            :title="report[2][4].label"
            :value="report[2][4].value + '元'"
            border="false"
          />
        </van-cell-group>
        <div class="container" style="height: 180px; width: 100%;">
          <ec-canvas class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
        </div>
      </van-panel>
    </view>
    <!-- <navigator open-type="switchTab" :url="'../user-center/main'">simple report</navigator> -->
    <view style="margin: 3px 5px 2px 5px;">
      <van-button @click="generateDeluxeReport" size="large" type="warning" plain="true">
        生成
        <span style="font-weight: bold;">专业版</span>
        养老金报告
        </van-button>
    </view>
    <view style="height: 1px;"></view>
  </view>
</template>

<script>
import ExpressReportSections from '@/components/express-report-sections'
import entityDefinitions from '@/common/staticData/entityDefinitions'

export default {
  components: {
    'express-report-sections': ExpressReportSections
  },

  data () {
    return {
      weChatId: null,
      reportId: null,
      report: [],
      options: entityDefinitions.CHART_OPTIONS,
      ec: null,
      src: '/static/images/banner.jpeg'
    }
  },

  onLoad (options) {
    this.weChatId = options.weChatId
    this.reportId = options.reportId
    this.report = entityDefinitions.EXPRESS_REPORT_FIELDS_DEFINITION.sections
    this.report[0][0].value = options.name
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
    console.log(this.reportId)
  },

  methods: {
    bindPickerChange (e) {
      let newValue = e.mp.detail.value
      this.report[1][1].value = this.report[1][1].options[newValue]
      this.report[1][2].value = parseInt(this.report[1][0].value / this.report[1][1].value)
    },

    generateDeluxeReport () {
      wx.navigateTo({
        url: '../user-logon/main'
      })
      // wx.showModal({
      //   title: '温馨提示',
      //   showCancel: false,
      //   content: '功能暂未开放，敬请期待！'
      // })
    }
  }
}
</script>

<style>
ec-canvas {
  width: 100%;
  height: 100px;
}
</style>
