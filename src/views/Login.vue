<template>
  <div class="login">
    <div class="login-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha" class="captcha-box">
          <el-input v-model="form.captcha"> </el-input>
          <div class="img" ref="captchaImgRef" v-html="captcha" @click="switchCaptcha"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitByLogin">登录</el-button>
          <el-button type="text">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCaptcha } from "@/api/modules/public";
export default {
  data() {
    return {
      form: {},
      captcha: ''
    };
  },
  created() {
    this.getCaptchaData();
  },
  methods: {
    async getCaptchaData() {
      const res = await getCaptcha()
      this.captcha = res
    },
    async switchCaptcha() {
      this.getCaptchaData()
    },
    onSubmitByLogin() {},
  },
};
</script>

<style lang="scss" scoped>
.login {
  .login-box {
    width: 400px;
    ::v-deep .captcha-box {
      .el-form-item__content {
        display: flex;
        align-items: center;
        line-height: normal;
        .el-input {
          flex: 1;
        }
        .img {
          cursor: pointer;
          height: 40px;
        }
      }
    }
  }
}
</style>
