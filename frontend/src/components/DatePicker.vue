<script>
import Vue3DatePicker from 'vue3-datepicker'
import { ru } from 'date-fns/locale'

export default {
  components: {
    Vue3DatePicker
  },
  locale: {
    default: ru
  },
  data() {
    return {
      pickedDate: new Date(),
      padding: ''
    }
  },
}
</script>

<template>
  <Vue3DatePicker
    :locale="$options.locale.default"
    inputFormat="yyyy-MM-dd"
    v-model="pickedDate"
    style="
      --vdp-heading-size: 16px;
      --vdp-hover-bg-color: rgba(66, 185, 131, .8);
      --vdp-selected-bg-color: #42b983;
      --vdp-text-color: #656565;
      --vdp-heading-hover-color: rgba(0, 0, 0, 0.05);
      --vdp-elem-font-size: 13px;
      width: 100%;
      max-width: 465px; 
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      color: #444444;
      background: #FFFFFF;
      padding: 15px;
      border: 1px solid #656565;
      box-shadow: none;
      margin: 10px 0;
    "
  />
</template>
