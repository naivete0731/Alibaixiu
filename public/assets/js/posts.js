// 文章列表数据模板
var postTpl = `{{each data.records}}
    <tr>
      <td class="text-center">
        <input type="checkbox" class="postStatus" data-id="{{$value._id}}">
      </td>
      <td>{{$value.title}}</td>
      <td>{{$value.author.nickName}}</td>
      <td>{{$value.category.title}}</td>
      <td class="text-center">{{$imports.formateDate($value.createAt)}}</td>
      <td class="text-center">{{$value.state == 1 ? '已发布' : '未发布'}}</td>
      <td class="text-center">
        <a href="post-add.html?id={{$value._id}}" class="btn btn-default btn-xs">编辑</a>
        <a href="javascript:;" class="btn btn-danger btn-xs delete" data-id="{{$value._id}}">删除</a>
      </td>
    </tr>
    {{/each}}
    {{if data.total == 0}}
      <h2>筛选的内容不存在</h2>
    {{/if}}`;
// 分页模板
var pageTpl = `
    {{if page > 1}}
    <li><a href="javascript:;" onclick="changePage({{page - 1}})">上一页</a></li>
    {{/if}}
    {{each display}}
    <li><a href="javascript:;" onclick="changePage({{$value}})">{{$value}}</a></li>
    {{/each}}
    {{if page < pages}}
    <li><a href="javascript:;" onclick="changePage({{page - 0 + 1}})">下一页</a></li></pages>
    {{/if}}`;
    // 文章列表下拉框模板
var categoryTpl = `
    {{each data}}
      <option value="{{$value._id}}">{{$value.title}}</option>
      {{/each}}`;

// 向服务器发送请求
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        // console.log(response);
        let html = template.render(postTpl, {data: response});
        $('#postsBox').html(html);
        let page = template.render(pageTpl, response);
        $('#page').html(page);
    }
})

// 取消筛选
$('#btnAll').on('click', function() {
    $.ajax({
        type: 'get',
        url: '/posts',
        success: function(response) {
            let html = template.render(postTpl, {data: response});
            $('#postsBox').html(html);
            let page = template.render(pageTpl, response);
            $('#page').html(page)
            $('#btnAll').hide();
        }
    })
})
// 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        let html = template.render(categoryTpl, {data: response})
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
           
            let html = template.render(postTpl, {data: response});
            $('#postsBox').html(html);
            let page = template.render(pageTpl, response);
            $('#page').html(page);
        }
    })
}

// 筛选功能
$('#filterForm').on('submit', function() {
    // 获取选中过滤的条件
    var formData = $(this).serialize();
    // 发送请求
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(response) {
            let html = template.render(postTpl, {data: response});
            $('#postsBox').html(html);
            let page = template.render(pageTpl, response);
            $('#page').html(page);
            $('#btnAll').show();
        }
    })


    // 阻止默认行为
    return false;
})

// 当删除按钮被点击时
$('#postsBox').on('click', '.delete', function() {
    // 弹出删除确认框
    if (confirm('确定要删除吗？')) {
        // 获取要删除的文章id
        let id = $(this).attr('data-id');
        // 执行删除操作
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function(response) {
                location.reload();
            }
        })
    }
    
   
})



// 获取全选按钮
let selectAll = $('#selectAll');
// 批量删除按钮
let deleteMany = $('#deleteMany');

// 当全选按钮发生状态发生改变时
selectAll.on('change', function() {
    // 获取到全选按钮当前状态
    let status = $(this).prop('checked');
    if (status) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏
        deleteMany.hide();
    }
    // 获取到所有的用户并将用户的状态和全选按钮保持一致
    $('#postsBox').find('input').prop('checked', status);

    $('.All').show().html('以全选 ' + $('#postsBox').find('input').filter(':checked').length)
    if($('#postsBox').find('input').filter(':checked').length == 0) {
        $('.All').hide();
    }
})

// 当文章前面的复选框状态发生改变时
$('#postsBox').on('change', '.postStatus', function() {
    // 获取到所有文章 在所有文章中过滤出选中文章
    // 判断选中文章的数量和所有文章的数量是否一致
    // 如果一致 就说明当前时全选状态
    // 否则不是
    var inputs = $('#postsBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
    } else {
        selectAll.prop('checked', false);
    }

    if (inputs.filter(':checked').length > 1) {
        // 显示批量删除
        deleteMany.show();
    } else {
        // 隐藏
        deleteMany.hide();
    }

    // 全选提示
    $('.All').show().html('以全选 ' +inputs.filter(':checked').length)

    if (inputs.filter(':checked').length == 0) {
        $('.All').hide();
    }
})

// 为批量删除按钮添加点击事件
deleteMany.on('click', function() {
    var ids = [];
    // 获取选中的文章
    var checkedPost = $('#postsBox').find('input').filter(':checked');
    // 循环复选框 从复选框元素的身上获取data-id属性的值
    checkedPost.each(function(index, item) {
        ids.push($(item).attr('data-id'))
    })
    
    if (confirm('确定要删除吗?')) {
        $.ajax({
            type: 'delete',
            url: '/posts/' + ids.join('-'),
            success: function(response) {
                location.reload();
            }
        })
    }
})