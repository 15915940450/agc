# agc

> A Vue.js project

* spa: index.html
* main: src/main.js (import Vue,router,store,EUI,vue-awesome,App)
* App: App.vue (contain router-view... LayoutTopBar.vue,LayoutNavMaster.vue,LayoutLogin.vue)
* router-view: (contain HeartJoy,HeartGroup,HeartUser,HeartDeposit,HeartEVs,HeartEVamap,HeartSysSetting...extra HelloWorld and AjaxTest just for test)
* api: some private setting(rqs,y_api接口列表)
* LayoutLogin: make $rqs to $yApi.userLogin, while success set some item in localStorage(see all in y_api.js)
* HeartJoy: the home page. make $rqs to $yApi.accountBaseInfo(always add param phone).
* BaseStatus.vue (Status...)
* DemoModal.vue and DemoTable.vue is used frequently.


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

* (Desert) Color Scheme
* Package Control
* SublimeLinter
* SublimeLinter-eslint
* Vue Syntax Hightlight
* GitGutter
* Emmet
* ColorPicker
* ESlint-Formatter


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
