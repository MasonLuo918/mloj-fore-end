<template>
  <div class="container">
    <div>
      <el-page-header @back="goback" content="章节详情">
      </el-page-header>
    </div>

    <el-divider>
    </el-divider>
    <div v-if="name">
      <h1>《{{ name }}》</h1>
    </div>
    <el-tree :data="data"
             :props="defaultProps"
             default-expand-all
             @node-click="handleNodeClick">

    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'ml-book-detail',
  data() {
    return {
      data: [],
      name: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      id: null
    };
  },
  methods: {
    handleNodeClick(data) {
      if (data.children === undefined) {
        this.$router.push("/user/problemDetail/" + data.id)
      } else {
        console.log(data)
      }
    },
    async loadBookIndex() {
      let url = '/book/index/' + this.id
      let index = null
      await this.axios.get(url)
          .then(resp => {
            index = resp.data.data
          })
          .catch(err => {
            this.$notify.error({
              message: err
            })
          })
      let res = []
      for (let i = 0; i < index.length; i++) {
        let obj = {}
        obj.id = index[i].id
        obj.name = index[i].name
        obj.order = index[i].order
        obj.label = obj.name
        obj.children = await this.loadProblem(obj.id)
        res[i] = obj
      }
      this.data = res
    },
    async loadProblem(id) {
      let url = '/problem?indexId=' + id
      let pro = null
      await this.axios.get(url)
          .then(resp => {
            pro = resp.data.data
          })
          .catch(err => {
            this.$notify.error({
              message: err
            })
          })
      let res = []
      for (let i = 0; i < pro.length; i++) {
        let obj = {}
        obj.id = pro[i].id
        obj.label = obj.id + '.  ' + pro[i].name
        obj.name = pro[i].name
        res[i] = obj
      }
      return res
    },
    goback() {
      this.$router.push("/user/dashboard")
    }
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        this.id = this.$route.params.id
        this.name = this.$route.params.name
        console.log("hello")
        this.loadBookIndex()
      }
    }
  }
};
</script>
