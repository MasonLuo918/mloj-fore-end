<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 章节列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="add">
        <el-button type="danger" @click="addIndexVisiable=true">增加章节</el-button>
      </div>
      <br/>
      <el-dialog
          title="添加章节" v-model="addIndexVisiable">
        <el-form ref="form" :model="addIndexForm" label-width="100px">
          <el-form-item label="章节名称">
            <el-input v-model="addIndexForm.name"></el-input>
          </el-form-item>

          <el-form-item label="章节排序">
            <el-input-number v-model="addIndexForm.order" :min="1"></el-input-number>
          </el-form-item>

          <el-form-item label="关联书籍ID">
            <el-input-number v-model="addIndexForm.bookId" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addIndex">表单提交</el-button>
            <el-button @click="addIndexVisiable = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>


      <el-dialog
          title="添加章节" v-model="editIndexVisiable">
        <el-form ref="form" :model="editIndexForm" label-width="100px">
          <el-form-item label="章节名称">
            <el-input v-model="editIndexForm.name"></el-input>
          </el-form-item>

          <el-form-item label="章节排序">
            <el-input-number v-model="editIndexForm.order" :min="1"></el-input-number>
          </el-form-item>

          <el-form-item label="关联书籍ID">
            <el-input-number v-model="editIndexForm.bookId" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editIndex">表单提交</el-button>
            <el-button @click="editIndexVisiable = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>


      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="章节名称"></el-table-column>
        <el-table-column prop="bookId" label="书籍ID"></el-table-column>
        <el-table-column prop="order" label="排序"></el-table-column>
        <el-table-column prop="problem" label="关联问题">
          <template #default="scope">
            <el-tag
                v-for="p in scope.row.problem"
                :key="p.id"
                closable
                @close="handleCancelRel(p, scope.row.id, scope.row.problem)">
              {{ p.name }}
            </el-tag>

            <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleRelProblem(scope.row)"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Problem Id
            </el-button>

          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEditIndex(scope.row)"
            >编辑
            </el-button>
            <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "basetable",
  data() {
    return {
      query: {
        address: "",
        name: "",
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      idx: -1,
      id: -1,
      addIndexVisiable: false,
      addIndexForm: {
        name: '',
        order: null,
        bookId: null
      },
      editIndexVisiable: false,
      editIndexForm: {
        name: '',
        order: null,
        bookId: null,
        id: null
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    tagType() {
      return (tag) => {
        console.log(tag)
        switch (tag) {
          case 'easy':
            return 'success'
          case 'medium':
            return 'info'
          case 'hard':
            return 'danger'
        }
      }
    }
  },
  methods: {
    handleEditIndex(index) {
      this.editIndexForm.name = index.name
      this.editIndexForm.bookId = index.bookId
      this.editIndexForm.order = index.order
      this.editIndexForm.id = index.id
      this.editIndexVisiable = true
    },
    async editIndex() {
      let url = '/index'
      await this.axios.put(url, this.editIndexForm)
          .then(() => {
            this.$notify.success({
              message: '修改成功'
            })
          })
          .catch(err => {
            this.$notify.error({
              message: err
            })
          })
      this.editIndexVisiable = false
      location.reload()
    },
    async addIndex() {
      let url = '/index?'
      url += 'name=' + this.addIndexForm.name
      url += '&order=' + this.addIndexForm.order
      url += '&bookId=' + this.addIndexForm.bookId
      this.addIndexForm.name = ''
      this.addIndexForm.order = null
      this.addIndexForm.bookId = null
      await this.axios.post(url)
          .then(resp => {
            console.log(resp)
            this.$notify.success({
              message: '添加成功'
            })
          })
          .catch(err => {
            this.$notify.error({
              message: err
            })
          })
      this.addIndexVisiable = false
      location.reload()
    },
    // 获取 easy-mock 的模拟数据
    async getData() {
      let indexUrl = '/index'
      let problemUrl = "/problem"
      let index = null;
      await this.axios.get(indexUrl)
          .then(resp => {
            index = resp.data.data
            index.inputVisible = false
            index.inputValue = ''
            this.pageTotal = this.tableData.length || 50
          })
          .catch(err => {
            this.$notify.error({
              title: '错误',
              message: err
            })
          })
      for (let i = 0; i < index.length; i++) {
        let url = problemUrl + '?indexId=' + index[i].id
        await this.axios.get(url)
            .then(resp => {
              index[i].problem = resp.data.data
            }).catch(err => {
              index[i].problem = []
              console.log(err)
            })
      }
      this.tableData = index
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
          .then(() => {
            let url = '/index/' + row.id
            this.axios.delete(url)
                .then(() => {
                  this.$message.success("删除成功");
                  this.tableData.splice(index, 1);
                })
          })
          .catch(() => {
          });
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    /* handleEdit(index, row) {
       this.idx = index;
       this.form = row;
       this.editVisible = true;
     },*/
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    },
    handleCancelRel(problem, indexId, problems) {
      let url = '/book/index/' + indexId + '/problem/' + problem.id
      this.axios.delete(url)
          .then(resp => {
            problems.splice(problems.indexOf(problem), 1)
            console.log(resp)
          })
    },
    async handleRelProblem(index) {
      index.inputVisible = false
      let problemId = index.inputValue;
      let indexId = index.id
      let url = '/book/index/' + indexId + '/problem'
      let param = {
        problemId: [problemId]
      }
      await this.axios.post(url, param)
          .then(resp => {
            console.log(resp)
          })
      location.reload()
    },
    showInput(index) {
      index.inputVisible = true;
      /* this.$nextTick(_ => {
         this.$refs.saveTagInput.$refs.input.focus();
       });*/
    },

  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
