<template>
  <div class="problem-detail">
    <div class="pd-title" style="text-align: center">
      <b><i><u>{{ problem.title }}</u></i></b>
    </div>
    <div class="pd-info" style="text-align: center">
      <div class="pd-limit">
        <div class="pd-limit-time">
          <label>时间限制:</label>
          {{ problem.timeLimit }} ms
        </div>
        <div class="pd-limit-memory">
          <label>内存限制:</label>
          {{ problem.memoryLimit }} KB
        </div>
      </div>
      <div class="pd-level">
        <label>难度: {{ level }} </label>
      </div>
    </div>
    <div class="description">
      <el-divider content-position="center">问题描述</el-divider>
      <div class="pd-content">
        {{ problem.description }}
      </div>
    </div>

    <div class="inputDescription">
      <el-divider content-position="center">输入描述</el-divider>
      <div class="pd-content">
        {{ problem.inputDescription }}
      </div>
    </div>

    <div class="outputDescription">
      <el-divider content-position="center">输出描述</el-divider>
      <div class="pd-content">
        {{ problem.outputDescription }}
      </div>
    </div>

    <template v-if="problem.hint">
      <div class="pd-hint">
        <el-divider content-position="center">
          提示
        </el-divider>
        <div class="pd-content">
          {{ problem.hint }}
        </div>
      </div>
    </template>

    <div class="pd-ioSamples">
      <el-divider content-position="center">输入输出示例</el-divider>
      <template v-if="problem.ioSamples">
        <template v-for="(ioSample,index) in problem.ioSamples" :key="index">
          <el-card class="pd-ioSample">
            <div slot="header" style="font-size: 10px"><b><i>输入输出示例 {{ index + 1 }}</i></b></div>
            <el-row>
              <el-col :span="10">
                <el-divider content-position="center">输入示例</el-divider>
                {{ ioSample.inputSample }}
              </el-col>
              <el-col :span="2">
                <el-divider direction="vertical">
                </el-divider>
              </el-col>
              <el-col :span="10">
                <el-divider content-position="center">输出示例</el-divider>
                {{ ioSample.outputSample }}
              </el-col>
            </el-row>
          </el-card>
        </template>
      </template>

      <template v-else>

      </template>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProblemDetail',
  props: {
    problem: {
      type: Object,
      require: true
    }
  },
  computed: {
    level() {
      switch (this.problem.level) {
        case 0:
          return '简单'
        case 1:
          return '中等'
        case 2:
          return '困难'
      }
    }
  }
}
</script>

<style scoped>
h4 {
  float: left;
}

.pd-content {
  text-align: left;
}

.pd-title {
  font-size: 30px;
}

.pd-info {
  font-size: 15px;
  color: #7c7c7c;
}

.problem-detail {
  margin: 20px;
}
</style>
