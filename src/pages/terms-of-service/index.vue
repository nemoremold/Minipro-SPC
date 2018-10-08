<template>
  <view style="font-size: 9pt; background: #F0F0F0; display: flex; flex-direction: column; justify-content: center; align-items: center;">

    <text>
      {{ '可学教育用户服务协议' }}
    </text>

    <text
      style="width: 94%; padding: 0; margin: 0; display: flex; flex-direction: column; justify-content: center; align-items: center;"
      :space="true"
      :decode="true"
    >
      {{ text }}
    </text>

    <text style="width: 94%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">
      {{ '上海可学咨询管理有限公司\r\n\r\n\r\n' }}
    </text>

  </view>
</template>

<script>
import TERMS_OF_USE from '@/common/staticData/termsOfUse'

export default {
  data () {
    return {
      text: TERMS_OF_USE.TERMS_OF_USE
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
</style>
