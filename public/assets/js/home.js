// 索要轮播数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        let html = template('slidesTpl', {data: response})
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
        // console.log(response)
        var html = template('lastedTpl', {data: response});
        $('#lastedBox').html(html);
    }
})