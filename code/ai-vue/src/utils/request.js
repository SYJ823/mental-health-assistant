import axios from "axios";
import { ElMessage } from "element-plus";

//创建axios实例
const service = axios.create({
  baseURL: "/api", //请求的前缀
  timeout: 5000, //请求超时时间
});

//请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); //从缓存localStorage中获取token
    if (token) {
      //如果存在token
      config.headers["token"] = token; //将token添加到请求头中,下次请求时会携带token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//响应拦截器
service.interceptors.response.use(
  (response) => {
    //对响应数据进行处理
    const { data, config } = response;
    //处理业务状态码
    if (data.code === "200") {
      return data.data ?? data;
    } else {
      // 登录过期统一处理
      if (data.code === "-1") {
        // 白名单：不需要登录的接口（登录、注册、找回密码...）
        const whiteList = [
          "/auth/login",
          "/auth/register",
        ];

        // 如果当前接口在白名单里，不处理、不跳转
        if (whiteList.some((item) => config.url.includes(item))) {
          return Promise.reject(data);
        }

        // 只有非白名单才执行清理 + 跳转
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");


        return Promise.reject(data);
      }
    }
    return response;
  },
  (error) => {
    ElMessage.error("网络请求失败");
    return Promise.reject(error);
  },
);

export default service;
