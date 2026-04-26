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

#### 疑难杂症：

##### 删除helloworld后页面报错显示找不到helloworld文件？

更改代码后记得ctrl+s保存

 /Trae可以设置自动保存 设置-editor-autoSave-afterPlay

##### **router下错位置？**

记得在项目package.json（存放核心配置文件）所在的目录下执行命令

```
cd xx/xx  //进入指定目录
```
##### **报错不认识@符？**

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



#### 疑难杂症

##### 自动格式化代码？

安装格式化插件：Pretter -Code formatter

Trae设置-Editor：Default Formatter 选择安装的插件

启动保存时格式化 设置搜索Format On Save 勾选

##### useRoute和useRouter区别？

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

#### **疑难杂症**

##### **为什么要‘引入’图片？**

new URL的作用是打包处理本地文件路径，返回可直接用于src的最终URL

如果不打包，vite不知道是文件，不会自动处理直接写的源代码路径（`@/assets/...` ），浏览器拿到的是一串字符串，图片无法显示

所以**Vite 里用本地图片：必须包一层 new URL ()**

##### `<el-image>`是什么？

Element Plus 提供的图片组件 `<el-image>`，作用和原生 `<img>` 一样，就是在页面上显示一张图片，但功能更强（支持懒加载、加载失败占位、预览等）。

##### **写完下拉菜单报错？**

用户头像和用户名和图标要写在`<el-dropdown @command="handleCommand">`组件里，即组件的触发区(第一层)

##### **`@click`事件传给函数的`key`是什么参数?**

我们这里用的是`el-menu-item` 自身绑定的 `@click`事件，参数为菜单单项实例（被 Vue 代理过的 Proxy 对象）里面有index，即一开始传的item.path,这样便拿到了url地址

如果使用vue自身的click事件，参数是浏览器鼠标事件event，拿不到index参数

如果使用`el-menu`绑定的`@seclet`事件，参数是(index: string, indexPath: string[])

##### primary参数是什么？

`<el-button>`的颜色样式按钮，还支持的类型：

- primary（蓝）

- success（绿）

- warning（黄）

- danger（红）

- info（灰）

  ​

## 20260414 log

##### *Pinia引入*

安装

```
npm install pinia
```

创建并挂载

```
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

新建文件夹stores，用于存放仓库

新建文件admin.js创建后台仓库，引入创建方法、创建、放数据、暴露接口

##### *菜单折叠功能*

- 给Navebar.vue中

折叠按钮添加点击属性、调用后台store中修改折叠状态的方法

- 到Sidebar.vue中

引入admin仓库、计算属性并创建计算属性值isCollapse

设置菜单折叠属性（Element组件库有写折叠属性源代码）

调整过渡属性和样式（文字部分取折叠属性的反值以控制是否显示）



##### *封装TableSearch组件*

多个页面都有表单搜索功能，封装成组件以复用

创建组件，Element组件库有表单组件代码，发现是`<el-form>`里用`<el-form-item>`包裹每个菜单组件，观察所需属性值

去对应路由组件引入并使用该组件 创建参数数组并传入：该页面所需的各菜单组件（输入、下拉等），每个组件参数都是一个数组元素     和一个回调函数` @search`

TableSearch.vue接收所传参数：命名为formItem并规定类型为数组，`<el-form>`表单里循环渲染传进来的每个表单组件

用动态组件`<component>`渲染表单组件,定义映射函数`isComp`来确定具体要渲染的表单组件(注意映射函数写法)

单独写下拉菜单项（写在动态组件内部并单独用template包裹）

创建空容器formData，给表单绑定动态数据容器（`:model="formData"`）,给动态表单项`<component>`动态绑定表单数据（`v-model="formData[item.prop]"`），最终实现数据实时更新功能，双向绑定。

添加查询和重置按钮，并利用自定义事件`@search`实现组件通信（子穿父）：先注册父组件定义的search事件，然后到按钮点击事件里使用触发



##### *表单栏随屏幕变化响应式布局*

利用 Element Plus (Vue 3) 的 **24 列栅格系统**实现在不同屏幕/浏览器页面大小时，页面布局随之适应的效果。

将同一行的内容用`<el-row>`包围，每一列用`<el-col>`包裹（这里用的循环渲染，`<template>`里包裹的所有的就是单独一列）`<el-row>`添加`:gutter=24`属性（指定列之间的间距，默认0）

`<el-col>`需要配置**屏幕尺寸断点及其span参数**才能实现所需要呈现的效果，父组件传过来的原`formItem里`没有这些，所以需要**用computed方法并循环里面的每一项对其进行配置**，得到新的表单数据后重新给`template`进行`v-for`渲染并把`col`数据用`v-bind`批量绑定给`<el-col>`



#### 疑难杂症

##### Pinia、Store是什么？

- **Pinia**：Vue 专属的**状态管理工具 / 库**（独立第三方包）。

负责：统一管理全局共享数据。核心：管公共数据、跨组件共享状态

数据要跨很多组件共用（登录态、购物车、全局配置）→ 就需要 Pinia

- **Store:**整个项目的**公共数据仓库**

Pinia提供 `defineStore（）` 方法，用来创建自己的仓库



##### 为什么Sidebar.vue里的isCollapes要用computed计算属性包围？

因为useAdminStore().isCollapse是 **Pinia 里的一个状态值**，**Pinia 的状态变化，**必须通过 **computed 或 storeToRefs** 才能在组件里自动更新视图，否则当Pinia 里的状态变化时，页面不会跟着刷新，computed起到一个**监听作用**



##### ` :model`是什么？

`model` 是 **Element UI 表单（el-form）的核心绑定属性**，专门用来**把表单和数据对象关联起来**。`:model="formData"` 就是让整个表单和 `formData` 对象**双向绑定**

举个例子 当前表单项item接收的prop是叫title，那么最终该标签绑定的是formData.title

##### 为什么定义空的formData对象？

因为：

- 表单项是**动态循环**出来的

- 你不知道有哪些字段

- 字段可能来自后端接口→ 

  `reactive({})` 创建一个**响应式空对象 **,`v-model="formData[item.prop]"`自动给这个空对象添加字段属性，不需要提前写死

##### `<el-form-item>`里的:prop参数是干嘛的？

`prop` 是 **Element UI 表单校验、数据绑定的关键属性。**

没有它，表单校验会完全失效。prop 就是用来绑定「当前项对应哪条校验规则」的钥匙

同时他还表明了该条表单项绑定到model里具体哪个数据项

##### v-model="formData[item.prop]"`是什么意思？

`formData`：定义的表单数据对象

`item.prop`：循环项里的字段名，比如 `'name'`、`'age'`、`'phone'`

`v-model="formData[item.prop]"` :根据循环的配置，自动把当前表单项双向绑定到 formData 里对应的字段，如果没有该片段便会自动添加



##### 表单校验是什么？

需要提前写好校验规则rules，`Form` 组件提供了表单验证的功能，只需为 `rules` 属性传入约定的验证规则，并将 `form-Item` 的 `prop` 属性设置为需要验证的特殊键值即可。（传给prop的字段和rules里包含的字段一样，按照规则启动该字段对应的校验）

##### `default: () => []`是干嘛的?

default = 默认值，如果父组件没给我传 `formItem`，我就自动用一个空数组 `[]` 代替，防止报错。



##### 为什么要用 `<template>` 单独包裹 `<el-option>`？

`<component>` 是 Vue 的**动态组件标签**,它本质是一个 **“动态占位符”**，**自己本身不能直接写子元素**。所以必须用 `<template> `作为 **“内容插槽容器”**



##### 如何用自定义事件`@search`实现组件通信的？

在父组件调用子组件时，定义事件`search`用于**监听**子组件触发的**同名自定义事件**。`@search="handleSearch"`表示子组件一发 `search` 事件，父组件就立刻执行`handleSearch`方法。然后父组件就可以定义`handleSearch`方法来实现想要的功能了。

在子组件**注册`search`事件**并存放在变量`emit`里：`const emit = defineEmits(['search'])`,当**调用`emit`**时就可以触发事件并向父组件传递数据了： `emit('search', formData)`。

组件通信功能**核心**是由 `defineEmits()`实现的：`defineEmits `执行后，会**返回一个专属的发射方法**，用变量（一般叫emit）接收下来,真正要发射时再调用emit



##### `row` 和 `col` 组件的作用各属性的意义？

- row = 行 → 负责排版、对齐、列间距         

`:gutter="24"`意义：列与列之间的间距为24px

col = 列 → 负责宽度、位置、**响应式**

- `:span="24" ` 意义：当前列占多少**份**（总 24 份） 一列占满（span=24）后其他列自动换行


- `xs:` `sm:` `md:` `lg:` `xl:  `  意义：不同屏幕宽度下的**响应式规则**，其后接span参数

  xs → 手机 <768px

  sm → 平板 ≥768px

  md → 小电脑 ≥992px

  lg → 电脑 ≥1200px

  xl → 大屏 ≥1920px

  绑定该属性后组件会**自动检测当前屏幕大小并根据设置的span参数以调整当前列所占份数**

##### 为什么要用computed来增加配置？不能直接循环

原因：

1. `formItem`是父组件传过来的props，子组件不能修改
2. 当前写法computed 是**只读**、不污染原数据，他做的只是**基于 props 计算出一个新结果**
3.  computed 会**自动缓存 + 自动**更新，父组件的` formItem `变了：computed **自动重新计算，**页面**自动刷新**
4. 写在`computed`里使代码更加规范简洁，业务逻辑和视图分离，页面只管渲染。

最后要return返回计算后的新数组存到新的变量里

##### 补充：computed可修改源头数据的写法：

```
// 计算属性——既读取又修改
  let fullName = computed({
    // 读取
    get(){
      return firstName.value + '-' + lastName.value
    },
    // 修改
    set(val){
      console.log('有人修改了fullName',val)
      firstName.value = val.split('-')[0]
      lastName.value = val.split('-')[1]
    }
  })

  function changeFullName(){
    fullName.value = 'li-si'
  } 
```

执行流程：当**调用`changeFullName()`**时：

1. `fullName.value = 'li-si'`
2. **自动触发 set(val)**，val = 'li-si'
3. set 内部把 `li-si` 切成 `['li', 'si']`
4. 给 `firstName` 赋值 `li`
5. 给 `lastName` 赋值 `si`
6. 因为 firstName/lastName 变了
7. **自动触发 get()**
8. fullName 变成 `li-si`


##### **逐行解析computed内部代码：**

```
const { formItem } = props;  
```

 从父组件传过来的 props 里，拿到表单配置列表 formItem

```
formItem.forEach((item) => {
  item.col = { xs: 24, sm: 12, md: 6, lg: 6 };
});  
```

循环每一个表单项，这里的item是`formItem` 数组循环时，当前的那一项

结果是给数组里的每一项自动加上一个 col 对象

```
[
  { 
    label: '文章标题', 
    col: { xs:24, sm:12, md:6, lg:6 } 
  },
  ...
]
```

##### 为什么有些属性前必须要加冒号：？

冒号是v-bind简写

例如`:gutter="20"`是`v-bind:gutter="20"` 的简写,引号里的内容会被 **当作 JS 表达式解析执行**  类型：`20`（数**字**）

如果不加的意思  ：把**字符串 "20"**传给 gutter



##### v-bind有什么用？

`v-bind` 是 Vue 提供的**「属性绑定工具」**

作用：让 HTML 标签 / 组件 能使用 JS 数据、表达式、对象、变量

三种不同写法：

- 最常用 **绑单个**属性—— `v-bind:属性="值"` 简写 `:属性="值"`

  ```
  <el-row :gutter="24">
  <el-col :span="12">
  <img :src="imgUrl">
  ```

- 第二种 把一个对象里的所有属性，**批量绑定**给组件—— `v-bind="对象"`

```
v-bind="item.col"

等价于：

<el-col 
  :xs="24" 
  :sm="12" 
  :md="6" 
  :lg="6"
>
```

- 第三种：不写属性名 —— `v-bind`

  把父组件传过来的所有属性，全部丢给当前标签。 一般封装组件才用

##### ***v-bind和v-model的区别和联系？***

- **v-bind 只能：数据 → 页面（单向）**

   只能把**JS 里的值传给页面**，页面改了，JS 不会变。可以简写成：

- **v-model 可以：数据 ↔ 页面（双向）**

  JS 改 → 页面自动更新

  页面改 → JS 自动更新


- 联系：`v-model` 本质上就是 `v-bind` + `v-on` 的语法糖。

  v-on ：绑定事件，可以简写成`@`

  `@click`就是`v-on:click`的简写

## 20260415 log

##### *重置按钮*

**Element组件库**有写如何实现重置

具体用到了表单**标签内ref**获取DOM元素，放在提前定义的空ref变量里，最后在重置触发函数里调用`resetFields()`即可实现重置。最后还要触发一次查询



***学习使用接口文档***

https://xsl1e23zpk.apifox.cn/



##### *初始页面Layout布局实现*

配置初始页面的路由及其两个子路由（注册和登录）

初始页面组件Layout布局：左右两个部分 左半部分包括标题文本和图片，右半部分为子路由

初始页面CSS样式 ---文档复制



##### *登录页面效果实现*

标题部分和表单部分

注脚部分`<router-link to="/auth/register"></router-link>`实现**路由跳转**,注意to后面写的是路由地址（path）

CSS样式调整



##### *Axios二次封装*

1.安装Axios

```
npm i axios
```

2.二次封装：新建文件夹(utils)->文件(request.js)->引入->创建实例（请求前缀、超时时间）->封装**请求拦截器、响应拦截器**、错误处理

3.暴露



#### 疑难杂症

##### 初始页面机器人图标不显示？

经trae排查，路径中@后面少了一个/



##### 关于异步操作之调用接口

- 流程：

1. 调用接口
2. **Axios** 发请求，返回一个 **Promise**
3. 用 `await` 等着这个 Promise
4. JS 引擎看到 await，就**暂停当前函数**
5. Promise 成功 → await 返回数据
6. Promise 失败 → 抛出错误，进 catch

- **异步**：不能立刻拿到结果的操作（如发请求、定时器、读文件、点击事件等）
- **Promise **: **JS 自带**的一个内置对象,用来封装、管理异步结果：成功/失败
- **async: **JS关键字，写在函数前面。让函数内部可以用await并若函数**自动返回Promise**
- **await：**JS关键字，必须放在async函数里。作用是暂停函数，等拿到了Promise再继续往下执行。
- **Axios：**一个**发网络请求**的**工具库**，专门用来**调用后端接口**。**返回Promise**。需要另外下载
- **接口(API)**：后端提供的一个网址，前端可访问或提交数据



##### 关于网络请求

概念：前端向后端服务器发消息、拿数据的过程

必需内容：

1. **请求地址URL**：就是接口地址，比如：https://api.xxx.com/user/list
2. **请求方法**：**GET**-拿数据     **POST**-提交数据
3. **请求参数**：传给后端的数据。GET：拼在网址后    POST：放在请求体里
4. **响应结果**：后端返回的东西     成功：data 数据          失败：错误信息



**关于二次封装Axios**

封装什么以及为什么要二次封装？

1. 统一配置：baseURL、超时
2. **请求拦截器**：统一加 token、请求头
3. **响应拦截器**：统一剥 data、统一处理错误
4. 所有接口共用一套逻辑，不用重复写代码

一些疑问点

- **config**：axios 里代表**本次请求的全部配置**       包含 url、method、headers、参数等
-  **headers（请求头）**：相当于请求的 “信封信息”      放数据格式、token、设备信息等
-  **token**：登录后的**身份凭证**
  - 证明你是谁、是否登录
  - 存在 localStorage，每次请求带给后端


-   **localStorage**（缓存）：浏览器**本地永久存储**
  - 常用：存 token、用户信息


-  **HTTP 状态码**
  - 网络层面状态：200、401、404、500
  - 表示**请求**有没有正常到达、服务器有没有响应


- **业务状态码（code）**
  - **后端自定义**，如 0 / 200 /-1

  - **code === -1：业务操作失败**（密码错、参数错等）

  - 网络正常，只是事情没办成

    ​


## 20260416 log

##### *登录接口调用*

1. axios封装后统一管理接口：新建api文件夹->后台管理接口admin.js
2. 接口管理：引入封装后的axios实例->定义登录模块接口函数login->暴露
3. 页面内调用：引入接口函数，提交表单函数调用接口。
4. 调用后：判断token是否存在（这里之前**响应拦截器**已经写了对data的剥离，可以直接调用data.token）；登录成功后缓存信息；根据用户角色调整路径...

##### *知识文章分类接口调用*

​	知识文章分类要根据后台数据渲染，故需调用后台获取分类接口

到`admin.js`创建知识文章分类接口函数

到`knowledge.vue`组件引入接口函数、建立分类列表、分类映射表-->在onMounted生命周期钩子里执行接口的访问、映射表的建立、接口的调用、对返回数据map处理成新的数组并存在分类列表里-->渲染下拉菜单表单

##### *知识文章页面状态表单完善*

​        死数据直接到表单项数据里加

#### 疑难杂症

##### validate（）是什么？

Element组件库的**表单校验**函数，如果通过校验则继续执行括号里的事件。

##### 关于跨域

概念：浏览器出于安全，不让在当前网站，直接请求另一个 “不同源” 网站的接口。（协议、域名、端口任一不一样就会被浏览器拦截报跨域错误）

如何解决？

**① 后端开 CORS（最标准、最推荐）**

后端在响应头加：

```
Access-Control-Allow-Origin: *
```

或者只允许你的前端域名。

**② 前端开发环境用代理**（vue.config.js/vite.config）

本地开发时，让**devServer 帮你转发请求**，浏览器就不跨域了。

比如，在本此项目中，在vite.config.js中配置

```
server: {
    proxy: {
      "/api": {
        target: "http://159.75.169.224:1235",
        changeOrigin: true,
      },
    },
  },
```

实现：`/api` 开头的请求都会转发到后端地址（注意axios封装时已经配置了请求头。跳转地址时会进行拼接，要把重复部分去掉）

③ **后端和前端部署同域名 / 同服务器**

上线后放一个域名下，自然就同源了。



##### **报错login is not defined**

没导入接口函数：`import { login } from '@/api/admin'`

##### **报错service is not defined**

api 文件没导入封装的 axios 实例

**报错TypeError: Converting circular structure to JSON**

 `formData`应该用reactive定义（响应式对象），ref定义基本响应式数据 

还有校验规则rules也应该用reactive()

##### 请求接口遇到404错误？

经过ai排查发现是封装的service实例的**请求头少了‘/ ’**，导致请求路径会**拼接在当前页面地址后面**

```
/auth/api/admin/login （404错误）
```

正确应该有/，才会**从根目录出发**

```
http://localhost:5173/api/admin/login
```

然后在经过请求转发代理转发到正确后端地址

##### code 500 系统错误？

登录接口地址顺应ai写的`/admin/login`，但是接口文档写了应该是`/user/login `

##### 后端返回的业务状态码code显示200（成功），但是页面登录不成功？

响应拦截器对状态码的处理：code码是**字符串型**，写的时候顺应ai写成了字符型导致全都处理成了异常



##### **知识文章分类接口调用为什么要写在onMounted里面？**

等组件的 DOM 渲染完成、页面挂载成功后，再执行里面的代码。

组件刚创建 → 还没渲染 → **不能操作 DOM / 不能赋值表单**    

组件没挂载就发请求，万一组件销毁了，会造成**内存泄漏 / 无效请求**。

##### 为什么要建立分类映射表？

为了通过 id 快速拿到分类名称，方便表格回显（让下拉框自动选中对应的文字）、编辑回显、数据展示，避免反复遍历数组。

##### map是什么

把数组里的每一项，加工成新的东西，返回一个新数组。



## 20260418 log

##### *知识文章列表接口及调用*

创建接口：注意该接口参数为Query参数，调用接口时传入params

调用接口：文章组件引入接口，创建分页参数，查询函数内调用接口，声明周期挂载完成时调用查询函数

##### *文章列表显示*

使用Element Plus组件库里的Table组件布局

对于需要自定义的部分（图标、按钮等）使用**作用域插槽**进行自定义列（element组件库官方写法）



#### 疑难杂症

##### Query参数和params是什么？

- **query 参数**：URL 问号后面的键值对，**用？& 拼接**，用于**筛选、查询**

```
https://xxx.com/api/user?name=张三&age=20
```

​       `name=张三`、`age=20` 就是 **query 参数**

- **params（路由参数）**：URL 路径里的占位符，用于**定位某个资源**


- **axios 里的 `{ params: {} }`**：**专门用来生成 query 参数**，不是路由 params

  ```
  axios.get('/api/user', {
    params: { name: '张三', age: 20 }
  })
  ```

  这里的 `params` 配置项，就是用来**自动拼接成 query 参数**。

  ​

##### 扩展运算符`...对象`

```
const params = {
  ...pagination,
  ...formData,
}
```

把两个对象的属性 **“合并”** 成一个新对象params。



## 20260420 log

##### ***文章列表显示完善***

- 解决分类不显示的问题-变量名写错，要严格按照后端返回的名称


- 其他列表项的渲染，（用`v-if`判断当前文章状态）


- 折叠效果实现（页面变窄不损失列表项）- 利用`Table`组件的`fixed`属性，固定某一栏的位置

  ​

## 20260421 log

##### *分页效果实现*

Element plus组件库Pagination 分页组件实现

##### *知识文章新增弹窗*

- 封装成组件`ArticleDialog.vue`


- 利用Element组件库里的Dialog 对话框组件实现。



- 用computed属性将父组件传来的modelValue改为可修改值（利用的是defineEmits进行组件通信，val是新值）

##### *新增弹窗内容布局*

​	标题、分类、摘要部分、标签布局

> 注意：标签部分要绑定为到数组变量tagArry，不要直接绑定到tags（新增文章接口要求tags是字符串）

#### 疑难杂症

##### `:page-sizes`和 `:page-size`的区别？

- `:page-sizes`:设置分页组件的**「每页显示条数选择器**」的可选数值，用户可以在页面下拉框中切换，选择自己想要的每页展示数量。必须在 **layout 属性里写上 sizes**才生效

- `:page-size`:设置**「当前默认每页显示多少条数据」**，并且和数据自动双向同步

  两个属性同时使用时,`page-size`前面要加`v-model`

  ​

##### `defineProps` 和 `defineEmits` 的区别？

- **defineProps**：**父 → 子 传数据**（父给子发消息）


- **defineEmits**：**子 → 父 传消息 / 事件**（子给父发消息）

当父组件向子组件传数据时，子组件用defineProps接收；

​		传事件时，子组件用defineEmits接收，子组件就可以主动向父组件发消息了。



##### 父组件调用子组件时，写v-model的含义？

父组件**同时传数据和事件**

```
<Child v-model="value" />
```

相当于

```
<Child
  :modelValue="value"       // 父 → 子 传值（defineProps）
  @update:modelValue="value = $event"  // 子 → 父 抛事件（defineEmits）
/>
```

子组件要用`defineProps`接收数据，用`defineEmits`声明`update:modelValue`事件

##### 什么是回调？

事情做完后，自动调用的函数。

 `@close="handleClose"`表示当对话框关闭的**一瞬间**，自动执行 `handleClose` 方法。



**`filterable`和`allow-create`属性**

- `filterable` = **可搜索**


- `allow-create` = **可自定义输入（创建新选项）**

- **filterable + allow-create**：既能搜，又能自己输入新值

  添加新的之后会改变数据吗?

  ​

## 20260422 log

##### *封面上传效果*

Element plus组件库的`<el-upload>`组件实现

1. 页面加载：`imgUrl` 为空 → 显示**点击上传文章封面**；
2. 用户点击：只能选择图片文件；
3. 上传前：执行 `beforeUpload` 校验（格式 / 大小），不通过则取消上传；
4. 上传中：执行 `handleUploadRequest` 自定义上传（**调用接口**）；
5. 上传成功：把后端返回的图片链接赋值给 `imgUrl`；
6. 页面更新：`imgUrl` 有值 → 自动显示封面预览图。

##### *封面上传接口联调*

​	封装接口：根据文档，所需传入参数 有`file`,`businessInfo`，其他为固定值

​	引入接口，`handleUploadRequest`函数中使用。注意该函数传参时要手动解构file文件

​	使用由  **Node.js 内置模块 crypto** 提供的`.randomUUID()`方法生成唯一的id

​	新建  ` config`文件夹配置【文件服务器的基础地址】常量并导出

​	导入基础地址，拿到返回的数据后拼接文件服务器的基础地址,页面显示预览图

​	调整样式

#### 疑难杂症

##### 关于`<el-upload>`组件的属性

- `action="#"`  默认上传接口地址,这里写 `#` 是因为我们用 `http-request` 覆盖了默认上传，此属性无效，仅占位


- `:before-upload="beforeUpload"`  上传前钩子函数:绑定的函数**会自动接收到一个参数：文件对象 file**。文件选中后、正式上传前自动触发；用于校验（图片格式、大小、分辨率），返回 false 会阻止上传
- `:http-request="handleUploadRequest"`  自定义上传请求（核心）:覆盖组件默认的上传逻辑，完全由我们自己写上传代码（调用后端接口、上传 OSS、拼接请求参数等）
- ` show-file-list="false"` 展示上传的文件列表
- `accept="image/*,"`限制文件选择器只能选图片：`image/*`= 所有图片格式（png/jpg/gif/webp 等）；末尾逗号是浏览器兼容写法，无实际作用



##### `uploadFile`接口里的`FormData`是什么？

`FormData` 是浏览器自带的、原生的 JS 构造函数（天生就有，不用装）
作用：专门用来组装「文件上传」要用的请求数据
就是一个**数据容器**，专门用来传 文件 + 其他参数 给后端。

##### 为什么要写`headers: {Content-Type: multipart/form-data}`？

> Content-Type 是请求头里的**数据格式声明**，用来告诉后端：我这次传给你的数据是什么格式。
>
> `multipart`   多段、多部分。表示数据**不是一整段**，而是**分成好几块**
>
>  `form-data`  表单数据 。表示这是**表单提交格式**

把数据分成多个独立部分，每部分可以是文本，也可以是二进制文件，后端能正确区分并解析。

普通格式：`application/json` 只能传：字符串、数字、布尔、普通对象。**不能传二进制文件**



##### 上传图片后返回500？

file没有用{}包裹---**对象解构赋值**。等价于`const file = params.file`(`params`是组件自动传入的整个对象)。后端要的是里面的`file`文件

##### 为什么要额外定义【文件服务器的基础地址】常量？

上传完文件后，后端只会返回一个**相对路径**（比如 `/upload/2025/xxx.jpg`，拼接上这个地址，才能变成**完整可访问的图片链接**。额外定义方便整个项目里统一使用。以后服务器换了只需要重新定义访问基础地址（后端只会返回相对路径的原因）。

##### **移除封面按钮没有在图片下方？**

少套了一层盒子。`el-form-item` 内部是 弹性布局（flex），上传组件 + 按钮会**默认横向并排**，而不是上下排列



## 20260424 log

##### ***富文本编辑器***

安装、粘贴打包好的编辑器组件

 父组件引入、使用、设置参数并创建相关方法

##### 知识文章创建接口联调

弹窗底部按钮布局

父组件新增提交成功方法、子组件注册同名事件

校对表单对象、检查表单数据是否符合接口要求、调用接口、触发emit事件回父组件。

> 注意标签创建时是数组，要另外拼接成后端接口规定的字符串并删除原数组

#### 疑难杂症

##### 报错`SyntaxError`?

>  Vue 单文件组件（`.vue`）默认是**默认导出**（`export default`）

导入方式（命名导入）与编辑器组件导出方式（默认导入）不匹配。  去掉大括号即可

##### 什么时候引入加大括号，什么时候不加？

-  引入工具函数、配置、枚举 必须带大括号---拿的是其导出的 其中需要的部分
- 引入Vue组件时不带---一个 .vue 文件 = 一个组件 = 一个默认导出

##### 关于`nextTick`

作用：等待 Vue 完成 DOM 更新（异步）

在富文本编辑器初始化完成时使用，表示如果已有旧内容（`formData.content`），就**等 DOM 挂载好**再塞内容进去，防止报错

##### loading参数是什么？

`el-button`组件表示加载中的动画显示



## 20260425 log

##### *编辑弹窗显示*

父组件新增按钮和编辑按钮使用同一套函数

根据传入的表单行是否有id决定状态-弹窗的标题and弹窗的提交按钮内容

如果是编辑文章则需调用后端获取文章详情接口，得到返回数据后传给子组件

子组件接收接口数据时默认定义为null--要根据是否传入id判断状态，并转换为布尔值存在`isEdit`变量里

##### ***编辑弹窗数据回显***

监听`watch`后端接口返回的文章详情数据

`formData`是`reactive`数据，要用`Object.assign(formData, newVal)`进行整体替换且不丢失响应式

封面回显

##### *取消按钮业务完善*

调用表单实例的`resetFields`进行重置，字段简洁且是`vue`自带更安全

重置id（初始值是什么就重置成什么）和封面（调用`handleRemove`)

##### *编辑接口联调*

对于编辑后的文章更新 调用接口 提交数据

由于提交前的校验、拼接逻辑一致，直接在提交函数里加状态判断和更新业务即可

##### *父组件提交文章业务完善*

关闭弹窗并刷新文章列表

##### *知识文章发布下线删除操作实现*

调用更新文章状态接口和删除文章接口,`ElmessageBox`弹窗提示（提前引入）



##### *咨询记录列表组件*

调用接口获取咨询会话列表并绑定表格数据

页面布局：

1. 用户头像：用`el-avator`组件实现
2. 情绪日志：分为俩个部分：标题和内容 分别对应相关数据名
3. 消息数：绑定`messageCount`
4. 时间：绑定`lastMessageTime`

样式调整：宽度调整，情绪日志不设宽度使其自适应

分页效果：复用之前的分页代码，定义相关方法

##### ***咨询记录详情***

弹窗、页面布局、样式

调用接口获取咨询会话详情消息

循环渲染对话内容，根据`senderType`判断发消息方

#### 疑难杂症

##### `isEdit`不生效？

父组件调用接口后应返回res而不是res.data

##### 先点编辑取消后再点新增数据没有清空？

如果先点编辑，数据走的是watch字段，表单ref实例还没创建,`resetFields`不生效。

对编辑回显使用`nextTick`即可解决

##### bug：创建文章时未填标签出错

标签为非必填项对标签数组进行拼接前进行判断

##### `ElmessageBox`弹窗参数

> `ElMessageBox.confirm(内容, 标题, {配置})`  

配置里主要改：确认按钮文字、取消按钮文字、类型图标



**获取分页records里undefined无数据？**

res不需要.records

`const {records,total} =res` 是ES6的**对象解构赋值**，一次性从对象里取出多个属性，变成变

用户

##### ID头像不显示？

该组件没有`src`属性（智能提示错误），应该用双标签直接包裹用户名

##### 报错多根节点？

咨询组件没有整个用div包裹，` class="content-container"`不知道该挂在哪个根组件上

##### :close-on-click-modal="false"？

作用：点击弹窗外的灰色遮罩时，不关闭弹窗。

##### v-loading="loadingMessages"？

作用：给区域加 “加载中” 转圈动画。

##### 样式不生效?

样式类名不匹配和嵌套结构错误



##### 接口要求的情绪参数怎么获得？

可选项可不写，传分页数据和表单数据即可

##### 评分的星星效果怎么实现？

Element组件：

` <el-rate :model-value="scope.row.moodScore" :max="10" disabled/>`



## 20260426 log

##### *情绪日志详情和删除功能*

详情弹窗：

当前行数据赋值给变量`currentDetail`、建立情绪标签映射关系

标题、`<el-descriptions>`布局、进度条用`<el-progress>`标签

删除功能：

调用接口、弹窗提示

##### *数据分析组件业务*

`<el-card>`和`Layout`栅格布局实现卡片效果和屏幕自适应

echarts实现趋势图表

导航守卫

登出逻辑

#### 疑难杂症

##### 为什么要把row重新赋值给另一个变量？

`currentDetail` 是 “专门用来存当前详情数据” 的响应式变量，而 `row` 只是临时参数

一个变量只干一件事，代码更容易维护

##### 什么是JSON字符串？要怎么处理？

> 后端数据库存复杂数据时，不能直接存对象，只能存文本，所以会把对象转成 **JSON 字符串** 存起来

用 `JSON.parse(字符串)` → 转回 JS 对象



##### 图片不显示？

没有用`new URL()`进行打包转换，无法识别

##### 页面刷新报错undefinde 不加载?

原代码定义aiData为空对+ 模板直接读深层属性 + 没做容错导致aiData还没拿到数据就渲染了

要做容错处理：

```
aiData?.systemOverview?.totalUsers || 0
```



##### 如何实现分析趋势图表?

使用**Apache ECharts**--一个基于 JavaScript 的开源可视化图表库

Echart 图表库 https://echarts.apache.org/zh/index.html

包括下载依赖、创建实例、传入DOM对象、获取数据、配置项等操作

（我们这里用的el组件，DOM对象就是组件绑定的ref对象）

##### 卡片不在一行显示？

第二个卡片没有单独放一个`<el-col>`



##### useRoute 和useRouter的区别？

先从底层理解Vue-Router的工作原理：

Vue Router 核心是：**监听 URL → 匹配规则 → 渲染组件**

router 实例是**全局唯一的中央管理器**，内部保存两个核心东西：

1. **currentRoute**：当前路由状态（响应式对象）
2. **history + matcher**：监听 + 匹配

```
工作流程：
1. 初始化
	const router = createRouter({
    history: createWebHistory(),
    routes: backendRoutes
	})
创建 router 实例
初始化 history 监听
初始化路由表
记录初始 currentRoute

2. 页面加载 / URL 变化
history 监听到新地址
交给 matcher 匹配路由表
更新 currentRoute 响应式对象

3. 视图自动更新
currentRoute 变化
<router-view> 检测到变化
渲染匹配到的组件
页面无刷新切换

4. 用vue-router API
useRouter() → 拿到全局 router 实例
useRoute() → 拿到 currentRoute
router.push() → 调用 history → 修改 URL → 触发更新
```

| 特性      | useRoute()                    | useRouter()                  |
| --------- | ----------------------------- | ---------------------------- |
| 返回值    | 当前路由信息**对象**（Route） | 全局路由**实例**（Router）   |
| 核心用途  | 读取路由参数、路径等信息      | 编程式导航、控制路由跳转     |
| 对应 Vue2 | `this.$route`                 | `this.$router`               |
| 响应式    | ✅ 是                          | ❌ 不是                       |
| 典型场景  | 详情页拿 id、权限判断         | 登录后跳转、返回按钮、条件跳 |

