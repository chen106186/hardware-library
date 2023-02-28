<template>
  <div class="login">
    <div class="login-content">
      <h2 class="title">
        Welcome Hardware Library
      </h2>
      <el-form inline ref="loginFormRef" :model="loginForm" :rules="rules">
        <el-form-item label="Username:" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password:" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="action">
        <el-button type="primary" @click="submitForm()">Login</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: { username: '', password: '' },
      rules: {
        username: [{ required: true, message: 'Username can not be empty', trigger: 'blur' }],
        password: [{ required: true, message: 'Password can not be empty', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async submitForm() {
      const _self = this
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          sessionStorage.setItem('user', _self.loginForm.username)
          sessionStorage.setItem('token', 'token_sjdkawkslakdl')
          sessionStorage.setItem('role', _self.loginForm.username === 'admin' ? '1' : '6')
          this.$message.success('login success')
          this.$router.push('/home')
        }
      })
    }
  }
}


</script>
<style lang="scss" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../assets/login_bg.jpg") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;

  .login-content {
    width: 350px;
    height: 230px;
    padding: 20px;
    background-color: rgba(248, 246, 246, 0.68);
    border-radius: 8px;
    box-shadow: 3px 2px 2px 1px rgba(255, 255, 255, .35);
    position: absolute;
    top: 55%;
    left: 68%;
    transform: translate(-20%, -50%);

    .title {
      text-align: center;
      margin: 10px 0 30px;
    }

    :deep {

      .el-form-item__label {
        width: 100px;
        color: #000;
        font-size: 16px;
      }
    }

    .action {
      text-align: center;
    }
  }
}
</style>
