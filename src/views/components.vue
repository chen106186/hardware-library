<template>
  <div class="home">
    <div class="proposes">
      <h2>Reserved Components</h2>
      <el-table :data="list">
        <el-table-column label="Name" prop="name">
          <template slot-scope="scope">
            <a>{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column label="Due date" prop="dueDate"></el-table-column>
        <el-table-column label="Status" prop="status"></el-table-column>
      </el-table>
    </div>

    <div class="proposes">
      <h2>Collected Components</h2>
      <el-table :data="list">
        <el-table-column label="Name" prop="name">
          <template slot-scope="scope">
            <a>{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column label="Due date" prop="dueDate"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.findComponentViewByUser();
    },
    findComponentViewByUser() {
      let params = {
        userId: "1",
      };
      api.findComponentViewByUser(params).then((res) => {
        this.list = res.map((it) => {
          return {
            name: it.userName,
            status: it.statusInfo,
            dueDate: it.dueDate,
          };
        });
      });
    },
  },
};
</script>
<style scoped lang="scss">
.home {
  height: 100%;
  display: flex;
  flex-direction: column;

  .homeTitle {
    text-align: center;
    font-size: 22px;
    color: blue;
  }

  .proposes {
    background-color: #f3f3f3;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 10px;
  }
}
</style>
