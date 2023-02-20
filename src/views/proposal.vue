<template>
  <div class="home">
    <div class="proposes">
      <h2>Most Recently Proposed Components</h2>
      <el-table :data="list">
        <el-table-column label="Name" prop="name"></el-table-column>
        <el-table-column label="State">
          <!-- <template slot-scope="scope">
            <el-tag type='sccuss' v-if="scope.row.state == 1">on</el-tag>
            <el-tag type='warning' v-else>off</el-tag>
          </template> -->
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []

    };
  },
  created() {
    const sessionList = localStorage.getItem('ProposeList')
    this.list = JSON.parse(sessionList)

  },
  methods: {
  }
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
  }
}
</style>
