# 日志

## 20260401 log

***搭建环境   node.js、npm、nvm、Trae、element-plus***



- 由于之前下载过其他版本的node.js，故本次需重新安装要求版本的node.js。

- 需要卸载原先的版本，再安装nvm进行版本管理

  ```
  //查看已有版本：
  nvm list
  //安装
  nvm install 19.xx
  //切换
  nvm use 19
  ```


- 使用trae里的solo功能下载element-plus，观察发现ai修改了main.js和app.vue两个模块的内容，引用并挂载了ElementPlus组件，同时创建了按钮以供测试

  ```
  引入element-plus
  ```




## 20260407 log

***引入Router路由*、配置路由、 创建后台路由实例**

***layout布局***



- 新拉一个终端 安装vue-router

  ```
  npm install vue-router@4.6.4
  ```


- 在src文件下新建文件夹router以及文件index.js

    内容包括：引入创建方法、路由模式（histoty模式）

-  配置路由并创建后台路由实例   

  1. 先配置路由规则：即一个数组，里面每个{}都是一条路由--包括这个路由的**地址path**（自己定义url路径名字）,**渲染的组件component**和**嵌套的子路由children[]**（子路由路径不加/）
  2. 再创建实例：传入两个核心配置--路由模式history和路由规则数组routes（即刚刚配置的）
  3. 导出路由实例

- 在component文件夹里创建后台根组件BackendLayout.vue

  ​     即刚刚渲染在后台顶级路由的组件BackendLayout

  ​

- 去Element Plus官网选择合适的layout布局代码粘贴到BackendLayout.vue组件

- 设置css样式（资源），并下载**sass依赖**（加强版CSS），把backend-layout设置为全屏高度

    ```
    npm i sass@1.97.2
    ```

- 分别布局菜单和导航区域组件

- 新建文件夹views(放页面文件)，写dashboard.vue组件并配置该子路由

    ​

    ##### **疑难杂症**：


- 删除helloworld后页面报错显示找不到helloworld文件？  

  更改代码后记得ctrl+s保存 

- router下错位置？

  记得在项目package.json（存放核心配置文件）所在的目录下执行命令

  ```
  cd xx  //进入下一级目录
  ```


- 报错不认识@符？

  方法1.使用相对路径 ..（比较麻烦，要一级一级找）

  方法2.到vite.config.js文件里引入resolve并定义@符为src的别名

  - alias = 别名、快捷方式


  - __dirname表示当前根目录  


  - resolve(__dirname, 'src'),表示把vite.config所在的根目录与src拼接起来，这样就得到了src的绝对路径D:/GitHub/mental-health-assistant/code/ai-vue/src