var hds = window.hds || {};
var pstag;
var subcat;
var psname;
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
            
            if (localStorage) {
                localStorage.setItem('resStatus', 'false');
                localStorage.setItem('cardStatus', 'false');
            }
            var slingIncludedContent = false ;            
            if($('.slingcontent').length > 0){
                slingIncludedContent =  true;
            }

            this.options = $.extend(defaults, options);
            hds.resourceLib._checkSelectedNav();
            hds.resourceLib._bindEventsSelectors();
            hds.resourceLib._filterSearchResults();
            hds.resourceLib._setSortByRelPosition();
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
            var pPageName = window.location.href;
            var videoGUID = "video"+videoID;
            var gblPlayingVideo;
            if($.trim(videoID).length > 0){
                var vidObjMkup = $(".bcobjmarkup").html();
                //vidObjMkup = vidObjMkup.replace(/#videoTitleId/g,videoID).replace("#videoGuid",videoGUID);
                vidObjMkup = '<object id="myExperience'+videoID+'" class="BrightcoveExperience"> <param name="linkBaseURL" value="https://www.hds.com/en-us/news-insights/resources.html#vid='+videoID+'"/> <param name="bgcolor" value="#FFFFFF" />  <param name="width" value="920" />  <param name="height" value="517" />  <param name="playerID" value="'+videoID+'" /><param name="playerKey" value="AQ~~,AAADnJnNnnk~,ltuihYvDjRKL7D7fwmzXgyXNR-vMq9ot" />  <param name="isVid" value="true" />  <param name="isUI" value="true" />  <param name="dynamicStreaming" value="true" />    <param name="@videoPlayer" value="'+videoID+'" />  <param name="secureConnections" value="true" /><param name="secureHTMLConnections" value="true" /><param name="includeAPI" value="true" /><param name="templateLoadHandler" value="myTemplateLoaded" /></object>';
                videobox = new HDS.Lightbox();
                gblPlayingVideo = undefined ; 
                videobox.setContent('');
                videobox.setContent(vidObjMkup);
                videobox.show();
                initiateVideo();
                brightcove.createExperiences();


                /* WA Video Tracking Code */
                var vidId = 'Video Id: ' + videoID;
                if(window.location.href.indexOf("digital-transformation") > -1) {
                    vidId = 'dt>Video Id: ' + videoID;
                }
                videoTracking(vidId, pPageName);
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
		 _urlParam:function(name){
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
                if (results==null){
                   return null;
                }
                else{
                   return results[1] || 0;
                }
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
            subcat=filter3;
			//var psname = hds.resourceLib._urlParam('psname');
            //pstag = hds.resourceLib._urlParam('pstag');
            psname =  parms["psname"];
            pstag =  parms["pstag"];
            $('#asideLinks-product li.active input').each(function(){
                var inputId = $(this).attr('id');
                if(inputId == filter3){
                    $(this).trigger('click');
					if(pstag!=null && psname!=null)
                    {
						$('#searchTag .label').css({
                            'display': 'inline'
                        });
                        hds.resourceLib._addKeywordSearchTag(decodeURIComponent(psname), '#searchTag .keyword'); 
                    }
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

            var stringUrl = qURL;
            var n=stringUrl.lastIndexOf("/");
            stringUrl=stringUrl.substring(n+1, 1000);
            n=stringUrl.lastIndexOf(".");
            if(n>0){
                stringUrl=stringUrl.substring(0, n);
                n=stringUrl.lastIndexOf(".");
                if(n>0 || filter3 !== undefined){
                    $('body').scrollTo('.res-filters-search',{duration:'slow', offsetTop : '50'});
                    $('.sortResources').show();
					$('.sort-by-list li:eq(0)').addClass('selected');
                }
            }
            setTimeout(function(){
                $('#showIndustry, #showContentType').trigger('click');                
            }, 1000);
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
                    $('.category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 15px; text-align: center;"><strong>Can’t Find What You’re Looking For?</strong><br>Please change your search criteria and try again.</div>');
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
                if ($(window).width() < 991) {
                    $('.topFilter').show();
                }else{
                    $('.resource-filters').show();
                }
            }else{
                $('#filterTag .label').css({
                    'display': 'none'
                });
                if ($(window).width() < 991) {
                    $('.topFilter').hide();
                }else{
                    $('.resource-filters').hide();
                }                
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
                    if (checkInputIfEmpty.length > 0) {
                        //Check If Input is empty
                        $url = $url + "?fulltext=" + encodeURIComponent(checkInputIfEmpty);
                    } else {
						$('#resSearch').val('');
                        $('#searchTag .keyword').html('');
                        $('#searchTag .label').css({
                            'display': 'none'
                        });
                        pstag='';
                        $url = $url;
                    }
                } else {
                    $('#resSearch').val('');
                    $('#searchTag .keyword').html('');
                    $('#searchTag .label').css({
                        'display': 'none'
                    });
                    $('.clearSearchIcon').hide();
                    $('#resSearch').attr('placeholder', "Search All Resources");
                }

                $('.resource-heading > h2').html('').html($('#asideLinks-product > li.active').find('a').text());
                if ($(activeCat).parent().has('ul').length) {
                    $(activeCat).parent().find('ul').slideDown();
                }                
                if ($url !== "") {
                    hds.resourceLib._processClickAside($url);
                } else {
                    $("#prodnsolcategorycontent").html('');
                    $("#loadResourceContent").html('');
                    $('.resource-heading > h2').html('').html($('#asideLinks-product > li.active').find('a').text());
                    localStorage.setItem('resStatus', 'false');                    
                }
                if ($featuredurl !== "") {
                    hds.resourceLib._processCatagoryCards($featuredurl);
                } else {
                    localStorage.setItem('cardStatus', 'false');                    
                    $("#featuredCards").html('').hide();
                }
            } else {
                localStorage.setItem('resStatus', 'false');
                localStorage.setItem('cardStatus', 'false');
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
                    if ($(window).width() < 991) {
                        $('.topFilter').show();
                    }else{
                        $('.resource-filters').show();
                    }
                    $('.resource.visible:visible').last().css({"border-bottom":"none"});
					$('.resource.visible:visible:first').css({'padding-top':'0px'});
                    localStorage.setItem('resStatus', 'false');

                    $('.sortResources').show();
                    hds.resourceLib._setSortByRelPosition();                   
                }
                if (textStatus === 'error') {
                    localStorage.setItem('resStatus', 'false');
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
                    localStorage.setItem('cardStatus', 'false');
                }
                if (textStatus === 'error') {
                    localStorage.setItem('cardStatus', 'false');
                }
                if ($.trim($(".resourceLibraryfeatered").html()) === '') {
                    $("#featuredCards").hide();
                    $('.category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 15px; text-align: center;"><strong>Can’t Find What You’re Looking For?</strong><br>Please change your search criteria and try again.</div>');
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
        _loadDataOnSortBy:function(arg1){
            var sortId = arg1;                     
            var $searchUrl = hds.resourceLib._isEmptySearcURL(),
                $keyword = $.trim($("#resSearch").val());

            
                var queryURL = $searchUrl.replace(".html", "." + sortId + ".html");
                if($keyword == ""){
                    hds.resourceLib._processClickAside(queryURL);
                }else{
                    hds.resourceLib._processClickAside(queryURL + '?fulltext=' + encodeURIComponent($keyword));
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
							if(pstag!=null && pstag.length>0)
								val=val+"/"+pstag;
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
						if(pstag!=null && pstag.length>0 && filter == "filter3")
                               val=val+"/"+pstag;
                            return or_cond = or_cond || $.inArray(val, indCat) !== -1;
                        });
                        result = (result && or_cond) || checkMatches.length === filter.length;
                    }
                });
                return result;
            }).addClass('visible');
            
            if ($(".resource:visible").length === 0) {                
                if(!$('#featuredCards').is(":visible")){
                    if($('.slingcontent').length > 0){
                        $('.category-resources-listing').find('.no-matched-result').remove();
                    }else{
                        $('.category-resources-listing').find('.no-matched-result').remove();
                        $('.category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 15px; text-align: center;"><strong>Can’t Find What You’re Looking For?</strong><br>Please change your search criteria and try again.</div>');
                    }
                }
            }else{
                $('.category-resources-listing').find('.no-matched-result').remove();
                $('.resource.visible:visible').last().css({"border-bottom":"none"});
				$('.resource.visible:visible:first').css({'padding-top':'0px'});
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
						$('.resource.visible:visible:first').css({'padding-top':'0px'});
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
				if(!$(this).is(':checked') && subcat==$(this).attr('id'))
                {
					subcat='';
                    if(pstag!=null && pstag.length>0 )
                    { 
                        pstag='';
                        if($('#searchTag .filterKeyword').text()==psname){
                            psname='';
                            $('#resSearch').val('');
                            $('#searchTag .keyword').html('');
                            $('#searchTag .label').css({
                                'display': 'none'
                            });
                    	}
                    }
                }
                hds.resourceLib._checkSearchEmpty();
                $('.no-matched-result').hide();
                if ($(".resource:visible").length === 0) {
                    if(!$('#featuredCards').is(":visible")){
                        $('.category-resources-listing').find('.no-matched-result').remove();
                        $('.category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 15px; text-align: center;"><strong>Can’t Find What You’re Looking For?</strong><br>Please change your search criteria and try again.</div>');
                    }
                }
                $('.resource.visible:visible').last().css({"border-bottom":"none"});
				$('.resource.visible:visible:first').css({'padding-top':'0px'});
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

            
            hds.resourceLib._processIndustryFilter(checkedIndVals, checkedContVals, checkedSubVals);
        },
        _buildMobileNavigation: function(arg) {
            if ($(window).width() < 991) {
                var getMobileSearc = $('#resource-search').html();
                $('.searchArea').html(getMobileSearc);
                $('#resource-search').html(" ");
                var getRightMenu = $('#mobilerightMenu').html();
                $('.filtrSideBar').html(getRightMenu);
                $('#mobilerightMenu').html(" ");
                var getFilterIndustry = $('#FilterByIndustry .filters-list').html();
                $('.FilterAreaIndustry').html(getFilterIndustry);
                $('#FilterByIndustry .filters-list').html(" ");
                var getFilterCpntent = $('#FilteyContentType .filters-list').html();
                $('.FilterAreaContent').html(getFilterCpntent);
                $('#FilteyContentType .filters-list').html(" ");
            } else {
                if (!hds.resourceLib._isEmpty($('.searchArea'))) {
                    $('#resource-search').html($('.searchArea').html());
                    $('.searchArea').html(" ");
                }

                if (!hds.resourceLib._isEmpty($('.filtrSideBar'))) {
                    $('#mobilerightMenu').html($('.filtrSideBar').html());
                    $('.filtrSideBar').html(" ");
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaIndustry'))) {
                    $('#FilterByIndustry .filters-list').html($('.FilterAreaIndustry').html());
                    $('.FilterAreaIndustry').html(" ")
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaContent'))) {
                    $('#FilteyContentType .filters-list').html($('.FilterAreaContent').html());
                    $('.FilterAreaContent').html(" ")
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
            if ($(window).width() > 768) {
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
                $('.bgCover').hide();
            }else{
                $('.bgCover').hide();
            }
            /*$('.overlayBox').css('display', 'none');
            $('.bgCover').animate({
                opacity: 0
            }, null, null, function() {
                $(this).hide();
            });*/

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

            var resStatus = localStorage.getItem('resStatus');
                var cardStatus = localStorage.getItem('cardStatus');
                if(resStatus == 'false' && cardStatus == 'false'){
                    localStorage.setItem('resStatus', 'true');
                    localStorage.setItem('cardStatus', 'true');
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
                }
        },
        _setSortByRelPosition:function(){
            if ($(window).width() < 991) {
                $('.sortResources').css({'top':$('.result-resources .resource-heading').innerHeight() + 20});
            }else{
                $('.sortResources').css({'top':'0px'});
            }
        },
        _bindEventsSelectors: function() {
            $(document).on('click', '.sort-by-button', function(event) {
                $('.sort-by-list').toggle();
                $(this).toggleClass('border');
            })
            $(document).on('click', '.sort-by-list li a', function(event) {           
                event.preventDefault;     
                if(!$(this).parent().hasClass('selected')){
                    var sortId = $(this).parent().attr('id');
                    var sortLabel = $(this).text();                     
                    $('.sort-by-list li a').parent().removeClass('selected');                    
                    $(this).parent().addClass('selected');
                    $('.sort-by-button').find('.stitle').html(sortLabel);                                       
                    hds.resourceLib._loadDataOnSortBy(sortId, sortLabel);                                
                }
                $('.sort-by-button').removeClass('border');
                $('.sort-by-list').hide();
            })
            $(document).click(function(e) {
                if (!$(e.target).is('.sortResources, .sortResources *')) {
                    $(".sort-by-list").hide();
                    $('.sort-by-button').removeClass('border');
                }
            });

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
                pstag='';
                if($('#resSearch').val() == ""){
                    if($('#filterTag .keyword-subcat').html() === ""){
                        $('#asideLinks-product  li').eq(0).find('a').trigger('click');
                        $('.sortResources').hide();
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
                if ($(window).width() > 991) {              
                    var txtVal = $.trim($('#resSearch').val());
                    if(txtVal.length > 0){
                        $('#searchTag .label').css({
                            'display': 'inline'
                        });
                        hds.resourceLib._addKeywordSearchTag(txtVal, '#searchTag .keyword');                   
                    }
                    hds.resourceLib._loadDataOnsearch();
                    $('.sort-by-button').find('.stitle').html($('.sort-by-button .stitle').data('dtitle'));
                    $('.sort-by-list li').removeClass('selected');
					$('.sort-by-list li:eq(0)').addClass('selected');
                }
                event.preventDefault();
            });
            $(document).on('keypress', '#resSearch', function(event) {                
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if ($(window).width() > 991) {
                    if (keycode == 13) {  
                        event.preventDefault();                 
                        var txtVal = $.trim($('#resSearch').val());
                        if(txtVal.length > 0){
                            $('#searchTag .label').css({
                                'display': 'inline'
                            });
                            hds.resourceLib._addKeywordSearchTag(txtVal, '#searchTag .keyword');                    
                        }
                        hds.resourceLib._loadDataOnsearch();
                        $('.sort-by-button').find('.stitle').html($('.sort-by-button .stitle').data('dtitle'));
                        $('.sort-by-list li').removeClass('selected');
						$('.sort-by-list li:eq(0)').addClass('selected');
                    }
                }                 
            });

            $(document).on('click', '.launchLink a', function(event) {
                $('body').addClass('overflow-mobile');
                if ($(window).width() <= 991) {
                    if($('.searchArea').html() == ""){
                        hds.resourceLib._showMobileOverlay(); 
                    }else{
                        $('.bgCover').css({
                            display: 'block',
                            width: $(window).width(),
                            height: ' 100%',
                        });
                    }
                }              
                event.preventDefault();
            });

            $(document).on('click', '.closeOverlay', function(event) {
                $('body').removeClass('overflow-mobile');
                if(($('#filterTag .keyword-subcat').html() == '') && ($('#searchTag .keyword').html() == '')){
                    $('.clear-results').trigger('click');
                    $('.bgCover').hide();                    
                }else{
                    $('.bgCover').hide();
                }                
                event.preventDefault();
            });

            $(document).on('click', '#asideLinks-product li > a', function(event) {
                var resStatus = localStorage.getItem('resStatus');
                var cardStatus = localStorage.getItem('cardStatus');
				// pstag='';
                if(resStatus == 'false' && cardStatus == 'false'){
                    localStorage.setItem('resStatus', 'true');
                    localStorage.setItem('cardStatus', 'true');                    
                    $('#filterTag .keyword-subcat, #filterTag .keyword-filter').html('');
                    $("input[name='ctyFunction']").removeAttr('checked');
                    $("input[name='cbxFunction']").removeAttr('checked');
                    hds.resourceLib._handleActiveCategory($(this));
                    $('.sort-by-button').find('.stitle').html($('.sort-by-button .stitle').data('dtitle'));
                    $('.sort-by-list li').removeClass('selected');
					$('.sort-by-list li:eq(0)').addClass('selected');
                }
                event.preventDefault();
            });

            /* Filters By Industry/Content Type */
            var open = $('.filterby'),
                a = $('.resource-filters').find('a');
            open.click(function(e) {
                e.preventDefault();
                $('.errorSearchField').css('display', 'none');
                $(".sort-by-list").hide();
                $('.sort-by-button').removeClass('border');
                
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
                var resStatus = localStorage.getItem('resStatus');
                var cardStatus = localStorage.getItem('cardStatus');
                if(resStatus == 'false' && cardStatus == 'false'){
                    if($("#resSearch").val() != ''){                    

                        $('#filterTag .keyword-subcat, #filterTag .keyword-filter').html('');
                        localStorage.setItem('resStatus', 'true');
                        localStorage.setItem('cardStatus', 'false');
                        $('#asideLinks-product li').removeClass('active');
                        $('#asideLinks-product li ul').slideUp();   
                        $('.category-resources-listing').find('.no-matched-result').remove();
                        hds.resourceLib._loadDataOnsearch();
                        $('.sort-by-button').find('.stitle').html($('.sort-by-button .stitle').data('dtitle'));
                        $('.sort-by-list li').removeClass('selected');
						$('.sort-by-list li:eq(0)').addClass('selected');
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
                        $('.sortResources').hide();
                    }
                    $('body').scrollTo('#sectionResourceLib',{duration:'slow', offsetTop : '50'});
                }
            })

            $(document).on('click', '.closeKeyword', function() {
                var resStatus = localStorage.getItem('resStatus');
                var cardStatus = localStorage.getItem('cardStatus');
                 pstag='';
                if(resStatus == 'false' && cardStatus == 'false'){
                    $("#resSearch").val('');
                    $(this).parent().fadeOut('slow');
                    $(this).parent().remove();
                    $('#searchTag .label').css({
                        'display': 'none'
                    });                    
                    if($('#filterTag .keyword-subcat').html() == ''){
                        $('#asideLinks-product  li').eq(0).find('a').trigger('click');
                        $('.resource-heading > h2').html('').html($('#asideLinks-product  li').eq(0).find('a').text());
                        $('.sortResources').hide();
                    }else{
                        $('.clearSearchIcon').trigger('click');
                        localStorage.setItem('cardStatus', 'false');
                        $('.sort-by-button').find('.stitle').html($('.sort-by-button .stitle').data('dtitle'));
                        $('.sort-by-list li').removeClass('selected');
						$('.sort-by-list li:eq(0)').addClass('selected');
                    }
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
                if ($(window).width() < 991) {
                    $('.topFilter').hide();
                }else{
                    $('.resource-filters').hide();
                }
                $('#filterTag .label').css({
                    'display': 'none'
                });
                $('#searchTag .keyword').html('');
                $('#searchTag .label').css({'display': 'none'});
                $('.sortResources').hide();
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
            });


            $( window ).on( "orientationchange", function( event ) {
                hds.resourceLib._closeOverLayPopup();
                hds.resourceLib._setSortByRelPosition();
            });

            $(document).on('click', '#mobShowFilters', function() {
                if ($(window).width() < 991) {
                    if ($('.overlayBox').is(':visible')) {
                        var txtVal = $.trim($('#resSearch').val());
                        if(txtVal.length > 0){
                            $('#searchTag .label').css({
                                'display': 'inline'
                            });
                            hds.resourceLib._addKeywordSearchTag(txtVal, '#searchTag .keyword');                   
                        }
                        hds.resourceLib._loadDataOnsearch();
                        $('.errorSearchField').css('display', 'none');
                        $('#showIndustry, #showContentType').trigger('click');
                        $('.bgCover').hide();                        
                    }
                    $('body').scrollTo('#sectionResourceLib',{duration:'slow', offsetTop : '50'});
                }
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