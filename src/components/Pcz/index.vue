<template>
  <div class="pcz-section span10">
    <!-- 省 -->
    <el-form-item
      v-if="formData[params.provinceId] !== undefined"
      :prop="params.provinceId"
      :rules="pczRules.provinceId ? rules : []"
      class="span4"
    >
      <el-select
        v-model="formData[params.provinceId]"
        placeholder="请选择"
        filterable
        @visible-change="handleChangeProFlag"
      >
        <el-option
          label="请选择"
          value=""
        />
        <el-option
          v-for="item in provinceList"
          :key="item.provinceId"
          :label="item.name"
          :value="item.provinceId"
        />
      </el-select>
    </el-form-item>
    <!-- 省 -->

    <!-- 市 -->
    <el-form-item
      v-if="formData[params.cityId] !== undefined"
      :prop="params.cityId"
      :rules="pczRules.cityId ? rules : []"
      class="span4"
    >
      <el-select
        v-model="formData[params.cityId]"
        placeholder="请选择"
        filterable
        @visible-change="handleChangeCityFlag"
      >
        <el-option
          label="请选择"
          value=""
        />
        <el-option
          v-for="item in cityList"
          :key="item.cityId"
          :label="item.name"
          :value="item.cityId"
        />
      </el-select>
    </el-form-item>
    <!-- 市 -->

    <!-- 区 -->
    <el-form-item
      v-if="formData[params.zoneId] !== undefined"
      :prop="params.zoneId"
      :rules="pczRules.zoneId ? rules : []"
      class="span4"
    >
      <el-select
        v-model="formData[params.zoneId]"
        placeholder="请选择"
        filterable
      >
        <el-option
          label="请选择"
          value=""
        />
        <el-option
          v-for="item in zoneList"
          :key="item.zoneId"
          :label="item.name"
          :value="item.zoneId"
        />
      </el-select>
    </el-form-item>
    <!-- 区 -->

  </div>
</template>

<script>
import { getProvince, getCity, getZone } from '@/api/common'

export default {
  name: 'PczSection',
  props: {
    // 省市区字段
    params: {
      type: Object,
      required: true
    },
    // 是否校验
    pczRules: {
      type: Object,
      required: true
    },
    // 表单数据
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      provinceList: [],
      cityList: [],
      zoneList: [],
      rules: [{ required: true, message: '请选择', trigger: 'change' }],
      changeProvinceFlag: false, // 下拉框是否显示着
      changeCityFlag: false // 下拉框是否显示着
    }
  },
  computed: {
    currentProvinceId() {
      return this.formData[this.params.provinceId]
    },
    currentCityId() {
      return this.formData[this.params.cityId]
    }
  },
  watch: {
    // 监听省
    currentProvinceId(newVal, oldVal) {
      if (this.changeProvinceFlag) {
        // 下拉框显示
        // 下拉框的值改变的时候，changeFlag还是true
        // 后面才会改成false
        if (this.formData[this.params.cityId] != undefined) {
          this.formData[this.params.cityId] = ''
        }
        if (this.formData[this.params.zoneId] != undefined) {
          this.formData[this.params.zoneId] = ''
        }
      }
      // 编辑的时候，下拉框都没有出现
      // 所以直接获取市
      this.getCityData(newVal)
    },
    // 监听市
    currentCityId(newVal, oldVal) {
      if (this.changeCityFlag) {
        // 下拉框显示，选择完成后，flag还没有被修改为false
        if (this.formData[this.params.zoneId] != undefined) {
          this.formData[this.params.zoneId] = ''
        }
      }
      // 编辑的时候，下拉框都没有出现
      // 获取区
      this.getZoneData(newVal)
    }
    // 之前直接监听formData的时候，
    // 由于watch并没有做缓存， 遇到引用类型，新值和旧值就指向同一指针了，因此两个值也就一样了，
    // 所以我们需要用到computed，它是由缓存的，
    // 我们把formData通过在computed里面生成一个模拟变量，返回一个Object.assign新对象，注意一定是新对象，他有独立的引用。
    // 然后我们watch这个在computed里面的formDataCopy，就可以监听新老值了。
    // 监听联动变化
  },
  created() {
    // 获取省
    this.getProvinceData()
  },
  methods: {
    /*
      如果省市用一个下拉框显示flag的话
      点击完市再点击省，此时的flag被改成了false，而监听省改变的时候，flag还没有被更改,所以直接就return，后面下拉框的值也就没有变化.
      所以每个select要用单独的flag，来判断隐藏和显示
    */
    // select回调，判断当前下拉框是否展示
    // 下拉框隐藏的时候，watch先监听到了值的变化，
    // 此时的changeFlag还是true,
    // 然后才会改成false
    handleChangeProFlag(type) {
      // 下拉框出现为true
      // 隐藏则为false
      this.changeProvinceFlag = type
    },
    handleChangeCityFlag(type) {
      this.changeCityFlag = type
    },
    // 省
    async getProvinceData() {
      try {
        const res = await getProvince()
        const provinceList = res.data.provinceList || []
        this.provinceList = provinceList
      } catch (error) {}
    },
    // 获取市
    async getCityData(value) {
      if (!value) {
        this.cityList = []
        return
      }
      try {
        const data = {
          id: value
        }
        const res = await getCity(data)
        const cityList = res.data.cityList || []
        this.cityList = cityList
      } catch (error) {}
    },
    // 获取区
    async getZoneData(value) {
      if (!value) {
        this.zoneList = []
        return
      }
      try {
        const data = {
          id: value
        }
        const res = await getZone(data)
        const zoneList = res.data.zoneList || []
        this.zoneList = zoneList
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.pcz-section {
  .el-form-item {
    float: left;
    padding-right: 5px;
    box-sizing: border-box;
    margin-bottom: 0;
  }
}
</style>
