<template>
  <view style="background: #F0F0F0;">
    <view style="height: 100px; width: 100%; margin: 0;">
      <image v-if="src" :src="src" mode="aspectFill" style="height: 100px; width: 100%;" />
    </view>
    <view style="background: white; margin: 5px 0;">
      <picker
        @change="bindPickerChange($event, 0)"
        :value="pickerIds[elements[0].picklistId]"
        :range="picklists[elements[0].picklistId].options"
      >
        <van-field
          inputAlign="right"
          :value="elements[0].value"
          :label="elements[0].label"
          :placeholder="elements[0].hint"
          disabled
          is-link
          @change="fieldChange($event, 0)"
        />
      </picker>
      <view style="height: 1px; width: 100%; background: #F8F8F8;"></view>
      <picker
        @change="bindPickerChange($event, 1)"
        :value="pickerIds[elements[1].picklistId]"
        :range="picklists[elements[1].picklistId].options"
      >
        <van-field
          inputAlign="right"
          :value="elements[1].value"
          :label="elements[1].label"
          :placeholder="elements[1].hint"
          disabled
          is-link
          @change="fieldChange($event, 1)"
        />
      </picker>
      <view style="height: 1px; width: 100%; background: #F8F8F8;"></view>
      <picker
        @change="bindPickerChange($event, 2)"
        :value="pickerIds[elements[2].picklistId]"
        :range="picklists[elements[2].picklistId].options"
      >
        <van-field
          inputAlign="right"
          :value="elements[2].value"
          :label="elements[2].label"
          :placeholder="elements[2].hint"
          disabled
          is-link
          @change="fieldChange($event, 2)"
        />
      </picker>
      <view style="height: 1px; width: 100%; background: #F8F8F8;"></view>
      <picker
        @change="bindPickerDateChange($event, 3)"
        mode="date"
        :value="pickerIds[elements[3].picklistId]"
        :start="picklists[elements[3].picklistId].startDate"
        :end="picklists[elements[3].picklistId].endDate"
        fields="month"
      >
        <van-field
          inputAlign="right"
          :value="elements[3].value"
          :label="elements[3].label"
          :placeholder="elements[3].hint"
          disabled
          is-link
          @change="fieldChange($event, 3)"
        />
      </picker>
      <view style="height: 1px; width: 100%; background: #F8F8F8;"></view>
      <picker
        @change="bindPickerMultiChange($event, 4)"
        mode="multiSelector"
        :value="elements[4].value"
        :range="picklists[elements[4].picklistId].options"
      >
        <van-field
          inputAlign="right"
          :value="elements[4].value"
          :label="elements[4].label"
          :placeholder="elements[4].hint"
          disabled
          is-link
          @change="fieldChange($event, 4)"
        />
      </picker>
      <view style="height: 1px; width: 100%; background: #F8F8F8;"></view>
      <van-cell
        :title="elements[5].label"
      >
        <view>
          <picker
            @change="bindPickerMultiChange($event, 5)"
            mode="multiSelector"
            :value="elements[5].value"
            :range="picklists[elements[5].picklistId].options"
          >
            <van-cell
              :value="elements[5].value"
              disabled
              is-link
            />
          </picker>
        </view>
        <van-icon slot="right-icon" name="question" @click="toastAnnotation(5)"></van-icon>
      </van-cell>
    </view>
    <view style="background: white; margin: 5px 0;">
      <picker
        @change="bindPickerChange($event, 6)"
        :value="pickerIds[elements[6].picklistId]"
        :range="picklists[elements[6].picklistId].options"
      >
        <van-field
          inputAlign="right"
          :value="elements[6].value + '周岁'"
          :label="elements[6].label"
          :placeholder="elements[6].hint"
          disabled
          is-link
          @change="fieldChange($event, 6)"
        />
      </picker>
      <view style="height: 1px; width: 100%; background: #F8F8F8;"></view>
      <picker
        @change="bindPickerChange($event, 7)"
        :value="pickerIds[elements[7].picklistId]"
        :range="picklists[elements[7].picklistId].options"
      >
        <van-field
          inputAlign="right"
          :value="elements[7].value + '周岁'"
          :label="elements[7].label"
          :placeholder="elements[7].hint"
          disabled
          is-link
          @change="fieldChange($event, 7)"
        />
      </picker>
      <view style="height: 1px; width: 100%; background: #F8F8F8;"></view>
      <picker
        @change="bindPickerChange($event, 8)"
        :value="pickerIds[elements[8].picklistId]"
        :range="picklists[elements[8].picklistId].options"
      >
        <van-field
          inputAlign="right"
          :value="elements[8].value + '周岁'"
          :label="elements[8].label"
          :placeholder="elements[8].hint"
          disabled
          is-link
          @change="fieldChange($event, 8)"
        />
      </picker>
      <view style="height: 1px; width: 100%; background: #F8F8F8;"></view>
      <picker
        @change="bindPickerChange($event, 9)"
        :value="pickerIds[elements[9].picklistId]"
        :range="picklists[elements[9].picklistId].options"
      >
        <van-field
          inputAlign="right"
          :value="elements[9].value + '周岁'"
          :label="elements[9].label"
          :placeholder="elements[9].hint"
          disabled
          is-link
          @change="fieldChange($event, 9)"
        />
      </picker>
    </view>
    <view style="background: white; margin: 5px 0;">
      <van-field
        :inputAlign="'right'"
        :value="elements[10].value"
        :placeholder="elements[10].hint"
        type="number"
        clearable
        :label="elements[10].label"
        @change="fieldChange($event, 10)"
      />
      <van-field
        :inputAlign="'right'"
        :value="elements[11].value"
        :placeholder="elements[11].hint"
        type="number"
        clearable
        :icon="elements[11].annotationIcon"
        :label="elements[11].label"
        @change="fieldChange($event, 11)"
        @clickIcon="toastAnnotation(11)"
      />
      <van-cell
        :title="elements[12].label"
      >
        <view>
          <span style="color: #0066FF;">{{ elements[12].value }}</span>
          元
        </view>
      </van-cell>
      <van-field
        :inputAlign="'right'"
        :value="elements[13].value"
        :placeholder="elements[13].hint"
        type="number"
        clearable
        :icon="elements[13].annotationIcon"
        :label="elements[13].label"
        @change="fieldChange($event, 13)"
        @clickIcon="toastAnnotation(13)"
        use-button-slot
      >
        <van-button slot="button" @click="estimate(14)" type="primary" plain="true">{{ elements[14].label }}</van-button>
      </van-field>
      <picker
        @change="bindPickerChange($event, 15)"
        :value="pickerIds[elements[15].picklistId]"
        :range="picklists[elements[15].picklistId].options"
      >
        <van-field
          inputAlign="right"
          :value="elements[15].value"
          :label="elements[15].label"
          :placeholder="elements[15].hint"
          disabled
          is-link
          @change="fieldChange($event, 15)"
        />
      </picker>
      <van-field
        :inputAlign="'right'"
        :value="elements[16].value"
        :placeholder="elements[16].hint"
        type="number"
        clearable
        :label="elements[16].label"
        @change="fieldChange($event, 16)"
      />
      <van-field
        :inputAlign="'right'"
        :value="elements[17].value"
        :placeholder="elements[17].hint"
        type="number"
        clearable
        :label="elements[17].label"
        @change="fieldChange($event, 17)"
      />
      <van-field
        :inputAlign="'right'"
        :value="elements[18].value"
        :placeholder="elements[18].hint"
        type="number"
        clearable
        :label="elements[18].label"
        @change="fieldChange($event, 18)"
      />
    </view>
    <view style="background: white; margin: 5px 0;">
      <van-field
        :inputAlign="'right'"
        :value="elements[19].value"
        :placeholder="elements[19].hint"
        clearable
        :label="elements[19].label"
        @change="fieldChange($event, 19)"
      />
    </view>
    <view style="margin: 5px 5px 4px 5px;">
      <van-button @click="calculatePension" size="large" type="primary" plain="true">
        生成
        <span style="font-weight: bold;">简版</span>
        养老金报告
        </van-button>
    </view>
    <view style="height: 1px;"></view>
    <van-toast id="van-toast" />
  </view>
</template>

<script>
import defaultValues from '@/common/staticData/defaultValues'
import Toast from '../../../static/vant/toast/toast'
import getExpressReportData from '@/utils/brief'

export default {
  data () {
    return {
      msg: 'test',
      elements: [],
      picklists: [],
      pickerIds: [],
      weChatId: null,
      reportId: null,
      src: '/static/images/p2.png'
    }
  },

  onLoad () {
    this.elements = defaultValues.DEFAULT_CALCULATION_FACTORS
    this.picklists = defaultValues.PICKLIST_TYPES
  },

  methods: {
    calculatePension () {
      let checker = this.elements
      if (checker[0].value == null || checker[0].value === '') {
        Toast('请选择性别！')
        return
      } else if (checker[1].value == null || checker[1].value === '') {
        Toast('请选择社保所在地！')
        return
      } else if (checker[2].value == null || checker[2].value === '') {
        Toast('请选择任职单位！')
        return
      } else if (checker[3].value == null || checker[3].value === '') {
        Toast('请选择参加工作时间！')
        return
      } else if (checker[4].value == null || checker[4].value === '') {
        Toast('请选择参保年数！')
        return
      } else if (checker[5].value == null || checker[5].value === '') {
        Toast('请选择1992年12月31日之前的连续工龄！')
        return
      } else if (checker[6].value == null || checker[6].value === '') {
        Toast('请选择年龄！')
        return
      } else if (checker[7].value == null || checker[7].value === '') {
        Toast('请选择法定退休年龄！')
        return
      } else if (checker[8].value == null || checker[8].value === '') {
        Toast('请选择预期退休年龄！')
        return
      } else if (checker[9].value == null || checker[9].value === '') {
        Toast('请选择预期寿命！')
        return
      } else if (checker[10].value == null || checker[10].value === '') {
        Toast('请输入个人税前月收入！')
        return
      } else if (checker[11].value == null || checker[11].value === '') {
        Toast('请输入月度缴费工资！')
        return
      } else if (checker[12].value == null || checker[12].value === '') {
        Toast('请选择社保所在地！')
        return
      } else if (checker[13].value == null || checker[13].value === '') {
        Toast('请输入社保养老个人账户余额！')
        return
      } else if (checker[15].value == null || checker[15].value === '') {
        Toast('请选择单位是否提供年金！')
        return
      } else if (checker[16].value == null || checker[16].value === '') {
        Toast('请输入养老金替代率目标！')
        return
      } else if (checker[17].value == null || checker[17].value === '') {
        Toast('请输入目前已准备的养老金！')
        return
      } else if (checker[18].value == null || checker[18].value === '') {
        Toast('请输入养老金投资收益率！')
        return
      } else if (checker[19].value == null || checker[19].value === '') {
        Toast('请输入填表人姓名！')
        return
      }

      var data = {
        'personal-salary-before-tax': parseInt(this.elements[10].value),
        'expected-retirement-age': parseInt(this.elements[8].value),
        'age': parseInt(this.elements[6].value),
        'pension-investment-rate-of-return': (this.elements[18].value / 100),
        'life-expectancy': parseInt(this.elements[9].value),
        'successive-length-of-service-by-date': parseInt(this.elements[5].value.split('年')[0]),
        'start-date': parseInt(this.elements[3].value.split('年')[0]),
        'local-average-salary-last-year': parseInt(this.elements[12].value),
        'time-for-participation': parseInt(this.elements[4].value.split('年')[0]),
        'monthly-taxable-wage': parseInt(this.elements[11].value),
        'social-security-pension-account-balance': parseInt(this.elements[13].value)
      }

      let context = this
      wx.request({
        url: 'https://miniprogram.xluyun.com/getExpressReportData', // 仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          var result = null
          if (res.header.statusCode === 200) {
            result = {
              name: context.elements[19].value,
              gap: parseInt(res.data.pensionGap),
              p0: parseInt(res.data.pensionInFirstRetirementMonth),
              p1: parseInt(res.data.pensionBasicSocialInsurance),
              p2: parseInt(res.data.pensionPersonalAccount),
              p3: parseInt(res.data.pensionTransition),
              p4: parseInt(res.data.companyAnnuity)
            }
          } else {
            result = getExpressReportData(
              context.elements[5].value,
              context.elements[3].value,
              context.elements[12].value,
              context.elements[10].value,
              context.elements[8].value,
              context.elements[6].value,
              context.elements[4].value,
              context.elements[11].value,
              context.elements[13].value,
              context.elements[9].value,
              context.elements[19].value
            )
          }
          wx.navigateTo({
            url: '../spc-report-express/main?name=' + result.name + '&gap=' + result.gap + '&p0=' + result.p0 + '&p1=' + result.p1 + '&p2=' + result.p2 + '&p3=' + result.p3 + '&p4=' + result.p4
          })
        },
        fail: function (res) {
          console.log(res)
          wx.showModal({
            title: '服务错误',
            showCancel: false,
            content: '请求失败，请稍后再试！'
          })
        },
        method: 'POST',
        data: data,
        dataType: 'json'
      })
    },

    bindPickerChange (e, elementId) {
      let pickedId = e.mp.detail.value
      this.pickerIds[this.elements[elementId].picklistId] = pickedId
      this.elements[elementId].value = this.picklists[this.elements[elementId].picklistId].options[pickedId]
      if (this.elements[elementId].id === 'social-security-location') {
        this.elements[12].value = defaultValues.getLocationWage(this.elements[elementId].value)
      }
    },

    bindPickerDateChange (e, elementId) {
      let newValue = e.mp.detail.value
      let newValues = newValue.split('-')
      this.elements[elementId].value = newValues[0] + '年' + newValues[1] + '月'
    },

    bindPickerMultiChange (e, elementId) {
      console.log(e)
      let newValues = e.mp.detail.value
      this.elements[elementId].value = newValues[0] + '年' + newValues[1] + '个月'
    },

    fieldChange (e, elementId) {
      let newValue = e.mp.detail
      this.elements[elementId].value = newValue
    },

    estimate (elementId) {
      var timeForParticipation = 0
      for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].id === 'time-for-participation') {
          timeForParticipation = this.elements[i].value.split('年')[0]
        }
      }
      if (timeForParticipation != null && timeForParticipation !== '' && timeForParticipation !== '0') {
        for (i = 0; i < this.elements.length; i++) {
          if (this.elements[i].id === 'social-security-pension-account-balance') {
            this.elements[i].value = timeForParticipation * this.elements[elementId].value
          }
        }
      } else {
        Toast({
          message: this.elements[elementId].notifications
        })
        for (i = 0; i < this.elements.length; i++) {
          if (this.elements[i].id === 'social-security-pension-account-balance') {
            this.elements[i].value = 0
          }
        }
      }
    },

    toastAnnotation (elementId) {
      if (this.elements[elementId].annotations == null) {
        return
      }
      wx.showModal({
        title: '温馨提示',
        showCancel: false,
        content: this.elements[elementId].annotations
      })
    }
  }
}
</script>

<style>

</style>
