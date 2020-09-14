$(function () {
  getUserInfo()
  // 实现退出事件
  var layer = layui.layer
  $('#idLogout').on('click', function () {
    layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token')
      // console.log(tosken);
      location.href = './login.html'
      layer.close(index);
    });
  })
})

function getUserInfo() {
  $.ajax({
    method: 'get',
    url: '/my/userinfo',
    // headers是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取失败')

      }
      console.log(res);
      renderer(res.data)
    },
    //无论服务器回调的成功与否都会调用complete这个属性
    // complete: function (res) {
    //   // console.log('执行了回调');
    //   // console.log(res);
    //   //在complete回调函数中，可以使用res.responseJSON拿到服务器相应回来的数据
    //   //如果res里的responseJSON属性的status等于1，并且message等于身份认证失败这个字符串
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     //强制删除token值
    //     localStorage.removeItem('token')
    //     //强制跳转到login.html页面
    //     location.href = 'login.html'
    //   }

    // }
  })

}

function renderer(user) {
  // 如果有昵称name是昵称，没有就是用户名
  var name = user.nickname || user.username

  // 把welcome中的名字部分改为name
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 做判断，如果头像等于空，就是设置了头像
  if (user.user_pic !== null) {
    // 渲染出已设置的头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
  } else {
    // 隐藏头像框
    $('.layui-nav-img').hide()
    // 选出第一个字符，并设置为大写
    var first = name[0].toUpperCase()
    // 把第一个字符渲染到框内，并show显示出来
    $('.portrait').html(first).show()
  }
}