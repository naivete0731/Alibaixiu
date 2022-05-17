

// 获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response) {
        console.log(response);
        var html = template('commentsTpl', response);
        // console.log(html);
        $('#commentsBox').html(html)
        var page = template('pageTpl', response);
        $('#pageBox').html(page);
    }
})

// 实现跳转分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(response) {
            console.log(response);
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            var page = template('pageTpl', response);
            $('#pageBox').html(page);
        }
    })
}

// 当审核按钮被点击时
$('#commentsBox').on('click', '.status', function() {
    // 获取当前评论状态
    var status = $(this).attr('data-status');
    // 获取当前要修改的评论id
    var id = $(this).attr('data-id');
    // 向服务端发送请求 更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function() {
            location.reload();
        }
    })
})


// 当删除按钮被点击时
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('确定要删除吗?')) {
        // 获取删除评论的id
    var id = $(this).attr('data-id');
    // 向服务端发送请求 删除评论
    $.ajax({
        type: 'delete',
        url: '/comments/' + id,
        success: function() {
            location.reload();
        }
    })
    }
    
})


// 批量
// 获取全选按钮
let selectAll = $('#selectAll');
// 批量删除按钮
let deleteMany = $('#deleteMany');
let passMany = $('#passMany');

// 当全选按钮发生改变时
selectAll.on('change', function() {
    let status = $(this).prop('checked');
    if (status) {
        // 显示按钮
        deleteMany.show();
        passMany.show();
    } else {
        deleteMany.hide();
        passMany.hide();
    }
    // 获取到所有的用户并将用户的状态和全选按钮保持一致
    $('#commentsBox').find('input').prop('checked',status);
    
    $('.All').show().html('以全选 ' + $('#commentsBox').find('input').filter(':checked').length)
    if($('#commentsBox').find('input').filter(':checked').length == 0) {
        $('.All').hide();
    }
})

// 当评论复选框状态发生改变时
$('#commentsBox').on('change', '.commentStatus', function() {
    var inputs = $('#commentsBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked',true)
    } else {
        selectAll.prop('checked',false)
    }

    if(inputs.filter(':checked').length > 1) {
        // 显示
        deleteMany.show();
        passMany.show();
    } else {
        deleteMany.hide();
        passMany.hide();
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
    // 获取选中的评论
    var checkedComment = $('#commentsBox').find('input').filter(':checked');
    // 循环复选框 从复选框元素上获取data-id属性的值
    checkedComment.each(function(index,item) {
        ids.push($(item).attr('data-id'))
    })
    if(confirm('确定要删除吗')) {
        $.ajax({
            type: 'delete',
            url: '/comments/' + ids.join('-'),
            success: function(response) {
                // console.log(response);
                location.reload();
            }
        })
    }
})

// 为批量审核添加点击事件
passMany.on('click', function() {
    var ids = [];
    var status = [];
    var states = [];
    // 获取选中的评论
    var pass = $('#commentsBox').find('input').filter(':checked');
    
    // 循环复选框 
    pass.each(function(index, item) {
        ids.push($(item).attr('data-id'))
        status.push($(item).attr('data-status'))
    })
   for (let i = 0; i < status.length; i++) {
       states.push(status[i] == '0' ? '1' : '0')
       
   }
    console.log(status);
    console.log(states);
    if(confirm('确定要进行操作吗？')) {
        $.ajax({
            type: 'put',
            url: '/comments/' + ids.join('-'),
            data: {
                 state:states
            },
            success: function(response) {
                location.reload();
            }
        })
    }
})

$('#filterForm').on('submit', function() {
    // 获取选中过滤的条件
    var formData = $(this).serialize();
    // 发送请求
    $.ajax({
        type: 'get',
        url: '/comments',
        data: formData,
        success: function(response) {
            let html = template('commentsTpl', response)
            $('#commentsBox').html(html);
            let page = template('pageTpl', response)
            $('#pageBox').html(page);
            $('#btnAll').show();
        }
    })
    return false;
})

$('#btnAll').on('click', function() {
    $.ajax({
        type: 'get',
        url: '/comments',
        success: function(response) {
            let html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            let page = template('pageTpl', response)
            $('#pageBox').html(page)
            $('#btnAll').hide();
        }
    })
})