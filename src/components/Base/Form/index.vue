<template>
  <!-- <div class="common-form"> -->
  <el-form
    ref="infoForm"
    :model="commonData"
    :rules="rules"
    :label-width="labelWidth"
  >
    <el-form-item
      v-for="(item, index) in commonForm"
      :key="index"
      :label="item.label"
      :prop="item.prop"
    >
      <!-- input -->
      <el-input
        v-if="item.type === 'Input'"
        v-model="commonData[item.prop]"
        :class="spanClass"
        :placeholder="item.placeholder ? item.placeholder : '请输入'"
        clearable
      ></el-input>
      <!-- input -->

      <!-- select -->
      <el-select
        v-if="item.type === 'Select'"
        v-model="commonData[item.prop]"
        :class="spanClass"
        :multiple="item.multiple"
        :placeholder="item.placeholder ? item.placeholder : '请选择'"
      >
        <el-option
          v-for="option in item.options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        ></el-option>
      </el-select>
      <!-- select -->

      <!-- single-img -->
      <single-img
        v-if="item.type === 'SingleImg'"
        v-model="commonData[item.prop]"
        :tip="item.tip"
        :exts="item.exts"
        :width="item.width"
        :height="item.height"
      />
      <!-- single-img -->

      <!-- multi-img -->
      <multi-img
        v-if="item.type === 'MultiImg'"
        v-model="commonData[item.prop]"
        :limit="item.limit"
        :tip="item.tip"
        :exts="item.exts"
      />
      <!-- multi-img -->

      <!-- multi-file -->
      <multi-img-file
        v-if="item.type === 'MultiFile'"
        v-model="commonData[item.prop]"
        :limit="item.limit"
        :tip="item.tip"
        :exts="item.exts"
      />
      <!-- multi-file -->

      <!-- radio -->
      <el-radio-group
        v-if="item.type === 'Radio'"
        v-model="commonData[item.prop]"
      >
        <el-radio
          v-for="option in item.options"
          :key="option.value"
          :label="option.value"
        >{{ option.label }}</el-radio>
      </el-radio-group>
      <!-- radio -->

      <!-- checkbox -->
      <el-checkbox-group
        v-if="item.type === 'Checkbox'"
        v-model="commonData[item.prop]"
      >
        <el-checkbox
          v-for="option in item.options"
          :key="option.value"
          :label="option.value"
        >{{ option.label }}</el-checkbox>
      </el-checkbox-group>
      <!-- checkbox -->

      <!-- date -->
      <el-date-picker
        v-if="item.type === 'Date' || item.type === 'DateYear' || item.type === 'DateMonth' || item.type === 'DateDates' || item.type === 'DateTime'"
        v-model="commonData[item.prop]"
        :type="dateMap[item.type]"
        :picker-options="item.pickerOptions"
        :placeholder="item.placeholder ? item.placeholder : '请选择时间'"
        :value-format="item.valueFormat ? item.valueFormat: 'yyyy-MM-dd'"
      >
      </el-date-picker>
      <!-- date -->

      <!-- date-range date-time-range -->
      <el-date-picker
        v-if="item.type === 'DateRange' || item.type === 'DateMonthRange' || item.type === 'DateTimeRange'"
        v-model="commonData[item.prop]"
        :type="dateMap[item.type]"
        :picker-options="item.pickerOptions"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :value-format="item.valueFormat ? item.valueFormat: 'yyyy-MM-dd'"
      >
      </el-date-picker>
      <!-- date-range date-time-range -->

      <!-- time-picker -->
      <el-time-picker
        v-if="item.type === 'TimePicker'"
        v-model="commonData[item.prop]"
        :picker-options="item.pickerOptions"
        :placeholder="item.placeholder ? item.placeholder : '请选择时间'"
      >
      </el-time-picker>
      <!-- time-picker -->

      <!-- time-select -->
      <el-time-select
        v-if="item.type === 'TimeSelect'"
        v-model="commonData[item.prop]"
        :picker-options="item.pickerOptions"
        :placeholder="item.placeholder ? item.placeholder : '请选择时间'"
      >
      </el-time-select>
      <!-- time-select -->

      <!-- static_p -->
      <p
        v-if="item.type === 'Static'"
        class="el-form-item-static"
      >{{commonData[item.prop]}}</p>
      <!-- static_p -->

      <!-- slot -->
      <slot
        v-if="item.type === 'Slot'"
        :name="item.prop"
      ></slot>
      <!-- slot -->

    </el-form-item>

    <!-- btn -->
    <el-form-item class="submit">
      <el-button
        v-if="showBtnBack"
        size="medium"
        @click="back"
      >返 回</el-button>
      <el-button
        v-if="showBtnConfirm"
        type="primary"
        :loading="btnLoading"
        size="medium"
        @click="submitForm('infoForm')"
      >提 交</el-button>
      <slot name="formDefineBtn"></slot>
    </el-form-item>
    <!-- btn -->

  </el-form>
  <!-- </div> -->
</template>

<script>
/**
 *common-form
 */
import SingleImg from '@/components/Upload/singleImg'
import MultiImg from '@/components/Upload/multiImg'
import MultiImgFile from '@/components/Upload/multiImgFile'

export default {
  name: 'CommonForm',
  components: {
    SingleImg,
    MultiImg,
    MultiImgFile
  },
  props: {
    // label-width
    labelWidth: {
      type: String,
      default: '120px'
    },
    // common-data
    commonData: {
      type: Object,
      required: true
      // default: () => {}
    },
    // common-form
    commonForm: {
      type: Array,
      required: true
      // defult: () => []
    },
    // validate-rules
    rules: {
      type: Object,
      default: () => {}
    },
    // btn-loading
    btnLoading: {
      type: Boolean,
      default: false
    },
    // item-span-class
    spanClass: {
      type: String,
      default: 'span10'
    },
    // show-btn-back
    showBtnBack: {
      type: Boolean,
      default: true
    },
    // show-btn-confirm
    showBtnConfirm: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // date-map
      dateMap: {
        Date: 'date',
        DateYear: 'year',
        DateMonth: 'month',
        DateDates: 'dates',
        DateRange: 'daterange',
        DateMonthRange: 'monthrange',
        DateTime: 'datetime',
        DateTimeRange: 'datetimerange'
      }
      // pickerOptions: {
      //   onPick: ({ maxDate, minDate }) => {
      //     if (maxDate && minDate && minDate.getTime() === maxDate.getTime()) {
      //       this.$message.error('时间段的开始时间和结束时间不能相同')
      //       return false
      //     }
      //   }
      // }
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    submitForm(infoForm) {
      this.$refs[infoForm].validate((valid) => {
        if (valid) {
          this.$emit('submit-form', this.commonData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
