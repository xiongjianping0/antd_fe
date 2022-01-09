<template>
  <div class="login-container">
    <div class="bg-area" />
    <div class="title-container">
      <h3 class="title">{{ navbarHeaderContent }}</h3>
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="img-container">
        <img :src="LoginUserIcon" alt="">
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="
              passwordType === 'password' ? 'eyes-close' : 'eyes-open'
            "
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-top:20px;"
        @click.native.prevent="throttleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { validatorForm } from '@/utils/validate'
import Utils from '@/utils/util'
import setting from '@/store/modules/settings'
import LoginUserIcon from '@/assets/login/login_user_icon.png'

export default {
  name: 'Login',
  data() {
    return {
      LoginUserIcon: LoginUserIcon,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          },
          { type: 'isBlank', validator: validatorForm, trigger: 'blur' },
          { type: 'isChinese', validator: validatorForm, trigger: 'blur' }
        ],
        password: [
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      navbarHeaderContent: setting.state.systemTitle || '后台系统',
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      wait: 2000, // 2000ms之内不能重复发起请求
      throttleLogin: null // 节流登录
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // 节流登录
    this.throttleLogin = Utils.throttle(this.handleLogin, this.wait)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // TODO 查数据库用户信息 --此处mock.js暂时模拟数据
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 在actions里封装了一个axios请求
          // 在login页通过this.$store.dispatch提交data里的数据
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg: #283443;
$light_gray: #283443;
$cursor: #283443;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 40px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $light_gray;
      caret-color: $cursor;

      /*       &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      } */
    }
  }

  .el-form-item {
    border: 1px solid #d0cfcf;
    background: #fff;
    border-radius: 5px;
    color: #454545;
    margin-bottom: 30px;
    .el-form-item__content {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #ffffff;
$dark_gray: #889aa4;
$light_gray: #5eb8dd;

.login-container {
  width: 100%;
  height: 100%;
  min-height: 625px;
  background-color: $bg;
  overflow: hidden;
  position: relative;

  .bg-area {
    width: 100%;
    height: 55%;
    position: absolute;
    filter: blur(1px);
    z-index: 10;
    background-image: url(./../../assets/login/login_bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .login-form {
    background: #fff;
    width: 400px;
    height: 370px;
    position: absolute;
    left: calc(50% - 200px);
    top: calc(50% - 185px);
    border-radius: 4px;
    padding: 35px;
    z-index: 20;
    box-sizing: border-box;
    box-shadow: 0px 0px 15px rgba(21, 43, 84, 0.2);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0px 5px 0px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .img-container {
    position: relative;
    text-align: center;
    img {
      width: 50px;
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 30px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .title-container {
    position: absolute;
    width: 100%;
    text-align: center;
    z-index: 1000;
    top: calc(50% - 270px);
    .title {
      font-size: 26px;
      color: #ffffff;
      font-weight: bold;
      letter-spacing: 2px;
    }
  }

  .show-pwd {
    margin-right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
