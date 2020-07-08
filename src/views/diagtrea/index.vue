<template>
  <div class="diagtrea">
    <el-card>
      <!-- 表单区域 -->
      <el-header>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="月份">
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
            <el-button type="primary" @click.native="loadCaseData">{{$t('query')}}</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="mainClass">
        <el-table
          :data="caseBodyData"
          row-class-name="row"
          cell-class-name="column"
          v-loading="loading"
          border
          stripe
          align="left"
          style="width: 99.9%;height:100%;overflow:hidden;"
          :header-cell-style="{background:'#FAFAFA',color:'#606266'}"
        >
          <span v-for="(item1,index1) in caseHeadData" :key="index1">
            <el-table-column v-if="item1!='月份'" :prop="item1" :label="item1">
              <template slot-scope="scope">{{scope.row[item1]}}</template>
            </el-table-column>
            <el-table-column
              v-else
              :prop="item1"
              :width="'120px'"
              fixed="left"
              align="center"
              :label="item1"
            >
              <template slot-scope="scope">{{scope.row[item1]}}</template>
            </el-table-column>
          </span>
        </el-table>
      </el-main>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      caseHeadData: [],
      caseBodyData: [],
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      months: []
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
      _this.loadCaseData();
    },
    //获取病例信息
    loadCaseData: function() {
      var _this = this;
      _this.caseHeadData = [];
      _this.caseBodyData = [];
      _this.loading = true;
      console.log("月份数据为",_this.months)
      
      _this.$store
        .dispatch("bi/getZenLiaoCpayments", {
          end: _this.months[1]+'-31',
          start: _this.months[0]+'-01'
        })
        .then(res => {
          _this.loading = false;
          _this.caseHeadData = res.header;
          _this.caseBodyData = res.tbody;
        }).catch(err => {
          _this.$message({
            message: "数据加载失败，请稍后重试",
            type: "error"
          });
          _this.loading = false;
        });
    }
  }
};
</script> 
<style lang="scss" scoped>
</style>