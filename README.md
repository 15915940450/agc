# agc

> A Vue.js project

## 常用语句

* import {urls,ajaxs} from '../api/urls.js'; //引入api(ajax)
* computed:{
  ...mapState(['modalStore'])
},
var vueThis=this;
vueThis.loading=true;
ajaxs.imPostJson(urls.groupCreate,sendData,function(objRps){
  console.log(objRps);
  if(objRps.code===1000){

  }
});


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
