
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
        // 分类列表模板
        var categoryListTpl = `
        {{each data}}
        <tr>
          <td class="text-center"><input type="checkbox" class="categoriesStatus" data-id="{{$value._id}}"></td>
          <td>{{$value.title}}</td>
          <td>{{$value.className}}</td>
          <td class="text-center">
            <a href="javascript:;" class="btn btn-info btn-xs edit" data-id="{{$value._id}}">编辑</a>
            <a href="javascript:;" class="btn btn-danger btn-xs delete" data-id="{{$value._id}}">删除</a>
          </td>
        </tr>
        {{/each}}`
        var html = template.render(categoryListTpl, {data: response});
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
            // 分类修改数据模板
            var modifyCategoryTpl = `
            
      <form id="modifyCategory" data-id="{{_id}}">
      <h2>添加分类</h2>
      <div class="form-group">
        <label>名称</label>
        <input value="{{title}}" class="form-control" name="title" type="text" placeholder="请输入分类名称">
      </div>
      <div class="form-group">
        <label>图标</label>
        <input value="{{className}}" class="form-control" name="className" type="text" placeholder="请输入分类图标类名">
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">修改</button>
      </div>
    </form>`
            let html = template.render(modifyCategoryTpl, response);
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

// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');
// 当全选按钮发生改变后
selectAll.on('change', function() {
    // 获取到全选按钮当前的状态
    var status = $(this).prop('checked');
    if (status) {
        // 显示批量删除
        deleteMany.show();
    } else {
        // 隐藏
        deleteMany.hide();
    }
    // 获取到所有用户并将用户的状态和全选按钮保持一致
    $('#categoryBox').find('input').prop('checked',  status)
})

$('#categoryBox').on('change', '.categoriesStatus', function () {
    // 获取到所有文章 在所有文章中过滤出选中的文章
    // 判断选中文章的数量和所有文章的数量是否一致
    // 如果一致 就说明所有的文章都是选中的
    // 否则 就是有文章没有被选中
    var inputs = $('#categoryBox').find('input');

    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
    }
    // 如果选中的复选框的数量大于0 就说明有选中的复选框
    if (inputs.filter(':checked').length > 1) {
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
    // 获取选中的分类
    var checked = $('#categoryBox').find('input').filter(':checked');
    // 循环复选框 从复选框的身上获取data-id属性
    checked.each(function (index, item) {
        ids.push($(item).attr('data-id'))
    })
    // 发送请求
    if (confirm('确定要删除吗?')) {
        $.ajax({
        type: 'delete',
        url: '/categories/' + ids.join('-'),
        success: function(response) {
            location.reload();
        }
    })
    }
    
})