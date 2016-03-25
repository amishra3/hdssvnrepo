var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.hdsContactLocations = {
        init: function(options) {
            var defaults = {
                seletCountry: '#seletCountry',
                defaultRegion: 'northamerica',
                defaultCountry: 'usa',
                defaultcity: 'california'
            }
            this.options = $.extend(defaults, options);
            hds.hdsContactLocations._fetchDetail();
            hds.hdsContactLocations._bindEventsSelectors();
        },
        _locationFeed:function(){

        },

        _loadMap: function(str) {
            var maplace;
			str=str.replace(/"(\w+)"\s*:/g, '$1:');
            console.log(str)
            var locations=(new Function("return " +str+ "")());
             maplace = new Maplace({
                map_div: '#gmap',
                controls_type: 'list',
                controls_on_map: false,
                disableDefaultUI: !0,
                draggable: !1,
                zoom: 12,
                scrollwheel: !1,
                disableDoubleClickZoom: true,
                zoomControl: false,
                animation: google.maps.Animation.DROP,
                map_options: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                },
                controls_applycss: false
            });

             google.maps.event.trigger(maplace,'resize')
            maplace.Load({
                locations: locations,
                force_generate_controls: true
            });
        },
        _fetchDetail: function() {
            $('.scrollbar-inner > h2').html('').html('North America');
            var defaultRegion = this.options.defaultRegion;
            var defaultCountry = this.options.defaultCountry
            var defaultcity = this.options.defaultcity
            var contactDetail = hds.hdsContactLocations._setDetails(defaultRegion, defaultCountry, defaultcity,false);
        },

        _setDetails: function(arg1, arg2, arg3, agr4) {
            $('#locationDetailsContent').html("");
            if(!agr4){
                singleCall="";
            }else{
                singleCall="&singlelocation=true";
             }
             var accounting = [];
             $('#gmap').html('')
            var url = '/bin/acme/hdscorp/locationservlet?selector=' + arg1 + '/' + arg2 + '/' + arg3+ singleCall;
            $.getJSON(url, function(data) {
                var content = '';
                $.each(data.locationJson, function(index, cat) {
                    content += '<div class="side-block">';
                    content += '<img src="' + cat.image + '" alt="' + cat.imagealt + '">';
                    content += '<h3>' + cat.locationtitle + '</h2>';
                    content += cat.locationdetail;
                    content += '<a href="'+cat.drivingdirection+'" class="animateLink" target="_blank">Driving directions <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a>';
                    content += '<a href="javascript:void(0);" class="phone_num animateLink">Show Phone Numbers <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>';
                    content +='<div class="hideme">'+cat.locationphonenumber+'</div>';
                    content += '</div>';
                  if(cat.locationlongitude){
					var loc={};
                     loc["lat"]= parseFloat(cat.locationlatitude);
                     loc["lon"]= parseFloat(cat.locationlongitude);
                     loc["icon"]='/etc/clientlibs/hdscorp/main/images/new-marker2.png';
                     accounting.push(loc);
                     }
                })   
                hds.hdsContactLocations._loadMap(JSON.stringify(accounting));
                $('#locationDetailsContent').html("").html(content);

            });
        },
        _returnJSON: function(countryData, arg2) {
            var getRegion = arg2;
            var i = null;
            for (i = 0; countryData.length > i; i += 1) {
                if ((countryData[i].locregionlabel).toLowerCase() === getRegion.toLowerCase()) {
                    blank = $.map(countryData[i].countries, $.parseJSON);
                    return blank;
                }
            }
        },
        _returnLocationJSON: function(countryData, arg2) {
            var getRegion = arg2;
            var i = null;
            for (i = 0; countryData.length > i; i += 1) {
                if ((countryData[i].countrylabel).toLowerCase() === getRegion.toLowerCase()) {
                    blank = $.map(countryData[i].locations, $.parseJSON);
                    return blank;
                }
            }
        },
        _getCountryLocation: function(arg1) {
            var selectedText = arg1;
            var defultOptions = '<option>--Select Country--</option>';
            var countryData = getJSONLocation.data;
            var blank = hds.hdsContactLocations._returnJSON(countryData, selectedText);
            $.each(blank, function(key, val) {
                defultOptions = defultOptions + "<option value=" + val.countrylabel + ">" + val.countrylabel + "</option>";
            });
            $('#allCountries').html("").append(defultOptions);
        },
        _getStateBasedOnLocation: function(arg1, arg2) {
            var countryData = getJSONLocation.data;
            var defultOptions = '<option>--Select Location--</option>';
            var state = hds.hdsContactLocations._returnJSON(countryData, arg2);
            var location = hds.hdsContactLocations._returnLocationJSON(state, arg1);
            $.each(location, function(key, val) {
                defultOptions = defultOptions + "<option value=" + val.locationlabel + ">" + val.locationlabel + "</option>";
            });

            $('#allLocations').html("").append(defultOptions);
        },
        _bindEventsSelectors: function() {
            $('#allRegion').on('change', function(event) {
                if ($("#allRegion option:selected").val() !== '') {
                    var selectedText = $.trim($("#allRegion option:selected").text());
                    hds.hdsContactLocations._getCountryLocation(selectedText);
                }
                event.preventDefault();
            });

            $(document).on('change', '#allCountries', function(event) {
                if ($("#allCountries option:selected").val() !== '') {
                    var selectedText = $.trim($("#allCountries option:selected").text());
                    var selectedTextParent = $.trim($("#allRegion option:selected").text());
                    hds.hdsContactLocations._getStateBasedOnLocation(selectedText, selectedTextParent);
                }
                event.preventDefault();
            });

            $(document).on('change', '#allLocations', function(event) {
                if ($("#allCountries option:selected").val() !== '') {
                   google.maps.event.trigger(window, 'resize', {});
                    var selectedText = $.trim($("#allCountries option:selected").text()).toLowerCase();
                    var selectedTextParent = $.trim($("#allRegion option:selected").text()).toLowerCase();
                    var selectedTextloc = $.trim($("#allLocations option:selected").text()).toLowerCase();
                    $('.scrollbar-inner > h2').html('').html($.trim($("#allRegion option:selected").text()));
                    hds.hdsContactLocations._setDetails(selectedTextParent, selectedText, selectedTextloc,true);
                }
                event.preventDefault();
            });

            $(document).on('click','.phone_num',function(){

                if($(this).find('span').hasClass('glyphicon-plus-sign')){
					$(this).next('div.hideme').show();
                    $(this).find('span.glyphicon-plus-sign').removeClass('glyphicon-plus-sign').addClass('glyphicon-minus-sign');
                }else{

$(this).next('div.hideme').hide();
                    $(this).find('span').removeClass('glyphicon-minus-sign').addClass('glyphicon-plus-sign');
                }

            })
        }
    }
}(window, document, jQuery, hds));
$(function() {
    if ($('#LoactionFilters').length > 0) {
        hds.hdsContactLocations.init();
    }
})