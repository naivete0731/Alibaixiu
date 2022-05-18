

// 索要轮播数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        // 轮播数据模板
        var slidesTpl = ` {{each data}}
        <li>
          <a href="/detail.html?id={{$value.link}}">
            <img data-src="{{$value.image}}" class="lazy-load">
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
        var flag = true;
        var timer;
        $('.swipe .arrow').on('click', function() {
          // 防抖
// function debounce(fn) {
//      var debItem = null
//      return function () {
//       var arg = arguments[0]  //获取事件
//       if (debItem) {
//            clearTimeout(debItem)
//         }
//          debItem = setTimeout(function () {
//           fn(arg)//事件传入函数
//          }, 2000)
//      }
//  }

          clearTimeout(timer);
          if(flag){
            flag = false;
            var _this = $(this);
              if(_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
          }
       timer = setTimeout(function(){
                flag = true
              console.log(flag);
            },500)
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
              <img data-src="{{$value.thumbnail}}" alt="" class="lazy-load">
            </a>
          </div>
        </div>
        {{/each}}`
        var html = template.render(lastedTpl, {data: response});
        $('#lastedBox').html(html);
        const imgs = [...document.querySelectorAll(".lazy-load")]
        
        
        function lazyLoad() {
          for (let i =0; i < imgs.length; i++) {
            const $img = imgs[i];
            // 判断是否在可视区
            if(isInVisibleArea($img)) {
              $img.src = $img.dataset.src;
              imgs.splice(i, 1);
              i--;
            }
          }
        }
        lazyLoad();
        // 节流
        function throttle(fn, miliseconds = 250, context) {
          let lastEventTimestamp = null;

          return function(...args) {
            const self = context || this;
            const now = Date.now();

            if(now - lastEventTimestamp >= miliseconds) {
              fn.apply(self, args);
              lastEventTimestamp = now;
            }
          }
        }
        window.addEventListener('scroll',throttle(lazyLoad,1000), false)
        function isInVisibleArea($img) {
          const rect = $img.getBoundingClientRect();
          return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth
        }

    }
})



//  图片懒加载
// $(function() {
//   // 获取window的引用:
//   var $window = $(window);
//   // 获取包含data-src属性的img，并以jQuery对象存入数组:
//   var lazyImgs = $.map($('img[data-src]').get(), function (i) {
//       return $(i);
//   });
//   // 定义事件函数:
//   var onScroll = function() {
//       // 获取页面滚动的高度:  scrollTop()获取匹配元素相对滚动条顶部的偏移。
//       var wtop = $window.scrollTop();//页面滚动的高度就是窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离
//       // 判断是否还有未加载的img:
//       if (lazyImgs.length > 0) {
//           // 获取可视区域高度:
//           var wheight = $window.height();
//           // 存放待删除的索引:
//           var loadedIndex = [];
//           // 循环处理数组的每个img元素:
//           $.each(lazyImgs, function ($i, index) {
//               // 判断是否在可视范围内:
//               if ($i.offset().top - wtop < wheight) {  //$.offset().top获取匹配元素距离文本文档顶的距离。
//                   // 设置src属性:
//                   $i.attr('src', $i.attr('data-src'));
//                   // 添加到待删除数组:
//                   loadedIndex.unshift(index);//从大到小排序，保证下边删除操作能顺利进行
//               }
//           });
//           // 删除已处理的对象:
//           $.each(loadedIndex, function (index) {
//               lazyImgs.splice(index, 1);
//           });
//       }
//   };
//   // 绑定事件:
//   $window.scroll(onScroll);
//   // 手动触发一次:
//   onScroll()})