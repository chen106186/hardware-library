<template>
  <div class="home">
    <div class="proposes">
      <h2>Past Proposals</h2>
      <el-table :data="list" stripe header-cell-class-name="tablrS">
        <el-table-column label="Component Name" prop="name">
          <template slot-scope="scope">
            <span class="dirdd">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Full Name" prop="FullName"></el-table-column>
        <el-table-column label="Cost" prop="Cost"></el-table-column>
        <el-table-column label="Qty" prop="Qty"></el-table-column>
        <el-table-column label="Email" prop="Email">
          <template slot-scope="scope">
            <span class="dirzd">{{ scope.row.Email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Student Programme" prop="StudentProgramme"></el-table-column>
        <el-table-column label="State" prop="State"></el-table-column>
        <el-table-column label="Date" prop="Date"></el-table-column>
      </el-table>
    </div>

  


  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: 'Test request component', FullName: 'lain hart', Cost: '55', 
        Email: 'iain.hart@manchester.ac.uk', Qty: '2',StudentProgramme:'',
        State:'Denied',Date:'09 5ep 2014'
       },
        
      ]

    };
  },
  mounted() {
  },
}

</script>
<style scoped lang="scss">
$Maincolor: #76b0e3;
$BGcolor: #b1d6f7;
$EmailColoe:#409EFF;
$borderColor:#283240;
.home {
  height: 100%;
  // width: 90%;
  // margin: auto;
  padding: 20px 10px 20px 10px;
    border: 1px solid $borderColor;
  .proposes{
    :deep {
      .tablrS{
      background-color: $Maincolor;
      color:#fff;
    }
    .dirdd{
      color:$Maincolor;
      text-decoration:underline;
      cursor: pointer;
      }
      .dirzd{
        color:$EmailColoe;
        text-decoration:underline;
      cursor: pointer;
      }

    } 
  }

  .homeTitle {
    text-align: center;
    font-size: 22px;
    color: blue;
  }
}
</style>
