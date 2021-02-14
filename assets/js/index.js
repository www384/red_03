// jquery入口函数
$(function () {
    // 获取用户信息
    getUserInfo()

    var layer=layui.layer
    // 给退出按钮绑定点击事件
    $('#btnLogout').on('click', function () {
       // console.log('ok');
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1.清除本地存储中的token
          localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = 'login.html'
            // 关闭询问框
            layer.close(index);
          });
    })
})


// 获取用户信息
    function getUserInfo() {
        // 发起ajax请求
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // // headers 就是请求头配置对象
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
                
            // },
            // 请求成功的回调函数
            success:function (res) {
                //console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                // 获取用户信息成功 调用renderAvatar渲染用户的头像
                renderAvatar(res.data)
            },
            // // 只要发起ajax请求 不论成功还是失败最终都会调用complete回调函数
            // complete:function (res) {
            //     // console.log('执行了complete回调');
            //     // console.log(res);
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 1.强制清空token
            //         localStorage.removeItem('token')
            //         // 2.强制跳转到登录页面
            //         location.href='login.html'
            //     }
            // }

           
        })
}
    
// 渲染用户的头像
    function  renderAvatar(user) {
        //1. 获取用户的名称
        var name = user.nickname || user.username
        // 2.设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3.按需渲染用户的头像
        if (user.user_pic !== null) {
            // 渲染图片头像
            $('.layui-nav-img').attr('scr', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            // 渲染文本头像
            $('.layui-nav-img').hide()
            var first=name[0].toUpperCase()
           $('.text-avatar').html(first).show()
        }
    }