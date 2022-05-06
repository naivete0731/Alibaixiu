

// 当表单发生提交行为的时候
$('#userForm').on('submit',function() {
    var formData = $(this).serialize();
    // 向服务器端发送添加用户请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(response) {
            // 刷新页面
            location.reload();
        },
        error: function(response) {
            alert('用户添加失败');
            console.log(response);
        }
    })
    return false;
})


// 图片上传
$('#modifyBox').on('change', '#avatar', function () {
	console.log(this.files[0])
	// 用户选择的文件
    var formData = new FormData();
	formData.append('avatar', this.files[0]);

    // console.log(this.files.accept);
	$.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉ajax方法不要 解析请求参数
        processData: false,
        // 告诉ajax方法不要 设置请求参数的类型
        contentType: false,
        success: function(response) {
            console.log(response);
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        },
        error: function(response) {
            var message = JSON.parse(response.responseText).message;
            alert(message)
        }
    })
})

$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        console.log(response);
        var html = template('userTpl', {
            data: response
        })

        //将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
})

// 通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function() {
    // 根据被点击的用户的id值
    var id = $(this).attr('data-id')
    // 根据id获取用户的详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            console.log(response);
            let html = template('modifyTpl', response);
            $('#modifyBox').html(html)
        }
    })
})


// 通过事件委托的方式为修改按钮添加点击事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的那个用户id值
    var id = $(this).attr('data-id');
    // 发送请求 修改用户信息
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            // console.log(response);
            // console.log(formData);
            location.reload();
        },
        error: function(response) {
            console.log(response);
        }
    })
   return false;
})


// 当删除按钮被点击时
$('#userBox').on('click', '.delete', function() {
    // 如果管理员确定要删除
    if (confirm('确定要删除用户吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function(response) {
                console.log(response);
                location.reload();
            },
            error: function(response) {
                console.log(response);
            }
        })
    }
})

// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');
// 当全选按钮的状态发生改变时
selectAll.on('change', function() {
    // 获取到全选按钮当前的状态
    var status = $(this).prop('checked');
    if (this.checked) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
    // 获取到所有的用户并将用户的状态的全选按钮保持一致
    $('#userBox').find('input').prop('checked', status);
})

// 当用户前面的复选框状态发生改变时
$('#userBox').on('change', '.userStatus', function() {
    // 获取到所有用户 在所有用户中过滤出选中的用户
    // 判断选中的用户的数量和所有用户的数量是否一致
    // 如果一致 就说明所有的用户都是选中状态
    // 否则 就是有用户没有选中
    var inputs = $('#userBox').find('input');

    if (inputs.length == inputs.filter(':checked').length) {
        // alert('所有用户都是选中状态')
        selectAll.prop('checked', true);
    } else {
        // alert('不是全选状态')
        selectAll.prop('checked', false)
    }

    // console.log(inputs.filter(':checked').length);

    // 如果选中的复选框的数量大于1 就说明有选中的用户
    if(inputs.filter(':checked').length > 1) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }
})

// 为批量删除按钮添加点击事件
deleteMany.on('click', function() {
    var ids = [];
    // 获取选中的用户
    var checkedUser = $('#userBox').find('input').filter(':checked')
    checkedUser.each(function (index, element) {
        ids.push($(element).attr('data-id'))
    })
    // console.log(ids);
    // console.log(ids.join('-'));
    if (confirm('确定要删除操作吗？')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function(response) {
                console.log(response);
                location.reload();
            }
        })
    }
})