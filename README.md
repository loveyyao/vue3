# y-app

## 项目简介
>基于`vue3`及`element-plus`的后台管理demo。权限控制，路由控制，`vuex`全局数据管理等。

### 预览
![首页](https://github.com/loveyyao/vue3/blob/main/src/assets/img/home.jpg)
![登录](https://github.com/loveyyao/vue3/blob/main/src/assets/img/login.jpg)

### 项目目录
```
|-- y-app
    |-- .browserslistrc
    |-- .eslintrc.js
    |-- .gitignore
    |-- auto-imports.d.ts
    |-- babel.config.js
    |-- components.d.ts
    |-- package.json
    |-- README.md
    |-- tsconfig.json
    |-- vue.config.js
    |-- yarn.lock
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- src
        |-- App.vue
        |-- main.ts
        |-- permission.ts               -->router  permission
        |-- shims-vue.d.ts
        |-- api                         -->API接口
        |   |-- login.ts
        |-- assets
        |   |-- avatar.jpg
        |   |-- logo.png
        |   |-- other_avatar.png
        |   |-- banner
        |   |   |-- 1.jpg
        |   |-- img
        |   |   |-- 404.jpg
        |   |   |-- background.jpg
        |   |   |-- home.jpg
        |   |   |-- login.jpg
        |   |-- style
        |       |-- global.scss
        |       |-- reset.css
        |-- components
        |   |-- HelloWorld.vue          -->demo组件
        |   |-- globalAsideMenu         -->侧边栏
        |   |   |-- index.vue
        |   |-- globalHeader            -->头部导航
        |   |   |-- index.vue
        |   |-- menuItem                -->侧边栏菜单
        |   |   |-- index.vue
        |   |-- viewTags                -->快捷切换历史菜单
        |   |   |-- index.vue
        |   |-- yCountTo                -->数字变化组件
        |   |   |-- index.vue
        |   |-- yProgress               -->进度条组件
        |       |-- index.vue
        |       |-- README.md
        |-- layouts                     -->全局RouterView
        |   |-- GlobalLayout.vue        -->全局RouterView
        |   |-- GlobalRouterView.vue    -->全局RouterView
        |   |-- UserLayout.vue          -->登录
        |-- locals                      -->国际化
        |   |-- index.ts
        |   |-- lang
        |       |-- en.ts
        |       |-- zh.ts
        |-- plugins                     -->全局插件注册
        |   |-- echarts.ts
        |   |-- index.ts
        |-- router                      -->Router
        |   |-- index.ts
        |   |-- routes.ts
        |-- store                       -->vuex store
        |   |-- index.ts
        |   |-- modules
        |       |-- app.ts              -->app状态
        |       |-- user.ts             -->用户信息
        |-- utils
        |   |-- request.ts              -->请求封装
        |   |-- storage-vars.ts         -->storage key
        |   |-- utils.ts                -->工具类
        |-- views
            |-- about
            |   |-- index.vue
            |-- error-page
            |   |-- index.vue
            |-- home
            |   |-- index.vue
            |-- login
            |   |-- index.vue
            |-- table
                |-- baseTable.vue
```

### 说明
>登录及用户信息接口使用`setTimeout`写死数据来模拟，使用`admin`账号（密码随意）登录是管理员权限，随便输入的账号登录属于`测试用户`，权限
> 只有`['home', 'about']`

### 下载
```
git clone https://github.com/loveyyao/vue3.git
```
### 依赖按照
```
npm install
```
### 运行
```
npm run serve
```
