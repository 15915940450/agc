<template lang="html">
  <div class="component_sys">
    <h3 class="title">修改密码</h3>
    <div class="form_wrap">
      <el-form size="small" label-position="top" label-width="80px" :model="imPW" class="form_pw">

        <el-form-item label="旧密码">
          <el-input :type="typeOld" placeholder="请输入您的旧密码" v-model="imPW.oldPassword">
            <i
              class="el-icon-view el-input__icon"
              slot="suffix"
              @mousedown="handleShowPW('typeOld')" @mouseup="handleHidePW('typeOld')">
            </i>
          </el-input>
        </el-form-item>

        <el-form-item label="新密码">
          <el-input :type="typeNew" placeholder="请输入新密码" v-model="imPW.newPassword">
            <i
              class="el-icon-view el-input__icon"
              slot="suffix"
              @mousedown="handleShowPW('typeNew')" @mouseup="handleHidePW('typeNew')">
            </i>
          </el-input>
        </el-form-item>

        <el-form-item label="再输一次新密码">
          <el-input :type="typeCheck" placeholder="请输入新密码" v-model="imPW.newPasswordCheck">
            <i
              class="el-icon-view el-input__icon"
              slot="suffix"
              @mousedown="handleShowPW('typeCheck')" @mouseup="handleHidePW('typeCheck')">
            </i>
          </el-input>
        </el-form-item>


        <el-form-item class="btn_wrap">
            <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'CSys',
  data:function(){
    return ({
      imPW: {
        oldPassword: '',
        newPassword: '',
        newPasswordCheck: ''
      },
      typeOld:'password',
      typeNew:'password',
      typeCheck:'password'
    });
  },
  methods:{
    handleShowPW:function(imKey){
      // console.log(ev.target.parentNode.parentNode.previousSibling.previousSibling);
      this[imKey]='text';
    },
    handleHidePW:function(imKey){
      this[imKey]='password';
    }
  }
};
</script>

<style lang="css" scoped>
  .component_sys{
    background: #FFF;
  }
  .form_wrap{
    width: 390px;
    padding-left: 50px;
    padding-top: 10px;
    padding-bottom: 30px;
  }
  .btn_wrap{
    margin-top: 50px;
  }

</style>
