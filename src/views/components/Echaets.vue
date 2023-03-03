<template>
  <div :style="{ height: height, width: width }"></div>
</template>

<script>
// import resize from "@/utils/mixins/resize"

export default {
  name: "EChartBarLine",
  props: {
    lineColor: {
      type: String,
      default: "#F8B551",
    },
    width: {
      type: String,
      default: "1000px",
    },
    height: {
      type: String,
      default: "400px",
    },
    EChartData: {
      required: false,
    },
  },
  // mixins: [resize],
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    EChartData: {
      handler(val) {
        if (!val) return;
        this.setOptions(val);
      },
    },
  },
  mounted() {
    
    let _self = this;
    this.$nextTick(() => {
      _self.initChat();
      // _self.chart.on("click", "series.bar", function (params) {
      //   let barData = { ...params.data, name: params.name };
      //   _self.$emit("barOnClick", barData);
      // });
    });
  },
  methods: {
    initChat() {
      this.chart = this.$echarts.init(this.$el);
      if (!this.EChartData) return;
      this.setOptions(this.EChartData);
    },
    setOptions({ legend, dataX, yAxis, dataY0, dataY1 }) {
      let _self = this;
      if (!_self.chart) return;
      _self.chart.setOption({
        grid: {
          containLabel: true,
          left: "6%",
          right: "3%",
          bottom: "12%",
          top: "21%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          selectedMode: false,
          orient: "horizontal",
          bottom: "-1%",
          data: legend,
        },
        xAxis: {
          type: "category",
          
          data: dataX,
        },
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            barWidth:40,
            type: "bar",
            smooth: false,
            showSymbol: true,
            showBackground: true,
            data: dataY0,
          }
        ],
      });
    },
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
};
</script>

<style scoped>
</style>
