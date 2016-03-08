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
                filterTarget: '.resource'
            }
            this.options = $.extend(defaults, options);
            hds.resourceLib._bindEventsSelectors();
            hds.resourceLib._loadDataOnsearch();
            hds.resourceLib._filterSearchResults();
        },
        _showFilterDropDown: function(arg) {
            var optionSelected = this.options.filterTopLeft;
            $(optionSelected).hide();
            $(optionSelected).each(function(index, el) {
                if ($(this).attr('id') === arg) {
                    // $(this).slideDown('slow');
                    $(this).show();
                } else {
                    // $(this).slideUp(2000);
                    $(this).hide();
                }
                return
            });
        },
        _processClickAside: function(url) {

            $("#prodnsolcategorycontent").html(" ").load(url + " .resourceLibraryContent", function(responseText, textStatus) {
                if (textStatus === 'success' || textStatus === 'notmodified') {
                    $('.resource-heading > h2').html(" ").html($('#asideLinks-product > li.active').find('a').text());
                    $('.resource').addClass('visible');
                    setTimeout(function() {
                        hds.resourceLib._setPagination();
                    }, 500);
                }
            });
        },
        _processCatagoryCards: function(url) {

           
            $("#featuredCards").html(" ").load(url + " .resourceLibraryfeatered", function(responseText, textStatus) {
                if (textStatus === 'success' || textStatus === 'notmodified') {
                    console.log("Cards Loaded");
                }
                if ($.trim($(".resourceLibraryfeatered").html()) == '') {
                    $("#featuredCards").hide();
                } else {

                    $("#featuredCards").show();
                }
            });
        },
        _loadDataOnsearch: function() {
            var keyword = $.trim($("#resSearch").val());


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
            $(paginations).pagination('destroy');
            if ($('.prodnsolcategorycontent .visible').length > 10) {
                $(paginations).pagination('redraw');
            }
        },
        _tagFilterKeyword: function(arg1, arg2) {
            if (arg2 == 'subFilter') {
                var keywordHtml = "";
                $.each(arg1, function(index, val) {
                    keywordHtml = keywordHtml + '<span class="filterKeyword">' + val + ' <span class="closetag">x</span></span>';
                });
                $('#filterTag > .keyword-filter').html(keywordHtml);
            }
            if (arg2 == 'subCat') {
                var keywordHtml = "";
                $.each(arg1, function(index, val) {
                    keywordHtml = keywordHtml + '<span class="filterKeyword">' + val + ' <span class="closetag">x</span></span>';
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
        _displayHidendropMenu: function() {

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
                    $('#category-resources-listing').find('.no-matched-result').remove();
                    $('#category-resources-listing').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
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
                });
            }

            console.log(checkedIndVals + " = " + checkedContVals + " = " + checkedSubVals);
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
            $('.overlayBox').css('display', 'none');
            $('.bgCover').animate({
                opacity: 0
            }, null, null, function() {
                $(this).hide();
            });

        },
        _bindEventsSelectors: function() {
            $(document).on('click', '.launchLink', function(event) {
                hds.resourceLib._showMobileOverlay();
                event.preventDefault();
            });

            $(document).on('click', '.closeOverlay', function(event) {
                hds.resourceLib._closeOverLayPopup();
                event.preventDefault();
            });

            $(document).on('click', '#asideLinks-product li > a', function(event) {
                var self = $(this);
                if (!self.parent('li').hasClass('active')) {
                    $('#asideLinks-product li').removeClass('active')
                    var $url = $(this).attr('data-href');
                    var $featuredurl = $(this).attr('featured-href');

                    self.parent('li').addClass('active');
                    self.addClass('active');
                    if ($(this).parent().has('ul').length) {
                        $(this).parent().find('ul').slideDown();
                        $(this).parent().find('.icon-accordion-opened').css('display', 'inline-block');
                        $(this).parent().find('.icon-accordion-closed').css('display', 'none');
                    }
                    if($url !="")
                    {
                    hds.resourceLib._processClickAside($url);
                    } else {
                    	$("#prodnsolcategorycontent").html("");
                    	$("#loadResourceContent").html("");
                    	$('.resource-heading > h2').html(" ").html($('#asideLinks-product > li.active').find('a').text());                     
                        
                    }
                    if($featuredurl !="")
                    {
                       hds.resourceLib._processCatagoryCards($featuredurl);
                    } else {

                         $("#featuredCards").hide();
                    }

                }
                event.preventDefault();
            });

            $(document).on('click', '.resource-filters > a', function(e) {
                e.stopPropagation();
                var filterId = $(this).data('refilter');
                // hds.resourceLib._showFilterDropDown(this);
                $('.filters-section').each(function(index) {
                    if ($(this).attr("id") == filterId) {
                        $(this).slideDown(200);
                    } else {
                        $(this).slideUp(600);
                    }
                });

                $('.resource-filters > a').removeClass('active');
                $(this).addClass('active');
                $(this).find('span.caret-down').toggleClass('caret-up');
            });

            $(document).on('click', '.filters-section', function(e) {
                e.stopPropagation();
            })
            $(document).on('click', function(e) {
                $('.filters-section').hide();
                $('.resource-filters > a').removeClass('active');
            });

            var $checkboxes = $('[name=cbxFunction]').change(function() {
                var value = $(this).val();
                if (this.checked) {
                    addTag(value);
                } else {
                    removeTag(value);
                }
            });

            function removeTag(checkBoxValue) {
                /*
				 * we stored the checkbox value as data attribute, use that to
				 * filter
				 */
                $('span.filterKeyword').filter(function() {
                    return $(this).data('value') === checkBoxValue;
                }).slideUp(function() {
                    $(this).remove();
                })
            }

            function addTag(checkBoxValue) {
                $newTag = $("<span class='filterKeyword'>" + checkBoxValue + "<span class='closetag'>x</span></span>");
                /*
				 * store the value in elment data so we can reference back to
				 * checkbox
				 */
                $newTag.data('value', checkBoxValue);
                $('#filterTag .keyword-filter').append($newTag);
            }


            // Fade out specialty tags when x is clicked
            $(document).on('click', '.closetag', function() {
                var $element = $(this).parent(),
                    $checkbox = $checkboxes.filter(function() {
                        return this.value === $element.data('value');
                    }).prop('checked', false).change();

                $(this).parent().fadeOut('slow');
                $(this).parent().remove();
                $('#showIndustry').trigger('click');
            });
            $(window).resize(function() {
                hds.resourceLib._closeOverLayPopup();
            });
            $(document).on('click','#mobShowFilters', function(){
                $('#showIndustry, #showContentType').trigger('click');                
            })
            $(document).on('click', '#showIndustry, #showContentType', function(event) {
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
                    });
                }
                if ($allCheckedFilters.length < 0) {
                    haveFilters = null;
                }
                $('.filters-section').hide();
                $('.resource-filters > a').removeClass('active');
                $('#filterTag .keyword-filter').show();
                hds.resourceLib._processIndustryFilter(checkedIndVals, checkedContVals, checkedSubVals);

                if($('.overlayBox').is(':visible')){
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