(function ($) {

  // header
  $(function(){
    var body = $('body');
    var header = $('#header');
    var searchBtn = header.find('.search button');
    var mypageBtn = header.find('.mypage a');
    var alrimBtn = header.find('.alert a');
    var layer = $('.layer');
    var layerWrap = layer.find('.layer-wrap');

    // search open
    searchBtn.on('click', function(){
      var searchLi = $(this).closest('li.search');
      if(!searchLi.hasClass('active')){
        searchLi.addClass('active');
        return false;
      }
    });

    // mypageBtn _ 로그인 안되어있을 경우
    // 로그인 팝업 오픈
    mypageBtn.on('click', function(){
      if(!loginState){
        layerOpen('../html/pop_login.html');
        return false;
      }

    });

    // 로그인 _ 회원가입 / 아이디찾기/ 비번찾기
    $(document).on('click', '.login-utill a', function(){
      var $this = $(this);
      var $url = $this.data('html-url');

      $('.layer .close').trigger('click');
      layerOpen($url);
    });

    // tab
    $(document).on('click', '.tab-type-1 a', function(){
      var $this = $(this);
      var $parent = $this.parent('li');
      var $href = $this.attr('href');
      $parent.addClass('active');
      $parent.siblings().removeClass('active');
      $($href).show();
      $($href).siblings().hide();
      return false;
    });

    // 회원가입 _ 약관
    // 전체 선택/해제
    $(document).on("click", "#pu-total", function () {
      var checked = $(this).is(":checked");
      var checkboxs = $(this).parents(".join-agree").find('input[type=checkbox]');
      checked ? checkboxs.prop("checked", true) : checkboxs.prop("checked", false) ;
    });
    // 일부 선택 해제
    $(document).on("click", ".normal input", function () {
      var is_checked = true;
      $(".join-agree .normal input").each(function(){
        is_checked = is_checked && $(this).is(":checked");
      });    
      $("#pu-total").prop("checked", is_checked);
    });

    // 알림 오픈
    alrimBtn.on("click", function(){
      layerOpen('../html/pop_alrim.html', 'layer-sm');
      return false;
    });

    // layer open func
    function layerOpen(page, size){
      body.addClass('over-hidden');
      layerWrap.load(page);
      if(size) layerWrap.addClass(size);
      layer.addClass('show');
      setTimeout(function(){
        layerWrap.addClass('move');
      },30);
    }

    // ese key event
    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        if($('.layer').hasClass('show')){
          $('.layer .close').trigger('click');
        }else if($('.top-utill li.search').hasClass('active')){
          $('.top-utill li.search').removeClass('active')
        }
      }
    });

    // layer close
    $(document).on('click', '.layer .close, .layer .dim, .layer-close', function(){
      layer.removeClass('show');
      body.removeClass('over-hidden');
      layerWrap.empty();
      layerWrap.removeClass('move layer-sm');
      return false;
    });
  });

  // main
  $(function(){
      
    if($('#wrap').hasClass('main')){
      // main visual
      $('.main-visual').slick({
        arrows: false,
        dots: true,
        appendDots: $('.dots-box'),
      });
      
      // live list
      $('.live-list').slick({
        infinite: false,
        arrows: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: '12px',
        appendArrows: $('.main-live .arrow-box'),
      });

      // main class
      $('.main-class .main-slide-box').each(function(){
        var $this = $(this);
        $this.find('.class-list').slick({
          infinite: false,
          arrows: true,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 1,
          centerPadding: '28px',
          appendArrows: $this.find('.arrow-box'),
        });
      });
    }
  });
  

})(jQuery);