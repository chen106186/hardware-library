<template>
  <div class="prooseInd">
    <div class="Pfrmd">
      <h2>Propose Component</h2>
      <div class="tip">(*required field)</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="ComponentName:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Description:" prop="desc">
          <el-input
            type="textarea"
            :rows="4"
            :autosize="{ minRows: 4, maxRows: 4 }"
            v-model="ruleForm.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="Where can we find it?" prop="find">
          <el-input v-model="ruleForm.pdfPath"></el-input>
        </el-form-item>
        <el-form-item label="Image link:" prop="imageLike">
          <el-input v-model="ruleForm.imagePath"></el-input>
        </el-form-item>
        <el-form-item label="Approximative cost per piece(€):" prop="piece">
          <el-input v-model="ruleForm.cost"></el-input>
        </el-form-item>
        <el-form-item label="Proposed quantity:" prop="quantity">
          <el-input v-model="ruleForm.qty"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Submit</el-button
          >
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  name: "ProposeIndex",
  data() {
    return {
      ruleForm: {
        name: "",
        description: "",
        pdfPath: "",
        imagePath: "",
        cost: "",
        qty: "",

        categories: "3",
        statusInfo: 1,
        studentProgramme: "ui",
        userEmail: "233@",
        userId: 1,
        userName: "ta",
        userSchool: "w",
        websites: "www.",
      },
      rules: {
        name: [{ required: true, message: "Please enter", trigger: "blur" }],
        description: [
          { required: true, message: "Please enter", trigger: "blur" },
        ],
        pdfPath: [{ required: true, message: "Please enter", trigger: "blur" }],
        imagePath: [
          { required: true, message: "Please enter", trigger: "blur" },
        ],
        cost: [{ required: true, message: "Please enter", trigger: "blur" }],
        qty: [{ required: true, message: "Please enter", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    insertProposal(ruleForm) {
      api.insertProposal(ruleForm).then((res) => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(formName);
        // 数据验证成功
        if (valid) {
          if (!this.ruleForm) {
          } else {
            this.insertProposal(this.ruleForm);
          }
          // 提示成功 ，或则跳转页面
          this.$message({
            message: "Saved successfully",
            type: "success",
          });
          let path = "/proposal/index";
          this.$router.push({ path });
        } else {
          // Save failed
          this.$message({
            message: "Save failed,please try again",
            type: "error",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
.prooseInd {
  height: 100%;

  .PTitle {
    color: #79379d;
    text-align: center;
  }

  h2 {
    text-align: center;
  }

  .Pfrmd {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #f3f3f3;

    .tip {
      font-size: 12px;
      margin: 10px 0;
      margin-left: 50%;
      transform: translateX(-60%);
      color: #ff0000;
    }

    .demo-ruleForm {
      width: 600px;
      margin-left: 50%;
      transform: translateX(-50%);
      padding: 5px 10px;
      border: 1px solid #2a5e19;
      border-radius: 5px;

      :deep .el-form-item__content {
        &:last-child {
          text-align: center;
        }
      }
    }

    :deep .el-form-item__label {
      color: #000;
    }
  }
}
</style>