// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
  // 统一为有权限的接口，设置 headers 请求头
  //如果options的url路径中有/my/,且索引值不为-1
  if (options.url.indexOf('/my/') !== -1) {
    // options的请求头为
    options.headers = {
      // 选出token值
      Authorization: localStorage.getItem('token') || ''
    }
  }
  options.complete = function (res) {
    // console.log('执行了回调');
    // console.log(res);
    //在complete回调函数中，可以使用res.responseJSON拿到服务器相应回来的数据
    //如果res里的responseJSON属性的status等于1，并且message等于身份认证失败这个字符串
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      //强制删除token值
      localStorage.removeItem('token')
      //强制跳转到login.html页面
      location.href = 'login.html'
    }

  }
})