<template lang="html">
  <div class="search_user eqcalc">
    <h3 class="title">用户查询</h3>
    <div class="search_wrap">
      <img src="../assets/search_user.png" alt="search_user" />
      <div class="search_div">
      <el-select v-model="queryType" placeholder="请选择" class="search_type" @change="queryTypeChanged">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      <el-autocomplete
        class="search_input"
        v-model.trim="searchText"
        :fetch-suggestions="querySearch"
        :placeholder="queryPlaceholder"
        suffix-icon="el-icon-search"
        @select="handleSelect"
        >
      </el-autocomplete>
      </div>
      <p class="latest_add">
        最近添加： 
        <a href="javascript:;" v-for="item in userLastAdd" :key="item" @click="handleClickLastAdd(item)">
          {{item}}
        </a>
        <span v-if="!userLastAdd.length">
          无
        </span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'HeartSearchUser',
  data: function() {
    return {
      searchText: '',
      userphoneINlocalstorage: [],
      userLastAdd: [],
      queryType: 'userPhone',
      queryPlaceholder: '请输入手机号码',
      options: [
        {
          value: 'userPhone',
          label: '按手机'
        },
        {
          value: 'sn',
          label: '按电池SN'
        },
        {
          value: 'scooterSN',
          label: '按中控SN'
        }
      ]
    };
  },
  computed: {
    ...mapState(['agent', 'modalStore'])
  },
  watch: {
    // deep watcher
    'modalStore.needShop': function(val) {
      if (!val) {
        // this.fetchData();
        // this.fetchLastAdd();
      }
    },
    searchText: _.debounce(function() {
      this.fetchData();
    }, 1520)
  },
  components: {},
  methods: {
    fetchData: function() {
      var vueThis = this;
      var obj = {};
      obj[vueThis.queryType] = vueThis.searchText;
      var sendData = {
        pageNum: 1,
        pageSize: 10,
        advancedParam: JSON.stringify(obj)
      };
      // console.log(window.localStorage.searchphone); //undefined,''--->[]
      //用戶列表(currentGroupType //1-可退(綫上) 2-不可退(綫下))
      vueThis.$rqs(
        vueThis.$yApi.userList,
        function(objRps) {
          // console.log(objRps);
          //有結果返回
          if (objRps.result.total) {
            //輸入歷史列表存貯到localstorage
            var searchphone = JSON.parse(
              window.localStorage.searchphone || '[]'
            );

            var found = searchphone.findIndex(function(v) {
              return '' + v.value === '' + vueThis.searchText;
            });
            // console.log(found); //-1
            //去重，最多10條
            if (found === -1) {
              var searchphoneLen = searchphone.unshift({
                value: vueThis.searchText
              });
              if (searchphoneLen > 10) {
                searchphone.length = 10;
              }
              var strsearchphone = JSON.stringify(searchphone);
              window.localStorage.setItem('searchphone', strsearchphone);
            }

            //跳轉頁面
            var groupcode = objRps.result.list[0].groupCode;
            var type = +objRps.result.list[0].currentGroupType || 1; //默認 1-可退(綫上)
            var phone = objRps.result.list[0].phone;
            var pn = 1;
            vueThis.$router.push({
              path: '/user/' + groupcode + '/' + type + '/' + pn,
              query: {
                userPhone: phone
              }
            });
          } else {
            vueThis.$message({
              showClose: true,
              message: '该用户不存在，请检查搜索条件'
            });
          }
        },
        {
          objSendData: sendData
        }
      );
    },
    fetchLastAdd: function() {
      var vueThis = this;
      vueThis.$rqs(vueThis.$yApi.userLastAdd, function(objRps) {
        if (objRps.result.list.length > 2) {
          objRps.result.list.length === 2;
        }
        vueThis.userLastAdd = objRps.result.list;
      });
    },
    querySearch(queryString, cb) {
      var userphoneINlocalstorage = this.userphoneINlocalstorage;
      var results = queryString
        ? userphoneINlocalstorage.filter(this.createFilter(queryString))
        : userphoneINlocalstorage;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      var searchphone = JSON.parse(window.localStorage.searchphone || '[]');
      return searchphone;
    },
    handleSelect(item) {
      _.logErr(item);
    },
    queryTypeChanged(){
      if(this.queryType === 'phone'){
        this.queryPlaceholder = '请输入手机号码';
      }
      else if(this.queryType === 'batterySN'){
        this.queryPlaceholder = '请输入电池编码';
      }
      else if(this.queryType === 'scooterSN'){
        this.queryPlaceholder = '请输入中控编码';
      }
    },
    handleClickLastAdd: function(item) {
      // console.log(item);
      this.fetchData(item);
    }
  },
  created: function() {
    this.fetchLastAdd();
  },
  mounted: function() {
    this.userphoneINlocalstorage = this.loadAll();
  }
};
</script>
<style lang="css">
.search_user {
  background: #fff;
}
.latest_add a {
  margin-right: 16px;
}
.search_wrap {
  width: 455px;
  display: block;
  margin: 0 auto;
  text-align: center;
  margin-top: calc(50vh - 71px - 50px - 144px);
  position: relative;
}

.search_div{
  width: 455px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
}

.search_type{
  width: 120px;
  display: inline-block;
}


.search_input {
  margin-left: 5px;
  width: 330px;
  display: inline-block;
}
</style>