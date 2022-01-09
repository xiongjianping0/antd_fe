<template>
  <div class="common-table-search">
    <el-form
      ref="tableSearchForm"
      :model="searchData"
      :rules="allSearchRules"
      :size="size"
      inline
      :label-width="labelWidth"
      @submit.native.prevent
    >
      <el-row>
        <el-form-item
          v-for="(item, index) in searchForm"
          :key="item.prop"
          :label="item.label"
          :label-width="item.labelWidth"
          :prop="item.prop"
        >
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'Input'"
            v-model="searchData[item.prop]"
            size="mini"
            :placeholder="item.placeholder"
            clearable
          />
          <!-- sug输入框搜索 -->
          <el-autocomplete
            v-if="item.type === 'State'"
            v-model="searchData[item.prop]"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            :placeholder="item.placeholder"
            clearable
            @input="handleInput(index)"
          />

          <!-- 下拉框 -->
          <el-select
            v-if="item.type === 'Select'"
            v-model="searchData[item.prop]"
            :filterable="item.filterable"
            size="mini"
            :placeholder="item.placeholder"
            clearable
            @change="
              (val) => {
                selectChange(val, item)
              }
            "
          >
            <el-option
              v-for="op in item.options"
              :key="op.value"
              :label="op.label"
              :value="op.value"
            >
              <span v-if="op.level"
                >{{ '&nbsp;'.repeat(op.level * 5) }} {{ op.label }}</span
              >
              <span v-else>{{ op.label }}</span>
            </el-option>
          </el-select>

          <!-- 单选 -->
          <el-radio-group
            v-if="item.type === 'Radio'"
            v-model="searchData[item.prop]"
          >
            <el-radio
              v-for="ra in item.radios"
              :key="ra.value"
              :label="ra.value"
              >{{ ra.label }}</el-radio
            >
          </el-radio-group>
          <!-- 单选按钮 -->
          <el-radio-group
            v-if="item.type === 'RadioButton'"
            v-model="searchData[item.prop]"
          >
            <el-radio-button
              v-for="ra in item.radios"
              :key="ra.value"
              :label="ra.value"
              >{{ ra.label }}</el-radio-button
            >
          </el-radio-group>
          <!-- 复选框 -->
          <el-checkbox-group
            v-if="item.type === 'Checkbox'"
            v-model="searchData[item.prop]"
          >
            <el-checkbox
              v-for="ch in item.checkboxs"
              :key="ch.value"
              :label="ch.value"
              >{{ ch.label }}</el-checkbox
            >
          </el-checkbox-group>
          <!-- 日期 -->
          <el-date-picker
            v-if="item.type === 'Date'"
            v-model="searchData[item.prop]"
            :placeholder="item.placeholder"
            clearable
          />
          <!-- 时间 -->
          <el-time-select
            v-if="item.type === 'Time'"
            v-model="searchData[item.prop]"
            type
            :placeholder="item.placeholder"
            clearable
          />
          <!-- 日期时间 -->
          <el-date-picker
            v-if="item.type === 'DateTime'"
            v-model="searchData[item.prop]"
            type="datetime"
            :disabled="item.disable && item.disable(searchData[item.prop])"
            :placeholder="item.placeholder"
            value-format="yyyy-MM-dd HH:mm:ss"
            clearable
          />
          <!--日期和时间范围-->
          <el-date-picker
            v-if="item.type === 'DateTimeRange'"
            v-model="searchData[item.prop]"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            align="right"
            popper-class="table-search-daterange"
            clearable
            :validate-event="true"
            @blur="
              (val) => {
                getDataRange(val, item.prop)
              }
            "
          />
          <!-- 滑块 -->
          <!-- <el-slider v-if="item.type==='Slider'" v-model="searchData[item.prop]"></el-slider> -->
          <!-- 开关 -->
          <el-switch
            v-if="item.type === 'Switch'"
            v-model="searchData[item.prop]"
          />

          <!-- slot -->
          <slot v-if="item.type === 'Slot'" :name="item.prop"></slot>
          <!-- slot -->
        </el-form-item>
      </el-row>

      <el-row class="search-btn">
        <el-button
          type="primary"
          :size="size"
          icon="el-icon-search"
          @click="handleFilter('tableSearchForm')"
          >搜索</el-button
        >
      </el-row>
    </el-form>
    <!-- <el-form inline v-if="isHandle">
      <el-form-item v-for="item in searchHandle" :key="item.label">
        <el-button
          :type="item.type"
          :size="item.size || size"
          :icon="item.icon"
          @click="item.handle()"
        >{{item.label}}</el-button>
      </el-form-item>
    </el-form>-->
  </div>
</template>

<script>
export default {
  name: 'CommonTableSearch',
  props: {
    isHandle: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    size: {
      type: String,
      default: 'mini'
    },
    searchForm: {
      type: Array,
      default: []
    },
    searchData: {
      type: Object,
      default: {}
    },
    cdRules: {
      type: Object
    },
    // 自定义搜索规则
    searchRules: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    // 校验时间段
    const dataRangeVal = (rule, value, callback) => {
      if (value && value.length > 0 && value[0] === value[1]) {
        callback(new Error('结束时间必须大于开始时间'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ],
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        // 点击时间后的函数
        onPick({ maxDate, minDate }) {}
      },
      timeout: null,
      searchFormData: [],
      currentIndex: null, // 识别是哪一个sug搜索
      allSearchRules: null, // 所有规则
      baseSearchRules: {
        // 基础规则
        // 校验时间段
        dataRange: [{ validator: dataRangeVal, trigger: ['change', 'blur'] }]
      }
    }
  },
  watch: {
    /* searchRules: {
      handler(newValue, oldValue) {
        this.allSearchRules = Object.assign({}, this.baseSearchRules, newValue)
      },
      immediate: true,
      deep:true // 因为传递过来的数据是对象 ，所以需要深度监听
    } */
  },
  mounted() {
    this.searchFormData = this.searchForm
  },
  created() {
    this.allSearchRules = { ...this.baseSearchRules, ...this.searchRules }
  },
  methods: {
    handleFilter(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('handle-filter', this.searchData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.$emit('handleFilter', this.searchData)
    },
    // 改变的时候若修改的时候和上次的时间一样，则获取不到值
    // 因此，需要在失焦的时候触发，获取到与上次相同的时间值
    getDataRange(val, prop) {
      this.searchData[prop] = val.displayValue || []
    },
    // select触发事件
    selectChange(val, item) {
      const changeFun = item.changeFun || ''
      if (changeFun) {
        this.$emit(changeFun, val)
      }
    },
    // sug输入框搜索
    querySearch(queryString, cb) {
      this.searchFormData.forEach((item, index) => {
        if (item.type == 'State' && this.currentIndex == index) {
          var restaurants = item.options
          var results = queryString
            ? restaurants.filter(this.createFilter(queryString))
            : restaurants
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            // 调用 callback 返回建议列表的数据
            cb(results)
          }, 1000 * Math.random())
        }
      })
    },
    createFilter(queryString) {
      return (item) => {
        return item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    handleInput(index) {
      this.currentIndex = index || 0
    }
  }
}
</script>
<style lang="scss">
.common-table-search {
  .el-form-item--mini .el-form-item__error {
    padding-top: 8px;
  }
}
.table-search-daterange {
  .el-button--text {
    padding: 7px 15px;
    background: #cac6c6;
    color: #000;
  }
  .is-plain {
    background: #4a78e0;
    color: #fff;
    &:hover {
      background: #4a78e0;
      color: #fff;
    }
  }
}
</style>
