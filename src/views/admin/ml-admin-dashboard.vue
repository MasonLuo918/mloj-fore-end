<template>
  <div>

    <el-card shadow="hover" style="height:403px;">
      <template #header>
        <div class="clearfix">
          <span>待办事项</span>
          <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
        </div>
      </template>

      <el-table :show-header="false" :data="todoList" style="width:100%;">
        <el-table-column width="40">
          <template #default="scope">
            <el-checkbox v-model="scope.row.status"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <div
                class="todo-item"
                :class="{
                                        'todo-item-del': scope.row.status,
                                    }"
            >{{ scope.row.title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="60">
          <template>
            <i class="el-icon-edit"></i>
            <i class="el-icon-delete"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Schart from "vue-schart";

export default {
  name: "dashboard",
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      todoList: [
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: true
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: true
        }
      ]
    };
  }
};
</script>

<style scoped>

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
