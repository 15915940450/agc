import Vue from 'vue';
import Router from 'vue-router';
import VueStore from '../store';

import Agent from '@/components/Agent';
import General from '@/components/General';
import HeartJoy from '@/components/HeartJoy';
import HeartGroup from '@/components/HeartGroup';
//add by sinclair for V2200
//remark 菜单用inclule判断 所有此处组件名改为HeartCreateGroup
import HeartCreateGroup from '@/components/HeartGroupCreate';
import HeartGroupSet from '@/components/HeartGroupSet';
//end
import HeartUser from '@/components/HeartUser';
import HeartSearchUser from '@/components/HeartSearchUser';
import HeartUserChangePhone from '@/components/HeartUserChangePhone';
import HeartUserChangePhoneHistory from '@/components/HeartUserChangePhoneHistory';
import HeartUserCombo from '@/components/HeartUserCombo';
import HeartDeposit from '@/components/HeartDeposit';
import HeartCombo from '@/components/HeartCombo';
import HeartComboHistory from '@/components/HeartComboHistory';
import HeartBigAmount from '@/components/HeartBigAmount';
import HeartBigAmountHistory from '@/components/HeartBigAmountHistory';
import HeartBigAmountDetail from '@/components/HeartBigAmountDetail';
import HeartXls from '@/components/HeartXls';
import HeartEVs from '@/components/HeartEVs';
import HeartEVamap from '@/components/HeartEVamap';
import HeartEVallGeographic from '@/components/HeartEVallGeographic';
import HeartSysSetting from '@/components/HeartSysSetting';
import HeartStores from '@/components/HeartStores';
import HeartSubAgent from '@/components/HeartSubAgent';
import HeartAgentAccess from '@/components/HeartAgentAccess';
import MapTrack from '@/components/MapTrack';
import MapGeographic from '@/components/MapGeographic';


import HelloWorld from '@/components/HelloWorld';
import AjaxTest from '@/components/AjaxTest';

Vue.use(Router);

const router = new Router({
  routes: [{
    //门店相关导航
    path: '/',
    // You could also have named views at tho top
    component: Agent,
    children: [{
      path: '/group', //群组
      name: 'HeartGroup',
      component: HeartGroup
    },
    //add by sinclair for V2200
    {
      path: '/groupcreate', //群组创建
      name: 'HeartCreateGroup',
      component: HeartCreateGroup
    },{
      path: '/groupset', //群组设置
      name: 'HeartGroupSet',
      component: HeartGroupSet
    },
    //end
    {
      path: '/searchuser', //群组
      name: 'HeartSearchUser',
      component: HeartSearchUser
    },
    {
      path: '/user/:groupcode/:type/:pn', //用户,type:1(线上交押金),2(线下交押金)
      name: 'HeartUser',
      component: HeartUser
    },
    {
      path: '/usercombo/:userphone/:pn', //userphone
      name: 'HeartUserCombo',
      component: HeartUserCombo
    },
    {
      path: '/user/changephone',
      name: 'HeartUserChangePhone',
      component: HeartUserChangePhone
    },
    {
      path: '/user/changephonehistory/:pn',
      name: 'HeartUserChangePhoneHistory',
      component: HeartUserChangePhoneHistory
    },
    {
      path: '/deposit',
      name: 'HeartDeposit',
      component: HeartDeposit
    },
    {
      path: '/combo',
      name: 'HeartCombo',
      component: HeartCombo
    },
    {
      path: '/combo/history',
      name: 'HeartComboHistory',
      component: HeartComboHistory
    },
    {
      path: '/bigamount',
      name: 'HeartBigAmount',
      component: HeartBigAmount
    },
    {
      path: '/bigamount/history/:pn',
      name: 'HeartBigAmountHistory',
      component: HeartBigAmountHistory
    },
    {
      path: '/bigamount/:id',
      name: 'HeartBigAmountDetail',
      component: HeartBigAmountDetail
    },
    {
      path: '/xls',
      name: 'HeartXls',
      component: HeartXls
    },
    {
      path: 'evs/:pn', //中控
      name: 'HeartEVs',
      component: HeartEVs
    },
    {
      path: '/ev/:id', //轨迹与定位(sid)
      name: 'HeartEVamap',
      component: HeartEVamap,
      children: [{
        path: 'track',
        name: 'MapTrack',
        component: MapTrack
      },
      {
        path: 'point',
        name: 'MapGeographic',
        component: MapGeographic
      }
      ]
    },
    {
      path: '/evallgeographic', //系统管理
      name: 'HeartEVallGeographic',
      component: HeartEVallGeographic
    },

      // just for thilina
    {
      path: '/thilina',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ajax',
      name: 'AjaxTest',
      component: AjaxTest
    }
    ]
  },
  {
    //工作台相关导航
    path: '/general',
    component: General,
    children: [{
      path: '/general/joy',
      name: 'HeartJoy', //数据中心看板
      component: HeartJoy
    },
    {
      path: '/general/subAgent/:pn',
      name: 'HeartSubAgent',
      component: HeartSubAgent
    },
    {
      path: '/general/access/:agentId',
      name: 'HeartAgentAccess',
      component: HeartAgentAccess
    }, {
      path: '/general/stores/:pn',
      name: 'HeartStores',
      component: HeartStores
    },
    {
      path: '/general/sys', //系统管理
      name: 'HeartSysSetting',
      component: HeartSysSetting
    }
    ]
  }
  ]
});

//导航守卫
router.beforeEach((to, from, next) => {
  //首页判断有没有登录
  if (!window.localStorage.agentphone || !+window.localStorage.objrpsprotocol) {
    VueStore.commit('showLogin');
    next();
  } else {
    //门店管理相关的页面 判断下是否选择了门店
    if (to.path === '/') {
      if (window.localStorage.agenttype === 1) {
        next('/general/joy');
      } else {
        next('/searchuser');
      }
    } else if (to.path.indexOf('/general') === 0) {
      if (to.path === '/general') {
        next('/general/joy');
      } else {
        next();
      }
      document.title = '工作台';
    } else {
      if (!window.sessionStorage.headerid) {
        VueStore.commit('setNeedSetAgentId');
      }
      next();
      document.title = '门店管理';
    }
  }
});

export default router;
