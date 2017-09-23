


var nav_width = 260;



var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  isMobile = true;
}


// 
// Smooth Scrolling 
// - can link to a # of another page, and smooth-scroll down to that #
// - mooified to scroll left/right based on responsive size
// 

function hScroll(target) {
  var scrollElement = '.section-container';

  $target = $(target);
  targetOffset = $target.offset().left;
  // offset = $this.data('offset-scroll-h') || 0; // <... data-offset-scroll="400"> 
  offset = -300;

  // console.log('start hScroll to ' , target)

  if( typeof $target.offset() !== "undefined") {
    // window.location.hash = target;
    $(scrollElement).animate({
      'scrollLeft': $target.offset().left + $(scrollElement).scrollLeft() + offset
    }, 600, 'swing', function() {
      window.location.hash = target;

      // console.log('finished hScroll')
    });
  }
}
function horizontalScroll() {
  
  // Smooth scrolling for internal links
  $("a[href^='#']").click(function(event) {
    event.preventDefault();
    hScroll(this.hash);
  });
}

function verticalScroll() {
  var scrollElement = 'html, body';
  
  // Smooth scrolling for internal links
  $("a[href^='#']").click(function(event) {
    event.preventDefault();

    // var $this = $(this),
    var target = this.hash,
        $target = $(target),
        targetOffset = $target.offset().top,
        // offset = 0; //-70;
        // offset = $(this).data('offset-scroll-v') || 0; // <... data-offset-scroll="400"> 
        offset = -120;

    // console.log('start vScroll')

    if( typeof $target.offset() !== "undefined") {
      $(scrollElement).animate({
        'scrollTop': $target.offset().top + offset
      }, 600, 'swing', function() {
        // $target.css({'position':'relative', 'top':0-offset})
        var scrollTop = $(window).scrollTop();
        event.preventDefault(); // tends to jump
        // console.log('finished vScroll', $(window).scrollTop())
        $(window).scrollTop(scrollTop) // prevents jumping
      });
    }
  });
}




function resize() {
  var windowHeight = $(window).height();
  windowWidth = $(window).width();
  $("a[href^='#'], html, body").unbind();

  console.log('window height/width: ' + windowHeight + ' | ' + windowWidth);

  // reset
  // $('.section-content').css({'padding-top':'32px'})
  $('._footer').show();

  if(isMobile || $(window).width() < 768 ) {
    console.log('mobile view');
    verticalScroll();
    $('._nav').offset({top: 0});
    $('.section-container').scrollLeft(0); // reset left/right scroll
  } else {
    horizontalScroll();
    $('._nav').offset({top: windowHeight/2 - $('._nav').outerHeight()/2});

    // size adjustments
    if (windowHeight < 600 ) {
      // console.log('changes...')
       $('.section-content').addClass('--tooHigh');
      // $('.section-content').css({'padding-top':'0px', 'overflow-y':'scroll', 'overflow-x':'hidden', 'height': '100vh'})
      $('._footer').hide();


    }
  }
}



$(document).ready(function() {

  // calculates scrolling and window sizes
  resize();

  // loads the nav in all pretty.
  // also bc resize(); puts the nav in the middle
  $('._nav').css({opacity: 1})


  // horizontally scroll if hash exists

  let hash = location.hash.substring(0,location.hash.indexOf('&')||0);
  console.log('hash:', hash);

  if(hash !== '') {
    console.log('hash scroll horizontally');
    // hScroll(hash);
  }

  // 
  // sticky nav
  // 

  // animation controller
  var stickyController = new ScrollMagic.Controller();

  // sticky nav
  var nav = new ScrollMagic.Scene({triggerElement: "#nav-tr", triggerHook: "onLeave"})
          .setPin("#nav")
          .setClassToggle("#nav", "--pinned") // add class toggle
          .addTo(stickyController);

  // execute above function
  initPhotoSwipeFromDOM('.gallery');


});


$(window).on('resize', _.throttle(resize, 500));
// $(window).on('hashchange', function(event) {
//   console.log('hash change: ', event)
//   event.preventDefault();
// });
















var initPhotoSwipeFromDOM = function(gallerySelector) {

  // console.log('init gallery');

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            // ['100%', 'auto']; // linkEl.getAttribute('data-size').split('x');
            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 

            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                // item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },

            showHideOpacity: true, 
            getThumbBoundsFn: false

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};


