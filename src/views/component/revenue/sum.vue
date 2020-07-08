<template>
  <div class="sumClass">
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
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="loadNumData">{{$t('query')}}</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!-- table区域 -->
    <el-main>
      <el-table
        :data="lableData"
        row-class-name="row"
        cell-class-name="column"
        v-loading="loading"
        border
        stripe
        align="center"
        style="width: 99.9%;height:100%;overflow:hidden;"
      >
        <el-table-column label="年月" prop="年月" align="center"></el-table-column>
        <el-table-column label="洗美">
          <el-table-column prop="洗美_01" label="收入（元）"></el-table-column>
          <el-table-column prop="洗美_02" label="占比"></el-table-column>
          <el-table-column prop="洗美_03" label="环比"></el-table-column>
          <el-table-column prop="洗美_04" label="同比"></el-table-column>
        </el-table-column>
        <el-table-column label="诊疗">
          <el-table-column prop="诊疗_01" label="收入（元）"></el-table-column>
          <el-table-column prop="诊疗_02" label="占比"></el-table-column>
          <el-table-column prop="诊疗_03" label="环比"></el-table-column>
          <el-table-column prop="诊疗_04" label="同比"></el-table-column>
        </el-table-column>
        <el-table-column label="商品销售">
          <el-table-column prop="消费_01" label="收入（元）"></el-table-column>
          <el-table-column prop="消费_02" label="占比"></el-table-column>
          <el-table-column prop="消费_03" label="环比"></el-table-column>
          <el-table-column prop="消费_04" label="同比"></el-table-column>
        </el-table-column>
        <el-table-column label="合计" prop="合计" align="center"></el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      months: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      loading: false,
      lableData: []
    };
  },
    created() {
    var _this = this;
    _this.handCurrentDateTime();
  },

  methods: {
    handCurrentDateTime(){
        var _this=this;
        var currentDate=new Date();
        var year=currentDate.getFullYear();
        var month=(currentDate.getMonth()+1);
        var newMonth=month<10?("0"+month):month;
        var dateFormat=`${year}-${newMonth}-01`;
        _this.months.push(dateFormat);
        _this.months.push(dateFormat);
        _this.loadNumData();
    },
    loadNumData() {
      var _this = this;
      _this.lableData = [];
      _this.loading = true;
      _this.$store
        .dispatch("bi/getRevenueExpend", {
          begin_date: _this.months[0],
          end_date: _this.months[1]
        })
        .then(res => {
          _this.loading = false;
          _this.lableData = res.tbody.splice(1, res.tbody.length - 1);
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
