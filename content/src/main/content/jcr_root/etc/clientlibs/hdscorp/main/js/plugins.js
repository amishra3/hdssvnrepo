/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

//! moment.js
//! version : 2.10.2
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Ac.apply(null,arguments)}function b(a){Ac=a}function c(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function d(a){return"[object Array]"===Object.prototype.toString.call(a)}function e(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function f(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function g(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function h(a,b){for(var c in b)g(b,c)&&(a[c]=b[c]);return g(b,"toString")&&(a.toString=b.toString),g(b,"valueOf")&&(a.valueOf=b.valueOf),a}function i(a,b,c,d){return ya(a,b,c,d,!0).utc()}function j(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length&&void 0===a._pf.bigHour)),a._isValid}function k(a){var b=i(0/0);return null!=a?h(b._pf,a):b._pf.userInvalidated=!0,b}function l(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=b._pf),"undefined"!=typeof b._locale&&(a._locale=b._locale),Cc.length>0)for(c in Cc)d=Cc[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function m(b){l(this,b),this._d=new Date(+b._d),Dc===!1&&(Dc=!0,a.updateOffset(this),Dc=!1)}function n(a){return a instanceof m||null!=a&&g(a,"_isAMomentObject")}function o(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function p(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&o(a[d])!==o(b[d]))&&g++;return g+f}function q(){}function r(a){return a?a.toLowerCase().replace("_","-"):a}function s(a){for(var b,c,d,e,f=0;f<a.length;){for(e=r(a[f]).split("-"),b=e.length,c=r(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=t(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&p(e,c,!0)>=b-1)break;b--}f++}return null}function t(a){var b=null;if(!Ec[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=Bc._abbr,require("./locale/"+a),u(b)}catch(c){}return Ec[a]}function u(a,b){var c;return a&&(c="undefined"==typeof b?w(a):v(a,b),c&&(Bc=c)),Bc._abbr}function v(a,b){return null!==b?(b.abbr=a,Ec[a]||(Ec[a]=new q),Ec[a].set(b),u(a),Ec[a]):(delete Ec[a],null)}function w(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Bc;if(!d(a)){if(b=t(a))return b;a=[a]}return s(a)}function x(a,b){var c=a.toLowerCase();Fc[c]=Fc[c+"s"]=Fc[b]=a}function y(a){return"string"==typeof a?Fc[a]||Fc[a.toLowerCase()]:void 0}function z(a){var b,c,d={};for(c in a)g(a,c)&&(b=y(c),b&&(d[b]=a[c]));return d}function A(b,c){return function(d){return null!=d?(C(this,b,d),a.updateOffset(this,c),this):B(this,b)}}function B(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function C(a,b,c){return a._d["set"+(a._isUTC?"UTC":"")+b](c)}function D(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=y(a),"function"==typeof this[a])return this[a](b);return this}function E(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function F(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Jc[a]=e),b&&(Jc[b[0]]=function(){return E(e.apply(this,arguments),b[1],b[2])}),c&&(Jc[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function G(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function H(a){var b,c,d=a.match(Gc);for(b=0,c=d.length;c>b;b++)d[b]=Jc[d[b]]?Jc[d[b]]:G(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function I(a,b){return a.isValid()?(b=J(b,a.localeData()),Ic[b]||(Ic[b]=H(b)),Ic[b](a)):a.localeData().invalidDate()}function J(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Hc.lastIndex=0;d>=0&&Hc.test(a);)a=a.replace(Hc,c),Hc.lastIndex=0,d-=1;return a}function K(a,b,c){Yc[a]="function"==typeof b?b:function(a){return a&&c?c:b}}function L(a,b){return g(Yc,a)?Yc[a](b._strict,b._locale):new RegExp(M(a))}function M(a){return a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function N(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=o(a)}),c=0;c<a.length;c++)Zc[a[c]]=d}function O(a,b){N(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function P(a,b,c){null!=b&&g(Zc,a)&&Zc[a](b,c._a,c,a)}function Q(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function R(a){return this._months[a.month()]}function S(a){return this._monthsShort[a.month()]}function T(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=i([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function U(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),Q(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function V(b){return null!=b?(U(this,b),a.updateOffset(this,!0),this):B(this,"Month")}function W(){return Q(this.year(),this.month())}function X(a){var b,c=a._a;return c&&-2===a._pf.overflow&&(b=c[_c]<0||c[_c]>11?_c:c[ad]<1||c[ad]>Q(c[$c],c[_c])?ad:c[bd]<0||c[bd]>24||24===c[bd]&&(0!==c[cd]||0!==c[dd]||0!==c[ed])?bd:c[cd]<0||c[cd]>59?cd:c[dd]<0||c[dd]>59?dd:c[ed]<0||c[ed]>999?ed:-1,a._pf._overflowDayOfYear&&($c>b||b>ad)&&(b=ad),a._pf.overflow=b),a}function Y(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function Z(a,b){var c=!0;return h(function(){return c&&(Y(a),c=!1),b.apply(this,arguments)},b)}function $(a,b){hd[a]||(Y(b),hd[a]=!0)}function _(a){var b,c,d=a._i,e=id.exec(d);if(e){for(a._pf.iso=!0,b=0,c=jd.length;c>b;b++)if(jd[b][1].exec(d)){a._f=jd[b][0]+(e[6]||" ");break}for(b=0,c=kd.length;c>b;b++)if(kd[b][1].exec(d)){a._f+=kd[b][0];break}d.match(Vc)&&(a._f+="Z"),sa(a)}else a._isValid=!1}function aa(b){var c=ld.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(_(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function ba(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function ca(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function da(a){return ea(a)?366:365}function ea(a){return a%4===0&&a%100!==0||a%400===0}function fa(){return ea(this.year())}function ga(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=za(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function ha(a){return ga(a,this._week.dow,this._week.doy).week}function ia(){return this._week.dow}function ja(){return this._week.doy}function ka(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function la(a){var b=ga(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function ma(a,b,c,d,e){var f,g,h=ca(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:da(a-1)+g}}function na(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function oa(a,b,c){return null!=a?a:null!=b?b:c}function pa(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function qa(a){var b,c,d,e,f=[];if(!a._d){for(d=pa(a),a._w&&null==a._a[ad]&&null==a._a[_c]&&ra(a),a._dayOfYear&&(e=oa(a._a[$c],d[$c]),a._dayOfYear>da(e)&&(a._pf._overflowDayOfYear=!0),c=ca(e,0,a._dayOfYear),a._a[_c]=c.getUTCMonth(),a._a[ad]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[bd]&&0===a._a[cd]&&0===a._a[dd]&&0===a._a[ed]&&(a._nextDay=!0,a._a[bd]=0),a._d=(a._useUTC?ca:ba).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[bd]=24)}}function ra(a){var b,c,d,e,f,g,h;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=oa(b.GG,a._a[$c],ga(za(),1,4).year),d=oa(b.W,1),e=oa(b.E,1)):(f=a._locale._week.dow,g=a._locale._week.doy,c=oa(b.gg,a._a[$c],ga(za(),f,g).year),d=oa(b.w,1),null!=b.d?(e=b.d,f>e&&++d):e=null!=b.e?b.e+f:f),h=ma(c,d,e,g,f),a._a[$c]=h.year,a._dayOfYear=h.dayOfYear}function sa(b){if(b._f===a.ISO_8601)return void _(b);b._a=[],b._pf.empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=J(b._f,b._locale).match(Gc)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(L(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&b._pf.unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),Jc[f]?(d?b._pf.empty=!1:b._pf.unusedTokens.push(f),P(f,d,b)):b._strict&&!d&&b._pf.unusedTokens.push(f);b._pf.charsLeftOver=i-j,h.length>0&&b._pf.unusedInput.push(h),b._pf.bigHour===!0&&b._a[bd]<=12&&(b._pf.bigHour=void 0),b._a[bd]=ta(b._locale,b._a[bd],b._meridiem),qa(b),X(b)}function ta(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function ua(a){var b,d,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,b=l({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._pf=c(),b._f=a._f[f],sa(b),j(b)&&(g+=b._pf.charsLeftOver,g+=10*b._pf.unusedTokens.length,b._pf.score=g,(null==e||e>g)&&(e=g,d=b));h(a,d||b)}function va(a){if(!a._d){var b=z(a._i);a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],qa(a)}}function wa(a){var b,c=a._i,e=a._f;return a._locale=a._locale||w(a._l),null===c||void 0===e&&""===c?k({nullInput:!0}):("string"==typeof c&&(a._i=c=a._locale.preparse(c)),n(c)?new m(X(c)):(d(e)?ua(a):e?sa(a):xa(a),b=new m(X(a)),b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b))}function xa(b){var c=b._i;void 0===c?b._d=new Date:e(c)?b._d=new Date(+c):"string"==typeof c?aa(b):d(c)?(b._a=f(c.slice(0),function(a){return parseInt(a,10)}),qa(b)):"object"==typeof c?va(b):"number"==typeof c?b._d=new Date(c):a.createFromInputFallback(b)}function ya(a,b,d,e,f){var g={};return"boolean"==typeof d&&(e=d,d=void 0),g._isAMomentObject=!0,g._useUTC=g._isUTC=f,g._l=d,g._i=a,g._f=b,g._strict=e,g._pf=c(),wa(g)}function za(a,b,c,d){return ya(a,b,c,d,!1)}function Aa(a,b){var c,e;if(1===b.length&&d(b[0])&&(b=b[0]),!b.length)return za();for(c=b[0],e=1;e<b.length;++e)b[e][a](c)&&(c=b[e]);return c}function Ba(){var a=[].slice.call(arguments,0);return Aa("isBefore",a)}function Ca(){var a=[].slice.call(arguments,0);return Aa("isAfter",a)}function Da(a){var b=z(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=w(),this._bubble()}function Ea(a){return a instanceof Da}function Fa(a,b){F(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+E(~~(a/60),2)+b+E(~~a%60,2)})}function Ga(a){var b=(a||"").match(Vc)||[],c=b[b.length-1]||[],d=(c+"").match(qd)||["-",0,0],e=+(60*d[1])+o(d[2]);return"+"===d[0]?e:-e}function Ha(b,c){var d,f;return c._isUTC?(d=c.clone(),f=(n(b)||e(b)?+b:+za(b))-+d,d._d.setTime(+d._d+f),a.updateOffset(d,!1),d):za(b).local();return c._isUTC?za(b).zone(c._offset||0):za(b).local()}function Ia(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ja(b,c){var d,e=this._offset||0;return null!=b?("string"==typeof b&&(b=Ga(b)),Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ia(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?Za(this,Ua(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ia(this)}function Ka(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function La(a){return this.utcOffset(0,a)}function Ma(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ia(this),"m")),this}function Na(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ga(this._i)),this}function Oa(a){return a=a?za(a).utcOffset():0,(this.utcOffset()-a)%60===0}function Pa(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Qa(){if(this._a){var a=this._isUTC?i(this._a):za(this._a);return this.isValid()&&p(this._a,a.toArray())>0}return!1}function Ra(){return!this._isUTC}function Sa(){return this._isUTC}function Ta(){return this._isUTC&&0===this._offset}function Ua(a,b){var c,d,e,f=a,h=null;return Ea(a)?f={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(f={},b?f[b]=a:f.milliseconds=a):(h=rd.exec(a))?(c="-"===h[1]?-1:1,f={y:0,d:o(h[ad])*c,h:o(h[bd])*c,m:o(h[cd])*c,s:o(h[dd])*c,ms:o(h[ed])*c}):(h=sd.exec(a))?(c="-"===h[1]?-1:1,f={y:Va(h[2],c),M:Va(h[3],c),d:Va(h[4],c),h:Va(h[5],c),m:Va(h[6],c),s:Va(h[7],c),w:Va(h[8],c)}):null==f?f={}:"object"==typeof f&&("from"in f||"to"in f)&&(e=Xa(za(f.from),za(f.to)),f={},f.ms=e.milliseconds,f.M=e.months),d=new Da(f),Ea(a)&&g(a,"_locale")&&(d._locale=a._locale),d}function Va(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function Wa(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Xa(a,b){var c;return b=Ha(b,a),a.isBefore(b)?c=Wa(a,b):(c=Wa(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function Ya(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||($(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Ua(c,d),Za(this,e,a),this}}function Za(b,c,d,e){var f=c._milliseconds,g=c._days,h=c._months;e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&C(b,"Date",B(b,"Date")+g*d),h&&U(b,B(b,"Month")+h*d),e&&a.updateOffset(b,g||h)}function $a(a){var b=a||za(),c=Ha(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this,za(b)))}function _a(){return new m(this)}function ab(a,b){var c;return b=y("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=n(a)?a:za(a),+this>+a):(c=n(a)?+a:+za(a),c<+this.clone().startOf(b))}function bb(a,b){var c;return b=y("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=n(a)?a:za(a),+a>+this):(c=n(a)?+a:+za(a),+this.clone().endOf(b)<c)}function cb(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function db(a,b){var c;return b=y(b||"millisecond"),"millisecond"===b?(a=n(a)?a:za(a),+this===+a):(c=+za(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))}function eb(a){return 0>a?Math.ceil(a):Math.floor(a)}function fb(a,b,c){var d,e,f=Ha(a,this),g=6e4*(f.utcOffset()-this.utcOffset());return b=y(b),"year"===b||"month"===b||"quarter"===b?(e=gb(this,f),"quarter"===b?e/=3:"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:eb(e)}function gb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function hb(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ib(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():I(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):I(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function jb(b){var c=I(this,b||a.defaultFormat);return this.localeData().postformat(c)}function kb(a,b){return Ua({to:this,from:a}).locale(this.locale()).humanize(!b)}function lb(a){return this.from(za(),a)}function mb(a){var b;return void 0===a?this._locale._abbr:(b=w(a),null!=b&&(this._locale=b),this)}function nb(){return this._locale}function ob(a){switch(a=y(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function pb(a){return a=y(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function qb(){return+this._d-6e4*(this._offset||0)}function rb(){return Math.floor(+this/1e3)}function sb(){return this._offset?new Date(+this):this._d}function tb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function ub(){return j(this)}function vb(){return h({},this._pf)}function wb(){return this._pf.overflow}function xb(a,b){F(0,[a,a.length],0,b)}function yb(a,b,c){return ga(za([a,11,31+b-c]),b,c).week}function zb(a){var b=ga(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")}function Ab(a){var b=ga(this,1,4).year;return null==a?b:this.add(a-b,"y")}function Bb(){return yb(this.year(),1,4)}function Cb(){var a=this.localeData()._week;return yb(this.year(),a.dow,a.doy)}function Db(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Eb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function Fb(a){return this._weekdays[a.day()]}function Gb(a){return this._weekdaysShort[a.day()]}function Hb(a){return this._weekdaysMin[a.day()]}function Ib(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=za([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b}function Jb(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Eb(a,this.localeData()),this.add(a-b,"d")):b}function Kb(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Lb(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)}function Mb(a,b){F(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function Nb(a,b){return b._meridiemParse}function Ob(a){return"p"===(a+"").toLowerCase().charAt(0)}function Pb(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Qb(a){F(0,[a,3],0,"millisecond")}function Rb(){return this._isUTC?"UTC":""}function Sb(){return this._isUTC?"Coordinated Universal Time":""}function Tb(a){return za(1e3*a)}function Ub(){return za.apply(null,arguments).parseZone()}function Vb(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.call(b,c):d}function Wb(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b}function Xb(){return this._invalidDate}function Yb(a){return this._ordinal.replace("%d",a)}function Zb(a){return a}function $b(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)}function _b(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)}function ac(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function bc(a,b,c,d){var e=w(),f=i().set(d,b);return e[c](f,a)}function cc(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return bc(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=bc(a,f,c,e);return g}function dc(a,b){return cc(a,b,"months",12,"month")}function ec(a,b){return cc(a,b,"monthsShort",12,"month")}function fc(a,b){return cc(a,b,"weekdays",7,"day")}function gc(a,b){return cc(a,b,"weekdaysShort",7,"day")}function hc(a,b){return cc(a,b,"weekdaysMin",7,"day")}function ic(){var a=this._data;return this._milliseconds=Od(this._milliseconds),this._days=Od(this._days),this._months=Od(this._months),a.milliseconds=Od(a.milliseconds),a.seconds=Od(a.seconds),a.minutes=Od(a.minutes),a.hours=Od(a.hours),a.months=Od(a.months),a.years=Od(a.years),this}function jc(a,b,c,d){var e=Ua(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function kc(a,b){return jc(this,a,b,1)}function lc(a,b){return jc(this,a,b,-1)}function mc(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;return g.milliseconds=d%1e3,a=eb(d/1e3),g.seconds=a%60,b=eb(a/60),g.minutes=b%60,c=eb(b/60),g.hours=c%24,e+=eb(c/24),h=eb(nc(e)),e-=eb(oc(h)),f+=eb(e/30),e%=30,h+=eb(f/12),f%=12,g.days=e,g.months=f,g.years=h,this}function nc(a){return 400*a/146097}function oc(a){return 146097*a/400}function pc(a){var b,c,d=this._milliseconds;if(a=y(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+12*nc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(oc(this._months/12)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 24*b*60+d/6e4;case"second":return 24*b*60*60+d/1e3;case"millisecond":return Math.floor(24*b*60*60*1e3)+d;default:throw new Error("Unknown unit "+a)}}function qc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*o(this._months/12)}function rc(a){return function(){return this.as(a)}}function sc(a){return a=y(a),this[a+"s"]()}function tc(a){return function(){return this._data[a]}}function uc(){return eb(this.days()/7)}function vc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function wc(a,b,c){var d=Ua(a).abs(),e=ce(d.as("s")),f=ce(d.as("m")),g=ce(d.as("h")),h=ce(d.as("d")),i=ce(d.as("M")),j=ce(d.as("y")),k=e<de.s&&["s",e]||1===f&&["m"]||f<de.m&&["mm",f]||1===g&&["h"]||g<de.h&&["hh",g]||1===h&&["d"]||h<de.d&&["dd",h]||1===i&&["M"]||i<de.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,vc.apply(null,k)}function xc(a,b){return void 0===de[a]?!1:void 0===b?de[a]:(de[a]=b,!0)}function yc(a){var b=this.localeData(),c=wc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function zc(){var a=ee(this.years()),b=ee(this.months()),c=ee(this.days()),d=ee(this.hours()),e=ee(this.minutes()),f=ee(this.seconds()+this.milliseconds()/1e3),g=this.asSeconds();return g?(0>g?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}var Ac,Bc,Cc=a.momentProperties=[],Dc=!1,Ec={},Fc={},Gc=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,Hc=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Ic={},Jc={},Kc=/\d/,Lc=/\d\d/,Mc=/\d{3}/,Nc=/\d{4}/,Oc=/[+-]?\d{6}/,Pc=/\d\d?/,Qc=/\d{1,3}/,Rc=/\d{1,4}/,Sc=/[+-]?\d{1,6}/,Tc=/\d+/,Uc=/[+-]?\d+/,Vc=/Z|[+-]\d\d:?\d\d/gi,Wc=/[+-]?\d+(\.\d{1,3})?/,Xc=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Yc={},Zc={},$c=0,_c=1,ad=2,bd=3,cd=4,dd=5,ed=6;F("M",["MM",2],"Mo",function(){return this.month()+1}),F("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),F("MMMM",0,0,function(a){return this.localeData().months(this,a)}),x("month","M"),K("M",Pc),K("MM",Pc,Lc),K("MMM",Xc),K("MMMM",Xc),N(["M","MM"],function(a,b){b[_c]=o(a)-1}),N(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[_c]=e:c._pf.invalidMonth=a});var fd="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),gd="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),hd={};a.suppressDeprecationWarnings=!1;var id=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,jd=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],kd=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],ld=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=Z("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),F(0,["YY",2],0,function(){return this.year()%100}),F(0,["YYYY",4],0,"year"),F(0,["YYYYY",5],0,"year"),F(0,["YYYYYY",6,!0],0,"year"),x("year","y"),K("Y",Uc),K("YY",Pc,Lc),K("YYYY",Rc,Nc),K("YYYYY",Sc,Oc),K("YYYYYY",Sc,Oc),N(["YYYY","YYYYY","YYYYYY"],$c),N("YY",function(b,c){c[$c]=a.parseTwoDigitYear(b)}),a.parseTwoDigitYear=function(a){return o(a)+(o(a)>68?1900:2e3)};var md=A("FullYear",!1);F("w",["ww",2],"wo","week"),F("W",["WW",2],"Wo","isoWeek"),x("week","w"),x("isoWeek","W"),K("w",Pc),K("ww",Pc,Lc),K("W",Pc),K("WW",Pc,Lc),O(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=o(a)});var nd={dow:0,doy:6};F("DDD",["DDDD",3],"DDDo","dayOfYear"),x("dayOfYear","DDD"),K("DDD",Qc),K("DDDD",Mc),N(["DDD","DDDD"],function(a,b,c){c._dayOfYear=o(a)}),a.ISO_8601=function(){};var od=Z("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=za.apply(null,arguments);return this>a?this:a}),pd=Z("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=za.apply(null,arguments);return a>this?this:a});Fa("Z",":"),Fa("ZZ",""),K("Z",Vc),K("ZZ",Vc),N(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ga(a)});var qd=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var rd=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,sd=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Ua.fn=Da.prototype;var td=Ya(1,"add"),ud=Ya(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var vd=Z("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});F(0,["gg",2],0,function(){return this.weekYear()%100}),F(0,["GG",2],0,function(){return this.isoWeekYear()%100}),xb("gggg","weekYear"),xb("ggggg","weekYear"),xb("GGGG","isoWeekYear"),xb("GGGGG","isoWeekYear"),x("weekYear","gg"),x("isoWeekYear","GG"),K("G",Uc),K("g",Uc),K("GG",Pc,Lc),K("gg",Pc,Lc),K("GGGG",Rc,Nc),K("gggg",Rc,Nc),K("GGGGG",Sc,Oc),K("ggggg",Sc,Oc),O(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=o(a)}),O(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),F("Q",0,0,"quarter"),x("quarter","Q"),K("Q",Kc),N("Q",function(a,b){b[_c]=3*(o(a)-1)}),F("D",["DD",2],"Do","date"),x("date","D"),K("D",Pc),K("DD",Pc,Lc),K("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),N(["D","DD"],ad),N("Do",function(a,b){b[ad]=o(a.match(Pc)[0],10)});var wd=A("Date",!0);F("d",0,"do","day"),F("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),F("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),F("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),F("e",0,0,"weekday"),F("E",0,0,"isoWeekday"),x("day","d"),x("weekday","e"),x("isoWeekday","E"),K("d",Pc),K("e",Pc),K("E",Pc),K("dd",Xc),K("ddd",Xc),K("dddd",Xc),O(["dd","ddd","dddd"],function(a,b,c){var d=c._locale.weekdaysParse(a);null!=d?b.d=d:c._pf.invalidWeekday=a}),O(["d","e","E"],function(a,b,c,d){b[d]=o(a)});var xd="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),yd="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),zd="Su_Mo_Tu_We_Th_Fr_Sa".split("_");F("H",["HH",2],0,"hour"),F("h",["hh",2],0,function(){return this.hours()%12||12}),Mb("a",!0),Mb("A",!1),x("hour","h"),K("a",Nb),K("A",Nb),K("H",Pc),K("h",Pc),K("HH",Pc,Lc),K("hh",Pc,Lc),N(["H","HH"],bd),N(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),N(["h","hh"],function(a,b,c){b[bd]=o(a),c._pf.bigHour=!0});var Ad=/[ap]\.?m?\.?/i,Bd=A("Hours",!0);F("m",["mm",2],0,"minute"),x("minute","m"),K("m",Pc),K("mm",Pc,Lc),N(["m","mm"],cd);var Cd=A("Minutes",!1);F("s",["ss",2],0,"second"),x("second","s"),K("s",Pc),K("ss",Pc,Lc),N(["s","ss"],dd);var Dd=A("Seconds",!1);F("S",0,0,function(){return~~(this.millisecond()/100)}),F(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),Qb("SSS"),Qb("SSSS"),x("millisecond","ms"),K("S",Qc,Kc),K("SS",Qc,Lc),K("SSS",Qc,Mc),K("SSSS",Tc),N(["S","SS","SSS","SSSS"],function(a,b){b[ed]=o(1e3*("0."+a))});var Ed=A("Milliseconds",!1);F("z",0,0,"zoneAbbr"),F("zz",0,0,"zoneName");var Fd=m.prototype;Fd.add=td,Fd.calendar=$a,Fd.clone=_a,Fd.diff=fb,Fd.endOf=pb,Fd.format=jb,Fd.from=kb,Fd.fromNow=lb,Fd.get=D,Fd.invalidAt=wb,Fd.isAfter=ab,Fd.isBefore=bb,Fd.isBetween=cb,Fd.isSame=db,Fd.isValid=ub,Fd.lang=vd,Fd.locale=mb,Fd.localeData=nb,Fd.max=pd,Fd.min=od,Fd.parsingFlags=vb,Fd.set=D,Fd.startOf=ob,Fd.subtract=ud,Fd.toArray=tb,Fd.toDate=sb,Fd.toISOString=ib,Fd.toJSON=ib,Fd.toString=hb,Fd.unix=rb,Fd.valueOf=qb,Fd.year=md,Fd.isLeapYear=fa,Fd.weekYear=zb,Fd.isoWeekYear=Ab,Fd.quarter=Fd.quarters=Db,Fd.month=V,Fd.daysInMonth=W,Fd.week=Fd.weeks=ka,Fd.isoWeek=Fd.isoWeeks=la,Fd.weeksInYear=Cb,Fd.isoWeeksInYear=Bb,Fd.date=wd,Fd.day=Fd.days=Jb,Fd.weekday=Kb,Fd.isoWeekday=Lb,Fd.dayOfYear=na,Fd.hour=Fd.hours=Bd,Fd.minute=Fd.minutes=Cd,Fd.second=Fd.seconds=Dd,Fd.millisecond=Fd.milliseconds=Ed,Fd.utcOffset=Ja,Fd.utc=La,Fd.local=Ma,Fd.parseZone=Na,Fd.hasAlignedHourOffset=Oa,Fd.isDST=Pa,Fd.isDSTShifted=Qa,Fd.isLocal=Ra,Fd.isUtcOffset=Sa,Fd.isUtc=Ta,Fd.isUTC=Ta,Fd.zoneAbbr=Rb,Fd.zoneName=Sb,Fd.dates=Z("dates accessor is deprecated. Use date instead.",wd),Fd.months=Z("months accessor is deprecated. Use month instead",V),Fd.years=Z("years accessor is deprecated. Use year instead",md),Fd.zone=Z("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Ka);var Gd=Fd,Hd={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Id={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},Jd="Invalid date",Kd="%d",Ld=/\d{1,2}/,Md={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Nd=q.prototype;Nd._calendar=Hd,Nd.calendar=Vb,Nd._longDateFormat=Id,Nd.longDateFormat=Wb,Nd._invalidDate=Jd,Nd.invalidDate=Xb,Nd._ordinal=Kd,Nd.ordinal=Yb,Nd._ordinalParse=Ld,
Nd.preparse=Zb,Nd.postformat=Zb,Nd._relativeTime=Md,Nd.relativeTime=$b,Nd.pastFuture=_b,Nd.set=ac,Nd.months=R,Nd._months=fd,Nd.monthsShort=S,Nd._monthsShort=gd,Nd.monthsParse=T,Nd.week=ha,Nd._week=nd,Nd.firstDayOfYear=ja,Nd.firstDayOfWeek=ia,Nd.weekdays=Fb,Nd._weekdays=xd,Nd.weekdaysMin=Hb,Nd._weekdaysMin=zd,Nd.weekdaysShort=Gb,Nd._weekdaysShort=yd,Nd.weekdaysParse=Ib,Nd.isPM=Ob,Nd._meridiemParse=Ad,Nd.meridiem=Pb,u("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===o(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=Z("moment.lang is deprecated. Use moment.locale instead.",u),a.langData=Z("moment.langData is deprecated. Use moment.localeData instead.",w);var Od=Math.abs,Pd=rc("ms"),Qd=rc("s"),Rd=rc("m"),Sd=rc("h"),Td=rc("d"),Ud=rc("w"),Vd=rc("M"),Wd=rc("y"),Xd=tc("milliseconds"),Yd=tc("seconds"),Zd=tc("minutes"),$d=tc("hours"),_d=tc("days"),ae=tc("months"),be=tc("years"),ce=Math.round,de={s:45,m:45,h:22,d:26,M:11},ee=Math.abs,fe=Da.prototype;fe.abs=ic,fe.add=kc,fe.subtract=lc,fe.as=pc,fe.asMilliseconds=Pd,fe.asSeconds=Qd,fe.asMinutes=Rd,fe.asHours=Sd,fe.asDays=Td,fe.asWeeks=Ud,fe.asMonths=Vd,fe.asYears=Wd,fe.valueOf=qc,fe._bubble=mc,fe.get=sc,fe.milliseconds=Xd,fe.seconds=Yd,fe.minutes=Zd,fe.hours=$d,fe.days=_d,fe.weeks=uc,fe.months=ae,fe.years=be,fe.humanize=yc,fe.toISOString=zc,fe.toString=zc,fe.toJSON=zc,fe.locale=mb,fe.localeData=nb,fe.toIsoString=Z("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",zc),fe.lang=vd,F("X",0,0,"unix"),F("x",0,0,"valueOf"),K("x",Uc),K("X",Wc),N("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),N("x",function(a,b,c){c._d=new Date(o(a))}),a.version="2.10.2",b(za),a.fn=Gd,a.min=Ba,a.max=Ca,a.utc=i,a.unix=Tb,a.months=dc,a.isDate=e,a.locale=u,a.invalid=k,a.duration=Ua,a.isMoment=n,a.weekdays=fc,a.parseZone=Ub,a.localeData=w,a.isDuration=Ea,a.monthsShort=ec,a.weekdaysMin=hc,a.defineLocale=v,a.weekdaysShort=gc,a.normalizeUnits=y,a.relativeTimeThreshold=xc;var ge=a;return ge});
// daterangepicker.js
// version : 0.0.9
// author : Chunlong Liu
// last updated at: 2015-10-30
// license : MIT
// www.jszen.com

(function (factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['jquery', 'moment'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
      // CommonJS. Register as a module
      module.exports = factory(require('jquery'), require('moment'));
    } else {
      // Browser globals
      factory(jQuery, moment);
    }
}(function ($, moment)
{

  $.dateRangePickerLanguages =
  {
    'default':  //default language: English
    {
      'selected': 'Selected:',
      'day':'Day',
      'days': 'Days',
      'apply': 'Close',
      'week-1' : 'mo',
      'week-2' : 'tu',
      'week-3' : 'we',
      'week-4' : 'th',
      'week-5' : 'fr',
      'week-6' : 'sa',
      'week-7' : 'su',
      'week-number': 'W',
      'month-name': ['january','february','march','april','may','june','july','august','september','october','november','december'],
      'shortcuts' : 'Shortcuts',
      'custom-values': 'Custom Values',
      'past': 'Past',
      'following':'Following',
      'previous' : 'Previous',
      'prev-week' : 'Week',
      'prev-month' : 'Month',
      'prev-year' : 'Year',
      'next':'Next',
      'next-week':'Week',
      'next-month':'Month',
      'next-year':'Year',
      'less-than' : 'Date range should not be more than %d days',
      'more-than' : 'Date range should not be less than %d days',
      'default-more' : 'Please select a date range longer than %d days',
      'default-single' : 'Please select a date',
      'default-less' : 'Please select a date range less than %d days',
      'default-range' : 'Please select a date range between %d and %d days',
      'default-default': 'Please select a date range',
      'time':'Time',
      'hour':'Hour',
      'minute':'Minute'
    },
    'az':
    {
      'selected': 'Seçildi:',
      'day':' gün',
      'days': ' gün',
      'apply': 'tətbiq',
      'week-1' : '1',
      'week-2' : '2',
      'week-3' : '3',
      'week-4' : '4',
      'week-5' : '5',
      'week-6' : '6',
      'week-7' : '7',
      'month-name': ['yanvar','fevral','mart','aprel','may','iyun','iyul','avqust','sentyabr','oktyabr','noyabr','dekabr'],
      'shortcuts' : 'Qısayollar',
      'past': 'Keçmiş',
      'following':'Növbəti',
      'previous' : '&nbsp;&nbsp;&nbsp;',
      'prev-week' : 'Öncəki həftə',
      'prev-month' : 'Öncəki ay',
      'prev-year' : 'Öncəki il',
      'next': '&nbsp;&nbsp;&nbsp;',
      'next-week':'Növbəti həftə',
      'next-month':'Növbəti ay',
      'next-year':'Növbəti il',
      'less-than' : 'Tarix aralığı %d gündən çox olmamalıdır',
      'more-than' : 'Tarix aralığı %d gündən az olmamalıdır',
      'default-more' : '%d gündən çox bir tarix seçin',
      'default-single' : 'Tarix seçin',
      'default-less' : '%d gündən az bir tarix seçin',
      'default-range' : '%d və %d gün aralığında tarixlər seçin',
      'default-default': 'Tarix aralığı seçin'
    },
    'cn':  //simplified chinese
    {
      'selected': '已选择:',
      'day':'天',
      'days': '天',
      'apply': '确定',
      'week-1' : '一',
      'week-2' : '二',
      'week-3' : '三',
      'week-4' : '四',
      'week-5' : '五',
      'week-6' : '六',
      'week-7' : '日',
      'week-number': '周',
      'month-name': ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      'shortcuts' : '快捷选择',
      'past': '过去',
      'following':'将来',
      'previous' : '&nbsp;&nbsp;&nbsp;',
      'prev-week' : '上周',
      'prev-month' : '上个月',
      'prev-year' : '去年',
      'next': '&nbsp;&nbsp;&nbsp;',
      'next-week':'下周',
      'next-month':'下个月',
      'next-year':'明年',
      'less-than' : '所选日期范围不能大于%d天',
      'more-than' : '所选日期范围不能小于%d天',
      'default-more' : '请选择大于%d天的日期范围',
      'default-less' : '请选择小于%d天的日期范围',
      'default-range' : '请选择%d天到%d天的日期范围',
      'default-single':'请选择一个日期',
      'default-default': '请选择一个日期范围',
      'time':'时间',
      'hour':'小时',
      'minute':'分钟'
    },
    'cz':
    {
      'selected': 'Vybráno:',
      'day':'Den',
      'days': 'Dny',
      'apply': 'Zavřít',
      'week-1' : 'po',
      'week-2' : 'út',
      'week-3' : 'st',
      'week-4' : 'čt',
      'week-5' : 'pá',
      'week-6' : 'so',
      'week-7' : 'ne',
      'month-name': ['leden','únor','březen','duben','květen','červen','červenec','srpen','září','říjen','listopad','prosinec'],
      'shortcuts' : 'Zkratky',
      'past': 'po',
      'following':'následující',
      'previous' : 'předchozí',
      'prev-week' : 'týden',
      'prev-month' : 'měsíc',
      'prev-year' : 'rok',
      'next':'další',
      'next-week':'týden',
      'next-month':'měsíc',
      'next-year':'rok',
      'less-than' : 'Rozsah data by neměl být větší než %d dnů',
      'more-than' : 'Rozsah data by neměl být menší než %d dnů',
      'default-more' : 'Prosím zvolte rozsah data větší než %d dnů',
      'default-single' : 'Prosím zvolte datum',
      'default-less' : 'Prosím zvolte rozsah data menší než %d dnů',
      'default-range' : 'Prosím zvolte rozsah data mezi %d a %d dny',
      'default-default': 'Prosím zvolte rozsah data'
    },
    'de':
    {
      'selected': 'Auswahl:',
      'day':'Tag',
      'days': 'Tage',
      'apply': 'Schließen',
      'week-1' : 'mo',
      'week-2' : 'di',
      'week-3' : 'mi',
      'week-4' : 'do',
      'week-5' : 'fr',
      'week-6' : 'sa',
      'week-7' : 'so',
      'month-name': ['januar','februar','märz','april','mai','juni','juli','august','september','oktober','november','dezember'],
      'shortcuts' : 'Schnellwahl',
      'past': 'Vorherige',
      'following':'Folgende',
      'previous' : 'Vorherige',
      'prev-week' : 'Woche',
      'prev-month' : 'Monat',
      'prev-year' : 'Jahr',
      'next':'Nächste',
      'next-week':'Woche',
      'next-month':'Monat',
      'next-year':'Jahr',
      'less-than' : 'Datumsbereich darf nicht größer sein als %d Tage',
      'more-than' : 'Datumsbereich darf nicht kleiner sein als %d Tage',
      'default-more' : 'Bitte mindestens %d Tage auswählen',
      'default-single' : 'Bitte ein Datum auswählen',
      'default-less' : 'Bitte weniger als %d Tage auswählen',
      'default-range' : 'Bitte einen Datumsbereich zwischen %d und %d Tagen auswählen',
      'default-default': 'Bitte ein Start- und Enddatum auswählen',
      'Time': 'Zeit',
      'hour': 'Stunde',
      'minute': 'Minute',
    },
    'es':
    {
      'selected': 'Seleccionado:',
      'day':'Dia',
      'days': 'Dias',
      'apply': 'Cerrar',
      'week-1' : 'lu',
      'week-2' : 'ma',
      'week-3' : 'mi',
      'week-4' : 'ju',
      'week-5' : 'vi',
      'week-6' : 'sa',
      'week-7' : 'do',
      'month-name': ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
      'shortcuts' : 'Accesos directos',
      'past': 'Pasado',
      'following':'Siguiente',
      'previous' : 'Anterior',
      'prev-week' : 'Semana',
      'prev-month' : 'Mes',
      'prev-year' : 'Año',
      'next':'Siguiente',
      'next-week':'Semana',
      'next-month':'Mes',
      'next-year':'Año',
      'less-than' : 'El rango no deberia ser mayor de %d dias',
      'more-than' : 'El rango no deberia ser menor de %d dias',
      'default-more' : 'Por favor selecciona un rango mayor a %d dias',
      'default-single' : 'Por favor selecciona un dia',
      'default-less' : 'Por favor selecciona un rango menor a %d dias',
      'default-range' : 'Por favor selecciona un rango entre %d y %d dias',
      'default-default': 'Por favor selecciona un rango de fechas.'
    },
    'fr':
    {
      'selected': 'Sélection:',
      'day':'Jour',
      'days': 'Jours',
      'apply': 'Fermer',
      'week-1' : 'lu',
      'week-2' : 'ma',
      'week-3' : 'me',
      'week-4' : 'je',
      'week-5' : 've',
      'week-6' : 'sa',
      'week-7' : 'di',
      'month-name': ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],
      'shortcuts' : 'Raccourcis',
      'past': 'Passé',
      'following':'Suivant',
      'previous' : 'Précédent',
      'prev-week' : 'Semaine',
      'prev-month' : 'Mois',
      'prev-year' : 'Année',
      'next':'Suivant',
      'next-week':'Semaine',
      'next-month':'Mois',
      'next-year':'Année',
      'less-than' : 'L\'intervalle ne doit pas être supérieure à %d jours',
      'more-than' : 'L\'intervalle ne doit pas être inférieure à %d jours',
      'default-more' : 'Merci de choisir une intervalle supérieure à %d jours',
      'default-single' : 'Merci de choisir une date',
      'default-less' : 'Merci de choisir une intervalle inférieure %d jours',
      'default-range' : 'Merci de choisir une intervalle comprise entre %d et %d jours',
      'default-default': 'Merci de choisir une date'
    },
    'hu':
    {
      'selected': 'Kiválasztva:',
      'day':'Nap',
      'days': 'Nap',
      'apply': 'Ok',
      'week-1' : 'h',
      'week-2' : 'k',
      'week-3' : 'sz',
      'week-4' : 'cs',
      'week-5' : 'p',
      'week-6' : 'sz',
      'week-7' : 'v',
      'month-name': ['január','február','március','április','május','június','július','augusztus','szeptember','október','november','december'],
      'shortcuts' : 'Gyorsválasztó',
      'past': 'Múlt',
      'following':'Következő',
      'previous' : 'Előző',
      'prev-week' : 'Hét',
      'prev-month' : 'Hónap',
      'prev-year' : 'Év',
      'next':'Következő',
      'next-week':'Hét',
      'next-month':'Hónap',
      'next-year':'Év',
      'less-than' : 'A kiválasztás nem lehet több %d napnál',
      'more-than' : 'A kiválasztás nem lehet több %d napnál',
      'default-more' : 'Válassz ki egy időszakot ami hosszabb mint %d nap',
      'default-single' : 'Válassz egy napot',
      'default-less' : 'Válassz ki egy időszakot ami rövidebb mint %d nap',
      'default-range' : 'Válassz ki egy %d - %d nap hosszú időszakot',
      'default-default': 'Válassz ki egy időszakot'
    },
    'it':
    {
      'selected': 'Selezionati:',
      'day':'Giorno',
      'days': 'Giorni',
      'apply': 'Chiudi',
      'week-1' : 'lu',
      'week-2' : 'ma',
      'week-3' : 'me',
      'week-4' : 'gi',
      'week-5' : 've',
      'week-6' : 'sa',
      'week-7' : 'do',
      'month-name': ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'],
      'shortcuts' : 'Scorciatoie',
      'past': 'Scorso',
      'following':'Successivo',
      'previous' : 'Precedente',
      'prev-week' : 'Settimana',
      'prev-month' : 'Mese',
      'prev-year' : 'Anno',
      'next':'Prossimo',
      'next-week':'Settimana',
      'next-month':'Mese',
      'next-year':'Anno',
      'less-than' : 'L\'intervallo non dev\'essere maggiore di %d giorni',
      'more-than' : 'L\'intervallo non dev\'essere minore di %d giorni',
      'default-more' : 'Seleziona un intervallo maggiore di %d giorni',
      'default-single' : 'Seleziona una data',
      'default-less' : 'Seleziona un intervallo minore di %d giorni',
      'default-range' : 'Seleziona un intervallo compreso tra i %d e i %d giorni',
      'default-default': 'Seleziona un intervallo di date'
    },
    'no':
    {
      'selected': 'Valgt:',
      'day':'Dag',
      'days': 'Dager',
      'apply': 'Lukk',
      'week-1' : 'ma',
      'week-2' : 'ti',
      'week-3' : 'on',
      'week-4' : 'to',
      'week-5' : 'fr',
      'week-6' : 'lø',
      'week-7' : 'sø',
      'month-name': ['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember'],
      'shortcuts' : 'Snarveier',
      'custom-values': 'Egendefinerte Verdier',
      'past': 'Over', // Not quite sure about the context of this one
      'following':'Følger',
      'previous' : 'Forrige',
      'prev-week' : 'Uke',
      'prev-month' : 'Måned',
      'prev-year' : 'År',
      'next':'Neste',
      'next-week':'Uke',
      'next-month':'Måned',
      'next-year':'År',
      'less-than' : 'Datoperioden skal ikkje være lengre enn %d dager',
      'more-than' : 'Datoperioden skal ikkje være kortere enn %d dager',
      'default-more' : 'Vennligst velg ein datoperiode lengre enn %d dager',
      'default-single' : 'Vennligst velg ein dato',
      'default-less' : 'Vennligst velg ein datoperiode mindre enn %d dager',
      'default-range' : 'Vennligst velg ein datoperiode mellom %d og %d dager',
      'default-default': 'Vennligst velg ein datoperiode',
      'time':'Tid',
      'hour':'Time',
      'minute':'Minutter'
    },
    'nl':
    {
      'selected': 'Geselecteerd:',
      'day':'Dag',
      'days': 'Dagen',
      'apply': 'Ok',
      'week-1' : 'ma',
      'week-2' : 'di',
      'week-3' : 'wo',
      'week-4' : 'do',
      'week-5' : 'vr',
      'week-6' : 'za',
      'week-7' : 'zo',
      'month-name': ['januari','februari','maart','april','mei','juni','juli','augustus','september','october','november','december'],
      'shortcuts' : 'Snelkoppelingen',
      'custom-values': 'Aangepaste waarden',
      'past': 'Verleden',
      'following':'Komend',
      'previous' : 'Vorige',
      'prev-week' : 'Week',
      'prev-month' : 'Maand',
      'prev-year' : 'Jaar',
      'next':'Volgende',
      'next-week':'Week',
      'next-month':'Maand',
      'next-year':'Jaar',
      'less-than' : 'Interval moet langer dan %d dagen zijn',
      'more-than' : 'Interval mag niet minder dan %d dagen zijn',
      'default-more' : 'Selecteer een interval langer dan %dagen',
      'default-single' : 'Selecteer een datum',
      'default-less' : 'Selecteer een interval minder dan %d dagen',
      'default-range' : 'Selecteer een interval tussen %d en %d dagen',
      'default-default': 'Selecteer een interval',
      'time':'Tijd',
      'hour':'Uur',
      'minute':'Minuut'
    },
    'ru':
    {
      'selected': 'Выбрано:',
      'day': 'День',
      'days': 'Дней',
      'apply': 'Закрыть',
      'week-1': 'пн',
      'week-2': 'вт',
      'week-3': 'ср',
      'week-4': 'чт',
      'week-5': 'пт',
      'week-6': 'сб',
      'week-7': 'вс',
      'month-name': ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
      'shortcuts': 'Быстрый выбор',
      'past': 'Прошедшие',
      'following': 'Следующие',
      'previous': '&nbsp;&nbsp;&nbsp;',
      'prev-week': 'Неделя',
      'prev-month': 'Месяц',
      'prev-year': 'Год',
      'next': '&nbsp;&nbsp;&nbsp;',
      'next-week': 'Неделя',
      'next-month': 'Месяц',
      'next-year': 'Год',
      'less-than': 'Диапазон не может быть больше %d дней',
      'more-than': 'Диапазон не может быть меньше %d дней',
      'default-more': 'Пожалуйста выберите диапазон больше %d дней',
      'default-single': 'Пожалуйста выберите дату',
      'default-less': 'Пожалуйста выберите диапазон меньше %d дней',
      'default-range': 'Пожалуйста выберите диапазон между %d и %d днями',
      'default-default': 'Пожалуйста выберите диапазон'
    },
    'pl':
    {
      'selected': 'Wybrany:',
      'day':'Dzień',
      'days': 'Dni',
      'apply': 'Zamknij',
      'week-1' : 'pon',
      'week-2' : 'wt',
      'week-3' : 'śr',
      'week-4' : 'czw',
      'week-5' : 'pt',
      'week-6' : 'so',
      'week-7' : 'nd',
      'month-name': ['styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień'],
      'shortcuts' : 'Skróty',
      'custom-values': 'Niestandardowe wartości',
      'past': 'Przeszłe',
      'following':'Następne',
      'previous' : 'Poprzednie',
      'prev-week' : 'tydzień',
      'prev-month' : 'miesiąc',
      'prev-year' : 'rok',
      'next':'Następny',
      'next-week':'tydzień',
      'next-month':'miesiąc',
      'next-year':'rok',
      'less-than' : 'Okres nie powinien być dłuższy niż %d dni',
      'more-than' : 'Okres nie powinien być krótszy niż  %d ni',
      'default-more' : 'Wybierz okres dłuższy niż %d dni',
      'default-single' : 'Wybierz datę',
      'default-less' : 'Wybierz okres krótszy niż %d dni',
      'default-range' : 'Wybierz okres trwający od %d do %d dni',
      'default-default': 'Wybierz okres',
      'time':'Czas',
      'hour':'Godzina',
      'minute':'Minuta'
    },
    'se':
    {
      'selected': 'Vald:',
      'day':'dag',
      'days': 'dagar',
      'apply': 'godkänn',
      'week-1' : 'ma',
      'week-2' : 'ti',
      'week-3' : 'on',
      'week-4' : 'to',
      'week-5' : 'fr',
      'week-6' : 'lö',
      'week-7' : 'sö',
      'month-name': ['januari','februari','mars','april','maj','juni','juli','augusti','september','oktober','november','december'],
      'shortcuts' : 'genvägar',
      'custom-values': 'Anpassade värden',
      'past': 'över',
      'following':'följande',
      'previous' : 'förra',
      'prev-week' : 'vecka',
      'prev-month' : 'månad',
      'prev-year' : 'år',
      'next':'nästa',
      'next-week':'vecka',
      'next-month':'måned',
      'next-year':'år',
      'less-than' : 'Datumintervall bör inte vara mindre än %d dagar',
      'more-than' : 'Datumintervall bör inte vara mer än %d dagar',
      'default-more' : 'Välj ett datumintervall längre än %d dagar',
      'default-single' : 'Välj ett datum',
      'default-less' : 'Välj ett datumintervall mindre än %d dagar',
      'default-range' : 'Välj ett datumintervall mellan %d och %d dagar',
      'default-default': 'Välj ett datumintervall',
      'time':'tid',
      'hour':'timme',
      'minute':'minut'
    }
  };

  $.fn.dateRangePicker = function(opt)
  {
    if (!opt) opt = {};
    opt = $.extend(true,
    {
      autoClose: false,
      format: 'YYYY-MM-DD',
      separator: ' to ',
      language: 'auto',
      startOfWeek: 'sunday',// or monday
      getValue: function()
      {
        return $(this).val();
      },
      setValue: function(s)
      {
        if(!$(this).attr('readonly') && !$(this).is(':disabled') && s != $(this).val())
        {
          $(this).val(s);
        }
      },
      startDate: false,
      endDate: false,
      time: {
        enabled: false
      },
      minDays: 0,
      maxDays: 0,
      showShortcuts: false,
      shortcuts:
      {
        //'prev-days': [1,3,5,7],
        // 'next-days': [3,5,7],
        //'prev' : ['week','month','year'],
        // 'next' : ['week','month','year']
      },
      customShortcuts : [],
      inline:false,
      container:'body',
      alwaysOpen:false,
      singleDate:false,
      lookBehind: false,
      batchMode: false,
      duration: 200,
      stickyMonths: false,
      dayDivAttrs: [],
      dayTdAttrs: [],
      selectForward: false,
      selectBackward: false,
      applyBtnClass: '',
      singleMonth: 'auto',
      hoveringTooltip: function(days, startTime, hoveringTime)
      {
        return days > 1 ? days + ' ' + lang('days') : '';
      },
      showTopbar: true,
      swapTime: false,
      showWeekNumbers: false,
      getWeekNumber: function(date) //date will be the first day of a week
      {
        return moment(date).format('w');
      }
    },opt);

    opt.start = false;
    opt.end = false;

    opt.startWeek = false;

    //detect a touch device
    opt.isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    //if it is a touch device, hide hovering tooltip
    if (opt.isTouchDevice) opt.hoveringTooltip = false;

    //show one month on mobile devices
    if (opt.singleMonth == 'auto') opt.singleMonth = $(window).width() < 480;
    if (opt.singleMonth) opt.stickyMonths = false;

    if (opt.singleDate) opt.singleMonth = true;

    if (!opt.showTopbar) opt.autoClose = true;

    if (opt.startDate && typeof opt.startDate == 'string') opt.startDate = moment(opt.startDate,opt.format).toDate();
    if (opt.endDate && typeof opt.endDate == 'string') opt.endDate = moment(opt.endDate,opt.format).toDate();

    var langs = getLanguages();
    var box;
    var initiated = false;
    var self = this;
    var selfDom = $(self).get(0);
    var domChangeTimer;

    $(this).unbind('.datepicker').bind('click.datepicker',function(evt)
    {
      var isOpen = box.is(':visible');
      if(!isOpen) open(opt.duration);
    }).bind('change.datepicker', function(evt)
    {
      checkAndSetDefaultValue();
    }).bind('keyup.datepicker',function()
    {
      try{ clearTimeout(domChangeTimer); }catch(e){}
      domChangeTimer = setTimeout(function()
      {
        checkAndSetDefaultValue();
      },2000);
    });

    init_datepicker.call(this);

    if (opt.alwaysOpen)
    {
      open(0);
    }

    // expose some api
    $(this).data('dateRangePicker',
    {
      setDateRange : function(d1,d2,silent)
      {
        if (typeof d1 == 'string' && typeof d2 == 'string')
        {
          d1 = moment(d1,opt.format).toDate();
          d2 = moment(d2,opt.format).toDate();
        }
        setDateRange(d1,d2,silent);
      },
      clear: clearSelection,
      close: closeDatePicker,
      open: open,
      redraw: redrawDatePicker,
      getDatePicker: getDatePicker,
      destroy: function()
      {
        $(self).unbind('.datepicker');
        $(self).data('dateRangePicker','');
        $(self).data('date-picker-opened',null);
        box.remove();
        $(window).unbind('resize.datepicker',calcPosition);
        $(document).unbind('click.datepicker',closeDatePicker);
      }
    });

    $(window).bind('resize.datepicker',calcPosition);

    return this;
    
    function IsOwnDatePickerClicked(evt, selfObj)
    {
      return ( selfObj.contains(evt.target) || evt.target == selfObj  || (selfObj.childNodes != undefined && $.inArray(evt.target, selfObj.childNodes)>=0))
    }

    function init_datepicker()
    {
      var self = this;

      if ($(this).data('date-picker-opened'))
      {
        closeDatePicker();
        return;
      }
      $(this).data('date-picker-opened',true);


      box = createDom().hide();
      box.append('<div class="date-range-length-tip"></div>');
      box.delegate('.day', 'mouseleave', function()
      {
        box.find('.date-range-length-tip').hide();
      });

      $(opt.container).append(box);

      if (!opt.inline)
      {
        calcPosition();
      }
      else
      {
        box.addClass("inline-wrapper");
      }

      if (opt.alwaysOpen)
      {
        box.find('.apply-btn').hide();
      }

      var defaultTime = opt.defaultTime ? opt.defaultTime : new Date();
      if (opt.lookBehind)
      {
        if (opt.startDate && compare_month(defaultTime, opt.startDate) < 0 ) defaultTime = nextMonth(moment(opt.startDate).toDate());
        if (opt.endDate && compare_month(defaultTime,opt.endDate) > 0 ) defaultTime = moment(opt.endDate).toDate();

        showMonth(prevMonth(defaultTime),'month1');
        showMonth(defaultTime,'month2');

      }
      else
      {
        if (opt.startDate && compare_month(defaultTime,opt.startDate) < 0 ) defaultTime = moment(opt.startDate).toDate();
        if (opt.endDate && compare_month(nextMonth(defaultTime),opt.endDate) > 0 ) defaultTime = prevMonth(moment(opt.endDate).toDate());

        showMonth(defaultTime,'month1');
        showMonth(nextMonth(defaultTime),'month2');
      }

      if (opt.singleDate)
      {
        if (opt.startDate && compare_month(defaultTime,opt.startDate) < 0 ) defaultTime = moment(opt.startDate).toDate();
        if (opt.endDate && compare_month(defaultTime,opt.endDate) > 0 ) defaultTime = moment(opt.endDate).toDate();

        showMonth(defaultTime,'month1');
      }

      if (opt.time.enabled)
      {
        if ((opt.startDate && opt.endDate) || (opt.start && opt.end)) {
          showTime(moment(opt.start || opt.startDate).toDate(),'time1');
          showTime(moment(opt.end || opt.endDate).toDate(),'time2');
        } else {
          var defaultEndTime = opt.defaultEndTime ? opt.defaultEndTime : defaultTime;
          showTime(defaultTime,'time1');
          showTime(defaultEndTime,'time2');
        }
      }

      //showSelectedInfo();


      var defaultTopText = '';
      if (opt.singleDate)
        defaultTopText = lang('default-single');
      else if (opt.minDays && opt.maxDays)
        defaultTopText = lang('default-range');
      else if (opt.minDays)
        defaultTopText = lang('default-more');
      else if (opt.maxDays)
        defaultTopText = lang('default-less');
      else
        defaultTopText = lang('default-default');

      box.find('.default-top').html( defaultTopText.replace(/\%d/,opt.minDays).replace(/\%d/,opt.maxDays));
      if (opt.singleMonth)
      {
        box.addClass('single-month');
      }
      else
      {
        box.addClass('two-months');
      }


      setTimeout(function()
      {
        updateCalendarWidth();
        initiated = true;
      },0);

      box.click(function(evt)
      {
        evt.stopPropagation();
      });

      //if user click other place of the webpage, close date range picker window
      $(document).bind('click.datepicker',function(evt)
      {
        if (!IsOwnDatePickerClicked(evt, self[0])) {
          if (box.is(':visible')) closeDatePicker();
        }
      });

      box.find('.next').click(function()
      {
        if(!opt.stickyMonths)
          gotoNextMonth(this);
        else
          gotoNextMonth_stickily(this);
      });

      function gotoNextMonth(self)
      {
        var isMonth2 = $(self).parents('table').hasClass('month2');
        var month = isMonth2 ? opt.month2 : opt.month1;
        month = nextMonth(month);
        if (!opt.singleMonth && !opt.singleDate && !isMonth2 && compare_month(month,opt.month2) >= 0 || isMonthOutOfBounds(month)) return;
        showMonth(month,isMonth2 ? 'month2' : 'month1');
        showGap();
      }

      function gotoNextMonth_stickily(self) {
        var nextMonth1 = nextMonth(opt.month1);
        var nextMonth2 = nextMonth(opt.month2);
        if(isMonthOutOfBounds(nextMonth2)) return;
        if (!opt.singleDate && compare_month(nextMonth1,nextMonth2) >= 0) return;
        showMonth(nextMonth1, 'month1');
        showMonth(nextMonth2, 'month2');
        showSelectedDays();
      }


      box.find('.prev').click(function()
      {
        if(!opt.stickyMonths)
          gotoPrevMonth(this);
        else
          gotoPrevMonth_stickily(this);
      });

      function gotoPrevMonth(self) {
        var isMonth2 = $(self).parents('table').hasClass('month2');
        var month = isMonth2 ? opt.month2 : opt.month1;
        month = prevMonth(month);
        if (isMonth2 && compare_month(month,opt.month1) <= 0 || isMonthOutOfBounds(month)) return;
        showMonth(month,isMonth2 ? 'month2' : 'month1');
        showGap();
      }

      function gotoPrevMonth_stickily(self)
      {
        var prevMonth1 = prevMonth(opt.month1);
        var prevMonth2 = prevMonth(opt.month2);
        if(isMonthOutOfBounds(prevMonth1)) return;
        if(!opt.singleDate && compare_month(prevMonth2,prevMonth1) <= 0) return;
        showMonth(prevMonth2, 'month2');
        showMonth(prevMonth1, 'month1');
        showSelectedDays();
      }

      box.delegate('.day','click', function(evt)
      {
        dayClicked($(this));
      });

      box.delegate('.day','mouseenter',function(evt)
      {
        dayHovering($(this));
      });

      box.delegate('.week-number', 'click', function(evt)
      {
        weekNumberClicked($(this));
      });

      box.attr('unselectable', 'on')
      .css('user-select', 'none')
      .bind('selectstart', function(e)
      {
        e.preventDefault(); return false;
      });

      box.find('.apply-btn').click(function()
      {
        closeDatePicker();
        var dateRange = getDateString(new Date(opt.start))+ opt.separator +getDateString(new Date(opt.end));
        $(self).trigger('datepicker-apply',
        {
          'value': dateRange,
          'date1' : new Date(opt.start),
          'date2' : new Date(opt.end)
        });
      });

      box.find('[custom]').click(function()
      {
        var valueName = $(this).attr('custom');
        opt.start = false;
        opt.end = false;
        box.find('.day.checked').removeClass('checked');
        opt.setValue.call(selfDom, valueName);
        checkSelectionValid();
        showSelectedInfo(true);
        showSelectedDays();
        if (opt.autoClose) closeDatePicker();
      });

      box.find('[shortcut]').click(function()
      {
        var shortcut = $(this).attr('shortcut');
        var end = new Date(),start = false;
        if (shortcut.indexOf('day') != -1)
        {
          var day = parseInt(shortcut.split(',',2)[1],10);
          start = new Date(new Date().getTime() + 86400000*day);
          end = new Date(end.getTime() + 86400000*(day>0?1:-1) );
        }
        else if (shortcut.indexOf('week')!= -1)
        {
          var dir = shortcut.indexOf('prev,') != -1 ? -1 : 1;

          if (dir == 1)
            var stopDay = opt.startOfWeek == 'monday' ? 1 : 0;
          else
            var stopDay = opt.startOfWeek == 'monday' ? 0 : 6;

          end = new Date(end.getTime() - 86400000);
          while(end.getDay() != stopDay) end = new Date(end.getTime() + dir*86400000);
          start = new Date(end.getTime() + dir*86400000*6);
        }
        else if (shortcut.indexOf('month') != -1)
        {
          var dir = shortcut.indexOf('prev,') != -1 ? -1 : 1;
          if (dir == 1)
            start = nextMonth(end);
          else
            start = prevMonth(end);
          start.setDate(1);
          end = nextMonth(start);
          end.setDate(1);
          end = new Date(end.getTime() - 86400000);
        }
        else if (shortcut.indexOf('year') != -1)
        {
          var dir = shortcut.indexOf('prev,') != -1 ? -1 : 1;
          start = new Date();
          start.setFullYear(end.getFullYear() + dir);
          start.setMonth(0);
          start.setDate(1);
          end.setFullYear(end.getFullYear() + dir);
          end.setMonth(11);
          end.setDate(31);
        }
        else if (shortcut == 'custom')
        {
          var name = $(this).html();
          if (opt.customShortcuts && opt.customShortcuts.length > 0)
          {
            for(var i=0;i<opt.customShortcuts.length;i++)
            {
              var sh = opt.customShortcuts[i];
              if (sh.name == name)
              {
                var data = [];
                // try
                // {
                  data = sh['dates'].call();
                //}catch(e){}
                if (data && data.length == 2)
                {
                  start = data[0];
                  end = data[1];
                }

                // if only one date is specified then just move calendars there
                // move calendars to show this date's month and next months
                if (data && data.length == 1)
                {
                  movetodate = data[0];
                  showMonth(movetodate,'month1');
                  showMonth(nextMonth(movetodate),'month2');
                  showGap();
                }

                break;
              }
            }
          }
        }
        if (start && end)
        {
          setDateRange(start,end);
          checkSelectionValid();
        }
      });

      box.find(".time1 input[type=range]").bind("change touchmove mousemove", function (e) {
        var target = e.target,
          hour = target.name == "hour" ? $(target).val().replace(/^(\d{1})$/, "0$1") : undefined,
          min = target.name == "minute" ? $(target).val().replace(/^(\d{1})$/, "0$1") : undefined;
        setTime("time1", hour, min);
      });

      box.find(".time2 input[type=range]").bind("change touchmove mousemove", function (e) {
        var target = e.target,
          hour = target.name == "hour" ? $(target).val().replace(/^(\d{1})$/, "0$1") : undefined,
          min = target.name == "minute" ? $(target).val().replace(/^(\d{1})$/, "0$1") : undefined;
        setTime("time2", hour, min);
      });

    }


    function calcPosition()
    {
      if (!opt.inline)
      {
        var offset = $(self).offset();
            if ($(opt.container).css("position") == "relative")
            {
              var containerOffset = $(opt.container).offset();
              box.css(
              {
                top: offset.top - containerOffset.top + $(self).outerHeight() + 4,
                left: offset.left - containerOffset.left
              });
            }
            else
            {
              if (offset.left < 460) //left to right
              {
                box.css(
                {
                  top: offset.top+$(self).outerHeight() + parseInt($('body').css('border-top') || 0,10 ),
                  left: offset.left
                });
              }
              else
              {
                box.css(
                {
                  top: offset.top+$(self).outerHeight() + parseInt($('body').css('border-top') || 0,10 ),
                  left: offset.left + $(self).width() - box.width() - 16
                });
              }
            }
      }
    }

    // Return the date picker wrapper element
    function getDatePicker()
    {
      return box;
    }

    function open(animationTime)
    {
      calcPosition();
      redrawDatePicker();
      checkAndSetDefaultValue();
      box.slideDown(animationTime, function(){
        $(self).trigger('datepicker-opened', {relatedTarget: box});
      });
      $(self).trigger('datepicker-open', {relatedTarget: box});
      showGap();
      updateCalendarWidth();
    }

    function checkAndSetDefaultValue()
    {
      var __default_string = opt.getValue.call(selfDom);
      var defaults = __default_string ? __default_string.split( opt.separator ) : '';

      if (defaults && ((defaults.length==1 && opt.singleDate) || defaults.length>=2))
      {
        var ___format = opt.format;
        if (___format.match(/Do/))
        {

          ___format = ___format.replace(/Do/,'D');
          defaults[0] = defaults[0].replace(/(\d+)(th|nd|st)/,'$1');
          if(defaults.length >= 2){
            defaults[1] = defaults[1].replace(/(\d+)(th|nd|st)/,'$1');
          }
        }
        // set initiated  to avoid triggerring datepicker-change event
        initiated = false;
        if(defaults.length >= 2){
          setDateRange(moment(defaults[0], ___format, moment.locale(opt.language)).toDate(),moment(defaults[1], ___format, moment.locale(opt.language)).toDate());
        }
        else if(defaults.length==1 && opt.singleDate){
          setSingleDate(moment(defaults[0], ___format, moment.locale(opt.language)).toDate());
        }

        initiated = true;
      }
    }

    function updateCalendarWidth()
    {
      var gapMargin = box.find('.gap').css('margin-left');
      if (gapMargin) gapMargin = parseInt(gapMargin);
      var w1 = box.find('.month1').width();
      var w2 = box.find('.gap').width() + ( gapMargin ? gapMargin*2 : 0 );
      var w3 = box.find('.month2').width();
      box.find('.month-wrapper').width(w1 + w2 + w3);
    }

    function renderTime (name, date) {
      box.find("." + name + " input[type=range].hour-range").val(moment(date).hours());
      box.find("." + name + " input[type=range].minute-range").val(moment(date).minutes());
      setTime(name, moment(date).format("HH"), moment(date).format("mm"));
    }

    function changeTime (name, date) {
      opt[name] = parseInt(
        moment(parseInt(date))
          .startOf('day')
          .add(moment(opt[name + "Time"]).format("HH"), 'h')
          .add(moment(opt[name + "Time"]).format("mm"), 'm').valueOf()
        );
    }

    function swapTime () {
      renderTime("time1", opt.start);
      renderTime("time2", opt.end);
    }

    function setTime (name, hour, minute) 
    {
      hour && (box.find("." + name + " .hour-val").text(hour));
      minute && (box.find("." + name + " .minute-val").text(minute));
      switch (name) {
        case "time1":
          if (opt.start) {
            setRange("start", moment(opt.start));
          }
          setRange("startTime", moment(opt.startTime || moment().valueOf()));
          break;
        case "time2":
          if (opt.end) {
            setRange("end", moment(opt.end));
          }
          setRange("endTime", moment(opt.endTime || moment().valueOf()));
          break;
      }
      function setRange(name, timePoint) {
        var h = timePoint.format("HH"),
          m = timePoint.format("mm");
        opt[name] = timePoint
          .startOf('day')
          .add(hour || h, "h")
          .add(minute || m, "m")
          .valueOf();
      }
      checkSelectionValid();
      showSelectedInfo();
      showSelectedDays();
    }

    function clearSelection()
    {
      opt.start = false;
      opt.end = false;
      box.find('.day.checked').removeClass('checked');
      box.find('.day.last-date-selected').removeClass('last-date-selected');
      box.find('.day.first-date-selected').removeClass('first-date-selected');
      opt.setValue.call(selfDom, '');
      checkSelectionValid();
      showSelectedInfo();
      showSelectedDays();
    }

    function handleStart(time)
    {
      var r = time;
      if  (opt.batchMode === 'week-range')
      {
        if (opt.startOfWeek === 'monday')
        {
          r = moment(parseInt(time)).startOf('isoweek').valueOf();
        }
        else
        {
          r = moment(parseInt(time)).startOf('week').valueOf();
        }
      }
      else if (opt.batchMode === 'month-range')
      {
        r = moment(parseInt(time)).startOf('month').valueOf();
      }
      return r;
    }

    function handleEnd(time)
    {
      var r = time;
      if  (opt.batchMode === 'week-range')
      {
        if (opt.startOfWeek === 'monday')
        {
          r = moment(parseInt(time)).endOf('isoweek').valueOf();
        }
        else
        {
          r = moment(parseInt(time)).endOf('week').valueOf();
        }
      }
      else if (opt.batchMode === 'month-range')
      {
        r = moment(parseInt(time)).endOf('month').valueOf();
      }
      return r;
    }


    function dayClicked(day)
    {
      if (day.hasClass('invalid')) return;
      var time = day.attr('time');
      day.addClass('checked');
      if ( opt.singleDate )
      {
        opt.start = time;
        opt.end = false;
      }
      else if  (opt.batchMode === 'week')
      {
        if (opt.startOfWeek === 'monday') {
          opt.start = moment(parseInt(time)).startOf('isoweek').valueOf();
          opt.end = moment(parseInt(time)).endOf('isoweek').valueOf();
        } else {
          opt.end = moment(parseInt(time)).endOf('week').valueOf();
          opt.start = moment(parseInt(time)).startOf('week').valueOf();
        }
      }
      else if  (opt.batchMode === 'workweek')
      {
        opt.start = moment(parseInt(time)).day(1).valueOf();
        opt.end = moment(parseInt(time)).day(5).valueOf();
      }
      else if  (opt.batchMode === 'weekend')
      {
        opt.start = moment(parseInt(time)).day(6).valueOf();
        opt.end = moment(parseInt(time)).day(7).valueOf();
      }
      else if (opt.batchMode === 'month')
      {
        opt.start = moment(parseInt(time)).startOf('month').valueOf();
        opt.end = moment(parseInt(time)).endOf('month').valueOf();
      }
      else if ((opt.start && opt.end) || (!opt.start && !opt.end) )
      {
        opt.start = handleStart(time);
        opt.end = false;
      }
      else if (opt.start)
      {
        opt.end = handleEnd(time);
        if (opt.time.enabled) {
          changeTime("end", opt.end);
        }
      }

      //Update time in case it is enabled and timestamps are available
      if(opt.time.enabled) {
        if(opt.start) {
          changeTime("start", opt.start);
        }
        if(opt.end) {
          changeTime("end", opt.end);
        }
      }

      //In case the start is after the end, swap the timestamps
      if (!opt.singleDate && opt.start && opt.end && opt.start > opt.end)
      {
        var tmp = opt.end;
        opt.end = handleEnd(opt.start);
        opt.start = handleStart(tmp);
        if (opt.time.enabled && opt.swapTime) {
          swapTime();
        }
      }

      opt.start = parseInt(opt.start);
      opt.end = parseInt(opt.end);

      clearHovering();
      if (opt.start && !opt.end)
      {
        $(self).trigger('datepicker-first-date-selected',
        {
          'date1' : new Date(opt.start)
        });
        dayHovering(day);
      }
      updateSelectableRange(time);

      checkSelectionValid();
      showSelectedInfo();
      showSelectedDays();
      autoclose();
    }

    
    function weekNumberClicked(weekNumberDom)
    {
      var thisTime = parseInt(weekNumberDom.attr('data-start-time'),10);
      if (!opt.startWeek)
      {
        opt.startWeek = thisTime;
        weekNumberDom.addClass('week-number-selected');
        var date1 = new Date(thisTime);
        opt.start = moment(date1).day(opt.startOfWeek == 'monday' ? 1 : 0).toDate();
        opt.end = moment(date1).day(opt.startOfWeek == 'monday' ? 7 : 6).toDate();
      }
      else
      {
        box.find('.week-number-selected').removeClass('week-number-selected');
        var date1 = new Date(thisTime < opt.startWeek ? thisTime : opt.startWeek);
        var date2 = new Date(thisTime < opt.startWeek ? opt.startWeek : thisTime);
        opt.startWeek = false;
        opt.start = moment(date1).day(opt.startOfWeek == 'monday' ? 1 : 0).toDate();
        opt.end = moment(date2).day(opt.startOfWeek == 'monday' ? 7 : 6).toDate();
      }
      updateSelectableRange();
      checkSelectionValid();
      showSelectedInfo();
      showSelectedDays();
      autoclose();
    }

    function isValidTime(time) 
    {
      time = parseInt(time, 10);
      if (opt.startDate && compare_day(time, opt.startDate) < 0) return false;
      if (opt.endDate && compare_day(time, opt.endDate) > 0) return false;

      if (opt.start && !opt.end && !opt.singleDate) 
      {
        //check maxDays and minDays setting
        if (opt.maxDays > 0 && countDays(time, opt.start) > opt.maxDays) return false;
        if (opt.minDays > 0 && countDays(time, opt.start) < opt.minDays) return false;

        //check selectForward and selectBackward
        if (opt.selectForward && time < opt.start ) return false;
        if (opt.selectBackward && time > opt.start) return false;

        //check disabled days
        if (opt.beforeShowDay && typeof opt.beforeShowDay == 'function')
        {
          var valid = true;
          var timeTmp = time;
          while( countDays(timeTmp, opt.start) > 1 )
          {
            var arr = opt.beforeShowDay( new Date(timeTmp) );
            if (!arr[0])
            {
              valid = false;
              break;
            }
            if (Math.abs(timeTmp - opt.start) < 86400000) break;
            if (timeTmp > opt.start) timeTmp -= 86400000;
            if (timeTmp < opt.start) timeTmp += 86400000;
          }
          if (!valid) return false;
        }
      }
      return true;
    }


    function updateSelectableRange()
    {
      box.find('.day.invalid.tmp').removeClass('tmp invalid').addClass('valid');
      if (opt.start && !opt.end)
      {
        box.find('.day.toMonth.valid').each(function()
        {
          var time = parseInt($(this).attr('time'), 10);
          if (!isValidTime(time))
            $(this).addClass('invalid tmp').removeClass('valid');
          else
            $(this).addClass('valid tmp').removeClass('invalid');
        });
      }

      return true;
    }


    function dayHovering(day)
    {
      var hoverTime = parseInt(day.attr('time'));
      var tooltip = '';

      if (day.hasClass('has-tooltip') && day.attr('data-tooltip'))
      {
        tooltip = '<span style="white-space:nowrap">'+day.attr('data-tooltip')+'</span>';
      }
      else if (!day.hasClass('invalid'))
      {
        if (opt.singleDate)
        {
          box.find('.day.hovering').removeClass('hovering');
          day.addClass('hovering');
        }
        else
        {
          box.find('.day').each(function()
          {
            var time = parseInt($(this).attr('time')),
              start = opt.start,
              end = opt.end;

            if ( time == hoverTime )
            {
              $(this).addClass('hovering');
            }
            else
            {
              $(this).removeClass('hovering');
            }

            if (
              ( opt.start && !opt.end )
              &&
              (
                ( opt.start < time && hoverTime >= time )
                ||
                ( opt.start > time && hoverTime <= time )
              )
            )
            {
              $(this).addClass('hovering');
            }
            else
            {
              $(this).removeClass('hovering');
            }
          });

          if (opt.start && !opt.end)
          {
            var days = countDays(hoverTime, opt.start);
            if (opt.hoveringTooltip)
            {
              if (typeof opt.hoveringTooltip == 'function')
              {
                tooltip = opt.hoveringTooltip(days, opt.start, hoverTime);
              }
              else if (opt.hoveringTooltip === true && days > 1)
              {
                tooltip = days + ' ' + lang('days');
              }
            }
          }
        }
      }

      if (tooltip)
      {
        var posDay = day.offset();
        var posBox = box.offset();

        var _left = posDay.left - posBox.left;
        var _top = posDay.top - posBox.top;
        _left += day.width()/2;


        var $tip = box.find('.date-range-length-tip');
        var w = $tip.css({'visibility':'hidden', 'display':'none'}).html(tooltip).width();
        var h = $tip.height();
        _left -= w/2;
        _top -= h;
        setTimeout(function()
        {
          $tip.css({left:_left, top:_top, display:'block','visibility':'visible'});
        },10);
      }
      else
      {
        box.find('.date-range-length-tip').hide();
      }
    }

    function clearHovering()
    {
      box.find('.day.hovering').removeClass('hovering');
      box.find('.date-range-length-tip').hide();
    }

    function autoclose () {
      if (opt.singleDate === true) {
        if (initiated && opt.start )
        {
          if (opt.autoClose) closeDatePicker();
        }
      } else {
        if (initiated && opt.start && opt.end)
        {
          if (opt.autoClose) closeDatePicker();
        }
      }
    }

    function checkSelectionValid()
    {
      var days = Math.ceil( (opt.end - opt.start) / 86400000 ) + 1;
      if (opt.singleDate) { // Validate if only start is there
        if (opt.start && !opt.end)
          box.find('.drp_top-bar').removeClass('error').addClass('normal');
        else
          box.find('.drp_top-bar').removeClass('error').removeClass('normal');
      }
      else if ( opt.maxDays && days > opt.maxDays)
      {
        opt.start = false;
        opt.end = false;
        box.find('.day').removeClass('checked');
        box.find('.drp_top-bar').removeClass('normal').addClass('error').find('.error-top').html( lang('less-than').replace('%d',opt.maxDays) );
      }
      else if ( opt.minDays && days < opt.minDays)
      {
        opt.start = false;
        opt.end = false;
        box.find('.day').removeClass('checked');
        box.find('.drp_top-bar').removeClass('normal').addClass('error').find('.error-top').html( lang('more-than').replace('%d',opt.minDays) );
      }
      else
      {
        if (opt.start || opt.end)
          box.find('.drp_top-bar').removeClass('error').addClass('normal');
        else
          box.find('.drp_top-bar').removeClass('error').removeClass('normal');
      }

      if ( (opt.singleDate && opt.start && !opt.end) || (!opt.singleDate && opt.start && opt.end) )
      {
        box.find('.apply-btn').removeClass('disabled');
      }
      else
      {
        box.find('.apply-btn').addClass('disabled');
      }

      if (opt.batchMode)
      {
        if ( (opt.start && opt.startDate && compare_day(opt.start, opt.startDate) < 0)
          || (opt.end && opt.endDate && compare_day(opt.end, opt.endDate) > 0)  )
        {
          opt.start = false;
          opt.end = false;
          box.find('.day').removeClass('checked');
        }
      }
    }

    function showSelectedInfo(forceValid,silent)
    {
      box.find('.start-day').html('...');
      box.find('.end-day').html('...');
      box.find('.selected-days').hide();
      if (opt.start)
      {
        box.find('.start-day').html(getDateString(new Date(parseInt(opt.start))));
      }
      if (opt.end)
      {
        box.find('.end-day').html(getDateString(new Date(parseInt(opt.end))));
      }

      if (opt.start && opt.singleDate)
      {
        box.find('.apply-btn').removeClass('disabled');
        var dateRange = getDateString(new Date(opt.start));
        opt.setValue.call(selfDom, dateRange, getDateString(new Date(opt.start)), getDateString(new Date(opt.end)));

        if (initiated && !silent)
        {
          $(self).trigger('datepicker-change',
          {
            'value': dateRange,
            'date1' : new Date(opt.start)
          });
        }
      }
      else if (opt.start && opt.end)
      {
        box.find('.selected-days').show().find('.selected-days-num').html(countDays(opt.end, opt.start));
        box.find('.apply-btn').removeClass('disabled');
        var dateRange = getDateString(new Date(opt.start))+ opt.separator +getDateString(new Date(opt.end));
        opt.setValue.call(selfDom,dateRange, getDateString(new Date(opt.start)), getDateString(new Date(opt.end)));
        if (initiated && !silent)
        {
          $(self).trigger('datepicker-change',
          {
            'value': dateRange,
            'date1' : new Date(opt.start),
            'date2' : new Date(opt.end)
          });
        }
      }
      else if (forceValid)
      {
        box.find('.apply-btn').removeClass('disabled');
      }
      else
      {
        box.find('.apply-btn').addClass('disabled');
      }
    }

    function countDays(start,end)
    {
      return Math.abs( daysFrom1970(start) - daysFrom1970(end) ) + 1;
    }

    function setDateRange(date1,date2,silent)
    {
      if (date1.getTime() > date2.getTime())
      {
        var tmp = date2;
        date2 = date1;
        date1 = tmp;
        tmp = null;
      }
      var valid = true;
      if (opt.startDate && compare_day(date1,opt.startDate) < 0) valid = false;
      if (opt.endDate && compare_day(date2,opt.endDate) > 0) valid = false;
      if (!valid)
      {
        showMonth(opt.startDate,'month1');
        showMonth(nextMonth(opt.startDate),'month2');
        showGap();
        return;
      }

      opt.start = date1.getTime();
      opt.end = date2.getTime();

      if (opt.time.enabled)
      {
        renderTime("time1", date1);
        renderTime("time2", date2);
      }

      if (opt.stickyMonths || (compare_day(date1,date2) > 0 && compare_month(date1,date2) == 0))
      {
        if (opt.lookBehind) {
          date1 = prevMonth(date2);
        } else {
          date2 = nextMonth(date1);
        }
      }

      if(opt.stickyMonths && compare_month(date2,opt.endDate) > 0) {
        date1 = prevMonth(date1);
        date2 = prevMonth(date2);
      }

      if (!opt.stickyMonths) {
        if (compare_month(date1,date2) == 0)
        {
          if (opt.lookBehind) {
            date1 = prevMonth(date2);
          } else {
            date2 = nextMonth(date1);
          }
        }
      }

      showMonth(date1,'month1');
      showMonth(date2,'month2');
      showGap();
      checkSelectionValid();
      showSelectedInfo(false,silent);
      autoclose();
    }

    function setSingleDate(date1)
    {

      var valid = true;
      if (opt.startDate && compare_day(date1,opt.startDate) < 0) valid = false;
      if (opt.endDate && compare_day(date1,opt.endDate) > 0) valid = false;
      if (!valid)
      {
        showMonth(opt.startDate,'month1');
        return;
      }

      opt.start = date1.getTime();


      if (opt.time.enabled) {
        renderTime("time1", date1);

      }
      showMonth(date1,'month1');
      //showMonth(date2,'month2');
      showGap();
      showSelectedInfo();
      autoclose();
    }

    function showSelectedDays()
    {
      if (!opt.start && !opt.end) return;
      box.find('.day').each(function()
      {
        var time = parseInt($(this).attr('time')),
          start = opt.start,
          end = opt.end;
        if (opt.time.enabled) {
          time = moment(time).startOf('day').valueOf();
          start = moment(start || moment().valueOf()).startOf('day').valueOf();
          end = moment(end || moment().valueOf()).startOf('day').valueOf();
        }
        if (
          (opt.start && opt.end && end >= time && start <= time )
          || ( opt.start && !opt.end && moment(start).format('YYYY-MM-DD') == moment(time).format('YYYY-MM-DD') )
        )
        {
          $(this).addClass('checked');
        }
        else
        {
          $(this).removeClass('checked');
        }

        //add first-date-selected class name to the first date selected
        if ( opt.start && moment(start).format('YYYY-MM-DD') == moment(time).format('YYYY-MM-DD') )
        {
          $(this).addClass('first-date-selected');
        }
        else
        {
          $(this).removeClass('first-date-selected');
        }
        //add last-date-selected
        if ( opt.end && moment(end).format('YYYY-MM-DD') == moment(time).format('YYYY-MM-DD') )
        {
          $(this).addClass('last-date-selected');
        }
        else
        {
          $(this).removeClass('last-date-selected');
        }
      });

      box.find('.week-number').each(function()
      {
        if ($(this).attr('data-start-time') == opt.startWeek)
        {
          $(this).addClass('week-number-selected');
        }
      });
    }

    function showMonth(date,month)
    {
      date = moment(date).toDate();
      var monthName = nameMonth(date.getMonth());
      box.find('.'+month+' .month-name').html(monthName+' '+date.getFullYear());
      box.find('.'+month+' tbody').html(createMonthHTML(date));
      opt[month] = date;
      updateSelectableRange();
    }

    function showTime(date,name)
    {
      box.find('.' + name).append(getTimeHTML());
      renderTime(name, date);
    }

    function nameMonth(m)
    {
      return lang('month-name')[m];
    }

    function getDateString(d)
    {
      return moment(d).format(opt.format);
    }

    function showGap()
    {
      showSelectedDays();
      var m1 = parseInt(moment(opt.month1).format('YYYYMM'));
      var m2 = parseInt(moment(opt.month2).format('YYYYMM'));
      var p = Math.abs(m1 - m2);
      var shouldShow = (p > 1 && p !=89);
      if (shouldShow)
      {
        box.addClass('has-gap').removeClass('no-gap').find('.gap').css('visibility','visible');
      }
      else
      {
        box.removeClass('has-gap').addClass('no-gap').find('.gap').css('visibility','hidden');
      }
      var h1 = box.find('table.month1').height();
      var h2 = box.find('table.month2').height();
      box.find('.gap').height(Math.max(h1,h2)+10);
    }

    function closeDatePicker()
    {
      if (opt.alwaysOpen) return;
      $(box).slideUp(opt.duration,function()
      {
        $(self).data('date-picker-opened',false);
        $(self).trigger('datepicker-closed', {relatedTarget: box});
      });
      //$(document).unbind('.datepicker');
      $(self).trigger('datepicker-close', {relatedTarget: box});
    }

    function redrawDatePicker()
    {
      showMonth(opt.month1, 'month1');
      showMonth(opt.month2, 'month2');
    }

    function compare_month(m1,m2)
    {
      var p = parseInt(moment(m1).format('YYYYMM')) - parseInt(moment(m2).format('YYYYMM'));
      if (p > 0 ) return 1;
      if (p == 0) return 0;
      return -1;
    }

    function compare_day(m1,m2)
    {
      var p = parseInt(moment(m1).format('YYYYMMDD')) - parseInt(moment(m2).format('YYYYMMDD'));
      if (p > 0 ) return 1;
      if (p == 0) return 0;
      return -1;
    }

    function nextMonth(month)
    {
      return moment(month).add(1, 'months').toDate();
    }

    function prevMonth(month)
    {
      return moment(month).add(-1, 'months').toDate();
    }

    function getTimeHTML()
    {
      return '<div>\
            <span>'+lang('Time')+': <span class="hour-val">00</span>:<span class="minute-val">00</span></span>\
          </div>\
          <div class="hour">\
            <label>'+lang('Hour')+': <input type="range" class="hour-range" name="hour" min="0" max="23"></label>\
          </div>\
          <div class="minute">\
            <label>'+lang('Minute')+': <input type="range" class="minute-range" name="minute" min="0" max="59"></label>\
          </div>';
    }

    function createDom()
    {
      var html = '<div class="date-picker-wrapper';
      if ( opt.extraClass ) html += ' '+opt.extraClass+' ';
      if ( opt.singleDate ) html += ' single-date ';
      if ( !opt.showShortcuts ) html += ' no-shortcuts ';
      if ( !opt.showTopbar ) html += ' no-topbar ';
      if ( opt.customTopBar) html += ' custom-topbar ';
      html += '">';

      if (opt.showTopbar)
      {
        html += '<div class="drp_top-bar">';

        if (opt.customTopBar)
        {
          if (typeof opt.customTopBar == 'function') opt.customTopBar = opt.customTopBar();
          html += '<div class="custom-top">'+opt.customTopBar+'</div>';
        }
        else
        {
          html += '<div class="normal-top">\
              <span style="color:#333">'+lang('selected')+' </span> <b class="start-day">...</b>';
          if ( ! opt.singleDate ) {
            html += ' <span class="separator-day">'+opt.separator+'</span> <b class="end-day">...</b> <i class="selected-days">(<span class="selected-days-num">3</span> '+lang('days')+')</i>'
          }
          html += '</div>';
          html += '<div class="error-top">error</div>\
            <div class="default-top">default</div>';
        }

        html += '<input type="button" class="apply-btn disabled'+ getApplyBtnClass() +'" value="'+lang('apply')+'" />';
        html += '</div>'
      }

      var _colspan = opt.showWeekNumbers ? 6 : 5;
      html += '<div class="month-wrapper">'
        +'<table class="month1" cellspacing="0" border="0" cellpadding="0"><thead><tr class="caption"><th style="width:27px;"><span class="prev">&lt;</span></th><th colspan="'+_colspan+'" class="month-name"></th><th style="width:27px;">' + (opt.singleDate || !opt.stickyMonths ? '<span class="next">&gt;</span>': '') + '</th></tr><tr class="week-name">'+getWeekHead()+'</thead><tbody></tbody></table>';

      if ( hasMonth2() )
      {
        html += '<div class="gap">'+getGapHTML()+'</div>'
          +'<table class="month2" cellspacing="0" border="0" cellpadding="0"><thead><tr class="caption"><th style="width:27px;">' + (!opt.stickyMonths ? '<span class="prev">&lt;</span>': '') + '</th><th colspan="'+_colspan+'" class="month-name"></th><th style="width:27px;"><span class="next">&gt;</span></th></tr><tr class="week-name">'+getWeekHead()+'</thead><tbody></tbody></table>'
      }
        //+'</div>'
      html += '<div style="clear:both;height:0;font-size:0;"></div>'
        +'<div class="time">'
        +'<div class="time1"></div>'
      if ( ! opt.singleDate ) {
        html += '<div class="time2"></div>'
      }
      html += '</div>'
        +'<div style="clear:both;height:0;font-size:0;"></div>'
        +'</div>';

      html += '<div class="footer">';
      if (opt.showShortcuts)
      {
        html += '<div class="shortcuts"><b>'+lang('shortcuts')+'</b>';

        var data = opt.shortcuts;
        if (data)
        {
          if (data['prev-days'] && data['prev-days'].length > 0)
          {
            html += '&nbsp;<span class="prev-days">'+lang('past');
            for(var i=0;i<data['prev-days'].length; i++)
            {
              var name = data['prev-days'][i];
              name += (data['prev-days'][i] > 1) ? lang('days') : lang('day');
              html += ' <a href="javascript:;" shortcut="day,-'+data['prev-days'][i]+'">'+name+'</a>';
            }
            html+='</span>';
          }

          if (data['next-days'] && data['next-days'].length > 0)
          {
            html += '&nbsp;<span class="next-days">'+lang('following');
            for(var i=0;i<data['next-days'].length; i++)
            {
              var name = data['next-days'][i];
              name += (data['next-days'][i] > 1) ? lang('days') : lang('day');
              html += ' <a href="javascript:;" shortcut="day,'+data['next-days'][i]+'">'+name+'</a>';
            }
            html+= '</span>';
          }

          if (data['prev'] && data['prev'].length > 0)
          {
            html += '&nbsp;<span class="prev-buttons">'+lang('previous');
            for(var i=0;i<data['prev'].length; i++)
            {
              var name = lang('prev-'+data['prev'][i]);
              html += ' <a href="javascript:;" shortcut="prev,'+data['prev'][i]+'">'+name+'</a>';
            }
            html+='</span>';
          }

          if (data['next'] && data['next'].length > 0)
          {
            html += '&nbsp;<span class="next-buttons">'+lang('next');
            for(var i=0;i<data['next'].length; i++)
            {
              var name = lang('next-'+data['next'][i]);
              html += ' <a href="javascript:;" shortcut="next,'+data['next'][i]+'">'+name+'</a>';
            }
            html+='</span>';
          }
        }

        if (opt.customShortcuts)
        {
          for(var i=0;i<opt.customShortcuts.length; i++)
          {
            var sh = opt.customShortcuts[i];
            html+= '&nbsp;<span class="custom-shortcut"><a href="javascript:;" shortcut="custom">'+sh.name+'</a></span>';
          }
        }
        html += '</div>';
      }

      // Add Custom Values Dom
      if (opt.showCustomValues)
      {
        html += '<div class="customValues"><b>'+(opt.customValueLabel || lang('custom-values'))+'</b>';

        if (opt.customValues)
        {
          for(var i=0;i<opt.customValues.length;i++)
          {
            var val = opt.customValues[i];
              html+= '&nbsp;<span class="custom-value"><a href="javascript:;" custom="'+ val.value+'">'+val.name+'</a></span>';
          }
        }
      }

      html += '</div></div>';


      return $(html);
    }

    function getApplyBtnClass()
    {
      var klass = ''
      if (opt.autoClose === true) {
        klass += ' hide';
      }
      if (opt.applyBtnClass !== '') {
        klass += ' ' + opt.applyBtnClass;
      }
      return klass;
    }

    function getWeekHead()
    {
      var prepend = opt.showWeekNumbers ? '<th>'+lang('week-number')+'</th>' : '';
      if (opt.startOfWeek == 'monday')
      {
        return prepend+'<th>'+lang('week-1')+'</th>\
          <th>'+lang('week-2')+'</th>\
          <th>'+lang('week-3')+'</th>\
          <th>'+lang('week-4')+'</th>\
          <th>'+lang('week-5')+'</th>\
          <th>'+lang('week-6')+'</th>\
          <th>'+lang('week-7')+'</th>';
      }
      else
      {
        return prepend+'<th>'+lang('week-7')+'</th>\
          <th>'+lang('week-1')+'</th>\
          <th>'+lang('week-2')+'</th>\
          <th>'+lang('week-3')+'</th>\
          <th>'+lang('week-4')+'</th>\
          <th>'+lang('week-5')+'</th>\
          <th>'+lang('week-6')+'</th>';
      }
    }

    function isMonthOutOfBounds(month)
    {
      var month = moment(month);
      if (opt.startDate && month.endOf('month').isBefore(opt.startDate))
      {
        return true;
      }
      if (opt.endDate && month.startOf('month').isAfter(opt.endDate))
      {
        return true;
      }
      return false;
    }

    function getGapHTML()
    {
      var html = ['<div class="gap-top-mask"></div><div class="gap-bottom-mask"></div><div class="gap-lines">'];
      for(var i=0;i<20;i++)
      {
        html.push('<div class="gap-line">\
          <div class="gap-1"></div>\
          <div class="gap-2"></div>\
          <div class="gap-3"></div>\
        </div>');
      }
      html.push('</div>');
      return html.join('');
    }

    function hasMonth2()
    {
      return ( !opt.singleDate && !opt.singleMonth);
    }

    function attributesCallbacks(initialObject,callbacksArray,today)
    {
      var resultObject = jQuery.extend(true, {}, initialObject);

      jQuery.each(callbacksArray, function(cbAttrIndex, cbAttr){
        var addAttributes = cbAttr(today);
        for(var attr in addAttributes){
          if(resultObject.hasOwnProperty(attr)){
            resultObject[attr] += addAttributes[attr];
          }else{
            resultObject[attr] = addAttributes[attr];
          }
        }
      });

      var attrString = '';

      for(var attr in resultObject){
        if(resultObject.hasOwnProperty(attr)){
          attrString += attr + '="' + resultObject[attr] + '" ';
        }
      }

      return attrString;
    }

    function daysFrom1970(t)
    {
      return Math.floor(toLocalTimestamp(t) / 86400000);
    }

    function toLocalTimestamp(t)
    {
      if (moment.isMoment(t)) t = t.toDate().getTime();
      if (typeof t == 'object' && t.getTime) t = t.getTime();
      if (typeof t == 'string' && !t.match(/\d{13}/)) t = moment(t,opt.format).toDate().getTime();
      t = parseInt(t, 10) - new Date().getTimezoneOffset()*60*1000;
      return t;
    }

    function createMonthHTML(d)
    {
      var days = [];
      d.setDate(1);
      var lastMonth = new Date(d.getTime() - 86400000);
      var now = new Date();

      var dayOfWeek = d.getDay();
      if((dayOfWeek == 0) && (opt.startOfWeek == 'monday')) {
        // add one week
        dayOfWeek = 7;
      }

      if (dayOfWeek > 0)
      {
        for (var i = dayOfWeek; i > 0; i--)
        {
          var day = new Date(d.getTime() - 86400000*i);
          var valid = isValidTime(day.getTime());
          if (opt.startDate && compare_day(day,opt.startDate) < 0) valid = false;
          if (opt.endDate && compare_day(day,opt.endDate) > 0) valid = false;
          days.push(
          {
            date: day,
            type:'lastMonth',
            day: day.getDate(),
            time:day.getTime(),
            valid:valid
          });
        }
      }
      var toMonth = d.getMonth();
      for(var i=0; i<40; i++)
      {
        var today = moment(d).add(i, 'days').toDate();
        var valid = isValidTime(today.getTime());
        if (opt.startDate && compare_day(today,opt.startDate) < 0) valid = false;
        if (opt.endDate && compare_day(today,opt.endDate) > 0) valid = false;
        days.push(
        {
          date: today,
          type: today.getMonth() == toMonth ? 'toMonth' : 'nextMonth',
          day: today.getDate(),
          time:today.getTime(),
          valid:valid
        });
      }
      var html = [];
      for(var week=0; week<6; week++)
      {
        if (days[week*7].type == 'nextMonth') break;
        html.push('<tr>');
        for(var day = 0; day<7; day++)
        {
          var _day = (opt.startOfWeek == 'monday') ? day+1 : day;
          var today = days[week*7+_day];
          var highlightToday = moment(today.time).format('L') == moment(now).format('L');
          today.extraClass = '';
          today.tooltip = '';
          if(today.valid && opt.beforeShowDay && typeof opt.beforeShowDay == 'function')
          {
            var _r = opt.beforeShowDay(moment(today.time).toDate());
            today.valid = _r[0];
            today.extraClass = _r[1] || '';
            today.tooltip = _r[2] || '';
            if (today.tooltip != '') today.extraClass += ' has-tooltip ';
          }

          var todayDivAttr = {
            time: today.time,
            'data-tooltip': today.tooltip,
            'class': 'day '+today.type+' '+today.extraClass+' '+(today.valid ? 'valid' : 'invalid')+' '+(highlightToday?'real-today':'')
          };

          if (day == 0 && opt.showWeekNumbers)
          {
            html.push('<td><div class="week-number" data-start-time="'+today.time+'">'+opt.getWeekNumber(today.date)+'</div></td>');
          }

          html.push('<td ' + attributesCallbacks({},opt.dayTdAttrs,today) + '><div ' + attributesCallbacks(todayDivAttr,opt.dayDivAttrs,today) + '>'+showDayHTML(today.time, today.day)+'</div></td>');
        }
        html.push('</tr>');
      }
      return html.join('');
    }

    function showDayHTML(time, date)
    {
      if (opt.showDateFilter && typeof opt.showDateFilter == 'function') return opt.showDateFilter(time, date);
      return date;
    }

    function getLanguages()
    {
      if (opt.language == 'auto')
      {
        var language = navigator.language ? navigator.language : navigator.browserLanguage;
        if (!language) return $.dateRangePickerLanguages['default'];
        var language = language.toLowerCase();
        for(var key in $.dateRangePickerLanguages)
        {
          if (language.indexOf(key) != -1)
          {
            return $.dateRangePickerLanguages[key];
          }
        }
        return $.dateRangePickerLanguages['default'];
      }
      else if ( opt.language && opt.language in $.dateRangePickerLanguages)
      {
        return $.dateRangePickerLanguages[opt.language];
      }
      else
      {
        return $.dateRangePickerLanguages['default'];
      }
    }

    /**
     * translate language string
     */
    function lang(t)
    {
      var _t = t.toLowerCase();
      var re = (t in langs) ? langs[t] : ( _t in langs) ? langs[_t] : null;
      var defaultLanguage = $.dateRangePickerLanguages['default'];
      if (re == null) re = (t in defaultLanguage) ? defaultLanguage[t] : ( _t in defaultLanguage) ? defaultLanguage[_t] : '';
      return re;
    }


  };
}));

/* Sticky Navbar Plugins Code */
!function(s,i,t){"use strict";s.fn.stickyNavbar=function(e){var a=s.extend({activeClass:"active",sectionSelector:"scrollto",animDuration:350,startAt:0,easing:"swing",animateCSS:!0,animateCSSRepeat:!1,cssAnimation:"fadeInDown",jqueryEffects:!1,jqueryAnim:"slideDown",selector:"a",mobile:!1,mobileWidth:480,zindex:9999,stickyModeClass:"sticky",unstickyModeClass:"unsticky"},e),n=s("."+a.sectionSelector);return n.attr("tabindex",-1),this.each(function(){{var e=s(this),o=e.css("position"),r=e.css("zIndex"),d=e.outerHeight(!0),l=e.offset().top-d,c="auto"===e.css("top")?0:e.css("top"),m=e.find("a"===a.selector?"li a":"li");e.find("li a[href*=#]"),s(i).scrollTop()}m.click(function(i){var o,r,l,c,m;if(o="li"===a.selector?s(this).children("a").attr("href"):s(this).attr("href"),"http"===o.substring(0,4)||"https"===o.substring(0,5)||"mailto:"===o.substring(0,7)||"/"===o.substring(0,1))return!0;for(i.preventDefault(),r=o.substr(1),m=n.length,c={},l=0;m>l;l++)c[n[l].id]=n[l].offsetTop;var u=e.hasClass(a.unstickyModeClass)?c[r]-2*d+2+"px":c[r]-d+2+"px";s("html, body").stop().animate({scrollTop:u},{duration:a.animDuration,easing:a.easing,complete:function(){t.getElementById(r).focus()}})});var u=function(){var u=s(i),f=u.scrollTop(),p=u.width(),C=u.height();if(!a.mobile&&p<a.mobileWidth)return void e.css("position",o);if(m.removeClass(a.activeClass),n.each(function(){var i=s(this).offset().top-d,t=s(this).outerHeight(!0)+i;f>=i&&t>=f&&("a"===a.selector?e.find('li a[href~="#'+this.id+'"]').addClass(a.activeClass):e.find('li a[href~="#'+this.id+'"]').parent().addClass(a.activeClass))}),f>=l+a.startAt?(e.removeClass(a.unstickyModeClass).addClass(" "+a.stickyModeClass),e.css({position:"fixed",zIndex:a.zindex}).stop(),a.jqueryEffects?(a.animateCSSRepeat||e.hide().stop()[a.jqueryAnim](a.animDuration,a.easing),e.hide().stop()[a.jqueryAnim](a.animDuration,a.easing)):a.animateCSS?a.animateCSSRepeat?e.addClass(a.cssAnimation+" animated").one("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd",function(s){e.removeClass(a.cssAnimation+" animated")}):e.addClass(a.cssAnimation+" animated").one("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd"):e.stop()):e.css({position:o,zIndex:r}).removeClass(a.stickyModeClass).addClass(" "+a.unstickyModeClass),"undefined"!=typeof h){var h=n.last(),v=h.offset().top+h.outerHeight(!0);u.scrollTop()+C>=s(t).height()&&v>=f&&m.removeClass(a.activeClass).last().addClass(a.activeClass),l-2>=f&&(e.removeClass(a.cssAnimation+" animated"),a.jqueryEffects?(0===f&&m.removeClass(a.activeClass),f>=l?e.css({position:"fixed",zIndex:a.zindex}).hide().stop()[a.jqueryAnim](a.animDuration,a.easing):e.css({position:o,zIndex:a.zindex})):(0===f&&m.removeClass(a.activeClass),e.css({position:o,top:c}).stop().animate({top:c},a.animDuration,a.easing)))}};s(i).scroll(u),s(i).ready(u),s(i).resize(u),s(i).load(u)})}}(jQuery,window,document);


