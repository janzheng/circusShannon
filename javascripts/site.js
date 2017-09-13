


var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  isMobile = true;
}


// 
// Smooth Scrolling 
// - can link to a # of another page, and smooth-scroll down to that #
// - mooified to scroll left/right based on responsive size
// 

function horizontalScroll() {
  var scrollElement = '.section-container';
  
  // Smooth scrolling for internal links
  $("a[href^='#']").click(function(event) {
    event.preventDefault();

    var $this = $(this),
    target = this.hash,
    $target = $(target);
    // offset = $this.data('offset-scroll') || 0; // <... data-offset-scroll="400"> 
    targetOffset = $target.offset().left;
    offset = -300;

    // console.log('start hScroll')

    if( typeof $target.offset() !== "undefined") {
      // window.location.hash = target;
      $(scrollElement).animate({
        'scrollLeft': $target.offset().left + $(scrollElement).scrollLeft() + offset
      }, 600, 'swing', function() {
        event.preventDefault();
        window.location.hash = target;

        // console.log('finished hScroll')
      });
    }
  });
}

function verticalScroll() {
  var scrollElement = 'html, body';
  
  // Smooth scrolling for internal links
  $("a[href^='#']").click(function(event) {
    event.preventDefault();

    var $this = $(this),
    target = this.hash,
    $target = $(target);
    targetOffset = $target.offset().top;
    offset = -70;

    console.log('start vScroll')

    if( typeof $target.offset() !== "undefined") {
      // window.location.hash = target;
      $(scrollElement).animate({
        'scrollTop': $target.offset().top + offset
      }, 600, 'swing', function() {
        event.preventDefault();
        window.location.hash = target;
        event.preventDefault();
        console.log('finished vScroll')
      });
    }
  });
}




function resize() {
  var windowHeight = $(window).height();
  windowWidth = $(window).width();
  $("a[href^='#'], html, body").unbind();

  console.log('window height/width: ' + windowHeight + ' | ' + windowWidth);

  if(isMobile || $(window).width() < 768 ) {
    console.log('mobile view');
    verticalScroll();
    $('._nav').offset({top: 0});
    $('.section-container').scrollLeft(0); // reset left/right scroll
  } else {
    horizontalScroll();
    $('._nav').offset({top: windowHeight/2 - $('._nav').outerHeight()/2});
  }
}



$(document).ready(function() {

  // calculates scrolling and window sizes
  resize();

  // loads the nav in all pretty.
  // also bc resize(); puts the nav in the middle
  $('._nav').css({opacity: 1})

  // 
  // sticky nav
  // 

  // animation controller
  var stickyController = new ScrollMagic.Controller();

  // sticky nav
  var nav = new ScrollMagic.Scene({triggerElement: "#nav", triggerHook: "onLeave"})
          .setPin("#nav")
          .setClassToggle("#nav", "--pinned") // add class toggle
          .addTo(stickyController);

});


jQuery(window).on('resize', _.throttle(resize, 500));























