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