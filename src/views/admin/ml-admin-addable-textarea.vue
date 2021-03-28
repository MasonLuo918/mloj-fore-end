<template>
  <div class="textarea">
    <el-card v-for="(ioSample, index) in ioSamples" :key="index" class="box-card">
      <div slot="header" class="clearfix">
        <span> <b style="float: left">Sample {{ index + 1 }} </b></span>
        <el-button style="float: right; padding: 3px 0" type="danger" icon="el-icon-delete" circle
                   @click="del(index)"></el-button>
      </div>
      <el-row :gutter="20" class="item">
        <el-col :span="10">
          <span style="float: left">* Input Sample</span>
          <el-input
              type="textarea"
              :rows="5"
              placeholder="输入样例"
              v-model="ioSample.inputSample">
          </el-input>
        </el-col>
        <el-col :span="4"></el-col>
        <el-col :span="10">
          <span style="float: left">* Output Sample</span>
          <el-input
              type="textarea"
              :rows="5"
              placeholder="输出样例"
              v-model="ioSample.outputSample">
          </el-input>
        </el-col>
      </el-row>
    </el-card>
    <el-button type="primary" style="width: 95%; margin-top: 20px;" @click="add">ADD</el-button>
  </div>
</template>

<script>
export default {
  name: 'ml-addable-textarea',
  props: {
    /* ioSamples: {
       type: Array,
       require: true
     }*/
  },
  data() {
    return {
      ioSamples: [],
      test: [
        {
          id: 1,
          text: 'hi'
        },
        {
          id: 2,
          text: 'hello'
        },
      ]
    }
  },
  mounted() {
    let ioSample = {
      inputSample: '',
      outputSample: ''
    }
    this.ioSamples.push(ioSample)
  },
  methods: {
    add() {
      let ioSample = {
        inputSample: '',
        outputSample: ''
      }
      this.ioSamples.push(ioSample)
      console.log(this.ioSamples)
    },
    del(index) {
      this.ioSamples.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.el-button:hover {
  background: aqua;
}
</style>
