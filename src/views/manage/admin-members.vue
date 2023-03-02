<template>
  <div class="home">
    <div class="proposes">
      <h2>Current Admins</h2>
      <el-table :data="list" stripe header-cell-class-name="tablrS">
        <el-table-column label="Full Name" prop="FullName"></el-table-column>
        <el-table-column label="Email" prop="Email">
          <template slot-scope="scope">
            <span class="dirzd">{{ scope.row.Email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Remove?" prop="Remove">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Remove</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="addId">
        <div>PersonlD:</div>
        <div class="pID">
          <el-input v-model="Idinput" placeholder="Please enter"></el-input>
        </div>
        <el-button type="success" @click="submitFun">Submit</el-button>
      </div>
    </div>

    <el-dialog
      title="Computer Science Hardware Library"
      :visible.sync="dialogVisible"
      width="50%"
      @close="handleClose"
    >
      <div class="Pfrmd">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="name" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          
          <el-form-item label="Email:" prop="Email">
            <el-input v-model="ruleForm.Email"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >define</el-button
            >
           
            <el-button @click="resetForm('ruleForm')">cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
        ruleForm: {
        name: "",
        Email: "",
        
      },
      rules: {
        name: [{ required: true, message: "Please enter", trigger: "blur" }],
        Email: [{ required: true, message: "Please enter", trigger: "blur" }],
      },
      Idinput: "",
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
    handleDelete() {},
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
  .addId {
    display: flex;
    align-items: center;
    .pID {
      margin: 0 20px;
    }
  }
}
</style>
  