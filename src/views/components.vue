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
export default {
  data() {
    return {
      list: [
        { name: 'axxx', status: 'player', dueDate: '2023-03-01' },
        { name: 'ame', status: 'pos1', dueDate: '2023-03-15' },
        { name: 'maybe', status: 'pos2', dueDate: '2023-04-01' },
      ]

    };
  },
  mounted() {
  },
}

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
    background-color: #F3F3F3;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 10px;
  }
}
</style>
