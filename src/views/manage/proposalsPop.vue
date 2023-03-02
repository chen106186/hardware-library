<template>
  <div class="prooseInd">
    <div class="jingg">
      <i class="el-icon-s-opportunity jicon"></i>
      <span class="Jsp"
        >Please note you an edtral the bordered areas on this page ifyou hover
        overand dick an the highlghted felds, A the changes wl be saved to the
        datatase onte you wilpres the Savebutton.Once you are haopy with the
        chanee and the omponenthas been boueht, you can save this proposa as a
        nev compnent by pre ine the Save as (ompoment butan. The
        webeitescategpry and identfiers fe ds changes wil only be saved if you
        use the Add as Mew (Component buton as these fe ds are specifc to a
        comaaner</span
      >
    </div>
    <div class="Pfrmd">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="Location:" prop="Location">
          <el-input v-model="ruleForm.location"></el-input>
        </el-form-item>
        <el-form-item label="Cost:" prop="cost">
          <el-input v-model="ruleForm.cost"></el-input>
        </el-form-item>
        <el-form-item label="Quantity:" prop="quantity">
          <el-input v-model="ruleForm.quantity"></el-input>
        </el-form-item>
        <el-form-item label="Proposer:" prop="Proposer" class="itemCol">
          <el-input v-model="ruleForm.proposer" disabled></el-input>
        </el-form-item>
        <el-form-item label="Student Programme:" prop="student" class="itemCol">
          <el-input v-model="ruleForm.student" disabled></el-input>
        </el-form-item>
        <el-form-item label="QuaImagelink:" prop="quaImagelink">
          <el-input v-model="ruleForm.quaImagelink"></el-input>
        </el-form-item>
        <el-form-item label="Websites:" prop="websites">
          <el-input v-model="ruleForm.websites"></el-input>
        </el-form-item>
        <el-form-item label="Category:" prop="category">
          <el-input v-model="ruleForm.category"></el-input>
        </el-form-item>
        <el-form-item label="Unique identifiers:" prop="unique">
          <el-input type="textarea" v-model="ruleForm.unique"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Amend</el-button
          >
          <el-button type="primary" @click="submitForm('ruleForm')"
            >add as new component</el-button
          >
          <el-button @click="resetForm('ruleForm')">deny</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "pastProposals",
  data() {
    return {
      pastProposalsListList:null,
      localName: "PIR Sensor",
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
        location: [{ required: true, message: "Please enter", trigger: "blur" }],
        cost: [{ required: true, message: "Please enter", trigger: "blur" }],
        quantity: [{ required: true, message: "Please enter", trigger: "blur" }],
        quaImagelink: [{ required: true, message: "Please enter", trigger: "blur" }],
      },
      LoacalArr: null,
    };
  },
  mounted() {
    
    let localData = JSON.parse(
      window.localStorage.getItem("pastProposalsListList")
    );
    this.pastProposalsListList = localData
    if (!localData) {
      this.ruleForm = {
        name: "PIR Sensor",
        desc: "Adjustable sensitivity with operating distance of up to 7m. Easy to use module that can be : powered from 4.5 - 20W and provides a 3.3V control signal when activated.",
        location: "http:/www.tandyonline.co.uk",
        cost: "3",
        quantity: "2",
        proposer: "Seung Shin",
        student: "Computer Science",
        quaImagelink:
          " htp://www.tandyanline.co.uk/pir-motion-sensor-module. html",
        websites: "",
        category: "",
        unique: "",
      };
    } else {
      let _this = this;
      let arrIndex = localData.findIndex(function (item) {
        return item.name == _this.localName;
      });
      if(arrIndex == -1){
        this.ruleForm = {
        name: "PIR Sensor",
        desc: "Adjustable sensitivity with operating distance of up to 7m. Easy to use module that can be : powered from 4.5 - 20W and provides a 3.3V control signal when activated.",
        location: "http:/www.tandyonline.co.uk",
        cost: "3",
        quantity: "2",
        proposer: "Seung Shin",
        student: "Computer Science",
        quaImagelink:
          " htp://www.tandyanline.co.uk/pir-motion-sensor-module. html",
        websites: "",
        category: "",
        unique: "",
      };
      }else{
        this.ruleForm = localData[arrIndex];
      }
      
    }
  },
  methods: {
    // amenFUn(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     // 数据验证成功
    //     if (valid) {
    //       let _this = this;
    //         let arrIndex = this.LoacalArr.findIndex(function (item) {
    //           return item.name == _this.ruleForm.name;
    //         });
    //       window.localStorage.setItem(
    //         "pastProposalsListList",
    //         JSON.stringify(ProposeList)
    //       );

    //       //  // 存最新数据
    //       // window.localStorage.setItem(
    //       //   "ProposeList",
    //       //   JSON.stringify(this.LoacalArr)
    //       // );

    //       // 提示成功 ，或则跳转页面
    //       this.$message({
    //         message: "Saved successfully",
    //         type: "success",
    //       });
    //       // this.$router.push({ path })
    //     } else {
    //       // Save failed
    //       this.$message({
    //         message: "Save failed,please try again",
    //         type: "error",
    //       });
    //       return false;
    //     }
    //   });
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 数据验证成功
        if (valid) {
          // 取数据
          let ProposeList = [];
          // 如果无数据
          if (!this.pastProposalsListList) {
            ProposeList.push(this.ruleForm);
            window.localStorage.setItem(
              "pastProposalsListList",
              JSON.stringify(ProposeList)
            );
          } else {
            // 有数据
            let _this = this;
            let arrIndex = this.pastProposalsListList.findIndex(function (item) {
              return item.name == _this.localName;
            });

            if (arrIndex == -1) {
              // 数据没有重复字段name区分
              this.pastProposalsListList.push(this.ruleForm);
            } else {
              // 数据有重复字段name区分
              this.pastProposalsListList.splice(arrIndex, 1, this.ruleForm);
            }
            // 存最新数据
            window.localStorage.setItem(
              "pastProposalsListList",
              JSON.stringify(this.pastProposalsListList)
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
$Maincolor: #283240;
$BGcolor: #b1d6f7;
.prooseInd {
  height: 600px;
  overflow: auto;
  width: 100%;
  margin: auto;
  .PTitle {
    color: $Maincolor;
  }
  .jingg {
    display: flex;
    border: 1px solid $Maincolor;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 20px 15px;
    box-shadow: 0 8px 12px 0 $BGcolor;
    .jicon {
      font-size: 40px;
      color: rgb(255, 0, 47);
      margin-right: 10px;
    }
    .Jsp {
      font-size: 20px;
      word-break: break-word;
    }
  }
  .Pfrmd {
    padding: 20px 20px 20px 16px;
    border: 1px solid $Maincolor;
    .itemCol {
      background: $BGcolor;
      padding: 1px 1px 5px 1px;
      // box-shadow: 0 2px 2px 0px $BGcolor;
      padding-left: 15px;
    }
  }
}
</style>