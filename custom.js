
console.log('github');

// sticky in product page
jQuery(function($){
  //   $(function() {

  //     var hieghtThreshold = $(".product-info-wrap").offset().top;
  // //     var hieghtThreshold_end  = $(".product-info-wrap").offset().top +$(".content").height() ;
  //     var scroll = $(window).scrollTop();
  //     if (scroll > hieghtThreshold ) {
  //         $('.title-info,.price-info').addClass('opacity-zero');
  //       } else {
  //         $('.title-info,.price-info').removeClass('opacity-zero');
  //       }
  //     $(window).scroll(function() {

  //       scroll = $(window).scrollTop();
  //       if (scroll > hieghtThreshold ) {

  //         $('.title-info,.price-info').addClass('opacity-zero');
  //       } else {

  //         $('.title-info,.price-info').removeClass('opacity-zero');
  //       }
  //     });
  //   })
});

//Gallery page view function
function viewOption(input) {
  let name = input.getAttribute("id");
  if (name.indexOf('gallery') !== -1){
    input.classList.add('active');
    let inputParent = input.parentNode;
    inputParent.parentNode.querySelector('#single').classList.remove('active');
    document.querySelector('.gallery-list').classList.add("grid--2-col", "grid--3-col-tablet", "grid--4-col-desktop");
    document.querySelector('.gallery-list').classList.remove("grid--1-col", "grid--2-col-tablet", "grid--2-col-desktop");
    //   console.log('gallery-list grid grid--2-col grid--3-col-tablet grid--4-col-desktop');
  }else{
    input.classList.add('active');
    let inputParent = input.parentNode;
    inputParent.parentNode.querySelector('#gallery').classList.remove('active');
    document.querySelector('.gallery-list').classList.remove("grid--2-col", "grid--3-col-tablet", "grid--4-col-desktop");
    document.querySelector('.gallery-list').classList.add("grid--1-col", "grid--2-col-tablet", "grid--2-col-desktop");
    //    console.log('gallery-list grid grid--1-col grid--1-col-tablet grid--1-col-desktop');
  }
}


// Shortcircuit variable
let triggered = false;

function ScrollExecute() {
  // Locate loadmore button
  let moreButon = $('#more').last();

  // Get URL from the loadmore button
  let nextUrl = $(moreButon).find('a').attr("data-href");

  // Button position when AJAX call should be made one time
  //   if ((($(moreButon).offset().top - $(window).scrollTop()) < 800) && (triggered == false)) {

  // Trigger shortcircuit to ensure AJAX only fires once
  //     triggered = true;

  // Make ajax call to next page for load more data
  $.ajax({
    url: nextUrl,
    type: 'GET',
    beforeSend: function() {
      moreButon.remove();
    }
  })
  .done(function(data) {
    // Append data
    
    $('#product-grid').append($(data).find('#product-grid').html());
    document.querySelectorAll('.card-img').forEach(img => {
      img.style.cssText = 'opacity: 1; transition: all 0.7s ease-in-out;'
    });
//     var gridHtml = $(data).find('.card-img');
//     console.log(gridHtml); 
//     $.each($(data).find('.card-img'),function(){
//     $(this).addClass("show");
//     });
    

    // On success, reset shortcircuit
    triggered = false
  });
  //   }
}

// $(document).ready(function () {
//   $(window).scroll(function(){
//     ScrollExecute();
//   });
// });


// product gallery


const swiper = new Swiper('.swiper', {
  cssMode: false,
        grabCursor: true,
        spaceBetween: 0,
        slidesPerView: 1,
        clickable: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            grabCursor: true,
            clickable: true,
          },
          768: {
            slidesPerView:3,
            spaceBetween: 20,
            grabCursor: true,
            clickable: true,
          },
          1024: {
            slidesPerView:3,
            spaceBetween: 20,
            grabCursor: true,
            clickable: true,
          },
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
        mousewheel: true,
        keyboard: false
});

if($('body').hasClass('template-product') == true ){
//   document.querySelector('.swiper').addEventListener('mousewheel', function(e){
//     e.stopPropagation();
//   });

//   $('.swiper').on('wheel', function(event){
//     console.log('wheel')
//   }
  
}

$('.scroll-down_btn').click(function() {
   console.log('work');
   var target = $('.product__info-wrapper');
    if (target.length) {
        $('html,body').animate({
            scrollTop: target.offset().top - 70
        }, 1000);
        return false;
    }
});

// slider image pop
jQuery(function($){
  $(".for-desktop .swiper .custom_media-toggle").click( function(e){
    e.preventDefault();
    console.log(e.target.href);
    var img_link = e.target.href;
    console.log(img_link);
    $("body").css("overflow", "hidden");
    $('.product-zoom-container').addClass('show');
    $('.product-zoom-container .img_wrap').html('<img class="zimage-pop-ele" src="'+img_link+'">');
  });

//   ovarlay close
  $(".zimage-popclose,.zoom-img-popup").click(function(e){
    e.preventDefault();
    $('.product-zoom-container').removeClass('show');
     $("body").removeAttr("style");

  });


//   fancybox start
//   $("[data-fancybox]").fancybox({
//     autoSize    : false,
//     zoom:"zoom",
//     closeClick  : false,
//     openEffect  : 'none',
//     closeEffect : 'none',
//     padding     : 10,
//     closeBtn    : true,
//     showCloseButton:true,  
//     beforeShow: function(instance, current){
//       $("body").css({'overflow-y':'hidden'});
//       instance.scaleToActual(222, 222);
//     },
//     afterShow : function(instance, current) {
//       instance.scaleToActual(222, 222);
//     },
//     afterClose: function(){
//       $("body").css({'overflow-y':'visible'});
//     },
//     helpers : {
//       overlay : {
//         opacity: 0.4,
//         locked: false
//       }
//     }
//   });
  
  
});


// filter search

let input_selector = document.querySelector('#Search_custom');
let predictiveSearchResults = document.querySelector('#predictive-search_custom');

input_selector.onkeyup = function(event) {
  console.log(document.querySelector('#Search_custom').value);
  var inputValue = document.querySelector('#Search_custom').value;
  if (inputValue != ""){
    onChange(inputValue);
  }else{
    console.log('else');
    predictiveSearchResults.innerHTML = '';
  }
};
//  document.getElementById(
//               "email").onchange = function() {
//                 GFGfun()
//             };

//     input_selector.addEventListener('input', this.debounce((event) => {
//       onChange(event);
//     }, 300).bind(this));

function onChange(value) {
  const searchTerm = value.trim();

  if (!searchTerm.length) {
    this.close();
    return;
  }

  getSearchResults(searchTerm);
}

function  getSearchResults(searchTerm) {
  //     fetch(`/search/suggest?q=${searchTerm}&resources[type]=product&resources[options][unavailable_products]=hide&resources[limit]=4&section_id=filter-search`)
  fetch(`${routes.predictive_search_url}?q=${encodeURIComponent(searchTerm)}&${encodeURIComponent('resources[type]')}=product&${encodeURIComponent('resources[limit]')}=4&section_id=filter-search`)

  .then((response) => {
    console.log(response.ok);
    if (!response.ok) {
      var error = new Error(response.status);
      this.close();
      throw error;
    }
    return response.text();
  })
  .then((suggestions) => {
    //       console.log(suggestions);
    const resultsMarkup = new DOMParser().parseFromString(suggestions, 'text/html').querySelector('#shopify-section-filter-search').innerHTML;

    //       console.log(resultsMarkup);

    predictiveSearchResults.innerHTML = resultsMarkup;
    //       this.open();
  })
  .catch((error) => {
    //       this.close();
    throw error;
  });
}

//   function open() {
//     this.predictiveSearchResults.style.display = 'block';
//   }

//  function close() {
//     this.predictiveSearchResults.style.display = 'none';
//   }



// image load collection page

window.onload = function () {
  document.querySelectorAll('.card-img').forEach(img => {
    console.log(img);
    intersectionObserver.observe(img);
  })  
};

let intersectionObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let element = entry.target;
      element.setAttribute('src', element.dataset.src);
      element.onload = function () {
        element.style.cssText = 'opacity: 1; transition: all 0.3s ease-in-out 1s;';
      };
      observer.unobserve(element);
    }
  });
});
