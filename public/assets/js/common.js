

$('#logout').on('click', function() {
    if (confirm('确定要退出吗')) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(response) {
               location.href = '/admin/login.html';
            },
            error: function() {
                alert('退出失败')
            }
        })
    }
})

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象  因为在模板中传递过来德是字符串
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());// + ':' + date.getMilliseconds()

}

// 索要登陆用户信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {
        console.log(response);
        $('.profile .avatar').attr('src', response.avatar);
        $('.profile .name').html(response.nickName)
    }
})