<template>
  <div class="container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="float: left; font-family: 'Songti SC'">Solution ID :  {{ solutionId }} </span>
          <el-button
              :type="button_type"
              :loading="status === 0"
              round
              style="float:right;">
            {{ status_msg }}
          </el-button>
        </div>

        <div class="exec_content" style="text-align: left">

          <template v-if="status === 0">
            <div class="cpu_time">
              <label class="el-icon-loading"> </label>
              编译中: {{ compile_time }} 秒
            </div>
          </template>

          <template v-if="status === 1">
            <div class="cpu_time">
              <label class="el-icon-cpu"> CPU Time: </label>
              {{ cpu_time }} ms
            </div>
            <el-divider></el-divider>
            <div class="memory">
              <label class="el-icon-suitcase-1"> Memory: </label>
              {{ memory }} KB
            </div>
            <el-divider></el-divider>
            <div class="message">
              <label class="el-icon-chat-line-round"> Info: </label>
              {{ exec_result }}
            </div>
          </template>

          <template v-if="status === 2">
            <div class="error_message">
              <label class="el-icon-error"> 错误信息: </label>
              {{ error_msg }}
            </div>
          </template>

          <template v-if="status === 3">
            <div class="error_message">
              <label class="el-icon-error"> 错误信息: </label>
              {{ exec_result }}
            </div>
          </template>
        </div>
      </el-card>
  </div>
</template>

<script>
export default {
  name: 'ml-solution-detail',
  props: {
    upload: {
      type: Function,
      require: true
    }
  },
  data() {
    return {
      loading: true,
      solutionId: null,
      /**
       * status分为:
       * 0 - 评判中
       * 1 - 通过
       * 2 - 编译失败
       * 3 - 错误
       */
      status: 1,
      error_msg: '',
      exec_result: '',
      cpu_time: 0,
      memory: 0,
      compile_time: 0,
      timer: null
    }
  },
  methods: {
    setCompileFail(msg) {
      this.status = 2
      this.error_msg = msg
    },

    setExecSuccess(cpuTime, memory, execResult) {
      this.status = 1
      this.cpu_time = cpuTime
      this.memory = memory
      this.exec_result = execResult
    },

    setExecError(execResult) {
      this.status = 3
      this.exec_result = execResult
    },

    inc_Time() {
      this.compile_time++
    },

    async submit() {
      await this.upload()
      this.findResult()
    },

    findResult() {
      let url = '/solution/result/' + this.solutionId
      this.axios.get(url)
          .then(res => {
            let data = res.data.data
            if (data.resultId != null) {
              this.findResultSuccess(data.resultId)
            } else {
              setTimeout(this.findResult, 1000)
            }
          })
    },

    findResultSuccess(resultId) {
      let url = '/result/' + resultId
      this.axios.get(url)
          .then(res => {
            let data = res.data.data
            if (!data.compilerResult) {
              this.setCompileFail(data.errorData)
            } else if (data.cpuTime !== 0) {
              this.setExecSuccess(data.cpuTime, data.memory, data.processResult)
            } else {
              this.setExecError(data.processResult)
            }
          })
    }
  },
  computed: {
    status_msg() {
      switch (this.status) {
        case 0:
          return '评判中'
        case 1:
          return '通过'
        case 2:
          return '编译出错'
        case 3:
          return '答案错误'
      }
    },
    button_type() {
      switch (this.status) {
        case 0:
          return 'primary'
        case 1:
          return 'success'
        case 2:
          return 'danger'
        case 3:
          return 'danger'
      }
    }
  },
  mounted() {
  },
  watch: {
    status: function (val, oldVal) {
      if (val === 0) {
        this.timer = setInterval(this.inc_Time, 1000)
      } else {
        clearInterval(this.timer)
      }
    },
    solutionId: function () {
      this.status = 0
    },
    $route() {
      if (this.$route.params.id) {
        this.solutionId = this.$route.params.id
        this.findResult()
      }
    }
  }
}
</script>

<style>

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>
