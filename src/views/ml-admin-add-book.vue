<template>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="书籍名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="作者">
            <el-input v-model="form.author"></el-input>
          </el-form-item>

          <el-form-item label="出版商">
            <el-input v-model="form.publisher"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">表单提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>


  </div>
</template>

<script>
export default {
  name: 'baseform',
  props: {
    submit: {
      type: Function,
      require: true
    },
    form: {
      type: Object,
      require: true
    }
  },
  methods: {
    onSubmit() {
      this.submit()
    }
  }
};
</script>
