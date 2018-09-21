<template>
  <div>
    <div class="factor-element-list">
      <div class="factor-element" v-for="(item, index) in elements" :key="index">
        <div>
          <div v-if="elements[index].type === 'picklist'">
            <picker @change="bindPickerChange($event, index)" :value="pickerIds[elements[index].picklistId]" :range="picklists[elements[index].picklistId].options">
              <van-field
                v-model="elements[index].value"
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
          <div v-else-if="elements[index].type === 'numeric'">
            <van-field
              v-model="elements[index].value"
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
              v-model="elements[index].value"
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
              v-model="elements[index].value"
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
