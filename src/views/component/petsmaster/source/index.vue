<template>
  <div>
    <!-- 表单区域 -->
    <el-header>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="统计周期">
          <el-date-picker
            v-model="months"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            value-format="yyyy-MM"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="loadSourceData">{{$t('query')}}</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!-- table区域 -->
    <el-main>
      <div id="echartssource" class="chart" style="height:600px;"></div>
    </el-main>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chart: null,
      headData: [],
      dataList: [],
      months: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  created() {
    var _this = this;
    _this.handCurrentDateTime();
  },
  methods: {
    handCurrentDateTime() {
      var _this = this;
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = currentDate.getMonth() + 1;
      currentDate.setMonth(currentDate.getMonth() - 3);
      var startMonth = currentDate.getMonth() + 1;
      var newStartMonth = startMonth < 10 ? "0" + startMonth : startMonth;
      var newEndMonth = month < 10 ? "0" + month : month;
      var dateStartFormat = `${year}-${newStartMonth}`;
      var dateEndFormat = `${year}-${newEndMonth}`;
      _this.months.push(dateStartFormat);
      _this.months.push(dateEndFormat);
      _this.loadSourceData();
    },
    //加载年龄数据
    loadSourceData() {
      var _this = this;
      _this.headData = [];
      _this.dataList = [];
      _this.$store
        .dispatch("bi/getCustomerSource", {
          start: _this.months[0] + "-01",
          end: _this.months[1] + "-31"
        })
        .then(res => {
          for (let t = 0; t < res.length; t++) {
            const element = res[t];
            _this.headData.push(element.Pname);
            _this.dataList.push({
              value: element.PCount,
              name: element.Pname,
              percentNum: element.PercentNum
            });
          }
          // console.log("请求客户来源数据结果为", res);
          _this.$nextTick(function() {
            _this.initECharts();
          });
        })
        .catch(err => {
          if (err.hasOwnProperty("code")) {
            _this.headData = [];
            _this.dataList = [];
          } else {
            _this.$message({
              message: "数据加载失败，请稍后重试",
              type: "error"
            });
          }
          _this.loading = false;
        });
    },
    initECharts() {
      var _this = this;
      _this.chart = echarts.init(document.getElementById("echartssource"));
      _this.chart.setOption({
        color: ["#67E0E3"],
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true }
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            return (
              params[0].name +
              "<br/>数量：" +
              params[0].value +
              "<br/>" +
              "占比：" +
              params[0].data["percentNum"] +
              "<br/>"
            );
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: _this.headData,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#666666",
                formatter: function(params) {
                  return params.value + "（" + params.data.percentNum + "）";
                }
              }
            },
            data: _this.dataList
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
</style>