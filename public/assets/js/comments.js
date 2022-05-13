

// 获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response) {
        console.log(response);
        var html = template('commentsTpl', response);
        // console.log(html);
        $('#commentsBox').html(html)
        var page = template('pageTpl', response);
        $('#pageBox').html(page);
    }
})

// 实现跳转分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(response) {
            console.log(response);
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            var page = template('pageTpl', response);
            $('#pageBox').html(page);
        }
    })
}

// 当审核按钮被点击时
$('#commentsBox').on('click', '.status', function() {
    // 获取当前评论状态
    var status = $(this).attr('data-status');
    // 获取当前要修改的评论id
    var id = $(this).attr('data-id');
    // 向服务端发送请求 更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function() {
            location.reload();
        }
    })
})


// 当删除按钮被点击时
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('确定要删除吗?')) {
        // 获取删除评论的id
    var id = $(this).attr('data-id');
    // 向服务端发送请求 删除评论
    $.ajax({
        type: 'delete',
        url: '/comments/' + id,
        success: function() {
            location.reload();
        }
    })
    }
    
})