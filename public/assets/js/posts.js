// 向服务器发送请求
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        console.log(response);
        let html = template('postsTpl', {data: response});
        $('#postsBox').html(html);
        let page = template('pageTpl', response);
        $('#page').html(page);
    }
})

// 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        let html = template('categoryTpl', {data: response})
        $('#categoryBox').html(html)
    }
}) 

// 分页
function changePage(page) {
    // console.log(page);
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(response) {
            // console.log(response);
           
            let html = template('postsTpl', {data: response})
            $('#postsBox').html(html);
            let page = template('pageTpl', response);
            $('#page').html(page);
        }
    })
}