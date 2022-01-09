<template>
  <div class="panel-default">
    <el-row :gutter="20">
      <el-col :lg="14" :md="20" :sm="24" :xs="24" :span="12" class="form-col">
        <el-form label-width="120px">
          <el-form-item label="用户名：">
            <p class="el-form-item-static"> {{ detailData.nickname }} </p>
          </el-form-item>
          <el-form-item label="姓名：">
            <p class="el-form-item-static"> {{ detailData.username }} </p>
          </el-form-item>
          <el-form-item label="手机号：">
            <p class="el-form-item-static"> {{ detailData.phone }} </p>
          </el-form-item>
          <el-form-item label="头像：">
            <p class="el-form-item-static"> 
              <img :src="detailData.userImg" class="user-img"/>
            </p>
          </el-form-item>
          <el-form-item label="性别：">
            <p class="el-form-item-static"> {{detailData.gender === 1 ? '男' : detailData.gender === 2 ? '女' : '未知'}} </p>
          </el-form-item>
          <el-form-item label="出生日期：">
            <p class="el-form-item-static"> {{ detailData.birthday }} </p>
          </el-form-item>
          <el-form-item label="身份证号：">
            <p class="el-form-item-static"> {{ detailData.idcard }} </p>
          </el-form-item>
          <el-form-item label="用户地址列表：">
            <p class="el-form-item-static">
              <common-table
              :table-column="addressColumn"
              :table-data="addressList"
              :show-pagination="false"
              :loading="false"
            />
            </p>
          </el-form-item>
          <el-form-item class="submit">
            <el-button size="medium" @click="back">返 回</el-button>
          </el-form-item>
        </el-form>          
      </el-col>
    </el-row>
    
  </div>
  
</template>

<script>
//import userImg from '@/assets/login/login_user_icon.png'
// table组件
import CommonTable from '@/components/Base/Table'
// 接口
import { getUserDetailApi } from '@/api/cuser/user'

export default {
  name: 'GoodsDetail',
  components: {
    CommonTable
  },
  data() {
    return {
      // 按钮状态
      btnLoading: false,
      detailData:[],
      nickname:'',
      addressList:[],
      addressColumn: [
        { prop: 'userPhone', label: '收货人手机号' },
        { prop: 'username', label: '收货人姓名' },
        { prop: 'content', label: '收货人地址', 
          formatter: function(row, item) {
            return row.provinceName + row.cityName + row.zoneName + row.content
          } 
        },
        { prop: 'createTime', label: '创建时间' },
      ]
    }
  },
  computed: {},
  created() {
    const uid = this.$route.params.id
    if ( uid ) {
      this.uid = uid
    } 
    console.log('1.  '+this.uid)
    this.getDataList()
  },
  mounted() {},
  methods: {
    // 获取数据列表api
    async getDataList() {
      try {
        const res = await getUserDetailApi({
          uid: this.uid
        })
        const data = res.data || {}
        if (res.code === 0) {
          this.detailData = {
            nickname: data.nickname,
            username: data.username,
            phone: data.phone,
            userImg: data.userImg,
            gender: data.gender,
            birthday: data.birthday,
            idcard: data.idcard
          } 
          this.addressList = res.data.userAddressDOList
        }
      } catch (error) {} 
    },
  }
}
</script>
<style lang="scss" scoped>
.user-img{
  display: block;
  width: 70px;
  max-height: 70px;
}
</style>
