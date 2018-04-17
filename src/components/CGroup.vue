<template lang="html">
  <div class="component_group">
    <h3 class="title">群组列表</h3>
    <div class="group-list">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="group_card">
            <h4 class="group_card-title">线上交押金</h4>
            <p>99个用户</p>
            <p>99个押金方案</p>
            <p>99种套餐方案</p>
            <p>可退押金</p>
            <div class="group_card-footer">
              <el-button type="primary" size="mini">设置</el-button>
              <el-button type="primary" size="mini">查看用户</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="group_card">
            <h4 class="group_card-title">线上交押金</h4>
            <p>99个用户</p>
            <p>99个押金方案</p>
            <p>99种套餐方案</p>
            <p>可退押金</p>
            <div class="group_card-footer">
              <el-button type="primary" size="mini">设置</el-button>
              <el-button type="primary" size="mini">查看用户</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <a href="javascript:;">
            <div class="group_card group_card-new">
              <p class="group_card-title"><i class="el-icon-plus"></i> 新建群组</p>
            </div>
          </a>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name:'CGroup'
};
</script>

<style lang="css" scoped>
.component_group{
  background: #FFF;
}
.group-list{
  padding:10px 20px;
}
.group_card{
  padding: 20px;
  box-shadow:2px 0px 6px rgba(204,204,204,0.21);
  height:180px;
  max-height: 180px;
  /* border: 1px solid black; */
}
.group_card-title{
  color: #333;
  font-size: 12px;
}
.group_card-new .group_card-title{
  display: block;
  height: 180px;
  line-height: 180px;
  text-align: center;
  font-size: 12px;
  color: #333;
  font-weight: bold;
}
.group_card p{
  font-size: 10px;
  margin: 5px 0;
}
.group_card-footer{
  text-align:center;
  margin-top: 20px;
}
.group_card-footer .el-button{
  margin:0 10px;
}
</style>
