$(function () {
    initArtCateList()
    var layer = layui.layer  // layer.msg
    // 获取用户信息
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                layer.msg('获取成功')
                var Data = template('tpl-table', res)
                $('#tbody').html(Data)
            }
        })
    }
    var indexAdd = null;

    $('#Add_category').on('click', function () {

        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#add_dialog').html()
        });

    })

    // 新增分类
    $('body').on('submit', '.aa', function (e) {
        e.preventDefault();


        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success:
                function (res) {
                    if (res.status !== 0) {
                        return layer.msg('添加失败')
                    }
                    initArtCateList()
                    layer.close(indexAdd)
                }

        })
    })




    // setInterval($('.asd').on('click', function () {
    //     console.log(11);
    // }), 2000);
})