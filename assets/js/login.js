$(function () {
  $('.zc').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('.dl').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })


  // 从layui中获取一个form对象
  var form = layui.form



  form.verify({
    username: function (value, item) { //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\'';
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字';
      }
    }

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    , pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],




    qr: function (value) {
      var pwe = $('#mm').val()

      if (pwe !== value) {
        return '两次输入不一致'
      }
    }
  });











  // 注册监听事件
  $('#form_reg').on('submit', function (e) {

    e.preventDefault()
    $.post('/api/reguser',
      {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功')
      }
    )
    $('.dl').click()
  })


  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.post('/api/login',
      {
        username: $('#form_login [name=username]').val(),
        password: $('#form_login [name=password]').val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg('用户名或密码错误')
        }
        layer.msg('登陆成功')

        localStorage.setItem('token', res.token)
        location.href = 'index.html'
      }


    )
  })










})