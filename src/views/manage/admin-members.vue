<template>
  <div class="home">
    <div class="proposes">
      <h2>Current Admins</h2>
      <el-table :data="list" stripe header-cell-class-name="tablrS" border>
        <el-table-column label="Full Name" prop="userName"></el-table-column>
        <el-table-column label="Email" prop="email">
          <template slot-scope="scope">
            <span class="dirzd">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Remove?" prop="Remove">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="handleDelete(scope.$index, list)"
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
      center
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
          <el-form-item label="name" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>

          <el-form-item label="Email:" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer">
        <el-button type="primary" @click="submitForm('ruleForm')">ok</el-button>

        <el-button @click="resetForm('ruleForm')">cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
import table from "@/mixins/table";
import api from "@/api/index";
export default {
  mixins: [table],
  data() {
    return {
      ruleForm: {
        userName: "",
        email: "",
        roleId: 1,
      },
      rules: {
        userName: [
          { required: true, message: "Please enter", trigger: "blur" },
        ],
        email: [{ required: true, message: "Please enter", trigger: "blur" }],
      },
      Idinput: "",
      dialogVisible: false,
      list: [],
    };
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.getMemberList();
    },
    getMemberList() {
      api.getMemberList().then((res) => {
        console.log(res, "res");
        this.list = res.map((it) => {
          return {
            id: it.id,
            userName: it.userName,
            email: it.email,
          };
        });
      });
    },
    deleteUser(id) {
      let params = {
        id,
      };
      api.deleteUser(params).then((res) => {});
    },
    insertUser(ruM) {
      api.insertUser(ruM).then((res) => {});
    },

    submitFun() {
      this.dialogVisible = true;
    },
    submitForm(ruleForm) {
      let ruM = this.ruleForm;
      ruM.account = "AI";
      ruM.password = "123456";
      ruM.personId = "1";
      ruM.statusInfo = 1;
      this.insertUser(ruM);
      this.dialogVisible = false;
      this.getMemberList();
    },
    resetForm() {
      this.dialogVisible = false;
    },
    handleClose() {},
    // handleDelete
    handleDelete(index, row) {
      this.$confirm("Are you sure to Delete?", "", {
        type: "warning",
      })
        .then(() => {
          let id = this.list[index].id;
          this.deleteUser(id);
          this.list.splice(index, 1);
          this.$message.success("Deleted!");
        })
        .catch((e) => {
          console.log("cancel");
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
        color: $Maincolor;
        text-decoration: underline;
        cursor: pointer;
      }
      .dirzd {
        // color: $EmailColoe;
        // text-decoration: underline;
        // cursor: pointer;
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
  