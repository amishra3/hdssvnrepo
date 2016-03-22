var hds = window.hds || {};

(function(window, document, $, hds) {

    hds.partnerDetail = {
        init: function(options) {
            var defaults = {
                filterTopLeft: '.filters-section',
                partnerDiv: '#partner-list .partner',
                searchBy: 'select[name="pFilter"]',
                pLogo: '.partner .logo img'
            }
            this.options = $.extend(defaults, options);
            hds.partnerDetail._bindEventsSelectors();
            hds.partnerDetail._openPartnerDetail();
            },

        _processIndustryFilter: function(arg1) {
                var conditions = {
                filter1: arg1
            }
            $('.partner').hide().filter(function() {
                var self = $(this);
                var result = true;
                var or_cond = false;

                Object.keys(conditions).forEach(function(filter) {
                    if ($.isArray(conditions[filter])) {
                        if (filter == "filter1") {
                            var indCat = self.data('indstry').split(',');
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
            }).show();
        },
        _openPartnerDetail: function() {
            var pLogo = this.options.pLogo;
            var searchTermPreValue = "";
            $(document).on('click', pLogo, function(event) {
                $('.partner').removeClass('active');
                $('.partner .partner-detail').hide();
                $(this).parent().siblings('.partner-detail').show();
                $(this).parent().parent('.partner').addClass('active');
                $(this).addClass('rgbmode');
                $(this).off("hover");
                event.preventDefault();
            });
            $(document).on('click', '.partner-detail .close', function() {
                $(this).parent().hide();
                $(this).parent().parent().removeClass('active');
                $('.partner .logo  img').removeClass('rgbmode');
            })
            $(pLogo).hover(function() {
                $(this).addClass('imghover');
            }, function() {
                $(this).removeClass('imghover');
            })
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
                if (!hds.partnerDetail._isEmpty($('.searchArea'))) {
                    $('#resource-search').html($('.searchArea').html());
                    $('.searchArea').html(" ");
                }

                if (!hds.partnerDetail._isEmpty($('.filtrSideBar'))) {
                    $('#mobilerightMenu').html($('.filtrSideBar').html());
                    $('.filtrSideBar').html(" ");
                }
                if (!hds.partnerDetail._isEmpty($('.FilterAreaIndustry'))) {
                    $('#FilterByIndustry .filters-list').html($('.FilterAreaIndustry').html());
                    $('.FilterAreaIndustry').html(" ")
                }
                if (!hds.partnerDetail._isEmpty($('.FilterAreaContent'))) {
                    $('#FilteyContentType .filters-list').html($('.FilterAreaContent').html());
                    $('.FilterAreaContent').html(" ")
                }
            }

        },
        _isEmpty: function(el) {
            return !$.trim(el.html())
        },
        _showMobileOverlay: function() {
            hds.partnerDetail._buildMobileNavigation();
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
                opacity: 0.5,
                backgroundColor: '#000'
            });
        },
        _closeOverLayPopup: function() {
            if (!hds.partnerDetail._isEmpty($('.searchArea'))) {
                $('#resource-search').html($('.searchArea').html());
                $('.searchArea').html(" ");
            }

            if (!hds.partnerDetail._isEmpty($('.filtrSideBar'))) {
                $('#mobilerightMenu').html($('.filtrSideBar').html());
                $('.filtrSideBar').html(" ");
            }
            if (!hds.partnerDetail._isEmpty($('.FilterAreaIndustry'))) {
                $('#FilterByIndustry .filters-list').html($('.FilterAreaIndustry').html());
                $('.FilterAreaIndustry').html(" ")
            }
            if (!hds.partnerDetail._isEmpty($('.FilterAreaContent'))) {
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
        _getCheckboxValue: function(arg1) {
            if (arg1 != 0) {
                var newHTML = $.map(arg1, function(value) {
                    var checkBoxVal = $("#" + value).val();
                    var checkBoxText = $("#" + value).siblings('label').text();
                    return $("<span class='filterKeyword' data-match=" + checkBoxVal + ">" + checkBoxText + "<span class='closeFilter glyphicon glyphicon-remove'></span></span>");
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
        _updateCheckbox: function() {
            var $checkboxes = $('[name=cbxFunction]').change(function() {
                var value = $(this).siblings('label').text();
                if (this.checked) {
                    addTag(value, '#filterTag .keyword-filter');
                } else {
                    removeTag(value);
                }
            })
            return $checkboxes;
        },
        _bindEventsSelectors: function() {
            $(document).on('keyup', '#partnerSearch', function(event) {
                var value = $.trim($(this).val());
                if (value.length > 0) {
                    $('.clearSearchIcon').show();
                } else {
                    $('.errorSearchField,.clearSearchIcon').hide();
                }
                event.preventDefault();
            });

            $(document).on('click', '.launchLink', function(event) {
                hds.partnerDetail._showMobileOverlay();
                event.preventDefault();
            });

            $(document).on('click', '.closeOverlay', function(event) {
                hds.partnerDetail._closeOverLayPopup();
                event.preventDefault();
            });

            var open = $('.filterby'),
                a = $('.partner-filters').find('a');
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
                    $('#showIndustry').trigger('click');
                }
                $('.category-resources-listing').find('.no-matched-result').remove();                    
            })

            function removeTag(checkBoxValue) {
                /* we stored the checkbox value as data attribute,  use that to filter*/
                $('span.filterKeyword').filter(function() {
                    return $(this).data('value') === checkBoxValue;
                }).slideUp(function() {
                    $(this).remove();
                })
            }

            function addTag(checkBoxValue, tag) {
                $newTag = $("<span class='filterKeyword'>" + checkBoxValue + "<span class='closetag'>x</span></span>");
                /* store the value in elment data so we can reference back to checkbox */
                $newTag.data('value', checkBoxValue);
                $(tag).append($newTag);
            }

            // Fade out specialty tags when x is clicked
            $(document).on('click', '.closetag', function() {
                var eleVal = $(this).parent().data('match');
                if (eleVal) {
                    $('input[name="cbxFunction"]').filter(function() {
                        return this.value === eleVal;
                    }).prop('checked', false);
                    $(this).parent().fadeOut('slow');
                    $(this).parent().remove();
                    $('#showIndustry').trigger('click');
                } else {
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
                $("input[name='cbxFunction']").removeAttr('checked');
                $('#asideLinks-product li').eq(0).find("a").trigger('click');
                $('#filterTag .label').css({
                    'display': 'none'
                });
                $('#partnerSearch').val(" ");
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
            });
            $(window).resize(function() {
                hds.partnerDetail._closeOverLayPopup();
            });
            $(document).on('click', '#mobShowFilters', function() {
                $('#showIndustry').trigger('click');
            })

            $(document).on('click', '#showIndustry', function(event) {
                var arrVal = [];
                $('input[name="cbxFunction"]:checked').each(function() {
                    arrVal.push($(this).attr('id'));
                });
                console.log(arrVal);
                hds.partnerDetail._getCheckboxValue(arrVal);

                var $allCheckedIndFilters = $('.FilterByIndustryList input.filters').filter(':checked');

                if ($allCheckedIndFilters.length > 0) {
                    var checkedIndVals = $.map($allCheckedIndFilters, function(el) {
                        return el.value
                    });
                }                

                $('.filters-section').hide();
                $('.partner-filters > a').removeClass('active');
                $('#filterTag .keyword-filter').show();
                hds.partnerDetail._processIndustryFilter(checkedIndVals);
                if ($('.overlayBox').is(':visible')) {
                    hds.partnerDetail._closeOverLayPopup();
                }
                event.preventDefault();
            });
        }
    }
}(window, document, jQuery, hds));


$(function() {
    if ($('#partnerDetailSection').length > 0) {
        hds.partnerDetail.init();
    }
})