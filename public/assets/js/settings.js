// 当选择logo图片时
$('#logo').on('change', function() {
    // 获取选中的图片
    var file = this.files[0];
    // 创建formdata对象 实现二进制文件上传
    var formData = new FormData();
    // 将选中的文件追加到formdata对象中
    formData.append('logo', file);
    // 实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            $('#hiddenLogo').val(response[0].logo);
            // 将logo显示在页面中
            $('#preview').attr('src', response[0].logo).show();
        }
    })
})

// 当网站设置表单发送提交行为时
$('#settingsForm').on('submit', function() {
    // 获取表单中输入的内容
    var formData = $(this).serialize();
    // 实现网站数据添加功能
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function(response) {
            // console.log(response);
            location.reload();
        }
    })
    return false;
})

// 索要网站设置数据
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        console.log(response);
        if (response) {
            // 将logo地址存储在隐藏域中
            $('#hiddenLogo').val(response.logo)
            //将logo显示在页面中
            $('#preview').attr('src', response.logo);
            // 将网站标题显示在页面中
            $('input[name="title"]').val(response.title);
            // 网站描述
            $('#site_description').val(response.describe);
            // 网站关键词
            $('input[name="keyword"]').val(response.keyword);
            // 将是否开启评论功能显示在页面中
            $('input[name="comment"]').prop('checked', response.comment)
            // 将是否经过人工审核显示在页面中
            $('input[name="review"]').prop('checked', response.review)
        }
    }
})