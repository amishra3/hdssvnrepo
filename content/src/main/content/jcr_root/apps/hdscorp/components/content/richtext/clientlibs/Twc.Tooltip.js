var Twc = Twc || {};
/**
 * Manages functionality for tooltip display. Tooltips require html attribute data-tooltip on the target tooltip instantiation element.
 * Required data-tooltip JSON is {"heading", "body"}
 */

Twc.Tooltip = (function() {

    /**
     * marker to indicate link was initalized
     */
    var initializedClass = 'js-tooltip-initialized';

    var tooltipWrapperClass = 'tooltip-popup';

    var previousTarget;

    // using pseudo elements for arrow, so we must override with style tag
    var $arrowStyle = $('<style type="text/css" title="js-tooltips"></style>');

    // we must override CSS, so ensure selectors match CSS declaration
    var arrowCSSSelectors = '.tooltip-popup.top .tooltip-content:before, .tooltip-popup.top .tooltip-wrap:before, .tooltip-popup.top .tooltip-wrap:after, ' +
        '.tooltip-popup.bottom .tooltip-content:before, .tooltip-popup.bottom .tooltip-wrap:before, .tooltip-popup.bottom .tooltip-wrap:after';

    function cancelTooltipClose(id) { window.clearTimeout(id); }
    function closeAll() { $('.' + tooltipWrapperClass).hide(); }

    function error(o) { console && console.error && console.error(o); }

    function safeParseJson(s) {
        try {
            return ('undefined' !== typeof (s)) ? $.parseJSON(s) : {};
        } catch (e) {
            return {};
        }
    }

    return {
        /** initializes a group of elements Prevents double initalization.
         * @param $objects {Object} jQuery object to iterate over, instantiating on each()
         */
        init: function($objects) {
            try {
                if (typeof $objects === 'undefined' || !($objects instanceof jQuery)) {
                    return;
                }

                var $window = $(window);

                $('head').append($arrowStyle); // JQuery should only be adding this once, but it's ok to call on init()

                $objects.each(function(i) {
                    var $me = $(this);
                    if ($me.hasClass(initializedClass)) { return true; } // continue to next

                    var markup = getMarkup();
                    if (!markup) { return true; } // continue

                    var tooltipOpen = false;
                    var tooltipTappedOpen = false;
                    var $tooltip = $(markup);
                    var _oldhide = $.fn.hide;
                    $.fn.hide = function(speed, callback) { // listen to hide event from closeAll() so we can later reset tooltipOpen to false
                        $tooltip.trigger('hide');
                        return _oldhide.apply(this,arguments);
                    }

                    var timeoutId; // used to keep tooltip open for a little bit
                    var appendedToDom = false;

                    function getMarkup() {
                        var data = safeParseJson($me.attr('data-tooltip'));
                        if (!data.body) { return undefined; } // continue to next
                        var head = data.heading ? '<header>' + unescape(data.heading) + '</header>' : '';
                        var body = unescape(data.body) || '';

                        return '<div class="' + tooltipWrapperClass + ' top">' +
                                 '<div class="tooltip-content">' +
                                   '<div class="tooltip-wrap">' + head + body + '</div>' +
                                 '</div>' +
                               '</div>';
                    }

                    function delayFadeOut(immediate) {
                        var delay = (typeof immediate ==='boolean' && immediate ? 0 : 500);
                        timeoutId = window.setTimeout(function() {
                            tooltipOpen = false;
                            $tooltip.stop(true, true).fadeOut(1200, closeTooltip);
                            previousTarget = null
                        }, delay);
                    }

                    function closeTooltip() {
                        $tooltip.hide();
                    }

                    function showTooltip() {
                        // TODO: break this up into smaller, manageable pieces
                        $tooltip.stop(true, true);
                        closeAll(); // hide any other open tooltips
                        $tooltip.css('opacity', 1);

                        var screen = {
                            height: $window.height(),
                            width: $window.width(),
                            scrollTop: $(window).scrollTop(),
                            yBottom: $window.height + $('html').scrollTop()
                        };
                        var link = { // the link that triggers the tooltip
                            h: $me.outerHeight(true),
                            w: $me.outerWidth(true),
                            top: $me.offset().top,
                            left: $me.offset().left
                        };

                        var screenBottom = $window.height() + $window.scrollTop();
                        var tooltipBottom = (link.top + link.h) + $tooltip.outerHeight(true);
                        var tooltip = {
                            h: $tooltip.outerHeight(true),
                            w: $tooltip.outerWidth(true),
                            top: (tooltipBottom >= screenBottom) ? link.top - $tooltip.outerHeight(true) : link.top + link.h
                        };
                        // determine top position.  place above the source if tooltip would be off page.

                        $tooltip.removeClass('top bottom').addClass((tooltipBottom >= screenBottom) ? 'bottom' : 'top');
                        $arrowStyle.empty();

                        //Initial body position is determined by if the tooltip link extends to the next line
                        //If it does, the tooltip points to the farthest left of the link on the next line
                        //Otherwise, it points to the center of the link
                        var leftBodyPos = (link.h > 20) ? (link.left - (tooltip.w / 2)) : (link.left - (tooltip.w / 2 - link.w / 2));

                        // adjust the tooltip body, and arrow position if the body is off-screen (mobile devices)
                        if (tooltip.w > screen.width || leftBodyPos < 0) {
                            //If it's mobile/two-lines just have the arrow point 1/8 the way from the tooltip body (since we can't reasonably infer the length of the cut-off portion of text)
                            if(link.h > 20) {
                                $arrowStyle.html(arrowCSSSelectors + ' {left: ' + (tooltip.w / 8) + 'px;}');
                            }
                            //Move the body to be fully on-screen (left: 0)
                            $tooltip.css({
                                'position': 'absolute',
                                'top': tooltip.top,
                                'left': 0 + 'px'
                            });
                        }
                        //If the right corner of the tooltip extends off the right of the screen
                        else if ((leftBodyPos + tooltip.w) > screen.width) {
                            //If the screen is cut off to the right, bring the window in, and adjust the arrow to point 6/8 of the way to the right
                            $arrowStyle.html(arrowCSSSelectors + ' {left: ' + (tooltip.w / 8) * 6 + 'px;}');
                            $tooltip.css({
                                'position': 'absolute',
                                'top': tooltip.top,
                                'left': (screen.width - tooltip.w) + 'px'
                            });
                        }
                        //default, centered behavior
                        else {
                            $tooltip.css({
                                'position': 'absolute',
                                'top': tooltip.top,
                                'left': leftBodyPos + 'px'
                            });
                        }

                        $tooltip.fadeIn(200, function() { $(this).hover(); });
                        tooltipOpen = true;
                    }

                    function eventHandler(event) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        var currentTarget = event.target;
                        if (currentTarget == previousTarget && event.type == "mouseover") {
                            return
                        }
                        previousTarget = currentTarget;
                        //console && console.log('Tooltip.eventHandler('+event.type+') at '+event.timeStamp);
                        if (!appendedToDom) {
                            // ie8 requires show() on dom insert and setTimeout. Otherwise, tooltip arrows don't show until DIV is moused over
                            // opacity:0 prevents flash on screen before it's positioned where it should be.
                            $('body').append($tooltip.css('opacity', 0).show());
                            appendedToDom = true;
                        }
                        cancelTooltipClose(timeoutId);

                        if (!tooltipOpen) {
                            showTooltip();

                            // if this is a tap, we need to setup an temporary tap on the body to hide tooltip
                            if (event.type === 'tap') {
                                tooltipTappedOpen = true;
                                $('body, .compEritTable .viewDetail, .packageFooter div[class="buttonWrapper"]').one('tap', function(event) {
                                    delayFadeOut(true);
                                });
                            } else {
                                $me.one('mouseout', delayFadeOut);
                            }
                        } else if (tooltipOpen && !tooltipTappedOpen && event.type === 'tap') {
                            // mouse over displayed tooltip and was immediately followed by a tap event. Register this as a tap event
                            // this occurs with Windows tablets. Remove the mouseover listener and listen to tap instead.
                            tooltipTappedOpen = true;
                            $('body, .compEritTable .viewDetail, .packageFooter div[class="buttonWrapper"]').one('tap', function(event) {
                                delayFadeOut(true);
                            });
                            $me.off('mouseout');
                        } else if (event.type === 'tap' && tooltipTappedOpen) {
                            $('body, .compEritTable .viewDetail, .packageFooter div[class="buttonWrapper"]').off('tap');
                            delayFadeOut(true);
                        }
                    }

                    $me.addClass(initializedClass)
                        .on('tap mouseover', eventHandler);

                    $tooltip.on('hide', function() { // closeAll triggers a hide event, so we reset tootipOpen to false for all
                        tooltipTappedOpen = false;
                        tooltipOpen = false;
                    });
                });
            } catch (e) {
                console && console.group && console.group(e.name + ': ' + e.message);
                error(e);
                error(e.stack);
                console && console.group && console.groupEnd();
            }
        }
    };
}());
