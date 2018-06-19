# agc

> A Vue.js project

* spa: index.html
* main: src/main.js (import Vue,router,store,EUI,vue-awesome,App)
* App: App.vue (contain router-view... LayoutTopBar.vue,LayoutNavMaster.vue,LayoutLogin.vue)
* router-view: (contain HeartJoy,HeartGroup,HeartUser,HeartDeposit,HeartEVs,HeartEVamap,HeartSysSetting,HeartCombo,HeartComboHistory..THIS is the data where arrRouteName come from..extra HelloWorld and AjaxTest just for test)
* api: some private setting(rqs,y_api接口列表)
* LayoutLogin: make $rqs to $yApi.userLogin, while success set some item in localStorage(see all in y_api.js)
* HeartJoy: the home page. make $rqs to $yApi.accountBaseInfo(always add param phone).
* BaseStatus.vue (Status...)
* DemoModal.vue and DemoTable.vue is used frequently.
* current version is V12.0.0(README.md,package.json,gulpfile.js)


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
```
import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by) 
```

* (lightvice) Color Scheme


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
