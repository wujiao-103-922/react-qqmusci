import axios from 'axios'

// 创建了axios的实例--初始化配置---每次请求都会先执行这里
// 每次请求会把baseURL放到请求的url的前面-前提是使用$axios请求，axios请求不会执行这个文件
const $axios=axios.create({
    baseURL:'',   ///api此处的api是跨域里的替换的地址
    timeout:3000
})


// 请求拦截器   修改请求头 【在请求头上加token】
$axios.interceptors.request.use(function (config) {
    // /console.log(config,"config")
    // 请求发送之前做一些事情

      //  var token=sessionStorage.getItem('token')
      
      // // 修改请求头，添加token
      // // 每一个请求都会加token
      // config.headers.Authorization=token?token:"";
   

    return config;  //一定要return config 请求无法发送
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 响应拦截器   返回数据的校验  状态是否正确  信息的提取
$axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //  token过期我们拦截，跳转到登录页面
    // if(response.data.code==403){
    //   Message.error(response.data.msg)
    //   router.push('/login')
    // }
    
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });



export default $axios;