// 获取地址栏中的搜索关键字
var key = getUrlParams('key');
// 根据关键字调用接口
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function(response) {
        var html = template('searchTpl', {data: response});
        $('#listBox').html(html);
    }
})