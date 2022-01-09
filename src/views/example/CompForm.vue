<template>
  <div class="panel-default">
    <div class="page-body">
      <el-row :gutter="20">
        <el-col
          :lg="14"
          :md="20"
          :sm="24"
          :xs="24"
          :span="12"
          class="form-col"
        >
          <common-form
            :common-data="testData"
            :common-form="testForm"
            :rules="rules"
            :btn-loading="btnLoading"
            @submit-form="submitForm"
          >
            <template slot="table">
              <el-table
                :data="tableData"
                style="width: 100%"
              >
                <el-table-column
                  prop="name"
                  label="姓名"
                ></el-table-column>
                <el-table-column
                  prop="phone"
                  label="手机号"
                ></el-table-column>
              </el-table>
            </template>
            <template slot="formDefineBtn">
              <el-button
                type="warning"
                size="medium"
              >取 药</el-button>
            </template>
          </common-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CommonForm from '@/components/Base/Form'

export default {
  name: 'TestForm',
  components: {
    CommonForm
  },
  data() {
    return {
      tableData: [
        {
          name: '张三',
          phone: '13500000000'
        },
        {
          name: '李四',
          phone: '13500000000'
        }
      ],
      /* form */
      testData: {
        name: '',
        sex: '',
        love: [],
        content: '这里是内容呀呀呀呀呀',
        date: '',
        year: '',
        dateRange: '',
        time: '',
        timeSelect: '',
        dateTime: '',
        dateTimeRange: '',
        logoPath: '',
        multiImg: [],
        multiFile: []
      },
      testForm: [
        {
          type: 'Input',
          label: '姓名：',
          prop: 'name',
          placeholder: '请输入姓名'
        },
        {
          type: 'Radio',
          label: '性别：',
          prop: 'sex',
          multiple: true,
          options: [
            {
              label: '男',
              value: '10'
            },
            {
              label: '女',
              value: '20'
            }
          ]
        },
        {
          type: 'Slot',
          prop: 'table',
          label: '自定义表格：'
        },
        {
          type: 'Select',
          label: '政治面貌：',
          prop: 'political',
          options: [
            {
              label: '共青团员',
              value: '30'
            },
            {
              label: '党员',
              value: '40'
            }
          ]
        },
        {
          type: 'Checkbox',
          label: '爱好：',
          prop: 'love',
          options: [
            {
              label: '打篮球',
              value: '50'
            },
            {
              label: '踢足球',
              value: '60'
            }
          ]
        },
        {
          type: 'Static',
          label: '描述：',
          prop: 'content'
        },
        {
          type: 'Date',
          label: '日期：',
          prop: 'date',
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now()
            }
          }
        },
        {
          type: 'DateYear',
          label: '年份：',
          prop: 'year',
          valueFormat: 'yyyy', // 年份需要修改format
          placeholder: '请选择年份',
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now()
            }
          }
        },
        {
          type: 'DateRange',
          label: '日期范围：',
          prop: 'dateRange'
        },
        {
          type: 'TimePicker',
          label: '任意时间：',
          prop: 'time'
        },
        {
          type: 'TimeSelect',
          label: '自定义时间点：',
          prop: 'timeSelect'
        },
        {
          type: 'DateTime',
          label: '日期时间：',
          prop: 'dateTime',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        {
          type: 'DateTimeRange',
          label: '日期时间：',
          prop: 'dateTimeRange',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        {
          type: 'SingleImg',
          label: '单张图片上传：',
          prop: 'logoPath'
        },
        {
          type: 'MultiImg',
          label: '多张图片上传：',
          prop: 'multiImg',
          limit: 3,
          tip: '最多只能上传3张'
        },
        {
          type: 'MultiFile',
          label: '多文件上传：',
          prop: 'multiFile',
          limit: 3,
          tip: '最多只能上传5个文件'
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        political: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      btnLoading: false
    }
  },
  methods: {
    submitForm(data) {
      console.log(data)
    }
  }
}
</script>

<style></style>
