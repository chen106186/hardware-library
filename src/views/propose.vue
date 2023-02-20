<template>
  <div class="prooseInd">
    <div class="Pfrmd">
      <h2>Propose Component</h2>
      <div class="tip">(*required field)</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="top">
        <el-form-item label="ComponentName:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Description:" prop="desc">
          <el-input type="textarea" :rows="4" :autosize="{ minRows: 4, maxRows: 4 }" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="Where can we find it?" prop="find">
          <el-input v-model="ruleForm.find"></el-input>
        </el-form-item>
        <el-form-item label="Image link:" prop="imageLike">
          <el-input v-model="ruleForm.imageLike"></el-input>
        </el-form-item>
        <el-form-item label="Approximative cost per piece(€):" prop="piece">
          <el-input v-model="ruleForm.piece"></el-input>
        </el-form-item>
        <el-form-item label="Proposed quantity:" prop="quantity">
          <el-input v-model="ruleForm.quantity"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProposeIndex",
  data() {
    return {
      ruleForm: {
        name: "",
        desc: "",
        find: "",
        imageLike: "",
        piece: "",
        quantity: "",
      },
      rules: {
        name: [{ required: true, message: "Please enter", trigger: "blur" }],
        desc: [{ required: true, message: "Please enter", trigger: "blur" }],
        find: [{ required: true, message: "Please enter", trigger: "blur" }],
        imageLike: [{ required: true, message: "Please enter", trigger: "blur" }],
        piece: [{ required: true, message: "Please enter", trigger: "blur" }],
        quantity: [{ required: true, message: "Please enter", trigger: "blur" }],
      },
      LoacalArr: null,
    };
  },
  mounted() { },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 数据验证成功
        if (valid) {
          // 取数据
          let newArr = JSON.parse(window.localStorage.getItem("ProposeList"));
          this.LoacalArr = newArr;
          let ProposeList = [];
          // 如果无数据
          if (!this.LoacalArr) {
            ProposeList.push(this.ruleForm);
            window.localStorage.setItem(
              "ProposeList",
              JSON.stringify(ProposeList)
            );
          } else {
            // 有数据
            let _this = this;
            let arrIndex = this.LoacalArr.findIndex(function (item) {
              return item.name == _this.ruleForm.name;
            });

            if (arrIndex == -1) {
              // 数据没有重复字段name区分
              this.LoacalArr.push(this.ruleForm);
            } else {
              // 数据有重复字段name区分
              this.LoacalArr.splice(arrIndex, 1, this.ruleForm);
            }
            // 存最新数据
            window.localStorage.setItem(
              "ProposeList",
              JSON.stringify(this.LoacalArr)
            );
          }
          // 提示成功 ，或则跳转页面
          this.$message({
            message: "Saved successfully",
            type: "success",
          });
          // this.$router.push({ path })
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
    background-color: #F3F3F3;


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
      border: 1px solid #2A5E19;
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