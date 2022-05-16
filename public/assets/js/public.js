// 获取网站的配置信息
$.ajax({
  teyp: 'get',
  url: '/settings',
  success: function(response) {
      review = response.review;
      // console.log(response);
      // 判断是否开启评论功能
      console.log(response);
      document.title = response.title;
      let icon = document.querySelector("link")
      icon.href = response.logo;
      let keyword = document.querySelector('meta[name="keywords"]')
      keyword.content = response.keyword;
      let describe = document.querySelector('meta[name="description"]')
      describe.content = response.describe;
  }
})
// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象  因为在模板中传递过来德是字符串
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());// + ':' + date.getMilliseconds()

}

// 随机推荐数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(response) {
        // console.log(response)
        var randomTpl = `
            {{each data}}
             <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
          {{/each}}
        `;
        var html = template.render(randomTpl, {data: response})
        // console.log(html)
        $('#randomBox').html(html)
    }
})

// 索要最新发布评论
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(response) {
        let commentTpl = `
            {{each data}}
            <li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>
            {{/each}}
        `;
        let html = template.render(commentTpl, {data: response})
        $('#commentBox').html(html);
    }
})

// 索要文章分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var navTpl = `
        {{each data}}
        <li><a href='list.html?categoryId={{$value._id}}'><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `
        var html = template.render(navTpl, {data: response})
        $('#navBox').html(html)
        $('#TopNavBox').html(html)
    }
})


// 从浏览器地址获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');

    for (var i = 0; i < paramsAry.length; i++) {
        var temp = paramsAry[i].split('=');
        if (temp[0] == name) {
            return temp[1];
        }
    }
    return -1;
}

// 获取到搜索扁担 为其添加表单提交事件
$('.search form').on('submit', function() {
    // 获取到用户在表单中输入的关键字
    var keys = $(this).find('.keys').val();
    // 跳转到搜索页面 并且将用户输入的搜索关键字传递到搜索结果页面
    location.href = '/search.html?key=' + keys;
    return false;
})