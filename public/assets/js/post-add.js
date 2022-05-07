// 向服务端发送请求 获取分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        let html = template('categoryTpl', {data: response})
        $('#category').html(html);
    }
})

// 当选中文件时 触发事件
$('#parentBox').on('change', '#feature', function() {
    // 获取选中的文件
    let file = this.files[0];
    console.log(file);
    // 创建formData对象 实现二进制文件上传
    let formData = new FormData();
    // 将选中到的文件追加到formData对象中
    formData.append('cover', file);
    // 实现文章封面上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉ajax方法不要处理data属性对象的参数
        processData: false,
        // 告诉ajax方法不要设置参数类型
        contentType: false,
        success: function(response) {
            // console.log(response);
            $('#thumbnail').val(response[0].cover)
            $('.thumbnail').attr('src', response[0].cover).show();
        }
    })
})





// 当添加文章表单提交时
$('#addForm').on('submit', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务端发送请求 实现添加文章功能
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(response) {
            location.href = '/admin/posts.html'
        }
    })
    // 阻止表单默认提交行为
    return false;
})

// 获取浏览器地址栏中的id参数
var id = getUrlParams('id');
if (id != -1) {
    // 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function (categories) {
                    response.categories = categories;
                    console.log(response)
                    var html = template('modifyTpl', response);
                    // console.log(html)
                    $('#parentBox').html(html);
                    if (response.thumbnail) {
                        $('.thumbnail').attr('src', response.thumbnail).show();
                    }
                    
                }
            })
        }
    })
}


// 从浏览器德地址栏获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&')

    for (let i = 0; i < paramsAry.length; i++) {
        var temp = paramsAry[i].split('=');
        if (temp[0] == name) {
            return temp[1]
        }
    }

    return -1; 
    
}




// 当修改文章信息表单发送提交行为的时候

$("#parentBox").on('submit', '#modifyForm', function() {
    // 获取表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的文章id值
    var id = $(this).attr('data-id');
    // console.log(id);
    // console.log(formData);
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function(response) {
            location.href = '/admin/posts.html';
        }
    })
    return false;
})




