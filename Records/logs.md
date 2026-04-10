# 日志

## 20260401 log

##### **搭建环境   node.js、npm、nvm、Trae、element-plus**

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

##### **配置路由**

- 新拉一个终端 安装vue-router

  ```
  npm install vue-router@4.6.4
  ```


- 在src文件下新建文件夹router以及文件index.js

  内容包括：引入创建方法、路由模式（histoty模式）

- 配置路由并创建后台路由实例   

  1. 先配置路由规则：即一个数组，里面每个{}都是一条路由--包括这个路由的**地址path**（自己定义url路径名字）,**渲染的组件component**和**嵌套的子路由children[]**（子路由路径不加/）
  2. 再创建实例：传入两个核心配置--路由模式history和路由规则数组routes（即刚刚配置的）
  3. 导出路由实例

- 在component文件夹里创建后台组件BackendLayout.vue

  ​     即刚刚后台顶级路由要渲染的组件BackendLayout

##### layout布局

- 去Element Plus官网选择合适的layout布局代码粘贴到BackendLayout.vue组件

- 设置css样式（资源），并下载**sass依赖**（加强版CSS），把backend-layout设置为全屏高度

  ```
  npm i sass@1.97.2
  ```

- 分别布局菜单和导航区域组件

- 新建文件夹views(放页面文件)，写dashboard.vue组件并配置该子路由

  ​

##### 疑难杂症：

- **删除helloworld后页面报错显示找不到helloworld文件？**  

  更改代码后记得ctrl+s保存

   /Trae可以设置自动保存 设置-editor-autoSave-afterPlay

- **router下错位置？**

  记得在项目package.json（存放核心配置文件）所在的目录下执行命令

  ```
  cd xx/xx  //进入指定目录
  ```


- **报错不认识@符？**

  方法1.使用相对路径 ..（比较麻烦，要一级一级找）

  方法2.到vite.config.js文件里引入resolve并定义@符为src的别名

  - alias = 别名、快捷方式
  - __dirname表示当前根目录
  - resolve(__dirname, 'src'),表示把vite.config所在的根目录与src拼接起来，这样就得到了src的绝对路径D:/GitHub/mental-health-assistant/code/ai-vue/src  

- **router-view怎么渲染想要的组件？**

  URL 变化 （/back等）→ Router 查表 → 找到对应组件 → 传给 <router-view> 渲染




## 20260408 log

##### ***菜单效果实现***   

- 配置菜单各级要渲染的子路由

  到router/index.js 配置meta(自定义元信息对象)，包括标题名称和图标名称


- 安装图标库（Elment plus官网）-注意安装目录

  ```
  npm install @element-plus/icons-vue
  ```


- 渲染数据

  - Sidebar.vue引入useRouter(注意不要引入成useRoutes)，并创建实例routes



  - 到Element Plus 官网选择合适的菜单代码（Menu）复制粘贴到Sidebar.vue组件 ，去掉不要的代码，留一个部分即可 



  - v-for循环渲染router.optonal.routes[0].children （可提前打印routes看子路由在哪个部分）


  ​        key、index为path即可，唯一标识符，注意加冒号:

  - 渲染图标组件

##### 疑难杂症

- **自动格式化代码？**

  安装格式化插件：Pretter -Code formatter

  Trae设置-Editor：Default Formatter 选择安装的插件

  启动保存时格式化 设置搜索Format On Save 勾选

- **useRoute和useRouter区别？**

  Route  路由数据--->读信息（参数、地址）

  Router  路由工具--->做操作（跳转、返回）

  | 特性                | `useRoute`                                                | `useRouter`                                          |
  | ------------------- | --------------------------------------------------------- | ---------------------------------------------------- |
  | **作用**            | **获取当前路由信息**（只读）                              | **控制路由行为**（编程式导航）                       |
  | **返回值**          | 当前路由对象（`RouteLocation`）                           | 全局路由实例（`Router`）                             |
  | **常用属性 / 方法** | `route.path`、`route.params`、`route.query`、`route.name` | `router.push()`、`router.replace()`、`router.back()` |
  | **响应式**          | ✅ 是                                                      | ❌ 实例本身不是，但方法可触发路由变化                 |
  | **记忆口诀**        | **Route = 路由数据（看信息）**                            | **Router = 路由工具（做跳转）**                      |


- **不显示图标?**

  标签写法遗漏 :is

  动态标签component不是属性，要写在<el -icon> </el-icon>标签内部并自闭合 /

  安装后图标库后还要导入注册接收 到main.js 

  ```
  import * as ElementPlusIconsVue from '@element-plus/icons-vue'

  const app = createApp(App)

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }  //全局注册
  ```

  必须先 `createApp(App)` → 再注册图标 → 最后 `mount`


- key和index区别？

  key：给Vue虚拟DOM用，表示每个节点的唯一身份

  ​	  Vue 官方要求 的循环属性，让 Vue 区分每个菜单项，**避免渲染错乱**

  index：Element Plus 菜单属性

## 202604010 log

##### ***菜单显示优化***

布局顶部标签和标题、css样式优化(高度铺满)

- 图片要进行引入 参数包括地址和后面的固定参数

```
const iconUrl = new URL('@/assets/images/机器人.png', import.meta.url).href
```

##### *Navbar导航栏效果实现*

- 左右两部分都是flex布局，提前写好flex-box样式并配置div
- 左边部分包含一个按钮和标题
  - 按钮显示一个展开/折叠图标，图标名称为`<Expand />`，写在`<el-icon>`图标容器组件里
  - 标题先写固定的
  - 补充样式


- 右边部分包含一个用户头像、用户名和下拉菜单

  - 用户头像  使用`<el-avatar> `（ **Element Plus UI 组件库** 中用于展示**用户头像**的组件，支持**图片、图标、文字**三种形式）默认地址

  - 用户名 先写固定的

  - 向下的箭头 图标名称：`ArrowDown`

  - 下拉菜单用ElmentPlus现成的`el-dropdown`组件，里面包含一个`<el-dropdown>` 组件**自带的**自定义事件`@command`,用于**统一处理下拉菜单的点击**

    - **原理**：当点击 `<el-dropdown-item>` 时，该组件会把此菜单项上 **:command 属性的值**（字符串、数字、对象），自动传给父组件 `<el-dropdown>` 的 `@command` 事件。
    - 定义handleCommend事件


    - 鼠标移过弹出来的菜单内容必须放在名为` #dropdown` 的插槽里（#号表示v-slot）（第二层）

##### *跳转路由*

菜单栏设置点击事件

获取当前路由并拼接要跳转的路由地址名(点击事件传入的参数)

router.push实现路由跳转

##### *PageHead组件封装*

除数据分析外，其他页面头部都有差不多的部分，把这一部分组件化-PageHead.vue

- 标题部分，内容来自父级路由组件传过来的title参数


- 按钮部分，预留具名插槽button，父级路由可以插入`<el-button>`按钮


- 各父级路由组件引入该组件并使用传参、传插槽内容

调整CSS样式使其对齐

##### *疑难杂症**

- **为什么要‘引入’图片？**

  new URL的作用是打包处理本地文件路径，返回可直接用于src的最终URL

  如果不打包，vite不知道是文件，不会自动处理直接写的源代码路径（`@/assets/...` ），浏览器拿到的是一串字符串，图片无法显示

  所以**Vite 里用本地图片：必须包一层 new URL ()**


-  **`<el-image>`是什么？**

  Element Plus 提供的图片组件 `<el-image>`，作用和原生 `<img>` 一样，就是在页面上显示一张图片，但功能更强（支持懒加载、加载失败占位、预览等）。

- **写完下拉菜单报错？**

  用户头像和用户名和图标要写在`<el-dropdown @command="handleCommand">`组件里，即组件的触发区(第一层)


- **`@click`事件传给函数的`key`是什么参数?**

  我们这里用的是`el-menu-item` 自身绑定的 `@click`事件，参数为菜单单项实例（被 Vue 代理过的 Proxy 对象）里面有index，即一开始传的item.path,这样便拿到了url地址

  如果使用vue自身的click事件，参数是浏览器鼠标事件event，拿不到index参数

  如果使用`el-menu`绑定的`@seclet`事件，参数是(index: string, indexPath: string[])


- primary参数是什么？

  `<el-button>`的颜色样式按钮，还支持的类型：

  - primary（蓝）
  - success（绿）
  - warning（黄）
  - danger（红）
  - info（灰）