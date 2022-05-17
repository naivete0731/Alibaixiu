// 获取地址栏中的category参数
var categoryId = getUrlParams('categoryId');

// 根据分类id获取文章列表
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function(response) {
        // 文章列表模板
        var listTpl = `
        {{each data}}
    <div class="entry">
      <div class="head">
        <a href="detail.html?id={{$value._id}}">{{$value.title}}</a>
      </div>
      <div class="main">
        <p class="info">{{$value.author.nickName}} 发表于 {{$imports.formateDate($value.createAt)}}</p>
        <p class="brief">
          {{$value.content.substr(0, 90)}}
        </p>
        <p class="extra">
          <span class="reading">阅读({{$value.meta.views}})</span>
          <span class="comment">评论({{$value.meta.comments}})</span>
          <a href="javascript:;" class="like">
            <i class="fa fa-thumbs-up"></i>
            <span>赞({{$value.meta.likes}})</span>
          </a>
          <a href="javascript:;" class="tags">
            分类：<span>{{$value.category.title}}</span>
          </a>
        </p>
        <a href="detail.html?id={{$value._id}}" class="thumb">
          <img src="{{$value.thumbnail}}" alt="">
        </a>
      </div>
    </div>
   </div>
 </div>
    {{/each}}`
        var html = template.render(listTpl, {data: response})
        $('#listBox').html(html);
        
    }
})

// 根据分类id获取分类信息
$.ajax({
    type: 'get',
    url: '/categories/' + categoryId,
    success: function(response) {
        $('#categoryTitle').html(response.title)
    }
})