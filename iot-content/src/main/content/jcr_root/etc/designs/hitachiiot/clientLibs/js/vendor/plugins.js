window.isMobileResponsive = false;
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)


/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {

  $.fn.unveil = function(threshold) {
    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1 && !SiteUtils.Is.mobileDevice(),
        mobile = SiteUtils.Is.mobileDevice(),
        mobilePortrait = SiteUtils.Is.mobilePortrait(),
        mobileLandscape = SiteUtils.Is.mobileLandscape(),
        attrib = loadDeviceImg(this),
        images = this,
        loaded,
        inview,
        source;

    this.one("unveil", function() {
      source = this.getAttribute(attrib);

      source = source || this.getAttribute("data-lowbandwidth");

      if (source) this.setAttribute("src", source);
    });

    function loadDeviceImg(element){
      var imgSrc;
      if(retina) {
          imgSrc = 'data-hisrc';
      } else if(isMobileResponsive && mobile){
                if(mobilePortrait){
                  imgSrc = 'data-mobile-portrait';
                }
                if(mobileLandscape){
                  imgSrc = 'data-mobile-landscape';
                }
                if(element && element.data('data-mobile-responsive')){
                  imgSrc = 'data-mobile-responsive';
                }
      } else {
         imgSrc = 'data-lowbandwidth';
      }
      return imgSrc;
    }
    function unveil() {
      inview = images.filter(function() {
        var $e = $(this),
            wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);

    }

    $w.scroll(unveil);
    $w.resize(unveil);

    unveil();


    return this;

  };

})(jQuery);

/* BEGIN :: CUSTOM Plugnins added for Panera

 * @project   Panera Web Unification
 * @date      2014-02-21
 * @authors   Vijay Thangavel, SapientNitro <vthangavel@sapient.com>,
 *            Arun Kumar 10, SapientNitro <akumar55@sapient.com>
 * @licensor  Panera Bread
 * @site      panerabread.com
*/

/**
 * jQuery Panera :: siteLoadPagelets
 * Simple script to autoload contents through ajax.
 * @Usage
 *  <div class="page-lazy-loader" data-path="https://www.panerabread.com/your-path"/>
 *  $('.page-lazy-loader').siteLoadPagelets();
 *
 */
;(function($){
  $.fn.siteLoadPagelets = function(){
    this.each(function(index, elem){
      var objHolder = $(elem);
      var path = objHolder.data('path');
      if(typeof path === 'string' && path.length > 0){
        $.get(path, function(response){
          objHolder.html(response);
          $('html').trigger('pagelets-loaded');
          var pathName = objHolder.data('path-name');
          if(pathName == 'general'){
            if(typeof siteGeneralTeaserLoaded == 'function'){
              var elemId = objHolder.id;
              if(elemId == undefined){
                elemId = 'elem_' + (new Date()).getTime();
                objHolder.attr('id', elemId);
              }
                siteGeneralTeaserLoaded(elemId);
             }
          }
            var teasers = objHolder.find('.teaser');
            if(teasers.length > 1){
              $(teasers[teasers.length-1]).addClass('last');
            }
          var portValue = "";
          if(window.location.port != ''){
            portValue = ':' + window.location.port;
          }
          var origin = window.location.protocol + '//' + window.location.hostname +  portValue + window.location.pathname;
          var anchorFound = false;
          objHolder.find('li a').each(function(index, anchor){
            if(!anchorFound && (anchor.href == origin)) {
              $(anchor).addClass('link-active');
              anchorFound = true;
            }
          });
          if(objHolder.closest('.teaser-column').length > 0){
            if(isMobileResponsive){
              SiteUtils.UI.enableMobileMenus(['.teaser-column .page-lazy-loader '], true);
              SiteUtils.UI.mobileMenu();
            }else{
              SiteUtils.UI.enableMobileMenus(['.teaser-column .page-lazy-loader '], true);
            }
          }
        });
      }
    });
    return this;
  };
})(jQuery);
/**
 * jQuery Panera :: siteHideProgress
 * Removing submission progress.
  */
;(function($){
  $.fn.siteHideProgress = function(){
    var maskId = this.data('ui-mask-id');
    if($('#' + maskId).length > 0){
        $('#' + maskId).remove();
    }
    return this;
  }
})(jQuery);
/**
 * jQuery Panera :: siteShowProgress
 * Adding submission progress.
  */
;(function($){
  $.fn.siteShowProgress = function(show_near){
  var containerObj = this;
  var containerId = containerObj.prop('id');
  if(typeof containerId === 'string' && containerId.length <= 0){
    containerId = containerObj.prop('tagName') + '_' + Math.round(new Date().getTime() + (Math.random() * 100));
    containerObj.prop('id', containerId);
  }
  var isLargeMask = containerObj.data('ui-large-mask');

  var maskId = containerId + '_progressing';
  containerObj.data('ui-mask-id', maskId);
  var dObj = $('#' + maskId);

  if(dObj.length <= 0){
    containerObj.prepend('<div id="'+ maskId +'"></div>')
    dObj = $('#' + maskId)
  }
  try{
    dObj.addClass('block-mask');
    if(isLargeMask){
      dObj.addClass('is-large');
    }
    var offsets = containerObj.position();
    dObj.css('width', containerObj.width() + 'px');
    dObj.css('height', containerObj.height() + 'px');
    var loaderIconPos = parseInt((containerObj.height() / 2), 10);
    if(typeof show_near === 'object'){
      loaderIconPos = (show_near.position().top - (show_near.height() / 2));
    }
    dObj.css('background-position-y', loaderIconPos + 'px');
    dObj.html('<p>&nbsp;</p>');
  }catch(e){
    SiteUtils.log(e.message);
    dObj.remove();
  }
    return this;
  };
})(jQuery);
;(function($){
  var count = 0;
  $.fn.siteAddSuperScript = function(){
    this.each(function(index, elem){
      var objHolder = $(elem);
      var html = objHolder.html();
      html = unescape(escape(html).replace(/%3Csup%3E%AE%3C\/sup%3E/gi, '%AE').replace(/%AE/g, '%3Csup%3E%AE%3C/sup%3E'));
      objHolder.html(html).show();
    });
    return this;
  }
})(jQuery);
;(function($){
  $.fn.siteAlignRightNav = function(clear){
    this.each(function(index, elem){
      var objHolder = $(elem);
      var text = objHolder.text();
      if(text.length > 18){
        if(!clear){
          objHolder.css('margin-bottom' , '0.7em');
        }else{
          objHolder.css('margin-bottom' , '1.7em');
        }
      }
    });
    return this;
  }
})(jQuery);
;(function($){
  $.fn.siteEqualizeHeights = function() {
    var maxHeight = this.map(function( i, e ) {
      $(e).css('min-height', '0');
      return $(e).height();
    }).get();
    return this.css('min-height',( Math.max.apply( this, maxHeight ) ));
  };
})(jQuery);

;(function($){
  $.fn.siteAlignGridImages = function() {
    var minHeight = this.map(function( i, e ) {
      $(e).css('overflow', 'hidden');
      return $(e).height();
    }).get();
    return this.css('height',( Math.min.apply( this, minHeight ) ));
  };
})(jQuery);

;(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       only accounts for vertical position, not horizontal.
     */
    $.fn.viewportVisible = function(partial, bottomOffset){

        var $t              = $(this),
            $w              = $(window),
            bottomOffset    = bottomOffset || 1;
            viewTop         = $w.scrollTop(),
            viewBottom      = viewTop + $w.height() + bottomOffset,
            _top            = $t.offset().top,
            _bottom         = _top + $t.height(),
            compareTop      = partial === true ? _bottom : _top,
            compareBottom   = partial === true ? _top : _bottom;
        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };

})(jQuery);

/* END :: CUSTOM Plugnins added for Panera */

$(document).ready(function() {
  isMobileResponsive = ($('#mobile-page-header #toolbarNav').length > 0);
  //isMobileResponsive = false;
  if(isMobileResponsive){
    $('body').addClass('has-mob-nav');
  }
  /* set initial article position */
  // $('.home-page section:first-child article').css('top','40%');
  /* Scroll event handler */
  /* $(window).bind('scroll',function(e){
    parallaxScroll();
  }); */
  $(".main-content img").unveil(200);
  // call for mobile orientation change
  $(window).on('orientationchange', function(event){
      $(".main-content img").unveil(200);
  });
  $('.main-content .page-lazy-loader').siteLoadPagelets();
  $('.main-content .item-name, .main-content .item-content h2, .main-content .text-content h1, .mob-text-banner h1').siteAddSuperScript();
  
});