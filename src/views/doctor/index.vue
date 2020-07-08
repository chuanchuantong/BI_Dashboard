<template>
  <div class="sumClass">
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
          <el-form-item label="角色">
            <el-select v-model="roleid" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.rolename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch v-model="enabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="loadCaseData">{{$t('query')}}</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <!-- table区域 -->
      <el-main>
        <el-table
          :data="tbodyData"
          row-class-name="row"
          cell-class-name="column"
          v-loading="loading"
          border
          stripe
          align="center"
          style="width: 99.9%;height:100%;overflow:hidden;"
        >
          <el-table-column label="月份" prop="月份" align="center" fixed="left"></el-table-column>
          <el-table-column v-for="(headInfo,index) in headData" :key="index" :label="headInfo">
            <el-table-column label="化验数量">
              <template slot-scope="scope">{{scope.row[headInfo+'_化验数量']|handNumber}}</template>
            </el-table-column>
            <el-table-column label="化验金额">
              <template slot-scope="scope">{{scope.row[headInfo+'_化验金额']|handMoney}}</template>
            </el-table-column>
            <el-table-column label="诊疗收入">
              <template slot-scope="scope">{{scope.row[headInfo+'_诊疗收入']|handMoney}}</template>
            </el-table-column>
            <el-table-column label="个人化验占比" width="110px">
              <template slot-scope="scope">{{scope.row[headInfo+'_个人化验占比']|handBiLi}}</template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-main>
    </el-card>
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
      headData: [],
      tbodyData: [],
      enabled: true,
      roleid: null,
      options: []
    };
  },
  created() {
    var _this = this;
    _this.questRoleList();
    _this.handCurrentDateTime();
  },
  filters: {
    handNumber(value) {
      if (value != null && value != "" && value != undefined) {
        return value;
      } else {
        return "0";
      }
    },
    handMoney(value) {
      if (value != null && value != "" && value != undefined) {
        return value;
      } else {
        return "0.00";
      }
    },
    handBiLi(value) {
      if (value != null && value != "" && value != undefined) {
        return value;
      } else {
        return "0.00%";
      }
    }
  },
  methods: {
    questRoleList() {
      var _this = this;
      _this.options = [];
      _this.$store.dispatch("user/getRoleList").then(res => {
        console.log("请求的结果数据为", res);
        _this.options = res;
      });
    },
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
    loadCaseData() {
      var _this = this;
      _this.tbodyData = [];
      _this.headData = [];
      _this.loading = true;
      _this.$store
        .dispatch("bi/getDoctorTest", {
          end: _this.months[1] + "-31",
          start: _this.months[0] + "-01",
          userid: -1,
          userstatus: _this.enabled ? 0 : 1,
          roleid: _this.roleid == null ? -1 : _this.roleid
        })
        .then(res => {
          _this.loading = false;
          _this.headData = res.header;
          _this.tbodyData = res.tbody;
        })
        .catch(err => {
          if (err.hasOwnProperty("code")) {
            _this.tbodyData = [];
            _this.headData = [];
          } else {
            _this.$message({
              message: "数据加载失败，请稍后重试",
              type: "error"
            });
          }

          _this.loading = false;
        });
    }
  }
};
</script>
