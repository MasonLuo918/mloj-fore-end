<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">用户注册</div>
      <el-form :model="param" :rules="rules" ref="param" label-width="80px" class="ms-content">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="param.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="param.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_confirm">
          <el-input type="password" v-model="param.password_confirm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('param')">注册</el-button>
          <el-button @click="$router.push('/user/login')">去登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.param.password !== '') {
          this.$refs.param.validateField('password');
        }
        callback()
      }
    };

    var validatePasswordConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.param.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback();
      }
    }

    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (this.param.password !== '') {
          this.$refs.param.validateField('username');
        }
        callback()
      }
    };

    return {
      param: {
        username: "",
        password: "",
        password_confirm: ""
      },
      rules: {
        username: [
          {validator: validateUsername, trigger: 'change'}
        ],
        password: [
          {validator: validatePassword, trigger: 'change'}
        ],
        password_confirm: [
          {validator: validatePasswordConfirm, trigger: 'change'}
        ]
      }
    };
  },
  created() {
    this.$store.commit("clearTags");
  },
  methods: {
    async submitForm(formName) {
      console.log("???")
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {
            username: this.param.username,
            password: this.param.password
          }
          const url = '/register'
          this.axios
              .post(url, param)
              .then(() => {
                this.$message({
                  message: '注册成功！请登录',
                  duration: 1000,
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push('/user/login')
                }, 1000)
              })
              .catch(err => {
                this.$notify.error({
                  title: '注册失败',
                  message: err
                })
              })
        } else {
          this.$notify.error({
            message: "请确认输入信息"
          })
          return false
        }
      })
    },
    resetForm() {
      this.param.username = ''
      this.param.password = ''
      this.param.password_confirm = ''
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
