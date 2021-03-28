<template>
  <div class="ml-judge container">
    <div class="ml-pd">
      <ml-problem-detail
        :problem="problem">
      </ml-problem-detail>
    </div>

    <div class="ml-judge-and-result">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="ml-judge-area" style="text-align: left">
            <ml-code-mirror
              @input="code_input"
              @language-change="language_change"
            ></ml-code-mirror>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="ml-judge-result" style="float: left">
            <ml-judge-result :upload="submit" :solutionId="solutionId">
            </ml-judge-result>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import MlCodeMirror from './ml-codemirror'
import MlProblemDetail from './ml-problem-detail'
import MlJudgeResult from './ml-judge-result'

export default {
  data () {
    return {
      code: '',
      language: 0,
      problem: {
        id: null,
        title: 'A + B',
        timeLimit: 1000,
        memoryLimit: 100000,
        inputDescription: '1 1',
        outputDescription: '2',
        description: '1 + 1 = 2',
        ioSamples: [
          {
            inputSample: '1 1',
            outputSample: '2'
          }
        ],
        level: null,
        hint: ''
        // 解决方案
      },
      solutionId: null
    }
  },
  methods: {
    code_input (code) {
      this.code = code
      console.log(code)
    },
    language_change (id) {
      this.language = id
      console.log(id + ' language')
    },
    async submit () {
      let url = '/solution'
      let param = {
        problemId: this.problem.id,
        language: this.language,
        src: this.code
      }
      await this.axios.post(url, param)
        .then(resp => {
          let data = resp.data.data
          this.solutionId = data.id
        })
        .catch(err => {
          this.$notify.error({
            title: '错误',
            message: err
          })
        })
    },
    initProblem () {
      console.log(this.problem.id)
      let url = '/problem/' + this.problem.id
      this.axios.get(url)
        .then(resp => {
          let data = resp.data.data
          this.problem.title = data.title
          this.problem.description = data.description
          this.problem.inputDescription = data.inputDescription
          this.problem.outputDescription = data.outputDescription
          this.problem.timeLimit = data.timeLimit
          this.problem.memoryLimit = data.memoryLimit
          this.problem.level = data.level
          this.problem.hint = data.hint
          this.problem.ioSamples = data.ioSamples
        })
        .catch(error => {
          this.$notify.error({
            title: '错误',
            message: '题目查询失败, ' + error
          })
        })
    }
  },
  components: {
    MlCodeMirror, MlProblemDetail, MlJudgeResult
  },
  watch: {
    $route (to, from) {
      if (this.$route.params.id) {
        this.problem.id = this.$route.params.id
        this.initProblem()
      }
    }
  }
}
</script>

<style scoped>
.el-col {
  margin: 20px;
}
</style>
