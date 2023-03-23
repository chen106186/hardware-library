<template>
  <div class="home">
    <div class="proposes">
      <h2>Past Proposals</h2>
      <el-table :data="list" stripe header-cell-class-name="tablrS" border>
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
        <el-table-column
          label="Student Programme"
          prop="StudentProgramme"
        ></el-table-column>
        <el-table-column label="State" prop="statusInfo"></el-table-column>
        <el-table-column label="Date" prop="Date"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import table from "@/mixins/table";
import api from "@/api/index";
export default {
  mixins: [table],
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
      this.getList();
    },
    updateProposal() {
      api.updateProposal().then((res) => {});
    },
    getList() {
      api.getList().then((res) => {
        this.list = res.map((it) => {
          return {
            id: it.id,
            name: it.name,
            FullName: it.userName,
            statusInfo: it.statusInfo,
            Cost: it.cost,
            Email: it.userEmail,
            Qty: it.qty,
            StudentProgramme: it.studentProgramme,
            Date: it.createtime,
          };
        });
      });
    },
  },
};
</script>
<style scoped lang="scss">
$Maincolor: rgb(55, 64, 82);
$BGcolor: #b1d6f7;
$EmailColoe: #409eff;
$borderColor: #283240;
.home {
  height: 100%;
  width: 1200px;
  // margin: auto;
  padding: 20px 10px 20px 10px;
  border: 1px solid $borderColor;
  .proposes {
    :deep {
      .tablrS {
        background-color: $Maincolor;
        color: #fff;
      }
      .dirdd {
        // color: $Maincolor;
        // text-decoration: underline;
        // cursor: pointer;
      }
      .dirzd {
        // color: $EmailColoe;
        // text-decoration: underline;
        // cursor: pointer;
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
