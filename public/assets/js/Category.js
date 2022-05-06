
// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function(response) {
            location.reload();
        },
        error: function(response) {
            console.log(response);
        }
    })
    return false;
})

// 发送ajax请求 向服务器端所有分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        // console.log(response);
        var html = template('categoryListTpl', {data: response});
        // console.log(html);
        $('#categoryBox').html(html);
    }
})

// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function() {
    // 获取要修改的分类数据id
    var id = $(this).attr('data-id');
    // 根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            // console.log(response);
            let html = template('modifyCategoryTpl', response);
            $('#formBox').html(html);
        },
        error: function(response) {
            console.log(response);
        }
    })
})

// 当修改分类数据表单发生提交行为时
$('#formBox').on('submit', '#modifyCategory', function() {
    // 获取在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的分类id
    var id = $(this).attr('data-id');
    // 发送请求
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function(response) {
            location.reload();
        }
    })
    return false;
})

//当删除按钮被点击时
$('#categoryBox').on('click', '.delete', function() {
    if (confirm('确定要删除吗?')) {
        // 获取要删除的分类数据id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求 删除分类数据
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function(response) {
                location.reload();
            }
        })
    }
})