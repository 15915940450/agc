# agc

> A Vue.js project

* spa: index.html
* main: src/main.js (import Vue,router,store,EUI,vue-awesome,App)
* App: App.vue (contain router-view... LayoutTopBar.vue,LayoutNavMaster.vue,LayoutLogin.vue)
* router-view: (contain HeartJoy,HeartGroup)

## 常用语句

```
//引入api(ajax)
import {urls,ajaxs} from '../api/urls.js';

//modal
computed:{
  ...mapState(['modalStore'])
},

//ajaxs.im...
var vueThis=this;
vueThis.loading=true;
var sendData={
};
ajaxs.imPostJson(urls.baseInfo,sendData,function(objRps){
  console.log(objRps);
  if(objRps.code===1000){

  }else{
    vueThis.$notify.error({
      title:'提示',
      message:objRps.msg,
      offset:50,
      duration:5000  //0
    });
  }
});
```

## vim

* vandle
* nerdtree
* ctrlp
* nerdcommenter
* emmet
* syntastic
* bufexplorer
* maximizer
* easygrep
* vue

## sublime editor

* (Aglia) Theme
* Package Control
* SublimeLinter
* SublimeLinter-eslint
* Vue Syntax Hightlight


## atom editor

* packages: atom-vue, ayu-atom-syntax, busy-signal, intentions, linter, linter-eslint, linter-htmlhint, linter-ui-default.
* config.cson
* github.cson
* keymap.cson
* snippets.cson
* styles.less



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
