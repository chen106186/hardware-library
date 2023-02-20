<template>
  <div class="home">
    <div class="proposes">
      <h2>Components in my cart</h2>
      <el-table :data="list" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="Name" prop="name">
          <template slot-scope="scope">
            <a>{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column label="Quantity">
          <template slot-scope="scope">
            <el-select v-model="scope.row.available">
              <el-option v-for="(it, i) in scope.row.originQuantity" :value="it" :key="i" :label="it"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="Due date" prop="dueDate"></el-table-column>
        <el-table-column label="Action">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="remove(scope.$index)">Remove</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top:30px;float: right;" type="primary" @click="doCheckout">CHECKOUT</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      multipleSelection: []
    };
  },
  created() {
    this.list = JSON.parse(localStorage.getItem('cart-list'))
  },
  mounted() {
    this.list.forEach(it => {
      it.originQuantity = +it.available
    })
    console.log(this.list);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    doCheckout() {
      if (!this.multipleSelection.length) {
        this.$message.warning("Please select at lease one itme!")
        return
      }
      this.$confirm('Are you sure checkout?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {

        this.$message({
          type: 'success',
          message: 'Checkout success!'
        });
      }).catch(() => {

      });
    },
    remove(index) {
      this.$confirm('Are you sure delete this component?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: 'Delete success!'
        });
      }).catch(() => {

      });
    }
  }

}

</script>
<style scoped lang="scss">
.home {
  height: 100%;
  display: flex;
  flex-direction: column;

  .proposes {
    background-color: #F3F3F3;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    padding: 20px;
  }
}
</style>
