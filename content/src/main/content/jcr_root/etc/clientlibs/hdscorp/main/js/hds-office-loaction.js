var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.hdsContactLocations = {
        init: function(options) {
            var defaults = {
                seletCountry: '#seletCountry',
                defaultRegion: $.trim($('#locationEventRegion').val()),
                defaultCountry: $.trim($('#locationEventCountry').val()),
                defaultcity: $.trim($('#locationEventLocation').val()),                            
            }
            this.options = $.extend(defaults, options);
            hds.hdsContactLocations._fetchDetail();
            hds.hdsContactLocations._bindEventsSelectors();     
            hds.hdsContactLocations._locationFeed();
            var maplace;
        },
        _locationFeed:function(){
        	var defaultRegion = this.options.defaultRegion;
            var defaultCountry = this.options.defaultCountry;
            var defaultcity = this.options.defaultcity;        	
        },

        _loadMap: function(str) {
			str=str.replace(/"(\w+)"\s*:/g, '$1:');
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
        	var defaultRegion = this.options.defaultRegion.toLowerCase();
            var defaultCountry = this.options.defaultCountry.toLowerCase();
            var defaultcity = this.options.defaultcity.toLowerCase();
            console.log(defaultRegion+'=========='+defaultCountry+'=========='+defaultcity);
            $("#allRegion option").filter(function() {return this.text.toLowerCase() == defaultRegion;}).attr('selected', true);
            $("#allCountries option").filter(function() {return this.text.toLowerCase() == defaultCountry;}).attr('selected', true);
            $("#allLocations option").filter(function() {return this.text.toLowerCase() == defaultcity;}).attr('selected', true);
            $('.scrollbar-inner > h2').html('').html($.trim($('#locationEventRegion').val()));
            
            if(defaultcity===''){
            	defaultcity=null;
            }
            var contactDetail = hds.hdsContactLocations._setDetails(defaultRegion, defaultCountry, defaultcity,false);
        },

        _setDetails: function(arg1, arg2, arg3, agr4) {
            $('#locationDetailsContent').html("");
            var typePage=$.trim($('#locationEvent').val());
            if(!agr4){
                singleCall="";
            }else{
                singleCall="&singlelocation=true";
             }
             var accounting = [];
             $('#gmap').html('');
             if(arg3==null){
                 var url = '/bin/acme/hdscorp/locationservlet/?selector=' + arg1 + '/' + arg2 +"&type="+typePage;
             }else{            	 
            	 var url = '/bin/acme/hdscorp/locationservlet/?selector=' + arg1 + '/' + arg2 + '/' + arg3+"&type="+typePage;
             }  

            $.getJSON(url, function(data) {
                var content = '';                    
                var defaultPhoneConetnt= getJSONLocation.showphonenumberlabel,
                    defaultDirectionConetnt= getJSONLocation.drivingdirection;
                $.each(data.locationJson, function(index, cat) {
                    content += '<div class="side-block">';
                    if(cat.image!=='null'){
                    content += '<img class="img-responsive" src="' + cat.image + '" alt="' + cat.imagealt + '">';
                    }
                    content += '<h3>' + cat.locationtitle + '</h2>';
                    content += cat.locationdetail;

                    if(cat.locationlink!='null'){
                      if(cat.loclinktargettype!='null'){
			          content += '<a href="'+cat.locationlink+'" class="animateLink" target="_blank">'+cat.loclinktext+' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a>';
                        } else{
				 	content += '<a href="'+cat.locationlink+'" class="animateLink">'+cat.loclinktext+' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>';
                        }
                    }

                    if(cat.drivingdirection!=='null'){
                    content += '<a href="'+cat.drivingdirection+'" class="animateLink" target="_blank">'+defaultDirectionConetnt+' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a>';
                    }
                    if(cat.locationphonenumber!=='null'){
                    content += '<a href="javascript:void(0);" class="phone_num animateLink">'+defaultPhoneConetnt+' <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>';                   
                    content +='<div class="hideme">'+cat.locationphonenumber+'</div>';
                    }                    
                    content += '</div>';
                  if(cat.locationlongitude){
					var loc={};
                     loc["lat"]= parseFloat(cat.locationlatitude);
                     loc["lon"]= parseFloat(cat.locationlongitude);
                     loc["icon"]='/etc/clientlibs/hdscorp/main/images/new-marker1.png';
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
            var defaultCountry = this.options.defaultCountry;
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
            var defaultcity = this.options.defaultcity;
            var defultOptions = '<option>--Select Location--</option>';
            var state = hds.hdsContactLocations._returnJSON(countryData, arg2);
            var location = hds.hdsContactLocations._returnLocationJSON(state, arg1);
           if(!$.isEmptyObject(location)){ 
        	  $('#allLocations').removeAttr('disabled');
        	  $('#allLocations').show();
         	 $('#allLocations').parents('.select-style').show();        	   
            $.each(location, function(key, val) {            	
            	defultOptions = defultOptions + "<option value=" + val.locationlabel + ">" + val.locationlabel + "</option>";            	
            });
            $('#allLocations').html("").append(defultOptions);
        }else{

        	$('#allLocations').prop('disabled', 'disabled');
        	 $('#allLocations').hide();
        	 $('#allLocations').parents('.select-style').hide();

        	 var selectedText = $.trim($("#allCountries option:selected").text()).toLowerCase();
             var selectedTextParent = $.trim($("#allRegion option:selected").text()).toLowerCase();
             $('.scrollbar-inner > h2').html('').html($.trim($("#allRegion option:selected").text()));
             hds.hdsContactLocations._setDetails(selectedTextParent, selectedText, null,true);
        }

        },
        _bindEventsSelectors: function() {
            $('#allRegion').on('change', function(event) {
                if ($("#allRegion option:selected").val() !== '') {
                    var selectedText = $.trim($("#allRegion option:selected").text());
                    $('#allCountries').html("").append('<option>--Select Country--</option>');
                    $('#allLocations').html("").append('<option>--Select Location--</option>');
                    hds.hdsContactLocations._getCountryLocation(selectedText);
                }
                event.preventDefault();
            });

            $(document).on('change', '#allCountries', function(event) {
                if ($("#allCountries option:selected").val() !== '') {
                    var selectedText = $.trim($("#allCountries option:selected").text());
                    var selectedTextParent = $.trim($("#allRegion option:selected").text());                    
                    $('#allLocations').html("").append('<option>--Select Location--</option>');
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

            });

      $(document).on('click','ul.nav li',function(){
		var tab_id = $(this).attr('data-tab');
		$('ul.nav li').removeClass('current');
		$('.tabbed-content').removeClass('current');
		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
        google.maps.event.trigger(maplace,'resize');    
	});
        }
    }
}(window, document, jQuery, hds));

$(function() {
    if ($('#LoactionFilters').length > 0) {
        hds.hdsContactLocations.init();
    }
})