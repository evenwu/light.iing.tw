// 偵測是否為行動裝置
var mobile_check = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

// 縮小內容的特效
var scale_content = function(){
  var doc = $(document);
  var body = $('body');
  var page = $('.page');
  var desktop_breakpoint = 1025;
  body.addClass('scale-content');

  function push_page(){
    push = 'translate(0,'+ (150 - $(window).height() + 'px') +')';
    page.css({
      "-webkit-transform": push,
      "transform": push
    });
    body.addClass('is-scaled');
  }
  function reset_page(){
    page.css({
      "-webkit-transform": 'translate(0,0)',
      "transform": 'translate(0,0)'
    });
    body.removeClass('is-scaled');
  }

  $(window).on('scroll', function(){
    var scrolling = doc.scrollTop();
    var touch_bottom = body.height() - $(window).height() - $('.site-info').outerHeight();
    if ( scrolling >= touch_bottom ) {
      var viewport_width = $(window).width();
      if (viewport_width >= desktop_breakpoint) {
        push_page();
      }
    } else {
      reset_page();
    }
  });

  $(window).resize(function() {
    var scrolling = doc.scrollTop();
    var touch_bottom = body.height() - $(window).height() - $('.site-info').outerHeight();
    var viewport_width = $(window).width();
    if (viewport_width < desktop_breakpoint ) {
      body.removeClass('scale-content');
      reset_page();
    } else if (viewport_width >= desktop_breakpoint && scrolling < touch_bottom) {
      body.addClass('scale-content');
      reset_page();
    } else {
      body.addClass('scale-content');
      push_page();
      $("html, body").scrollTop(doc.height());
    }
  });
}

//
var is_mobile = mobile_check();

if( is_mobile == true) {

  $('.hero-bg-slide').slick({
    dots: false,
    arrows: false,
    infinite: true,
    mobileFirst: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000
  });

} else {

  scale_content();

}

// scroll to top
$("a[href='#top']").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

// 解決漏一字問題
$('.auto-break-text').macho();

// 首頁專用 js
if ( $('.homepage').length != 0 ) {

  $('.hero-slide').slick({
    infinite: true,
    arrows: true,
    dots: true,
    slidesToShow: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2
        }
      },{
        breakpoint: 1440,
        settings: {
          slidesToShow: 3
        }
      },{
        breakpoint: 1760,
        settings: {
          slidesToShow: 4
        }
      },{
        breakpoint: 2220,
        settings: {
          slidesToShow: 5
        }
      }
    ]
  });

  $('.hero-video-bg').YTPlayer();

}

if ( $('.member-list').length != 0 ) {
  $('.member-list').slick({
    infinite: false,
    arrows: true,
    autoplay: false,
    slidesToShow: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 560,
        settings: { slidesToShow: 2 }
      },{
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },{
        breakpoint: 1420,
        settings: { slidesToShow: 5 }
      }
    ]
  });
}

if ( $('.gallery-item').length != 0 ) {
  $('.gallery-item').magnificPopup({
    type:'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true
    }
  });
}

if ( $('.team-video-play').length != 0 ) {
  $('.team-video-play').magnificPopup({
    type:'iframe',
    removalDelay: 300,
    mainClass: 'mfp-fade'
  });
}


// 偵測是否有分類列表
if ( $('.team-expo').length != 0 ) {

  // list.js 相關設定
  var options = {
    valueNames: ['team_category_value', 'team_location_value'],
    listClass: 'team-list',
    page: 12,
    plugins: [
      ListPagination({
        name: "pagination",
        paginationClass: "pagination",
        innerWindow: 2,
        outerWindow: 1
      })
    ]
  };

  var team_list = new List('team-expo', options);

  // 設定 filter 規則
  var updateList = function(){
    var category_select_value = $("#category_select_filter").val();
    var loaction_select_value = $("#location_select_filter").val();
    if (category_select_value && !loaction_select_value) {
      team_list.filter(function(item) {
        return (item.values().team_category_value == category_select_value)
      });
    } else if (!category_select_value && loaction_select_value) {
      team_list.filter(function(item) {
        return (item.values().team_location_value == loaction_select_value)
      });
    } else if (category_select_value && loaction_select_value) {
      team_list.filter(function(item) {
        return ((item.values().team_category_value == category_select_value)
          && (item.values().team_location_value == loaction_select_value))
      });
    } else {
      team_list.filter();
    }

    // 沒有任何團隊符合篩選結果時，新增資訊
    if (team_list.visibleItems.length == 0) {
      $('.team-list').append('<li class="team-list-item_no-result">目前沒有任何團隊，符合篩選結果。<br>請重新選擇分類或地區。<div class="no-result-img"></div></li>')
    }
  }

  // 初始化團隊列表，避免頁面在切換上下一頁時，select 保留 filter 結果，但團隊列表卻沒有改善的問題。
  // updateList();
  $('.team-expo').removeClass('is-loading');

  $("#category_select_filter, #location_select_filter").change(updateList);

}



