<template>
  <div>
    <div class="factor-element-list">
      <div class="factor-element" v-for="(item, index) in elements" :key="index">
        <div>
          <li>{{ item.label + ': ' }}</li>
          <div v-if="elements[index].type === 'picklist'">
            <picker @change="bindPickerChange($event, index)" :value="pickerIds[elements[index].picklistId]" :range="picklists[elements[index].picklistId].options">
              <view>
                {{ elements[index].value }}
              </view>
            </picker>
          </div>
          <div v-else-if="elements[index].type === 'numeric' || elements[index].type === 'string'">
            <input v-model="elements[index].value" :placeholder="elements[index].hint">
          </div>
        </div>
      </div>
    </div>
    <button @click="calculatePension">Calculate</button>
  </div>
</template>

<script>
import defaultValues from '@/common/staticData/defaultValues'

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
      wx.navigateTo({url: '../spc-report-express/main?weChatId=' + this.weChatId + '&reportId=' + this.reportId})
    },

    bindPickerChange (e, elementId) {
      let pickedId = e.mp.detail.value
      this.pickerIds[this.elements[elementId].picklistId] = pickedId
      this.elements[elementId].value = this.picklists[this.elements[elementId].picklistId].options[pickedId]
    }
  }
}
</script>

<style>

</style>
