import axios from 'axios'
import { Toast } from "vant";
import Loading from "../store/index";

export function request(config) {
  const instance = new axios.create({


    baseURL:'http://152.136.185.210:8000/api/m3',
    // baseURL: 'http://123.207.32.32:8000',
    timeout:5000
  });

  // 请求拦截器
  instance.interceptors.request.use(config => {
     // 当getters里面的isLoading为true再显示请求加载
     if (Loading.getters.isLoading) {
      Toast.loading({
        forbidClick: true,
        message: "加载中..."
      });
    }
    //拦截后需要将拦截下来的请求数据返回发送
    return config;
  }, err => {

  })

  // 响应拦截器
  instance.interceptors.response.use(res => {
    // 拦截后需要将拦截下来处理成的结果返回
    Toast.clear();
    return res.data
  }, err => {
    Toast.clear();
    console.log(err)
  })

  return instance(config)
}
