var hds = window.hds || {};

(function(window, document, $, hds) {

    hds.resourceLib = {
        init: function(options) {
            var defaults = {
                filterleftSide: '.newsEvents',
                paginationWrapper: '#loadResourceContent',
                myPageName: "#page-",
                itemsPerPage: pageSize,
                filterTopLeft: '.filters-section',
                filterTarget: '.resource',
                featuredGatedIcon: '/etc/clientlibs/hdscorp/main/images/gated-icon-white.png',
                searchUrl: '/content/hdscorp/en_us/lookup/resourcelibraryrenderer.html'
            }
            
            var slingIncludedContent = false ;            
            if($('.slingcontent').length > 0){
                slingIncludedContent =  true;
            }

            this.options = $.extend(defaults, options);
            hds.resourceLib._checkSelectedNav();
            hds.resourceLib._bindEventsSelectors();
            hds.resourceLib._filterSearchResults();
            if(slingIncludedContent){
                hds.resourceLib._processSlingIncludedContent();
                slingIncludedContent = false;
            }
            hds.resourceLib._openvideooverlay();
            
        },
        _openvideooverlay: function() {
        	var qURL = window.location.href;
        	var indexOfQueryStart = qURL.indexOf("?") ;
        	if(indexOfQueryStart > 0){
        		qURL = qURL.substring(0,indexOfQueryStart); 
        	}
        	var parms = hds.resourceLib._getParmsFromURLHash(qURL);
        	var videoID = parms["vid"];
        	hds.resourceLib._openvideooverlayById(videoID);
        },        
        _openvideooverlayById: function(videoID) {
        	var videoID = videoID;
        	var videoGUID = "video"+videoID;
        	var gblPlayingVideo;
        	if($.trim(videoID).length > 0){
        		var vidObjMkup = $(".bcobjmarkup").html();
        		vidObjMkup = vidObjMkup.replace(/#videoTitleId/g,videoID).replace("#videoGuid",videoGUID);
        		videobox = new HDS.Lightbox();
        		gblPlayingVideo = undefined ; 
        		videobox.setContent('');
        		videobox.setContent(vidObjMkup);
        	    videobox.show();
        	    initiateVideo();
        	}
        },
        _getParmsFromURLHash: function(url) {
            var parms = {}, pieces, parts, i;
            var hash = url.lastIndexOf("html");
            if (hash !== -1) {
                url = url.slice(hash + 1);
            }
            var filters = url.indexOf("#");
            if (filters !== -1) {
                url = url.slice(filters + 1);
                pieces = url.split("#");
                for (i = 0; i < pieces.length; i++) {
                    parts = pieces[i].split("=");
                    if (parts.length < 2) {
                        parts.push("");
                    }
                    parms[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
            }
            return parms;
        },
        _checkSelectedNav: function() {
            $('#asideLinks-product  li').each(function(index, el) {
                if ($(this).hasClass('active')) {
                    hds.resourceLib._handleActiveCategory($(this).find('a'));
                    $('.resource-heading > h2').html('').html($(this).find('a').text());
                }
            });

            var qURL = window.location.href;
            var parms = hds.resourceLib._getParmsFromURLHash(qURL);
            var filter1 = parms["ind"]; 
            var filter2 = parms["content"]; 
            var filter3 = parms["subcat"];                  

            $('#asideLinks-product li.active input').each(function(){
                var inputId = $(this).attr('id');
                if(inputId == filter3){
                    $(this).trigger('click');
                }
            })
            $('.FilterByIndustryList input[name="ctyFunction"]').each(function(){
                var inputId = $(this).attr('id');
                if(inputId == filter1){
                    $(this).trigger('click');
                }
            })
            $('.FilterByContentList input[name="ctyFunction"]').each(function(){
                var inputId = $(this).attr('id');
                if(inputId == filter2){
                    $(this).trigger('click');
                }
            })
            setTimeout(function(){
                $('#showIndustry, #showContentType').trigger('click');  
            }, 200);
        },
        _showFilterDropDown: function(arg) {
            var optionSelected = this.options.filterTopLeft;
            $(optionSelected).hide();
            $(optionSelected).each(function(index, el) {
                if ($(this).attr('id') === arg) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
                return
            });
        },
        _processSlingIncludedContent: function() {
            $('.resource').addClass('visible');
            $('.category-resources-listing').find('.no-matched-result').remove();
            if ($.trim($(".resourceLibraryContent").html()).length === 0) {
				if ($('#asideLinks-product li').eq(0).hasClass('active')) {
                    $('.category-resources-listing').find('.no-matched-result').remove();
                }else{
                    $('.category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
                }
            } else {
                $('.category-resources-listing').find('.no-matched-result').remove();
                hds.resourceLib._setPagination();
                $('#prodnsolcategorycontent a.isGatedLock').each(function(index, el) {
                    $(this).prepend("<span class='glyphicon gated-pdf' aria-hidden='true'></span>");
                });
            }

        },
        _handleActiveCategory: function(activeCat) {
            var hasTextInput = $.trim($('#resSearch').val());

            var catText = $(activeCat).text();
            if (!$(activeCat).parent().index() == 0) {
                $('#filterTag .keyword-subcat').html('').show();
                hds.resourceLib._addTagstpFilters(catText, '#filterTag .keyword-subcat');
                $('#filterTag .label').css({
                    'display': 'inline'
                });
                $('.resource-filters').find('div.disable-filter').remove();
            }else{
                $('#filterTag .label').css({
                    'display': 'none'
                });
                $('.resource-filters').append('<div class="disable-filter"/>');
            }
            var self = $(activeCat),
                checkInputIfEmpty = $.trim($('#resSearch').val());

            if (!self.parent('li').hasClass('active')) {
                $('#loadResourceContent').empty();
                window.history.pushState("", document.title, window.location.pathname);
                $('#asideLinks-product li').removeClass('active');
                $('#asideLinks-product li ul').slideUp();
                var $url = $(activeCat).attr('data-href'),
                    $featuredurl = $(activeCat).attr('featured-href');
                self.parent('li').addClass('active');
                self.addClass('active');
                if (self.parent('li').index() > 0) {
                    $('#resSearch').attr('placeholder', "Search " + $.trim($('#asideLinks-product > li.active').find('a').text()));
                } else {
                    $('#resSearch').attr('placeholder', "Search All Resources");
                }

                $('.resource-heading > h2').html('').html($('#asideLinks-product > li.active').find('a').text());
                if ($(activeCat).parent().has('ul').length) {
                    $(activeCat).parent().find('ul').slideDown();
                }

                if (checkInputIfEmpty.length > 0) {
                    //Check If Input is empty
                    $url = $url + "?fulltext=" + encodeURIComponent(checkInputIfEmpty);
                } else {
                    $url = $url;
                }

                if ($url !== "") {
                    hds.resourceLib._processClickAside($url);
                } else {
                    $("#prodnsolcategorycontent").html('');
                    $("#loadResourceContent").html('');
                    $('.resource-heading > h2').html('').html($('#asideLinks-product > li.active').find('a').text());
                }
                if ($featuredurl !== "" && hasTextInput.length <= 0) {
                    hds.resourceLib._processCatagoryCards($featuredurl);
                } else {
                    $("#featuredCards").html('').hide();
                }
            } else {
                $('body').find('div.cover').remove();
                return false;
            }
        },
        _processClickAside: function(url) {
            var paginations = this.options.paginationWrapper;
            $(paginations).pagination('destroy');
            $('#loadResourceContent').empty();
            $('.category-resources-listing').find('.no-matched-result').remove();
            $("#prodnsolcategorycontent").html('').load(url + " .resourceLibraryContent", function(responseText, textStatus) {
                if (textStatus === 'success' || textStatus === 'notmodified') {
                    hds.resourceLib._processSlingIncludedContent();
                    $('#showIndustry, #showContentType').trigger('click');
                    $('body').find('div.cover').remove();
                    $('.resource-filters').find('div.disable-filter').remove();
                    $('.resource.visible:visible').last().css({"border-bottom":"none"});
                }
                if (textStatus === 'error') {
                    $('body').find('div.cover').remove();
                }
            });

        },
        _processCatagoryCards: function(url) {
            $('.category-resources-listing').find('.no-matched-result').remove();
            var paginations = this.options.paginationWrapper;
            var featuredGatedIconPath = this.options.featuredGatedIcon ;
            $(paginations).pagination('destroy');
            $('#loadResourceContent').empty();
            $("#prodnsolcategorycontent").empty();
            $("#featuredCards").html('').load(url + " .resourceLibraryfeatered", function(responseText, textStatus) {
                if (textStatus === 'success' || textStatus === 'notmodified') {
                    $('body').find('div.cover').remove();
                }
                if (textStatus === 'error') {
                    $('body').find('div.cover').remove();
                }
                if ($.trim($(".resourceLibraryfeatered").html()) === '') {
                    $("#featuredCards").hide();
                    $('.category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
                } else {
                    $("#featuredCards").show();
                    $('#featuredCards a.isGatedLock').each(function(index, el) {
                        //$(this).prepend("<span class='glyphicon gated-featured' aria-hidden='true'></span>");
                        $(this).closest('.spotlight-content').find('.spotlight-image-icon').attr('src',featuredGatedIconPath);
                    });
                }
            });
        },
        _getSelectedURLPath: function() {
            var $url;
            $('#asideLinks-product  li').each(function(index, el) {
                if ($(this).hasClass('active') && $(this).index() > 0) {
                    $url = $(this).find('a').attr('data-href');
                }
            });
            return $url
        },
        _isEmptySearcURL: function() {
            var $searchUrl = this.options.searchUrl;
            return (hds.resourceLib._getSelectedURLPath() === undefined || hds.resourceLib._getSelectedURLPath() == null || hds.resourceLib._getSelectedURLPath().length <= 0) ? $searchUrl : hds.resourceLib._getSelectedURLPath();
        },
        _loadDataOnsearch: function() {
            var $keyword = $.trim($("#resSearch").val()),
                paginations = this.options.paginationWrapper,
                $defaultURL = this.options.searchUrl,
                $searchUrl = hds.resourceLib._isEmptySearcURL();

            if ($keyword.length > 0) {
                $('#loadResourceContent').empty();
                $(paginations).pagination('destroy');
                $('.errorSearchField').css('display', 'none');
                $('#featuredCards').html('');
                hds.resourceLib._processClickAside($searchUrl + '?fulltext=' + encodeURIComponent($keyword));                   
                $('.resource-heading > h2').html('').html("Search Results");
                $('#asideLinks-product  li').each(function(index, el) {
                    if ($(this).hasClass('active') && $(this).index() <= 0) {
                        $(this).removeClass('active');
                    }
                });
                $('#featuredCards').css('display', 'none');   

            } else {
                $('.errorSearchField').css('display', 'block');
            }
        },
        _processIndustryFilter: function(arg1, arg2, arg3) {
            var conditions = {
                filter1: arg1,
                filter2: arg2,
                filter3: arg3
            }
            var paginations = this.options.paginationWrapper;
            $('.resource').removeAttr('style').removeClass('visible').filter(function() {
                var self = $(this);
                var result = true;
                var or_cond = false;

                Object.keys(conditions).forEach(function(filter) {
                    if ($.isArray(conditions[filter])) {
                        if (filter == "filter3") {
                            var indCat = self.data('subfilter').split(',');
                            var checkMatches = $.grep(conditions[filter], function(val) {
                                return or_cond = or_cond && $.inArray(val, indCat) !== -1;
                            });
                        }
                        if (filter == "filter1") {
                            var indCat = self.data('indstry').split(',');
                            var checkMatches = $.grep(conditions[filter], function(val) {
                                return or_cond = or_cond && $.inArray(val, indCat) !== -1;
                            });
                        }
                        if (filter == "filter2") {
                            var indCat = self.data('contenttype').split(',');
                            var checkMatches = $.grep(conditions[filter], function(val) {
                                return or_cond = or_cond && $.inArray(val, indCat) !== -1;
                            });
                        }
                        var checkMatches = $.grep(conditions[filter], function(val) {
                            return or_cond = or_cond || $.inArray(val, indCat) !== -1;
                        });
                        result = (result && or_cond) || checkMatches.length === filter.length;
                    }
                });
                return result;
            }).addClass('visible');
            
            if ($(".resource:visible").length === 0) {                
                if(!$('#featuredCards').is(":visible")){
                    $('.category-resources-listing').find('.no-matched-result').remove();
                    $('.category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
                }
            }else{
                $('.category-resources-listing').find('.no-matched-result').remove();
                $('.resource.visible:visible').last().css({"border-bottom":"none"});
            }
            $(paginations).pagination('destroy');
            $('#loadResourceContent').empty();
            if ($('.prodnsolcategorycontent .visible').length > 10) {
                hds.resourceLib._setPagination();
            }
        },
        _setPagination: function() {
            var paginations = this.options.paginationWrapper;
            var myPageName = this.options.myPageName;
            var items = $('.prodnsolcategorycontent .visible');
            var numItems = items.length;
            var perPage = this.options.itemsPerPage;

            if (numItems > perPage) {
                $(paginations).pagination('destroy');
                items.slice(perPage).hide();
                $(paginations).pagination({
                    items: numItems,
                    itemsOnPage: perPage,
                    cssStyle: "light-theme",
                    onPageClick: function(pageNumber) {
                        if(pageNumber !== 1){
                            $("#featuredCards").hide();
                        }else{
                            if($('#featuredCards').html() !== ""){
                                $("#featuredCards").show();
                            }                            
                        }
                        var showFrom = perPage * (pageNumber - 1);
                        var showTo = showFrom + perPage;
                        items.hide().slice(showFrom, showTo).show();
                        $('body').scrollTo('.category-resources-listing',{duration:'slow', offsetTop : '50'});
                        $('.resource.visible:visible').last().css({"border-bottom":"none"});
                    }
                });
            }
            hds.resourceLib._hashPageNum();
        },
        _hashPageNum: function() {
            var myPageName = this.options.myPageName;
            var paginations = this.options.paginationWrapper;
            var hashPageNum = window.location.hash || (myPageName + "1");
            var re = new RegExp("^" + myPageName + "(\\d+)$");
            hashPageNum = hashPageNum.match(re);
            /*if (hashPageNum) {
                $(paginations).pagination("selectPage", parseInt(hashPageNum[1]));
            }*/
        },
        _filterSearchResults: function() {
            $(document).on('change', '.resources-listing input', function() {
                hds.resourceLib._checkSearchEmpty();
                $('.no-matched-result').hide();
                if ($(".resource:visible").length === 0) {
                    if(!$('#featuredCards').is(":visible")){
                        $('.category-resources-listing').find('.no-matched-result').remove();
                        $('.category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
                    }
                }
                $('.resource.visible:visible').last().css({"border-bottom":"none"});
            });
        },
        _checkSearchEmpty: function() {
            var $allCheckedFilters = $('.resources-listing input.filters').filter(':checked');
            var $allCheckedIndFilters = $('.FilterByIndustryList input.filters').filter(':checked');
            var $allCheckedContFilters = $('.FilterByContentList input.filters').filter(':checked');

            if ($allCheckedIndFilters.length > 0) {
                var checkedIndVals = $.map($allCheckedIndFilters, function(el) {
                    return el.value
                });
            }
            if ($allCheckedContFilters.length > 0) {
                var checkedContVals = $.map($allCheckedContFilters, function(el) {
                    return el.value
                });
            }

            if ($allCheckedFilters.length > 0) {
                var checkedSubVals = $.map($allCheckedFilters, function(el) {
                    return el.value
                })
            }

            console.log(checkedIndVals + " = " + checkedContVals + " = " + checkedSubVals);
            hds.resourceLib._processIndustryFilter(checkedIndVals, checkedContVals, checkedSubVals);
        },
        _buildMobileNavigation: function(arg) {
            if ($(window).width() < 991) {
                if($('.searchArea').html() === ''){
                    var getMobileSearc = $('#resource-search').html();
                    $('.searchArea').html(getMobileSearc);
                    $('#resource-search').html('');
                }
                if($('.filtrSideBar').html() === ''){
                    var getRightMenu = $('#mobilerightMenu').html();
                    $('.filtrSideBar').html(getRightMenu);
                    $('#mobilerightMenu').html('');
                }
                if($('.FilterAreaIndustry').html() === ''){
                    var getFilterIndustry = $('#FilterByIndustry .filters-list').html();
                    $('.FilterAreaIndustry').html(getFilterIndustry);
                    $('#FilterByIndustry .filters-list').html('');
                }
                if($('.FilterAreaContent').html() === ''){
                    var getFilterCpntent = $('#FilteyContentType .filters-list').html();
                    $('.FilterAreaContent').html(getFilterCpntent);
                    $('#FilteyContentType .filters-list').html('');
                }
            } else {
                if (!hds.resourceLib._isEmpty($('.searchArea'))) {
                    $('#resource-search').html($('.searchArea').html());
                    $('.searchArea').html('');
                }

                if (!hds.resourceLib._isEmpty($('.filtrSideBar'))) {
                    $('#mobilerightMenu').html($('.filtrSideBar').html());
                    $('.filtrSideBar').html('');
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaIndustry'))) {
                    $('#FilterByIndustry .filters-list').html($('.FilterAreaIndustry').html());
                    $('.FilterAreaIndustry').html('')
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaContent'))) {
                    $('#FilteyContentType .filters-list').html($('.FilterAreaContent').html());
                    $('.FilterAreaContent').html('')
                }
            }

        },
        _isEmpty: function(el) {
            return !$.trim(el.html())
        },
        _showMobileOverlay: function() {
            hds.resourceLib._buildMobileNavigation();
            $('.overlayBox').css({
                display: 'block',
                left: 0,
                top: 0,
                position: 'absolute'
			}).animate({
                scrollTop: 0
            });
            $('.bgCover').css({
                display: 'block',
                width: $(window).width(),
                height: ' 100%',
            });
            $('.bgCover').css({
                opacity: 0
            }).animate({
                opacity: 1,
                backgroundColor: '#000'
            });
        },
        _closeOverLayPopup: function() {
            if (!hds.resourceLib._isEmpty($('.searchArea'))) {
                //$('#resource-search').html($('.searchArea').html());
                //$('.searchArea').html('');
            }

            if (!hds.resourceLib._isEmpty($('.filtrSideBar'))) {
                //$('#mobilerightMenu').html($('.filtrSideBar').html());
                //$('.filtrSideBar').html('');
            }
            if (!hds.resourceLib._isEmpty($('.FilterAreaIndustry'))) {
                //$('#FilterByIndustry .filters-list').html($('.FilterAreaIndustry').html());
                //$('.FilterAreaIndustry').html('')
            }
            if (!hds.resourceLib._isEmpty($('.FilterAreaContent'))) {
                //$('#FilteyContentType .filters-list').html($('.FilterAreaContent').html());
                //$('.FilterAreaContent').html('')
            }
            $('.overlayBox').css('display', 'none');
            $('.bgCover').animate({
                opacity: 0
            }, null, null, function() {
                $(this).hide();
            });

        },
        _getCheckboxValue: function(arg1) {

            if (arg1 != 0) {
                var newHTML = $.map(arg1, function(value) {
                    var checkBoxVal = $("#" + value).val();
                    var checkBoxText = $("#" + value).siblings('label').text();
                    return $("<span class='filterKeyword' data-match=" + checkBoxVal + ">" + checkBoxText + "<span class='closeFilter glyphicon glyphicon-remove'></span></span>");
                });
                $('#filterTag .label').css({
                    'display': 'inline'
                });
                $('#filterTag .keyword-filter').html(newHTML);
            } else {
                if ($('#filterTag .keyword-subcat').html() != "") {
                    $('#filterTag .label').css({
                        'display': 'inline'
                    });
                    if (arg1 == 0) {
                        $('#filterTag .keyword-filter').html('');                        
                    }
                } else {
                    $('#filterTag .keyword-filter').html('');
                    $('#filterTag .label').css({
                        'display': 'none'
                    });
                }
            }
        },
        _addTagstpFilters: function(checkBoxValue, tag) {
            $newTag = $("<span class='filterKeyword'>" + checkBoxValue + "<span class='closeCat glyphicon glyphicon-remove'></span></span>");
            /* store the value in elment data so we can reference back to checkbox */
            $newTag.data('value', checkBoxValue);
            $(tag).append($newTag);
        },
        _addKeywordSearchTag: function(checkBoxValue, tag) {
            $('#searchTag .keyword').html('');
            $newTag = $("<span class='filterKeyword'>" + checkBoxValue + "<span class='closeKeyword glyphicon glyphicon-remove'></span></span>");
            /* store the value in elment data so we can reference back to checkbox */
            $newTag.data('value', checkBoxValue);
            $(tag).append($newTag);
        },
        _processlinkwithoutSearch: function() {
            var $url = $('#asideLinks-product  li.active').find('a').attr('data-href'),
                $featuredurl = $('#asideLinks-product  li.active').find('a').attr('featured-href');

            if ($url === undefined || $url == null || $url.length <= 0) {

                $('#resSearch').attr('placeholder', "Search All Resources");
                $('.resource-heading > h2').html('').html($('#asideLinks-product  li').eq(0).find('a').text());                
                hds.resourceLib._processCatagoryCards($featuredurl);

            } else {
                if ($featuredurl !== "") {
                    hds.resourceLib._processCatagoryCards($featuredurl);
                }
                hds.resourceLib._processClickAside($url);
                $('#resSearch').attr('placeholder', "Search " + $.trim($('#asideLinks-product  li.active').find('a').text()));
                $('.resource-heading > h2').html('').html($('#asideLinks-product  li.active').find('a').text());

            }
        },
        _bindEventsSelectors: function() {
            $(document).on('keyup', '#resSearch', function(event) {
                var value = $.trim($(this).val());
                if (value.length > 0) {
                    $('.clearSearchIcon').show();
                } else {
                    $('.errorSearchField,.clearSearchIcon').hide();
                }
                event.preventDefault();
            });

            $(document).on('click', '.clearSearchIcon', function(event) {
                $('#resSearch').val('');
                if($('#resSearch').val() == ""){
                    if($('#filterTag .keyword-subcat').html() === ""){
                        $('#asideLinks-product  li').eq(0).find('a').trigger('click');
                    }
                }
                $(this).hide();
                $('#searchTag .keyword').html('');
                $('#searchTag .label').css({
                    'display': 'none'
                });
                hds.resourceLib._processlinkwithoutSearch();
                event.preventDefault();
            });
            $(document).on('click', '.searchResource', function(event) {               
                var txtVal = $.trim($('#resSearch').val());
                if(txtVal.length > 0){
					if ($(window).width() < 991) {
                        if ($('.overlayBox').is(':visible')) {
                            hds.resourceLib._closeOverLayPopup();
                        }
                        $('body').scrollTo('#sectionResourceLib',{duration:'slow', offsetTop : '50'});
                    }
                    $('body').append('<div class="cover"/>');
                    $('#searchTag .label').css({
                        'display': 'inline'
                    });
                    hds.resourceLib._addKeywordSearchTag(txtVal, '#searchTag .keyword');
                    //$('.overlayBox').css('display', 'none');                    
                }
                $('.resource-heading > h2').html('').html("Search Results");
                hds.resourceLib._loadDataOnsearch();
                event.preventDefault();
            });
            $(document).on('keypress', '#resSearch', function(event) {                
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == 13) {
                    event.preventDefault();                    
                    var txtVal = $.trim($('#resSearch').val());
                    if(txtVal.length > 0){
						if ($(window).width() < 991) {
                            if ($('.overlayBox').is(':visible')) {
                                hds.resourceLib._closeOverLayPopup();
                            }
                            $('body').scrollTo('#sectionResourceLib',{duration:'slow', offsetTop : '50'});
                        }
                        $('body').append('<div class="cover"/>');
                        $('#searchTag .label').css({
                            'display': 'inline'
                        });
                        hds.resourceLib._addKeywordSearchTag(txtVal, '#searchTag .keyword');                    
                    }
                    $('.resource-heading > h2').html('').html("Search Results");
                    hds.resourceLib._loadDataOnsearch();
                }
            });

            $(document).on('click', '.launchLink a', function(event) {
                $('body').addClass('overflow-mobile');
                hds.resourceLib._showMobileOverlay();                
                event.preventDefault();
            });

            $(document).on('click', '.closeOverlay', function(event) {
                $('body').removeClass('overflow-mobile');
                hds.resourceLib._closeOverLayPopup();
                event.preventDefault();
            });

            $(document).on('click', '#asideLinks-product li > a', function(event) {
                $('body').append('<div class="cover"/>');
                $('#filterTag .keyword-subcat, #filterTag .keyword-filter').html('');
                $("input[name='ctyFunction']").removeAttr('checked');
                $("input[name='cbxFunction']").removeAttr('checked');
                hds.resourceLib._handleActiveCategory($(this));
                event.preventDefault();
            });

            /* Filters By Industry/Content Type */
            var open = $('.filterby'),
                a = $('.resource-filters').find('a');
            open.click(function(e) {
                e.preventDefault();
                $('.errorSearchField').css('display', 'none');
                var filterId = $(this).data('refilter');
                var $this = $(this),
                    speed = 500;
                if ($this.hasClass('active') === true) {
                    $this.removeClass('active');
                    $('.filters-section').hide();

                } else if (a.hasClass('active') === false) {
                    $this.addClass('active');
                    $('#' + filterId).show();
                } else {
                    a.removeClass('active');
                    $('.filters-section').hide();
                    $this.addClass('active');
                    $('#' + filterId).show();
                }
                e.stopPropagation();
            });
            $(document).click(function(e) {  
                if (!$(e.target).is('.filters-section, .filters-section *')) {
                    $(".filters-section").hide();
                    $('.filterby').removeClass('active');
                }

            });

            // Fade out specialty tags when x is clicked
            $(document).on('click', '.closeFilter', function() {
                var eleVal = $(this).parent().text();
                if (eleVal) {
                    $('input[name="ctyFunction"]').each(function() {
                        if ($(this).siblings('label').text() == eleVal) {
                            $(this).removeAttr('checked');
                        }
                    })
                    $(this).parent().fadeOut('slow');
                    $(this).parent().remove();
                    $('#showIndustry, #showContentType').trigger('click');
                }
                if(($('#filterTag .keyword-subcat').html() == '') || ($('#filterTag .keyword-filter').html() == '')){
                    $('.category-resources-listing').find('.no-matched-result').remove();
                }                
            })
            $(document).on('click', '.closeCat', function() {
                if($("#resSearch").val() != ''){
					$('body').append('<div class="cover"/>');
                    $('#asideLinks-product li').removeClass('active');
                    $('#asideLinks-product li ul').slideUp();   
                    $('.category-resources-listing').find('.no-matched-result').remove();
                    $('#filterTag .keyword-subcat, #filterTag .keyword-filter').html('');
                    hds.resourceLib._loadDataOnsearch();
                    $('#filterTag .label').css({
                        'display': 'none'
                    });                                     
                }else{
                    var $featuredurl = $('#asideLinks-product li').eq(0).find("a").attr('featured-href');
                    $('#resSearch').attr('placeholder', "Search All Resources");
                    $('.resource-heading > h2').html('').html($('#asideLinks-product  li').eq(0).find('a').text());
                    $('#asideLinks-product  li').eq(0).find('a').trigger('click');
                    $('.errorSearchField,.clearSearchIcon').hide();
                    $('.category-resources-listing').find('.no-matched-result').remove();
                    $("#loadResourceContent").html('');
                    $('#filterTag .label, #searchTag .label').css({
                        'display': 'none'
                    });
                }
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
            })

            $(document).on('click', '.closeKeyword', function() {
				$('body').append('<div class="cover"/>');
                $("#resSearch").val('');
                $(this).parent().fadeOut('slow');
                $(this).parent().remove();
                $('#searchTag .label').css({
                    'display': 'none'
                });
                $('.clearSearchIcon').trigger('click');
                if($('#filterTag .keyword-subcat').html() == ''){
                    $('#asideLinks-product  li').eq(0).find('a').trigger('click');
                    $('.resource-heading > h2').html('').html($('#asideLinks-product  li').eq(0).find('a').text());
                }
            })
            $(document).on('click', '.clear-results', function() {
                $('#filterTag .keyword-subcat, #filterTag .keyword-filter').html('');
                $('.category-resources-listing').find('.no-matched-result').remove();
                $("input[name='ctyFunction']").removeAttr('checked');
                $("input[name='cbxFunction']").removeAttr('checked');
                $("#resSearch").val('');
                $('.errorSearchField,.clearSearchIcon').hide();
                $('#asideLinks-product li').eq(0).find("a").trigger('click');
                $('.closeKeyword').trigger('click');
                $('.resource-filters').find('div.disable-filter').remove();
                $('.resource-filters').append('<div class="disable-filter"/>');
                $('#filterTag .label').css({
                    'display': 'none'
                });
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
            });

            $(window).resize(function() {
                hds.resourceLib._closeOverLayPopup();
            });
            $(document).on('click', '#mobShowFilters', function() {
                if ($(window).width() < 991) {
                    if ($('.overlayBox').is(':visible')) {
                        hds.resourceLib._closeOverLayPopup();
                    }
                    $('body').scrollTo('#sectionResourceLib',{duration:'slow', offsetTop : '50'});
                }
                $('#showIndustry, #showContentType').trigger('click');
            })
            $(document).on('click', '#showIndustry, #showContentType', function(event) {
                var arrVal = [];
                $('input[name="ctyFunction"]:checked').each(function() {
                    arrVal.push($(this).attr('id'));
                });
                hds.resourceLib._getCheckboxValue(arrVal);

                var $allCheckedFilters = $('.resources-listing input.filters').filter(':checked'),
                    $allCheckedIndFilters = $('.FilterByIndustryList input.filters').filter(':checked'),
                    $allCheckedContFilters = $('.FilterByContentList input.filters').filter(':checked');

                if ($allCheckedIndFilters.length > 0) {
                    var checkedIndVals = $.map($allCheckedIndFilters, function(el) {
                        return el.value
                    });
                }
                if ($allCheckedContFilters.length > 0) {
                    var checkedContVals = $.map($allCheckedContFilters, function(el) {
                        return el.value
                    });
                }

                if ($allCheckedFilters.length > 0) {
                    var checkedSubVals = $.map($allCheckedFilters, function(el) {
                        return el.value
                    });
                }
                if ($allCheckedFilters.length < 0) {
                    haveFilters = null;
                }
                $('.filters-section').hide();
                $('.resource-filters > a').removeClass('active');
                $('#filterTag .keyword-filter').show();
                hds.resourceLib._processIndustryFilter(checkedIndVals, checkedContVals, checkedSubVals);                
                event.preventDefault();
            });            
        }
    }
}(window, document, jQuery, hds));

$(function() {
    if ($('#sectionResourceLib').length > 0) {
        hds.resourceLib.init();
    }
})