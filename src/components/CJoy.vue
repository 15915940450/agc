<template lang="html">
  <div class="component_joy">

    <el-row class="im_joy-wrap">
      <el-col :span="16">
        <p class="im_joy">
          <img class="im_img" src="" width="40" height="40" />
          <span>harry，E换电祝您开心每一天！</span>
        </p>
      </el-col>
      <el-col :span="8">
        <p class="im_key">我的押金</p>
        <p class="im_value">2,229.00</p>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name:'CJoy'
};
</script>

<style lang="css" scoped>
.component_joy{
}
.im_joy-wrap{
  padding: 20px;
  background: #FFF;
}
.im_joy{
  height: 40px;
  line-height: 40px;
  margin: 0;
  padding: 0;
}
.im_joy img{
  vertical-align: middle;
  border-radius: 90px;
}
.im_joy span{
  vertical-align: middle;
}
.im_key{
  margin: 0;
  text-align: right;
}
.im_value{
  text-align: right;
  margin: 0;
  font-size: 20px;
  color: #FF3333;
  font-weight: 500;
}
</style>
