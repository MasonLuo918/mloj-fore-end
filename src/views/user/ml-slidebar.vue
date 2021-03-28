<template>
  <div class="sidebar">
    <el-menu
        class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="collapse"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        unique-opened
        router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                  v-if="subItem.subs"
                  :index="subItem.index"
                  :key="subItem.index">
                <template #title>
                  <span>{{ subItem.title }}</span>
                </template>
                <el-menu-item
                    v-for="(threeItem, i) in subItem.subs"
                    :key="i"
                    :index="threeItem.index"
                >{{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                  v-else
                  :index="subItem.index"
                  :key="subItem.index"
              >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import bus from "../common/bus";
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-lx-home",
          index: "/user/dashboard",
          title: "系统首页"
        },
        {
          icon: 'el-icon-notebook-2',
          index: "/user/bookList",
          title: "书籍列表",
          subs: []
        },
        {
          icon: 'el-icon-folder-add',
          index: "/uesr/problemList",
          title: "题库列表",
          subs: []
        },
        {
          icon: 'el-icon-check',
          index: "/user/solutions",
          title: "提交列表",
          subs: []
        },
      ]
    };
  },
  methods: {
    async init() {
      await this.initBookList(this.items[1])
      await this.initProblemList(this.items[2])
      await this.initSolutionList(this.items[3])
    },
    async initSolutionList(item) {
      let url = '/solution/list'
      let solutions = []
      await this.axios.get(url)
          .then(resp => {
            solutions = resp.data.data
          })
          .catch(err => {
            this.$notify.error({
              message: err
            })
          })
      console.log(solutions)
      for (let i = 0; i < solutions.length; i++){
        solutions[i].index = '/user/solutionDetail/' + solutions[i].id
        solutions[i].title = solutions[i].problemId + "—" + solutions[i].id
      }
      item.subs = solutions
    },
    async initProblemList(item) {
      let url = '/problem/list'
      let problems = []
      await this.axios.get(url)
          .then(resp => {
            problems = resp.data.data
          })
          .catch(err => {
            this.$notify.error({
              message: err
            })
          })
      console.log(problems)
      for (let i = 0; i < problems.length; i++) {
        problems[i].index = '/user/problemDetail/' + problems[i].id
        problems[i].title = problems[i].id + '.  ' + problems[i].title
      }
      item.subs = problems
    },
    async initBookList(item) {
      let url = '/book'
      this.bookLoading = true
      let books = []
      await this.axios.get(url)
          .then(resp => {
            books = resp.data.data
          })
          .catch(err => {
            this.$notify.error({
              title: '错误',
              message: err
            })
          })
      for (let i = 0; i < books.length; i++) {
        books[i].index = '/user/bookDetail/' + books[i].id + '/' + books[i].name
        books[i].title = '《' + books[i].name + '》'
      }
      item.subs = books
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    collapse() {
      return this.$store.state.collapse
    }
  },
  mounted() {
    this.init()
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
