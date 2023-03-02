<template>
  <div class="home">
    <div class="proposes">
      <h2>Proposals</h2>
      <el-table :data="list" stripe header-cell-class-name="tablrS">
        <el-table-column label="Component Name" prop="name">
          <template slot-scope="scope">
            <a class="dirdd" @click="submitFun">{{ scope.row.name }}</a>
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
        <el-table-column label="Date" prop="Date"></el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="Computer Science Hardware Library"
      :visible.sync="dialogVisible"
      width="50%"
      @close="handleClose"
    >
      <proposalsPop></proposalsPop>
    </el-dialog>
  </div>
</template>
  
  <script>
import proposalsPop from "../components/proposalsPop.vue";
export default {
  components: { proposalsPop },
  data() {
    return {
      dialogVisible: false,
      list: [
        {
          name: "PiR Sensoi",
          FullName: "Seung shin",
          Cost: "55",
          Email: "seung.shinastudent.manchester.ac.ul",
          Qty: "2",
          StudentProgramme: "",
          Date: "09 5ep 2014",
        },
        {
          name: "Omron D6T MEMs Thermal IRSensor",
          FullName: "Seung shin",
          Cost: "55",
          Email: "seung.shin@student.manchester.ac.u",
          Qty: "2",
          StudentProgramme: "",
          Date: "09 5ep 2014",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    submitFun() {
      this.dialogVisible = true;
    },
    handleClose() {},
  },
};
</script>
  <style scoped lang="scss">
$Maincolor: #76b0e3;
$BGcolor: #b1d6f7;
$EmailColoe: #409eff;
$borderColor: #283240;
.home {
  height: 100%;
  // width: 90%;
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
        color: $Maincolor;
        text-decoration: underline;
        cursor: pointer;
      }
      .dirzd {
        color: $EmailColoe;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
  