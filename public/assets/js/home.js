// 索要轮播数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        // 轮播数据模板
        var slidesTpl = ` {{each data}}
        <li>
          <a href="/detail.html?id={{$value.link}}">
            <img src="{{$value.image}}">
            <span>{{$value.title}}</span>
          </a>
        </li>
        {{/each}}`;
        let html = template.render(slidesTpl, {data: response})
        $('#slidesBox').html(html);

        // 轮播图
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function(index) {

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active')
            }
        })

        // 上/下一张
        $('.swipe .arrow').on('click', function() {
            var _this = $(this);

            if(_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })

        // $('.swipe').on('mouseover',function(e) {
        //     console.log('123');
        //     $('.swipe').on('wheel', function(e) {
        //     console.log('滚轮事件'+e.deltaY);
        //     if (e.deltaY = 100) {
        //         swiper.prev();
        //     } else {
        //         swiper.next();
        //     }
        // })
        // e.preventDefault() && e.stopPropagation();
        // })
        
    }
})

// 索要最新发布数据
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function (response) {
        //最新发布数据模块
        var lastedTpl = ` 
        {{each data}}
        <div class="entry">
          <div class="head">
            <span class="sort">{{$value.category.title}}</span>
            <a href="detail.html?id={{$value._id}}"{{$value.title}}</a>
          </div>
          <div class="main">
            <p class="info">{{$value.author.nickName}} 发表于 {{$imports.formateDate($value.createAt)}}</p>
            <p class="brief">{{$value.content.substr(0, 80)}}</p>
            <p class="extra">
              <span class="reading">阅读({{$value.meta.views}})</span>
              <span class="comment">评论({{$value.meta.comments}})</span>
              <a href="detail.html?id={{$value._id}}" class="like">
                <i class="fa fa-thumbs-up"></i>
                <span>赞({{$value.meta.likes}})</span>
              </a>
              <a href="detail.html?id={{$value._id}}" class="tags">
                分类：<span>{{$value.category.title}}</span>
              </a>
            </p>
            <a href="detail.html?id={{$value._id}}" class="thumb">
              <img src="{{$value.thumbnail}}" alt="">
            </a>
          </div>
        </div>
        {{/each}}`
        var html = template.render(lastedTpl, {data: response});
        $('#lastedBox').html(html);
    }
})