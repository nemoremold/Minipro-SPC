<template>
  <div>
    <div class="factor-element-list">
      <div class="factor-element" v-for="(item, index) in elements" :key="index">
        <div>
          <div v-if="elements[index].type === 'picklist'">
            <picker @change="bindPickerChange($event, index)" :value="pickerIds[elements[index].picklistId]" :range="picklists[elements[index].picklistId].options">
              <van-field
                :value="elements[index].value"
                :placeholder="elements[index].hint"
                type="number"
                clearable
                required
                disabled
                :icon="elements[index].annotationIcon"
                :label="elements[index].label"
                @change="fieldChange($event, index)"
                @clickIcon="toastAnnotation(index)"
              />
            </picker>
          </div>
          <div v-if="elements[index].type === 'picklistDate'">
            <picker
              @change="bindPickerDateChange($event, index)"
              :value="elements[index].value"
              mode="date"
              :start="picklists[elements[index].picklistId].startDate"
              :end="picklists[elements[index].picklistId].endDate"
              fields="month"
            >
              <van-field
                :value="elements[index].value"
                :placeholder="elements[index].hint"
                type="date"
                clearable
                required
                disabled
                :icon="elements[index].annotationIcon"
                :label="elements[index].label"
                @change="fieldChange($event, index)"
                @clickIcon="toastAnnotation(index)"
              />
            </picker>
          </div>
          <div v-if="elements[index].type === 'picklistMulti'">
            <picker
              @change="bindPickerMultiChange($event, index)"
              mode="multiSelector"
              :value="elements[index].value"
              :range="picklists[elements[index].picklistId].options"
            >
              <van-field
                :value="elements[index].value"
                :placeholder="elements[index].hint"
                type="date"
                clearable
                required
                disabled
                :icon="elements[index].annotationIcon"
                :label="elements[index].label"
                @change="fieldChange($event, index)"
                @clickIcon="toastAnnotation(index)"
              />
            </picker>
          </div>
          <div v-else-if="elements[index].type === 'numeric'">
            <van-field
              :value="elements[index].value"
              :placeholder="elements[index].hint"
              type="number"
              clearable
              required
              :icon="elements[index].annotationIcon"
              :label="elements[index].label"
              @change="fieldChange($event, index)"
              @clickIcon="toastAnnotation(index)"
            />
          </div>
          <div v-else-if="elements[index].type === 'constant'">
            <van-field
              :value="elements[index].value"
              :placeholder="elements[index].hint"
              type="number"
              clearable
              required
              disabled
              :icon="elements[index].annotationIcon"
              :label="elements[index].label"
              @change="fieldChange($event, index)"
              @clickIcon="toastAnnotation(index)"
            />
          </div>
          <div v-else-if="elements[index].type === 'string'">
            <van-field
              :value="elements[index].value"
              :placeholder="elements[index].hint"
              clearable
              required
              :icon="elements[index].annotationIcon"
              :label="elements[index].label"
              @change="fieldChange($event, index)"
              @clickIcon="toastAnnotation(index)"
            />
          </div>
          <div v-else-if="elements[index].type === 'button'">
            <van-button>{{ elements[index].label }}</van-button>
          </div>
        </div>
      </div>
    </div>
    <button @click="calculatePension">Calculate</button>
  </div>
</template>

<script>
import defaultValues from '@/common/staticData/defaultValues'
import getExpressReportData from '@/utils/brief'

export default {
  data () {
    return {
      msg: 'test',
      elements: [],
      picklists: [],
      pickerIds: [],
      weChatId: null,
      reportId: null
    }
  },

  onLoad () {
    this.elements = defaultValues.DEFAULT_CALCULATION_FACTORS
    this.picklists = defaultValues.PICKLIST_TYPES
  },

  methods: {
    calculatePension () {
      console.log(this.elements)
      console.log(this.picklists)
      let result = getExpressReportData(
        // this.elements[5].value,
        // this.elements[3].value,
        // this.elements[12].value,
        // this.elements[10].value,
        // this.elements[8].value,
        // this.elements[6].value,
        // this.elements[4].value,
        // this.elements[11].value,
        // this.elements[13].value,
        // this.elements[9].value
        4,
        26,
        8000,
        10000,
        80,
        40,
        10,
        9000,
        2000,
        90
      )
      // (years_b1992, join, d, j, b, c, years_join_insure, salary, remaining_of_personal_account, f)
      console.log(result)
      // wx.navigateTo({url: '../spc-report-express/main?weChatId=' + this.weChatId + '&reportId=' + this.reportId})
    },

    bindPickerChange (e, elementId) {
      let pickedId = e.mp.detail.value
      this.pickerIds[this.elements[elementId].picklistId] = pickedId
      this.elements[elementId].value = this.picklists[this.elements[elementId].picklistId].options[pickedId]
    },

    bindPickerDateChange (e, elementId) {
      let newValue = e.mp.detail.value
      let newValues = newValue.split('-')
      this.elements[elementId].value = newValues[0] + '年' + newValues[1] + '月'
    },

    bindPickerMultiChange (e, elementId) {
      console.log(e)
      let newValues = e.mp.detail.value
      this.elements[elementId].value = newValues[0] + '年' + newValues[1] + '月'
    },

    fieldChange (e, elementId) {
      console.log(e)
      console.log(elementId)
      let newValue = e.mp.detail
      this.elements[elementId].value = newValue
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
