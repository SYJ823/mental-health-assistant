import axios from 'axios'
import { ElMessage } from 'element-plus'

//创建axios实例
const service = axios.create({
    baseURL: 'api',//请求的前缀
    timeout: 5000,//请求超时时间
})

//请求拦截器
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token') //从缓存localStorage中获取token
        if (token) { //如果存在token
            config.headers['token'] = token //将token添加到请求头中,下次请求时会携带token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//响应拦截器
service.interceptors.response.use(
    response => {
        //对响应数据进行处理
        const { data,config } = response
        //处理业务状态码
        if (data.code === 200) {
            return data.data
        }else{
            //登录过期统一处理逻辑
            if(data.code === -1){ //如果业务失败
                if(!config.url?.includes('/login')){//如果不是登录接口
                    ElMessage.error(data.msg||'登录过期，请重新登录')

                    //清除登录信息
                    localStorage.removeItem('token')
                    //清除用户信息
                    localStorage.removeItem('userInfo')
                    //跳转到登录页
                    window.location.href = '/auth/login'
                }else {
                    ElMessage.error(data.msg||'登录失败，请重新登录')
                    return Promise.reject('网络请求失败....')
                }
            }
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
