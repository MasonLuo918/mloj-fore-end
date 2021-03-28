<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 书籍列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="add">
        <el-button type="danger" @click="addBookVisiable=true">增加书籍</el-button>
      </div>
      <el-dialog
          title="添加书籍" v-model="addBookVisiable">
        <el-form ref="form" :model="addForm" label-width="80px">
          <el-form-item label="书籍名称">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>

          <el-form-item label="作者">
            <el-input v-model="addForm.author"></el-input>
          </el-form-item>

          <el-form-item label="出版商">
            <el-input v-model="addForm.publisher"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addBook">表单提交</el-button>
            <el-button @click="addBookVisiable = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog
          title="修改书籍" v-model="editBookVisiable">
        <el-form ref="form" :model="editForm" label-width="80px">
          <el-form-item label="书籍名称">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>

          <el-form-item label="作者">
            <el-input v-model="editForm.author"></el-input>
          </el-form-item>

          <el-form-item label="出版商">
            <el-input v-model="editForm.publisher"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editBook">表单提交</el-button>
            <el-button @click="editBookVisiable = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <br/>
      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="书籍名称"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="publisher" label="出版社"></el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="editBookDialogOpen(scope.row)"
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
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      addBookVisiable: false,
      editBookVisiable: false,
      addForm: {
        name: '',
        author: '',
        publisher: ''
      },
      editForm: {
        id: 0,
        name: '',
        author: '',
        publisher: ''
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
    async addBook() {
      let url = '/book';
      await this.axios.post(url, this.addForm)
          .then(resp => {
            console.log(resp)
          }).catch(err => {
            console.log(err)
          })
      this.addBookVisiable = false
      location.reload()
    },
    async editBookDialogOpen(book) {
      this.editForm.id = book.id
      this.editForm.author = book.author
      this.editForm.name = book.name
      this.editForm.publisher = book.publisher
      this.editBookVisiable = true
    },
    async editBook() {
      let url = '/book';
      await this.axios.patch(url, this.editForm)
      this.editBookVisiable = false
      location.reload()
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      let url = '/book'
      this.axios.get(url)
          .then(resp => {
            this.tableData = resp.data.data
            this.pageTotal = this.tableData.length || 50
            console.log(this.tableData)
          })
          .catch(err => {
            this.$notify.error({
              title: '错误',
              message: err
            })
          })
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
          .then(() => {
            let url = '/book/' + row.id
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
    }
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
