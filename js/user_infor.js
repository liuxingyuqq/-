$(function () {
    var layer = layui.layer
    var form = layui.form
    // 设置用户昵称不能大于6个字符
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称不得大于六个字符'
            }
        }
    })

    var arr = '';
    fn()
    function fn() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success:
                function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // console.log(res);
                    $('#yhnc').val(res.data.nickname)
                    $('#dlmc').val(res.data.username)
                    $('#yhyx').val(res.data.email)
                    arr = res.data.id
                }
        })

    }

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        var data = {
            id: arr,
            nickname: $('#yhnc').val(),
            email: $('#yhyx').val()

        }
        // console.log('用户昵称' + $('#yhnc').val())
        // console.log(data);
        $.ajax({
            url: '/my/userinfo',
            data,
            method: 'POST',


            success:
                function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    console.log(data);
                    window.parent.getUserInfo()
                }
        })
    })

    fn()

})