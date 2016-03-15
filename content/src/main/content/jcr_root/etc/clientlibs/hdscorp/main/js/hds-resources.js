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
                searchUrl: '/content/hdscorp/en_us/lookup/resourcelibraryrenderer.html'

            }
            this.options = $.extend(defaults, options);
            hds.resourceLib._bindEventsSelectors();
            hds.resourceLib._filterSearchResults();
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
        _processClickAside: function(url) {
            var paginations = this.options.paginationWrapper;
            $(paginations).pagination('destroy');
            $('#loadResourceContent').empty();
            $('.category-resources-listing').find('.no-matched-result').remove();  
            $("#prodnsolcategorycontent").html('').load(url + " .resourceLibraryContent", function(responseText, textStatus) {
                if (textStatus === 'success' || textStatus === 'notmodified') {
                    $('.resource').addClass('visible');
                    $('.category-resources-listing').find('.no-matched-result').remove();
                    if ($.trim($(".resourceLibraryContent").html()).length === 0) {
                        $('.category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
                    } else {
                        $('.category-resources-listing').find('.no-matched-result').remove();                      
                            hds.resourceLib._setPagination();                       
                    }
                }
                if (textStatus === 'error') {

                }
            });
        },
        _processCatagoryCards: function(url) {
            $('.category-resources-listing').find('.no-matched-result').remove();  
            var paginations = this.options.paginationWrapper;
            $(paginations).pagination('destroy');
            $('#loadResourceContent').empty();
            $("#featuredCards").html('').load(url + " .resourceLibraryfeatered", function(responseText, textStatus) {
                if (textStatus === 'success' || textStatus === 'notmodified') {}
                if ($.trim($(".resourceLibraryfeatered").html()) === '') {
                    $("#featuredCards").hide();
                    $('.category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
                } else {
                    $("#featuredCards").show();
                }
            });
        },
         _getSelectedURLPath: function() {
            var $url;
            $('#asideLinks-product  li').each(function(index, el) {
                if ($(this).hasClass('active')&& $(this).index() > 0) {                   
                    $url = $(this).find('a').attr('data-href');                    
                }
            });
            return $url
        },
         _isEmptySearcURL: function (){
            var $searchUrl= this.options.searchUrl;
            return (hds.resourceLib._getSelectedURLPath() === undefined || hds.resourceLib._getSelectedURLPath() == null || hds.resourceLib._getSelectedURLPath().length <= 0) ? $searchUrl : hds.resourceLib._getSelectedURLPath();
},
        _loadDataOnsearch: function() {
            var $keyword = $.trim($("#resSearch").val()),
                paginations = this.options.paginationWrapper,
                $defaultURL = this.options.searchUrl,
                $searchUrl= hds.resourceLib._isEmptySearcURL();

            if ($keyword.length > 0) {
                 $('#loadResourceContent').empty();
                $(paginations).pagination('destroy');
                $('.errorSearchField').css('display', 'none');
                $('#featuredCards').html('');
                hds.resourceLib._processClickAside($searchUrl + '?fulltext=' + encodeURIComponent($keyword));
                $('.resource-heading > h2').html('').html("Search Results");
                $('#featuredCards').css('display', 'none');
                 $(paginations).pagination('drawPage');
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
                        console.log(filter);
                        if (filter == "filter3") {
                            var indCat = self.data('subfilter').split(',');
                            var checkMatches = $.grep(conditions[filter], function(val) {
                                console.log(val+"=======>"+indCat)
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
            $(paginations).pagination('destroy');
            $('#loadResourceContent').empty();
            if ($('.prodnsolcategorycontent .visible').length > 10) {
                $(paginations).pagination('redraw');
            }
        },
        _tagFilterKeyword: function(arg1, arg2) {
            if (arg2 == 'subFilter') {
                var keywordHtml = "";
                $.each(arg1, function(index, val) {
                    keywordHtml = keywordHtml + '<span class="filterKeyword">' + val + ' <span class="closetag glyphicon glyphicon-remove"></span></span>';
                });
                $('#filterTag > .keyword-filter').html(keywordHtml);
            }
            if (arg2 == 'subCat') {
                var keywordHtml = "";
                $.each(arg1, function(index, val) {
                    keywordHtml = keywordHtml + '<span class="filterKeyword">' + val + ' <span class="closetag glyphicon glyphicon-remove"></span></span>';
                });
                $('#filterTag > .keyword-subcat').html(keywordHtml);
            }
        },
        _setPagination: function() {
            var paginations = this.options.paginationWrapper;
            var myPageName = this.options.myPageName;
            var items = $('.prodnsolcategorycontent .visible');
            var numItems = items.length;
            var perPage = this.options.itemsPerPage;
             $(paginations).pagination('destroy');
            if (numItems > perPage) {
                items.slice(perPage).hide();
                $(paginations).pagination({
                    items: numItems,
                    itemsOnPage: perPage,
                    cssStyle: "light-theme",
                    onPageClick: function(pageNumber) {
                        var showFrom = perPage * (pageNumber - 1);
                        var showTo = showFrom + perPage;
                        items.hide().slice(showFrom, showTo).show();
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
            if (hashPageNum) {
                $(paginations).pagination("selectPage", parseInt(hashPageNum[1]));
            }
        },
        _filterSearchResults: function() {
            $(document).on('change', '.resources-listing input', function() {
                hds.resourceLib._checkSearchEmpty();
                $('.no-matched-result').hide();
                if ($(".resource:visible").length === 0) {
                    $('.category-resources-listing').find('.no-matched-result').remove();
                    $('.category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
                }
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
                console.log("Left Side Filters   == == =  >"+checkedSubVals)
            }

            console.log(checkedIndVals + " = " + checkedContVals + " = " + checkedSubVals);
            hds.resourceLib._processIndustryFilter(checkedIndVals, checkedContVals, checkedSubVals);
        },
        _buildMobileNavigation: function(arg) {
            if ($(window).width() < 991) {
                var getMobileSearc = $('#resource-search').html();
                $('.searchArea').html(getMobileSearc);
                $('#resource-search').html('');
                var getRightMenu = $('#mobilerightMenu').html();
                $('.filtrSideBar').html(getRightMenu);
                $('#mobilerightMenu').html('');
                var getFilterIndustry = $('#FilterByIndustry .filters-list').html();
                $('.FilterAreaIndustry').html(getFilterIndustry);
                $('#FilterByIndustry .filters-list').html('');
                var getFilterCpntent = $('#FilteyContentType .filters-list').html();
                $('.FilterAreaContent').html(getFilterCpntent);
                $('#FilteyContentType .filters-list').html('');
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
                left: ($(window).width() - $('.overlayBox').width()) / 2,
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
                opacity: 0.5,
                backgroundColor: '#000'
            });
        },
        _closeOverLayPopup: function() {
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
                    return $("<span class='filterKeyword' data-match=" + checkBoxVal + ">" + checkBoxText + "<span class='closetag glyphicon glyphicon-remove'></span></span>");
                });
                $('#filterTag .label').css({
                    'display': 'table-cell'
                });
                $('#filterTag .keyword-filter').html(newHTML);
            } else {
                if ($('#filterTag .keyword-subcat').html() != "") {
                    $('#filterTag .label').css({
                        'display': 'table-cell'
                    });
                } else {
                    $('#filterTag .label').css({
                        'display': 'none'
                    });
                }
            }
        },
        _addTagstpFilters: function(checkBoxValue, tag) {
            $newTag = $("<span class='filterKeyword'>" + checkBoxValue + "<span class='closetag glyphicon glyphicon-remove'></span></span>");
            /* store the value in elment data so we can reference back to checkbox */
            $newTag.data('value', checkBoxValue);
            $(tag).append($newTag);
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
                $(this).hide();
                event.preventDefault();
            });
            $(document).on('click', '.searchResource', function(event) {
                $('.resource-heading > h2').html('').html("Search Results");
                hds.resourceLib._loadDataOnsearch();
                event.preventDefault();
            });
            $(document).on('keypress', '#resSearch', function(event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == 13) {
                    event.preventDefault();
                    $('.resource-heading > h2').html('').html("Search Results");
                    hds.resourceLib._loadDataOnsearch();
                }
            });

            $(document).on('click', '.launchLink', function(event) {
                hds.resourceLib._showMobileOverlay();
                event.preventDefault();
            });

            $(document).on('click', '.closeOverlay', function(event) {
                hds.resourceLib._closeOverLayPopup();
                event.preventDefault();
            });

            $(document).on('click', '#asideLinks-product li > a', function(event) {
                $('#filterTag .keyword-subcat, #filterTag .keyword-filter').html('');
                $("input[name='ctyFunction']").removeAttr('checked');
                $('#asideLinks-product li ul').slideUp();

                var catText = $(this).text();
                if (!$(this).parent().index() == 0) {
                    $('#filterTag .keyword-subcat').html('').show();
                    hds.resourceLib._addTagstpFilters(catText, '#filterTag .keyword-subcat');
                    $('#filterTag .label').css({
                        'display': 'table-cell'
                    });
                }
                var self = $(this),
                    checkInputIfEmpty = $.trim($('#resSearch').val());

                if (!self.parent('li').hasClass('active')) {
                    $('#loadResourceContent').empty();
                    window.history.pushState("", document.title, window.location.pathname);
                    $('#asideLinks-product li').removeClass('active')
                    var $url = $(this).attr('data-href'),
                        $featuredurl = $(this).attr('featured-href');
                    self.parent('li').addClass('active');
                    self.addClass('active');
                    if (self.parent('li').index() > 0) {
                        $('#resSearch').attr('placeholder', "Search " + $.trim($('#asideLinks-product > li.active').find('a').text()));
                    } else {
                        $('#resSearch').attr('placeholder', "Search All Resources");
                    }

                    $('.resource-heading > h2').html('').html($('#asideLinks-product > li.active').find('a').text());
                    if ($(this).parent().has('ul').length) {
                        $(this).parent().find('ul').slideDown();
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
                    if ($featuredurl !== "") {
                        hds.resourceLib._processCatagoryCards($featuredurl);
                    } else {
                        $("#featuredCards").hide();
                    }
                } else {
                    $('#resSearch').attr('placeholder', "Search resources");
                    return false;
                }
                event.preventDefault();
            });
            var open = $('.filterby'),
                a = $('.resource-filters').find('a');
            open.click(function(e) {
                e.preventDefault();
                var filterId = $(this).data('refilter');
                var $this = $(this),
                    speed = 500;
                if ($this.hasClass('active') === true) {
                    $this.removeClass('active');
                    $('.filters-section').slideUp(speed);

                } else if (a.hasClass('active') === false) {
                    $this.addClass('active');
                    $('#' + filterId).slideDown(speed);
                } else {
                    a.removeClass('active');
                    $('.filters-section').slideUp(speed);
                    $this.addClass('active');
                    $('#' + filterId).slideDown(speed);
                }
            });


            $(document).on('click', '.filters-section', function(e) {
                e.stopPropagation();
            });


            // Fade out specialty tags when x is clicked
            $(document).on('click', '.closetag', function() {

                if(!$(this).parents('.keyword-subcat')){
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
                }else {                    
                    $('#asideLinks-product li').eq(0).find("a").trigger('click');
                    $('#filterTag .label').css({
                        'display': 'none'
                    });
                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow");
                }
            });

            $(document).on('click', '.clear-results', function() {
                $('#filterTag .keyword-subcat, #filterTag .keyword-filter').html('');
                $('.category-resources-listing').find('.no-matched-result').remove();
                $("input[name='ctyFunction']").removeAttr('checked');
                $("input[name='cbxFunction']").removeAttr('checked');                
                $('#asideLinks-product li').eq(0).find("a").trigger('click');
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
                checkedSubVals=checkedSubVals.split(',');
                console.log(checkedSubVals);
                hds.resourceLib._processIndustryFilter(checkedIndVals, checkedContVals, checkedSubVals);

                if ($('.overlayBox').is(':visible')) {
                    hds.resourceLib._closeOverLayPopup();
                }
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