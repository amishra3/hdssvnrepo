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
			hds.hdsContactLocations._loadMap();
			hds.hdsContactLocations._fetchDetail();
			hds.hdsContactLocations._bindEventsSelectors();

		},
		_loadMap: function() {
			var locations = [{
				lat: parseFloat(34.007005),
				lon: parseFloat(-118.488834),
				icon: 'http://localhost:4502/etc/clientlibs/hdscorp/main/images/new-marker2.png'
			}, {
				lat: parseFloat(10.9642103),
				lon: parseFloat(-74.7970435),
				icon: 'http://localhost:4502/etc/clientlibs/hdscorp/main/images/new-marker2.png'
			}];
			var maplace = new Maplace({
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
			maplace.Load({
				locations: locations,
				force_generate_controls: true
			});

		},
		_fetchDetail: function() {
			$('#locationDetailsContent > h2').html('').html($.trim($("#allRegion option:selected").text()));
			var defaultRegion=this.options.defaultRegion;
			var defaultCountry=this.options.defaultCountry
			var defaultcity=this.options.defaultcity
			var contactDetail = hds.hdsContactLocations._setDetails(defaultRegion,defaultCountry,defaultcity);
		},

		_setDetails: function(arg1,arg2,arg3) {
            $('#locationDetailsContent').html("");
			var url = '/bin/acme/hdscorp/locationservlet?selector='+arg1+'/'+arg2+'/'+arg3;
			$.getJSON(url, function(data) {
				var content = '';
				$.each(data.locationJson, function(index, cat) {
					content += '<div class="side-block">';
					content += '<img src="' + cat.image + '" alt="' + cat.imagealt + '">';
                    content += '<h3>' + cat.locationtitle + '</h2>';
					content += cat.locationdetail;
					content += '<a href="javascript:void(0);" class="animateLink">Driving directions <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a>';
					content += '<a href="javascript:void(0);" class="phone_num animateLink">Show Phone Numbers <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>';
					content += '</div>';
				})
				$('#locationDetailsContent').html("").html(content);
                $(".content").mCustomScrollbar();
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
            var selectedText=arg1;
			var defultOptions = '<option>--Select Country--</option>';
            var countryData = getJSONLocation.data;
            var blank= hds.hdsContactLocations._returnJSON(countryData,selectedText);
           $.each(blank, function(key, val) {
				defultOptions = defultOptions + "<option value=" + val.countrylabel + ">" + val.countrylabel + "</option>";
			});

			$('#allCountries').html("").append(defultOptions);
        },
		_getStateBasedOnLocation: function(arg1,arg2) {
            var countryData = getJSONLocation.data;
            var defultOptions = '<option>--Select Location--</option>';
            var state= hds.hdsContactLocations._returnJSON(countryData,arg2);
            var location=hds.hdsContactLocations._returnLocationJSON(state,arg1);
			$.each(location, function(key, val) {
				defultOptions = defultOptions + "<option value=" + val.locationlabel + ">" + val.locationlabel + "</option>";
			});

		$('#allLocations').html("").append(defultOptions);
		},
		_bindEventsSelectors: function() {
		$('#allRegion').on('change', function(event) {
				if ($("#allRegion option:selected").val() !== '') {
					var selectedText= $.trim($("#allRegion option:selected").text());
					hds.hdsContactLocations._getCountryLocation(selectedText);
				}
				event.preventDefault();
			});

			$(document).on('change','#allCountries', function(event) {
				if ($("#allCountries option:selected").val() !== '') {
					var selectedText= $.trim($("#allCountries option:selected").text());
                    var selectedTextParent= $.trim($("#allRegion option:selected").text());
					hds.hdsContactLocations._getStateBasedOnLocation(selectedText,selectedTextParent);
				}
				event.preventDefault();
			});

$(document).on('change','#allLocations', function(event) {
				if ($("#allCountries option:selected").val() !== '') {
					var selectedText= $.trim($("#allCountries option:selected").text()).toLowerCase();
                    var selectedTextParent= $.trim($("#allRegion option:selected").text()).toLowerCase();
                     var selectedTextloc= $.trim($("#allLocations option:selected").text()).toLowerCase();
					hds.hdsContactLocations._setDetails(selectedTextParent,selectedText,selectedTextloc);
				}
				event.preventDefault();
			});
		}
	}
}(window, document, jQuery, hds));
$(function() {
	if ($('#LoactionFilters').length > 0) {
		hds.hdsContactLocations.init();
	}
})