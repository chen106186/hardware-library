<template>
  <div class="statis">
    <div class="staCon">
      <h2>Statistics</h2>
      <div class="collCls">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="Top 10 Most Popular Components" name="1">
            <div class="collItn">
              <EChartV :EChartData="ComponentsData"></EChartV>
            </div>
          </el-collapse-item>
          <el-collapse-item title="Unavailable Components" name="2">
            <el-table :data="list" stripe header-cell-class-name="tablrS">
              <el-table-column label="Image" prop="Image">
                <template slot-scope="scope">
                  <img class="imgs" :src="scope.row.Image" alt="" />
                </template>
              </el-table-column>
              <el-table-column label="Component Name" prop="ComponentName">
                <template slot-scope="scope">
                  <span class="dirzd" @click="diaLogFun">{{
                    scope.row.ComponentName
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Quantity" prop="Quantity">
                <template slot-scope="scope">
                  <span class="dirzd">{{ scope.row.Quantity }}</span>
                </template>
              </el-table-column> </el-table
            >s
          </el-collapse-item>
          <el-collapse-item title="Bookings Last 12 Months" name="3">
            <div class="collItn">
              <EChartLine :EChartData="MonthsData"></EChartLine>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
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
import EChartV from "./Echaets.vue";
import EChartLine from "./EchaetsLine";
import proposalsPop from "./proposalsPop.vue";
export default {
  components: { EChartV, EChartLine, proposalsPop },
  name: "statistics",
  data() {
    return {
      dialogVisible: false,
      activeName: "1",
      ComponentsData: null,
      MonthsData: null,
      list: [
        {
          Image: require("../../assets/404.jpg"),
          ComponentName: "Seung shin",
          Quantity: "55",
        },
        {
          Image: require("../../assets/404.jpg"),
          ComponentName: "Seung shin",
          Quantity: "55",
        },
      ],
    };
  },
  mounted() {
    this.ComponentsData = {
      legend: [],
      dataX: [
        "Alabama",
        "Arizona",
        "Colorado",
        "Delaware",
        "Georgia",
        "Idaho",
        "Iowa",
        "Maine",
        "Nevada",
        "Ohio",
      ],
      yAxis: [{ name: "" }],
      dataY0: [100, 10, 20, 35, 66, 45, 15, 78, 20, 55],
    };
    this.MonthsData = {
      legend: [],
      dataX: [
        "January 2022",
        "February 2022",
        "March 2022",
        "April 2022",
        "May 2022",
        "June 2022",
        "July 2022",
        "August 2022",
        "September 2022",
      ],
      yAxis: [{ name: "11" }],
      dataY0: [50, 20, 30, 12, 18, 49, 36, 24, 15],
    };
  },
  methods: {
    diaLogFun() {
      this.dialogVisible = true;
    },
    handleClose() {},
  },
};
</script>

<style lang="scss" scoped>
$Maincolor: #76b0e3;
$BGcolor: #b1d6f7;
$EmailColoe: #409eff;
$borderColor: #283240;
.statis {
  height: 100%;
  padding: 20px 10px 20px 10px;
  border: 1px solid $borderColor;
  :deep {
    .imgs {
      width: 60px;
      height: auto;
    }
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
  .staCon {
  }
  .collCls {
    .collItn {
      width: 100%;
      display: flex;
      overflow: hidden;
      align-items: center;
      justify-content: center;
    }
    :deep {
      .el-collapse-item__header {
        font-size: 22px;
      }
      .el-collapse-item__wrap {
      }
      .el-collapse-item__content {
      }
    }
  }
}
</style>