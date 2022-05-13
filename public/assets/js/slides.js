// 当管理员选择文件的时候
$('#file').on('change', function() {
    // 用户选择到的文件
    var file = this.files[0];
    // 创建formData对象实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择的文件添加到formdata对象中
    formData.append('image', file);
    // 向服务端发送请求 实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response[0].image);
            $('#image').val(response[0].image)
            $('.thumbnail').attr('src', response[0].image).show();
        }
    })
    
})

// 当轮播图发送提交行为时
$('#slidesForm').on('submit', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 添加轮播图数据
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function(response) {
            console.log(response);
        }
    })
    return false;
})

// 索要图片轮播数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        var html = template('slidesTpl', {data: response})
        $('#slideBox').html(html)
    }
})

// 当删除按钮被点击时
$('#slideBox').on('click', '.delete', function() {
    if (confirm("确定要删除吗?")) {
        // 获取id
        var id = $(this).attr('data-id');
        // 实现轮播删除功能
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function(response) {
                location.reload();
            }
        })
    }
})