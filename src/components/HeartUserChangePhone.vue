<template lang="html">
  <div>
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group' }">
          <small>群组管理</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <small>修改手机</small>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="im_snow">
      <div class="im_snow_title">
        <el-row>
          <el-col :span="6">
            <h3 class="title">修改手机号</h3>
          </el-col>
          <el-col :span="18">
            <div class="title_link">
              <a href="javascript:;">修改记录</a>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="im_form">
        <el-form :inline="true">
          <el-form-item label="旧手机号码:">
            <el-input placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="新手机号码:">
            <el-input placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="im_info">
        <el-card class="box-card">
          <div slot="header">
            <table width="100%" class="im_info_table">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{{twoUsers[0].id}}</td>
                  <td>ID</td>
                  <td>{{twoUsers[1].id}}</td>
                </tr>
                <!-- 手機號碼，所屬代理商，所在群組，錢包餘額，押金，套餐，免費天數，綁定中控，綁定電池 -->
                <tr>
                  <td>手机号码</td>
                  <td>{{twoUsers[0].phone}}</td>
                  <td>手机号码</td>
                  <td>{{twoUsers[1].phone}}</td>
                </tr>
                <tr>
                  <td>
                    所属代理商
                  </td>
                  <td>{{twoUsers[0].agentName}}</td>
                  <td>
                    <div class="hint_3">
                      <i class="el-icon-warning"></i>
                      <span>不能修改其他代理商的用户</span>
                    </div>
                    所属代理商
                  </td>
                  <td>{{twoUsers[1].agentName}}</td>
                </tr>
                <tr>
                  <td>所在群组</td>
                  <td>{{twoUsers[0].groupName}}</td>
                  <td>所在群组</td>
                  <td>{{twoUsers[1].groupName}}</td>
                </tr>
                <tr>
                  <td>钱包馀额</td>
                  <td>{{twoUsers[0].amount}}</td>
                  <td>钱包馀额</td>
                  <td>{{twoUsers[1].amount}}</td>
                </tr>
                <tr>
                  <td>
                    <div class="hint_1">
                      <i class="el-icon-warning"></i>
                      <span>綫上交押金的用户必须先退押金</span>
                    </div>
                    押金
                  </td>
                  <td>
                    【
                    {{twoUsers[0].depositDO.depositName}}
                    /
                    {{twoUsers[0].depositDO.amount}}
                    元/
                    {{twoUsers[0].depositDO.num}}
                    颗电池/
                    {{twoUsers[0].depositDO.type}}
                    】
                  </td>
                  <td>
                    <div class="hint_1">
                      <i class="el-icon-warning"></i>
                      <span>有押金沒有退還</span>
                    </div>
                    押金
                  </td>
                  <td>─</td>
                </tr>
                <tr>
                  <td>套餐</td>
                  <td>
                    <ul>
                      <li v-for="item in twoUsers[0].validPackage" :key="item.id">
                        【
                        {{item.name}}
                        /
                        {{item.type}}
                        /
                        {{item.price}}
                        元 /
                        {{item.times}}
                        次 /
                        {{item.duration}}
                        天】
                      </li>
                    </ul>
                  </td>
                  <td>套餐</td>
                  <td>
                    <ul>
                      <li v-for="item in twoUsers[1].validPackage" :key="item.id">
                        【
                        {{item.name}}
                        /
                        {{item.type}}
                        /
                        {{item.price}}
                        元 /
                        {{item.times}}
                        次 /
                        {{item.duration}}
                        天】
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>免费天数</td>
                  <td>{{twoUsers[0].freeDays}}</td>
                  <td>免费天数</td>
                  <td>{{twoUsers[1].freeDays}}</td>
                </tr>
                <tr>
                  <td>绑定中控</td>
                  <td>
                    <ul>
                      <li v-for="item in twoUsers[0].scootersList" :key="item.id">
                        {{item.sn}}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <div class="hint_1">
                      <i class="el-icon-warning"></i>
                      <span>有中控未解綁</span>
                    </div>
                    绑定中控
                  </td>
                  <td>
                    <ul>
                      <li v-for="item in twoUsers[1].scootersList" :key="item.id">
                        {{item.sn}}
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>绑定电池</td>
                  <td>
                    <ul>
                      <li v-for="item in twoUsers[0].batteriesList" :key="item.id">
                        {{item.sn}}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <div class="hint_3">
                      <el-tooltip effect="dark" content="Right Center 提示文字" placement="right">
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </div>
                    绑定电池
                  </td>
                  <td>
                    <ul>
                      <li v-for="item in twoUsers[1].batteriesList" :key="item.id">
                        {{item.sn}}
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="im_info_footer">
            <el-button :disabled="true" type="danger">修改</el-button>
          </div>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name:'HeartUserChangePhone',
  data:function(){
    return ({
      twoUsers:[
        {
          'id': 5970,   //id
          'amount': 0,   //钱包余额
          'phone': '12321211111', // 电话
          'groupCode': 11, // 群组code
          'groupName': '测试群组1', // 群组name
          'freeDays': '69', // 免费天数
          'agentId': 2, // 代理商id
          'agentName': 'chao', // 代理商name
          'depositDO': { //押金
            'id': 2582,
            'amount': 0.01, //价格
            'createTime': 1530674017000,
            'num': 2, //电池颗数
            'outTradeNo': 'ehd201807041112370000001284',
            'status': 1,
            'type': 1,  // 押金类型 2线下 1线上
            'userId': 4636,
            'discountId': 74,
            'outRefundNo': '',
            'groupCode': '',
            'depositCode': 49,
            'depositName': 'test-2颗电池' //押金名字
          },
          'validPackage': [ //有效套餐
            {
              'id': 1489,
              'name': '2个月免费骑',  //套餐名字
              'createTime': 1531369175000,
              'duration': 60,  //套餐时长
              'price': 0, //价格
              'status': 1,
              'times': 20000, //骑行次数
              'type': 2, // 套餐类型  0=月套餐 1=次套餐 2=免费套餐
              'originalPrice': 0,
              'code': 0,
              'groupCode': 2,
              'freeCode': 1,
              'remark': '',
              'agentPrice': ''
            },
            {
              'id': 354,
              'name': '换电套餐2',
              'createTime': 1527305062000,
              'duration': 30,
              'price': 58.01,
              'status': 1,
              'times': 30,
              'type': 0,
              'originalPrice': 58.01,
              'code': 64,
              'groupCode': 2,
              'freeCode': 0,
              'remark': '',
              'agentPrice': ''
            }
          ],
          'scootersList': [  //中控
            {
              'id': '61e1c747e7264fb392b966f80b8ff68b',
              'sid': '574C54DF6591',
              'owner': '13682680317',
              'sn': 'G6000000001', // sn
              'status': 1,
              'time': 1529027725000,
              'updtime': 1532656780000,
              'protime': 1528992000000,
              'userName': '',
              'soc': '',
              'location': '',
              'locationUpdateTime': '',
              'agentId': 0,
              'agentName': '',
              'voltage': 0,
              'agentPhone': '',
              'country': 'US',
              'conf': 'US',
              'fw': '',
              'hw': ''
            }
          ],
          'batteriesList': [ //电池
            {
              'id': 232,
              'bid': '100bbc07838a',
              'bindTime': 1530607147000,
              'sn': '2B1317BJ01210', //sn
              'batVersion': 'B1',
              'capacity': 2200,
              'cellVersion': 'MF1',
              'maker': 'WK',
              'proTime': 1510934400000,
              'scanTime': 1515805582000,
              'voltage': 600,
              'userName': '',
              'userPhone': '13682680317',
              'status': '已绑定'
            }
          ]
        },
        {
          'id': 5970,   //id
          'amount': 0,   //钱包余额
          'phone': '12321211111', // 电话
          'groupCode': 11, // 群组code
          'groupName': '测试群组1', // 群组name
          'freeDays': '─', // 免费天数
          'agentId': 2, // 代理商id
          'agentName': 'chao', // 代理商name
          'depositDO': { //押金
            'id': 2582,
            'amount': 0.01, //价格
            'createTime': 1530674017000,
            'num': 2, //电池颗数
            'outTradeNo': 'ehd201807041112370000001284',
            'status': 1,
            'type': 1,  // 押金类型 2线下 1线上
            'userId': 4636,
            'discountId': 74,
            'outRefundNo': '',
            'groupCode': '',
            'depositCode': 49,
            'depositName': 'test-2颗电池' //押金名字
          },
          'validPackage': [ //有效套餐
            {
              'id': 1489,
              'name': '2个月免费骑',  //套餐名字
              'createTime': 1531369175000,
              'duration': 60,  //套餐时长
              'price': 0, //价格
              'status': 1,
              'times': 20000, //骑行次数
              'type': 2, // 套餐类型  0=月套餐 1=次套餐 2=免费套餐
              'originalPrice': 0,
              'code': 0,
              'groupCode': 2,
              'freeCode': 1,
              'remark': '',
              'agentPrice': ''
            },
            {
              'id': 354,
              'name': '换电套餐2',
              'createTime': 1527305062000,
              'duration': 30,
              'price': 58.01,
              'status': 1,
              'times': 30,
              'type': 0,
              'originalPrice': 58.01,
              'code': 64,
              'groupCode': 2,
              'freeCode': 0,
              'remark': '',
              'agentPrice': ''
            }
          ],
          'scootersList': [  //中控
            {
              'id': '61e1c747e7264fb392b966f80b8ff68b',
              'sid': '574C54DF6591',
              'owner': '13682680317',
              'sn': 'G6000000001', // sn
              'status': 1,
              'time': 1529027725000,
              'updtime': 1532656780000,
              'protime': 1528992000000,
              'userName': '',
              'soc': '',
              'location': '',
              'locationUpdateTime': '',
              'agentId': 0,
              'agentName': '',
              'voltage': 0,
              'agentPhone': '',
              'country': 'US',
              'conf': 'US',
              'fw': '',
              'hw': ''
            }
          ],
          'batteriesList': [ //电池
            {
              'id': 232,
              'bid': '100bbc07838a',
              'bindTime': 1530607147000,
              'sn': '2B1317BJ01210', //sn
              'batVersion': 'B1',
              'capacity': 2200,
              'cellVersion': 'MF1',
              'maker': 'WK',
              'proTime': 1510934400000,
              'scanTime': 1515805582000,
              'voltage': 600,
              'userName': '',
              'userPhone': '13682680317',
              'status': '已绑定'
            }
          ]
        }
      ]
    });
  },
  created:function(){}
};
</script>

<style lang="css" scoped>
.im_snow_title{
  border-bottom:1px solid #F8F8FF;
}
.title_link{
  height:50px;
  line-height:50px;
  text-align:right;
  padding-right:15px;
}
.im_form{
  padding:50px 15px 20px;
}
.im_info{
  padding:0 15px;
  margin-bottom:20px;
}
.im_info_table tbody td{
  padding:8px 0;
  vertical-align:top;
  position:relative;
}
.im_info_table tbody td .hint_1{
  position:absolute;
  left:0;
  top:0;
  width:300px;
}
.im_info_table tbody td .hint_3{
  position:absolute;
  left:0;
  top:0;
}

/*表格1234列*/
.im_info_table tbody td:nth-child(1){
  color:#666;
  width:90px;
  max-width:90px;
  padding-left:20px;
}
.im_info_table tbody td:nth-child(2){
  border-right:1px solid #EEE;
}
.im_info_table tbody td:nth-child(3){
  color:#666;
  padding-left:40px;
  width:90px;
  max-width:90px;
}
.im_info_table tbody td:nth-child(4){
}
.im_info_table ul,.im_info_table li{
  margin:0;
  padding:0;
  list-style:none;
}
.im_info_footer{
  text-align:right;
}
</style>
