<template lang="html">
  <div class="component_deposit">
    <el-row :gutter="10">

      <!-- 押金 -->
      <el-col :span="6">
        <div class="im_card">
          <el-row>
            <el-col :span="10">
              <div class="im_card-icon">
                押金
              </div>
            </el-col>
            <el-col :span="14">
              <h3 class="im_card-title">
                我的押金(元)
                <a href="javascript:;" class="im_card-top_up">充值</a>
              </h3>
              <p class="im_card-value">
                <icon name="eye-slash" scale="1.3"></icon>
                7988
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 可退押金 -->
      <el-col :span="6">
        <div class="im_card">
          <el-row>
            <el-col :span="10">
              <div class="im_card-icon">
                可退押金
              </div>
            </el-col>
            <el-col :span="14">
              <h3 class="im_card-title">
                可退押金(元)
                <a href="javascript:;" class="im_card-top_up">退款</a>
              </h3>
              <p class="im_card-value">
                <icon name="eye-slash" scale="1.3"></icon>
                90
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <!-- 可用电池数(个) -->
      <el-col :span="6">
        <div class="im_card">
          <el-row>
            <el-col :span="10">
              <div class="im_card-icon">
                可用电池数
              </div>
            </el-col>
            <el-col :span="14">
              <h3 class="im_card-title">
                可用电池数(个)
              </h3>
              <p class="im_card-value">
                22988
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 已用电池数(个) -->
      <el-col :span="6">
        <div class="im_card">
          <el-row>
            <el-col :span="10">
              <div class="im_card-icon">
              已用电池数
              </div>
            </el-col>
            <el-col :span="14">
              <h3 class="im_card-title">
                已用电池数(个)
              </h3>
              <p class="im_card-value">
                3000
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name:'CDeposit'
};
</script>

<style lang="css" scoped>
.im_card{
  background: #FFF;
  font-size: 12px;
  max-height: 100px;
  height: 100px;
  padding: 20px;
  border-radius: 5px;
  box-sizing:border-box;
}
.im_card-title{
  margin: 0;
  font-weight: normal;
  text-align: right;
}
.im_card-value{
  text-align: right;
  font-size: 30px;
  color: #333;
  margin: 0;
  margin-top:10px;
}
.im_card-top_up{
  margin-left: 10px;
}
.im_card-icon{
  width:60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-radius: 100px;
  background: red;
  box-shadow:4px 8px 20px rgba(102,255,204,1);
  background: #66FFCC;
  background: linear-gradient(-10deg, #00CC66, #66FFCC);
  color: #FFF;
}
</style>
