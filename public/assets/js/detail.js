// 从地址栏中获取文章id
var postId = getUrlParams('id');
// 评论是否通过人工审核
var review;
// 根据文章id获取
$.ajax({
    type: 'get',
    url: '/posts/' + postId,
    success: function(response) {
        // console.log(response);
        var html = template('postTpl', response);
        $('#article').html(html);
    }
})

// 当点赞按钮发生点击事件
$('#article').on('click', '#like', function() {
    // 执行点赞操作
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + postId,
        success: function(response) {
            alert('点赞成功')
        }
    })
})

// 获取网站的配置信息
$.ajax({
    teyp: 'get',
    url: '/settings',
    success: function(response) {
        review = response.review;
        // console.log(response);
        // 判断是否开启评论功能
        if(response.comment) {
            // 开启评论功能 渲染评论模板
            var html = template('commentTpl');
            // 渲染
            $('#comment').html(html);
        }
    }
})

// 当评论表单发生提交欣慰的时候
$('#comment').on('submit', 'form', function() {
    // 获取输入的信息
    var content = $(this).find('textarea').val();
    console.log(content);
    // 代表状态
    var state;

    if (review) {
        // 要经过人工审核
        state = 0;
    } else {
        // 不需要经过人工审核
        state = 1;
    }
    // 执行添加评论操作
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: content,
            post: postId,
            state: state
        },
        success: function(response) {
            alert('评论成功')
            location.reload();
        },
        error: function(response) {
            alert('未登录无法评论')
            console.log(response);
        }
    })

    return false;
})

// 获取评论列表
$.ajax({
    type: 'get',
    url: '/comments/' + postId,
    success: function(response) {
        console.log(response);
        var html = template('commentAllTpl', response);
        // console.log(html)
        $('#commentAll').html(html)
    }
})