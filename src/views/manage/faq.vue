<template>
    <div class="fapInd">
      <!-- <div class="FTitle">
        <h1>Computer Science Hardware Library</h1>
      </div> -->
      <div class="Ffrmd">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="How can I reserve an item?" name="1">
            <div>How can I reserve an item?</div>
          </el-collapse-item>
          <el-collapse-item
            title="What happens after I reserve an item?"
            name="2"
          >
            <div>What happens after I reserve an item?</div>
          </el-collapse-item>
          <el-collapse-item
            title="What if want an item which dose not exist?"
            name="3"
          >
            <div>
              You can proposr a new component using
              <span class="colorC">this form</span> . Once one of our members of
              staff ……
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="Where can I see my proposais and their state?"
            name="4"
          >
            <div>Where can I see my proposais and their state?</div>
          </el-collapse-item>
          <el-collapse-item
            title="Where can I see my surrent bookings and reservations?"
            name="5"
          >
            <div>Where can I see my surrent bookings and reservations?</div>
          </el-collapse-item>
          <el-collapse-item
            title="Who can I contact if I have further questions?"
            name="6"
          >
            <div>Who can I contact if I have further questions?</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FAQ",
    data() {
      return {
        activeName: "3",
      };
    },
  };
  </script>
  
  <style scoped lang="scss">
  $Maincolor: #76b0e3;
$BGcolor: #b1d6f7;
$EmailColoe: #409eff;
$borderColor: #283240;
  .fapInd {
    height: 100%;
    .colorC {
      text-decoration: underline;
      color: red;
    }
    .FTitle {
      color: $Maincolor;
    }
    .Ffrmd {
      padding: 20px 20px 20px 16px;
      border: 1px solid $borderColor;
      .el-collapse-item {
        ::v-deep {
          .el-collapse-item__header {
            background-color: $BGcolor;
            padding-left: 10px;
            font-size: 18px;
          }
          .el-collapse-item__content {
            font-size: 18px;
          }
        }
      }
    }
  }
  </style>