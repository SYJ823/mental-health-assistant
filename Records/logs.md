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

  ​

## 20260416 log

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

##### 知识文章分类接口调用

​	知识文章分类要根据后台数据渲染，故需调用后台获取分类接口

到`admin.js`创建知识文章分类接口函数

到`knowledge.vue`组件引入接口函数、建立分类列表、分类映射表-->在onMounted生命周期钩子里执行接口的访问、映射表的建立、接口的调用、对返回数据map处理成新的数组并存在分类列表里-->渲染下拉菜单表单

##### 知识文章页面状态表单完善

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