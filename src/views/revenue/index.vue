<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="营收合计" name="sum">
          <sum v-if="currentName=='sum'" />
        </el-tab-pane>
        <el-tab-pane label="洗美明细" name="washing">
          <washing v-if="currentName=='washing'" />
        </el-tab-pane>
        <el-tab-pane label="诊疗明细" name="diagnosis">
          <diagnosis v-if="currentName=='diagnosis'" />
        </el-tab-pane>
        <el-tab-pane label="商品明细" name="sale">
          <sale v-if="currentName=='sale'" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import sum from "../component/revenue/sum";
import washing from "../component/revenue/washing";
import sale from "../component/revenue/sale";
import diagnosis from "../component/revenue/diagnosis";
export default {
  components: {
    sum,
    washing,
    sale,
    diagnosis
  },
  data() {
    return {
      activeName: "sum",
      currentName:'sum'
    };
  },
  methods:{
    handleClick(tab, event){
      var _this=this;
      _this.currentName=tab.paneName;
    }
  }
};
</script>

<style scoped>
</style>