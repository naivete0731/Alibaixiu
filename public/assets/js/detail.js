// 从地址栏中获取文章id
var postId = getUrlParams('id');
// 评论是否通过人工审核
var review;
// 根据文章id获取
$.ajax({
    type: 'get',
    url: '/posts/' + postId,
    success: function(response) {
        // 文章详情模板
        var postTpl = `
        <div class="breadcrumb">
      <dl>
        <dt>当前位置: </dt>
        <dd><a href="javascript:;">{{category.title}}</a></dd>
        <dd>{{title}}</dd>
      </dl>
    </div>
    <h2 class="title">
      <a href="javascript:;">{{title}}</a>
    </h2>
    <div class="meta">
      <span>{{author.nickName}} 发布于 {{$imports.formateDate(createAt)}}</span>
      <span>分类: <a href="javascript:;">{{category.title}}</a></span>
      <span>阅读: ({{meta.views}})</span>
      <span>评论: ({{meta.comments}})</span>
      <span>爱心: ({{meta.likes}})</span>
      <a href="javascript:;" id="like">赞</a>
    </div>
<br>
    {{content}}`
        var html = template.render(postTpl, response);
        $('#article').html(html);
    }
})

// 当点赞按钮发生点击事件
$('#article').on('click', '#like', function() {
    // 执行点赞操作
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + postId,
        success: function(response) {
            alert('点赞成功')
        }
    })
})

// 获取网站的配置信息
$.ajax({
    teyp: 'get',
    url: '/settings',
    success: function(response) {
        review = response.review;
        // console.log(response);
        // 判断是否开启评论功能
        if(response.comment) {
            // 评论模板
            var commentTpl = `
            <style>
      .comment {
        margin-bottom: 20px;
      }
      .comment textarea{
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        height: 80px;
        display: block;
      }
      .comment input {
        width: 100px;
        height: 30px;
        margin-top: 10px;
      }
      .tex {
        resize: none;
        max-height: 400px;
      }
      </style>
      <div class="comment">
      <form>
        <textarea class="tex"></textarea>
        <input type="submit" value="提交评论">
      </form>
    </div>`
            // 开启评论功能 渲染评论模板
            var html = template.render(commentTpl);
            // 渲染
            $('#comment').html(html);
        }
    }
})

// 当评论表单发生提交欣慰的时候
$('#comment').on('submit', 'form', function() {
    // 获取输入的信息
    var content = $(this).find('textarea').val();
    console.log(content);
    // 代表状态
    var state;

    if (review) {
        // 要经过人工审核
        state = 0;
    } else {
        // 不需要经过人工审核
        state = 1;
    }
    // 执行添加评论操作
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: content,
            post: postId,
            state: state
        },
        success: function(response) {
            alert('评论成功')
            location.reload();
        },
        error: function(response) {
            alert('未登录无法评论')
            console.log(response);
        }
    })

    return false;
})

// 获取评论列表
$.ajax({
    type: 'get',
    url: '/comments/' + postId,
    success: function(response) {
        // 所有评论模板
        var commentAllTpl = `
        <style>
     .commentAll {
        margin-bottom: 20px;
        background-color: #fff;
        padding: 15px;
      }
      .commentAll #avatar {
        height: 50px;
        display: flex;
        margin-bottom: 15px;
      }
      .commentAll #avatar img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
        flex: 0;
        margin-right: 10px;
      }
      .commentAll #avatar div {
        flex: 1;
      }
  </style>
  <div class="commentAll">
        <h3 style="margin: 0 0 15px 5px">全部评论</h3>
      {{each}}
      <div id="avatar">
        <img src="{{$value.author.avatar}}" alt="">
        <div>
          <p><h3 style="display: inline-block">{{$value.author.nickName}}</h3>  {{$imports.formateDate($value.createAt)}}</p>
          <span style="display: inline-block;margin-top: 10px">{{$value.content}}</span>
        </div>

      </div>


      {{/each}}`
        var html = template.render(commentAllTpl, response);
        // console.log(html)
        $('#commentAll').html(html)
    }
})