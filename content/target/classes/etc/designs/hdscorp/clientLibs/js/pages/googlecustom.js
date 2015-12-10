// JavaScript Document
// JavaScript Document
// Map look and feel settings
var roadAtlasStyles = [
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      { "color": "#8b8425" }
    ]
  },{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#a5bfdd" }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "color": "#e5e2de" }
    ]
  },{
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      { "weight": 3.1 },
      { "color": "#ac9f8e" }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "color": "#a59a80" }
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      { "color": "#c9b795" }
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "labels.text.stroke",
    "stylers": [
      { "color": "#efd8bb" }
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#000000" }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#000000" }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      { "color": "#ffd895" }
    ]
  },{
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#000000" }
    ]
  },{
    "featureType": "road.local",
    "elementType": "labels.text.stroke",
    "stylers": [
      { "color": "#ffffff" }
    ]
  },{
  }
];

// global variables
var map;
var markerid = [];
var marker = [];
var infowindowids = [];
var iterator = 0;
var ib,pageCont;
var lat=0, lng=0;
var jsData = [];
var cacheData = [];
var mapLabels = {
	'hasCommunityRoom' : 'Community Rooms',
	'hasDelivery' : 'Delivery',
	'hasPickup' : 'Pick Up',
	'hasDineIn' : 'Dine In',
	'hasDriveThru': 'Drive Thru',
	'availableHere' : 'Available Here',
	'favoriteLabel' : 'Fav',
	'phoneLabel' : 'Phone',
	'freeWifiLabel' : 'Free Wi-fi',
	'getDirections' : 'Get Directions',
	'hoursToday' : 'Today\'s Hours',
	'cafeClosed' : 'Closed',
	'open24Hours': 'Open 24 Hours'
};
var coffeeAtHome = ($('.coffee-at-home').length > 0);
//Flag to display cafe hours;
var boolDisplayCafeHours = true;
var myCenter = [];
var QueryParameters = function(){
    var address = '';
    var limit='';
    var result = {};
     // split up the query string and store in an associative array
    var hashValue = window.location.hash; 
    if ($.trim('' + hashValue ) != ""){
       var params = hashValue.substr(1).split("_");
       if(undefined !== params && params.length==2){
        	result["address"] = unescape(params[0]);
        	result["limit"] = unescape(params[1]);
        	$('#address').val(decodeURIComponent(params[0]));
            $('#cafelimit').val(params[1]);
        }
    }else{
		var locCookie = SiteUtils.parseNVP($.cookie('location'), {defaults:{citycode:'Boston'}});
		if(locCookie.citycode.length > 0){
			result["address"] = locCookie.citycode;
			result["limit"] = $('#cafelimit').val();
		}
	}
    return result;
};

function initialize() {

  if($('#ShwgoogleMap').length <= 0){return;}

 //Setting default Map attributes
    var mapProp = {
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'panerardmap']
        }
    };

 // Including GoogleMap in the DOM Element
    map = new google.maps.Map(document.getElementById("ShwgoogleMap"),mapProp);

    google.maps.event.addListener(map, 'click', function() {
        ib.close();
    });

 // Including GoogleMap look and feel settings
    var PaneraRoadMapType = new google.maps.StyledMapType(roadAtlasStyles);
    map.mapTypes.set('panerardmap', PaneraRoadMapType);
    map.setMapTypeId('panerardmap');
    drop();
}

//Deletes all markers in the array by removing references to them
function deleteOverlays() {
	if(marker) {
		var limitBox = $("input#limit"),limitVal = $.trim('' + limitBox.val());
		if(undefined==limitVal || limitVal==""){
			limitVal=10
		}else{
			limitVal=parseInt(limitVal);
		}
		for(i in marker) {
			if(i<limitVal)
				marker[i].setMap(null);
		}
		marker.length = 0;
	}
}

function drop(filterdata) {
	   var params=QueryParameters();
	   if(filterdata != undefined){
		   jsData = filterdata;
		   eachData(jsData);
	   }else if(null!=params && params.address!=undefined){
			var dataUrl = (coffeeAtHome) ? "/pbdyn/panerabread/searchcoffee" : "/pbdyn/panerabread/searchcafe";
		   $.ajax({
			   type: "GET",
			   url: dataUrl,
			   data: params,
			   dataType: "JSON",
			   success: function(data){
				   		if(undefined!=data && undefined!=data.error  && (data.error=="true" || (undefined!=data.error.code && data.error.code=="400"))){
				   			//	Clear Map Overlays
				   			deleteOverlays();
				   			$('#cafe-locator-list').html("");
				   			jsData = data.features;
				   			cacheData = jsData;
				   			eachData(jsData);
				   		}else{
				   			if(marker) {
				   				for (var ii = 0, n = marker.length; ii < n; ii++) {
				   					marker[ii].setMap(null);
				   				}
				   				marker.length = 0;
				   			}
				   			$('#cafe-locator-list').html("");
				   			jsData = data.features;
				   			cacheData = jsData;
				   			eachData(jsData);
				   		}
			   },
			   error: function (data) {
				   $('#errCont').css('display','block').html('An Error occured while performing the cafe Search');
			   }
		   });
	   }
}

function eachData(jsData) {
	  var latlngbounds = new google.maps.LatLngBounds(null),$locatorList=$('#cafe-locator-list'),myloc = null,$filterOptions=$("#location-filter-list input[type=checkbox]");;

	  if(undefined!=jsData){
		jsData = filterData(jsData);
	  	$locatorList.html('');
		  $filterOptions.not(":eq(0)").removeAttr( "disabled" ).parents("label").removeClass("disabled");

			var pathWebIcons = '/etc/designs/panerabread/clientLibs/css/images/web_icons/';
			function getWebIcon(json_prop, image_name, image_title){
				var val = '';
				if($.trim('' + json_prop) != ''){
					val = '<img src="' + pathWebIcons + image_name + '" title="' + image_title + '" alt="' + image_title + '" />';
				}
				return val;
			}
		//Source - Destination :: GetDirections link.
		var varSourceAddress = $('#address').val();
		var varDestinationAddress = varSourceAddress;

		//Cafe Hours
		var cafeHoursIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		var varCafeHoursTodayIndex = (new Date()).getDay();

		var fnFormatTimeAmPm = function(time_val){
			var fmtTime = time_val.split(':'), hourVal = + fmtTime[0]; 
			suffix = (hourVal == 24 ||hourVal < 12) ? 'am' : 'pm';
			fmtTime[0] = hourVal % 12 || 12;
			return fmtTime.join(':') + suffix;
		}

		var fnIsNotClosed = function(timing){
			var ret = true;
			if(timing.open == '' || timing.close == '' || (timing.open == '00:00' && timing.close == '00:00')){
				ret = false;
			}
			return ret;
		}

		var fnGetCafeHours = function(cafe_hours_array){
			var timing = {isOpened: false, open24Hours: false};
			try{
				var cafeHours = cafe_hours_array.replace(/'/g, '"').replace(/(sun|mon|tue|wed|thu|fri|sat)/gi, function(matched){
					return '"' + matched + '"';
				});
				cafeHours = $.parseJSON(cafeHours);
				timing = (cafeHours[varCafeHoursTodayIndex][cafeHoursIndex[varCafeHoursTodayIndex]]);
				if(timing === undefined || timing.open === undefined || timing.close === undefined){
				}else{
					if(fnIsNotClosed(timing)){					
						timing.open = fnFormatTimeAmPm(timing.open);
						timing.close = fnFormatTimeAmPm(timing.close);
						if(timing.open.toLowerCase()=='12:00am' && timing.close.toLowerCase()=='11:59pm'){
							timing.open24Hours = true;	
						}
						timing.isOpened = true;
						
					}
				}
			}catch(e){SiteUtils.log(e.message); timing = '';}
			return timing;
		}
		var jsDataLength = jsData.length;
		var limit = $("input#cafelimit"),limitValue = $.trim('' + limit.val());
		showLimit = parseInt(limitValue);
		if(!isNaN(showLimit) && showLimit > 0){
			jsData = $.makeArray(jsData).slice(0,showLimit);
		}
		  $.each(jsData, function(i, myloc){
			  var cont = myloc;
			  if(typeof cont['lat'] == 'undefined' || typeof cont['lat'] == null){return;}
			  lat = parseFloat(cont.lat);
			  lng = parseFloat(cont.lng);
		
			  myloc = new google.maps.LatLng(lat, lng);
			  latlngbounds.extend(myloc);
	
			  // Google Map Info window Content
			  var hasCommunityRoom = hasDelivery = hasDineIn = hasDriveThru = hasPickup = '';

			  hasCommunityRoom= ($.trim(''+cont.hasCommunityRoom)!="") ? mapLabels.hasCommunityRoom : "",
			  hasDelivery= ($.trim(''+cont.hasDelivery)!="") ? mapLabels.hasDelivery : "",
			  hasDineIn= ($.trim(''+cont.hasDineIn)!="") ? mapLabels.hasDineIn : "",
			  hasDriveThru= ($.trim(''+cont.hasDriveThru)!="") ? mapLabels.hasDriveThru : "",
			  hasPickup= ($.trim(''+cont.hasPickup)!=" ") ? mapLabels.hasPickup : "",
			  cafeHours=(($.trim(''+cont.cafeHours)!="") && cont.cafeHours!==undefined) ? cont.cafeHours : "";
			  //source -> destination address.
			  varDestinationAddress = cont.cafeStreetName + ',' + cont.cafeZip + ',' + cont.cafeCity + ',' + cont.cafeState;

			  var varGerDirections = 'http://maps.google.com/maps?saddr=' + varSourceAddress + '&daddr=' + varDestinationAddress;

			  var displayAvailableItems = function(){
			  		var availableItems = [mapLabels.freeWifiLabel];
			  		if(hasCommunityRoom){
			  			availableItems.push(hasCommunityRoom);
			  		}
			  		if(hasDriveThru){
			  			availableItems.push(hasDriveThru);
			  		}
			  		var availableHtml = '';
			  		for(var i = 0, n = availableItems.length; i < n; i++){
			  			availableHtml += '<div class="available-items">' + availableItems[i] + '</div>';
			  		}
			  		return availableHtml;
			  }

			if(!coffeeAtHome){
			  var displayCafeHours = function(){
				var html = '';
				var todayTiming = fnGetCafeHours(cont.cafeHours);
				if(todayTiming.isOpened){
					var hourslabel = mapLabels.hoursToday + ': ';
					var hoursdisplay = todayTiming.open + ' to ' + todayTiming.close;
					if(todayTiming.open24Hours){
						hourslabel = mapLabels.open24Hours;
						hoursdisplay = '&nbsp;';
					}
					html = '<div class="cafe-hours"><span class="map-label">' + hourslabel + '</span> <span class="cafe-hours-data">' + hoursdisplay + '</span></div>';
				}else{
					html = '<div class="cafe-hours"><span class="map-label">' + mapLabels.hoursToday + '</span>: <span class="cafe-hours-data">' + mapLabels.cafeClosed + '</span></div>';
				}
				return html;
			}
			var clsMapHasHours = '';
			var htmlCafeHours = boolDisplayCafeHours ? displayCafeHours() : '';
			if(htmlCafeHours !== ''){
				clsMapHasHours = 'has-cafe-hours';
			}
			var futureDate = "";
			if(cont.cafeOpened == "false") {
				futureDate = "<span class='future-date'> " + $('#cafe-locator-list').data('future-open-date-msg') + "</span>";
				htmlCafeHours = '';
			}
			  var infocontent = '<div class="map-info-wrapper">\
		    <div class="map-info-pointer"></div>\
		    <div class="map-info">\
				' + futureDate + '\
		        <div class="location-info group">\
		            <div class="location-item">\
		                <span>' + cont.cafeName + ' #' + cont.cafeID + '</span>\
		                <br/>' + cont.cafeStreetName + '\
		                <br/>' + mapLabels.phoneLabel +': ' + cont.cafeContact + '\
		                <br/>\
		            </div>\
		            <div class="location-facilities">\
		                <span>' + mapLabels.availableHere + '</span>'
		                + displayAvailableItems() +
		            '</div>\
		        </div>\
				<div class="more-location-info group">\
					<a href="' + varGerDirections + '" id="get_dir_' + cont.cafeID + '" target="_blank" class="button-secondary">' + mapLabels.getDirections + '</a>\
		        </div>\
		    </div>\
		</div>\
';
		}else{
			cont['varGerDirections'] = varGerDirections;
			var hbarMapInfoTemplate = $('#hbar-map-info-template').html();
			var mapInfoTemplate = Handlebars.compile(hbarMapInfoTemplate);
			infocontent = mapInfoTemplate(cont);
			}

			  // Google Map InfoWindow
		      var infowindowid = {
		                 content: infocontent
		                ,disableAutoPan: false
		                ,maxWidth: 0
		                ,pixelOffset: new google.maps.Size(-169, 0)
		                ,zIndex: null
		               // ,position:myCenter
		                ,boxStyle: { 
		                  background: "url('/etc/designs/panerabread/clientLibs/css/images/pointer.png') no-repeat center top"
		                  ,opacity: 2
		                  ,width: "337px"
		                 }
		                ,closeBoxMargin: "30px 15px 2px 2px"
		                ,closeBoxURL: "/etc/designs/panerabread/clientLibs/css/images/global_icon_close.png"
		                ,infoBoxClearance: new google.maps.Size(1, 1)
		                ,isHidden: false
		                ,pane: "floatPane"
		                ,enableEventPropagation: false
		        };

		       var ib = new InfoBox(infowindowid);
		           //Setting up the Marker
		            markerid = new google.maps.Marker({
		            position: myloc,
		            map: map,
		            icon: '/etc/designs/panerabread/clientLibs/css/images/map_marker.png',
		            animation: google.maps.Animation.DROP
		         });

				hasCommunityRoom = getWebIcon(cont.hasCommunityRoom, 'icon-medium-ordering-community-rooms.gif', mapLabels.hasCommunityRoom);
				hasDelivery = getWebIcon(cont.hasDelivery, 'icon-medium-ordering-delivery.gif', mapLabels.hasDelivery);
				hasDineIn = getWebIcon(cont.hasDineIn, 'icon-medium-ordering-dine-in.gif', mapLabels.hasDineIn);
				hasDriveThru = getWebIcon(cont.hasDriveThru, 'icon-medium-ordering-drive-thru.gif', mapLabels.hasDriveThru);
				hasPickup = getWebIcon(cont.hasPickup, 'icon-medium-ordering-pick-up.gif', mapLabels.hasPickup);

				var locHasWebIconsClass = (hasCommunityRoom || hasDriveThru)?'has-web-icons' : '';
				// JSON DATA Parsing for the page content
				if(!coffeeAtHome){
				pageCont = "<li><a href='#' data-markerid=" + i + " class='" + locHasWebIconsClass + ' ' + clsMapHasHours +"'>"+ futureDate +
					"<div class='location-info group'>" +
					"<div class='location-item'>" +
						"<span class='map-label'>"+cont.cafeName+" #"+cont.cafeID+"</span><br />"+cont.cafeStreetName+", "+cont.cafeCity+"&nbsp;"+cont.cafeState+"<br />"+" Phone: "+cont.cafeContact+"<br /></div>"+
						"<div class='location-distance'>"+cont.distance+" mi<br />" + getWebIcon('1', 'icon-small-other-favorite.gif', mapLabels.favoriteLabel) + "</div>"+
						"</div>"+
						htmlCafeHours+
						"<div class='other-info'>" + hasCommunityRoom + hasDriveThru + "</div>" + 
					"</div></div>";
				if(jsDataLength != ( i + 1) ) {
					pageCont+="<div class='bottom-border'></div>";
				}
				pageCont += "</a></li>";
				}else{
					cont['markerId'] = i;
					var hbarLocatorListTemplate = $('#hbar-locator-list-template').html();
					var locatorListTemplate = Handlebars.compile(hbarLocatorListTemplate);
					pageCont = locatorListTemplate(cont);
				}

				//pageCont = 
		        // Appending the data into the page

		        //$('.addressInfo').append(pageCont);
				$locatorList.html($locatorList.html() + pageCont);

		
		        //Adding array to the DOM Element to trigger the click event
		
		        $locatorList.find('li a').click(function (event) {
					event.preventDefault();
		            $('.infoBox').hide(); //Reset & Hide the infobox 
		            $locatorList.find('li a').removeClass('location-active');
		            $(this).addClass('location-active');
		            j = $(this).attr('data-markerid');
		            google.maps.event.trigger(marker[j], "click");
		        });
		        marker.push(markerid);

		        // Binding the Click event for all the markers
		
		        google.maps.event.addListener(markerid, 'click', function () {
		            $('.infoBox').hide(); //Reset & Hide the infobox 
		            ib.open(map, this);
					$locatorList.find('li a').removeClass('location-active');
					 //$locatorList.find('li a[]')
		        });
		        map.fitBounds(latlngbounds);
		    });
		  $(".scrolling-content").mCustomScrollbar("update");
		  $(".scrolling-content").mCustomScrollbar("scrollTo","top");
          $("#results-fade-top").addClass("hide");
          if($locatorList.find("li").length > 3)
        	  	$("#results-fade-bottom").removeClass("hide"); else $("#results-fade-bottom").addClass("hide");
          adjustScrollContentWidth();
	  }else{
		  	
		  	$filterOptions.attr('disabled', 'disabled').parents("label").addClass("disabled");
	  }
  } // each end

function filterData(arr){
	if(!$('#location-filter').is(':visible')){
		return arr;
	}
	if(coffeeAtHome)
	{
		var hasCoffeeGround = $('#coffee_ground'),hasCoffeeSingleServe= $('#coffee_single_serve'), hasSoups= $('#soups'), hasSaladDressings= $('#salad_dressings'), hasFrozenBread = $('#frozen_bread'), hasMeats = $('#meats');
	    var refineArr = [];
	    if ($(hasCoffeeGround).is(':checked')) {
			$.grep(arr, function (n, j) {
	            return ($.trim(''+n.hasCoffeeGround) == "YES") ? refineArr.push(arr[j]) : '';
	        });
	    }
	    if ($(hasCoffeeSingleServe).is(':checked')) {
	        $.grep(arr, function (n, j) {
	            return ($.trim(''+n.hasCoffeeSingleServe) == "YES") ? refineArr.push(arr[j]) : '';
	        });
	    }
	    if ($(hasSoups).is(':checked')) {
	        $.grep(arr, function (n, j) {
				return ($.trim(''+n.hasSoup) == "YES") ? refineArr.push(arr[j]) : '';
	        });
	    }
	    if ($(hasSaladDressings).is(':checked')) {
	        $.grep(arr, function (n, j) {
	            return ($.trim(''+n.hasSaladDressing) == "YES") ? refineArr.push(arr[j]) : '';
	        });
	    }
	    if ($(hasFrozenBread).is(':checked')) {
	        $.grep(arr, function (n, j) {
	            return ($.trim(''+n.hasFrozenBread) == "YES") ? refineArr.push(arr[j]) : '';
	        });
	    }
	    if ($(hasMeats).is(':checked')) {
	        $.grep(arr, function (n, j) {
	            return ($.trim(''+n.hasMeats) == "YES") ? refineArr.push(arr[j]) : '';
	        });
	    }
	    if(refineArr != ""){
			var resultArr = [];
			$.each(refineArr, function(i, el){
			    if($.inArray(el, resultArr) === -1) resultArr.push(el);
			});
			arr = resultArr;
	    }
    }
    else
    {
		var hasCommunityRoom= $('#community_rooms'), hasDelivery= $('#order_delivery'), hasDineIn= $('#dine_in'), hasDriveThru= $('#drive_thru'), hasPickup= $('#pick_up');
	    // Filter Data Using Jquery Grep
	    if ($(hasCommunityRoom).is(':checked')) {
	        arr = $.grep(arr, function (n, j) {
	            return $.trim(''+n.hasCommunityRoom) != "";
	        });
	    }
	    if ($(hasDelivery).is(':checked')) {
	        arr = $.grep(arr, function (n, j) {
	            return $.trim(''+n.hasDelivery) != "";
	        });
	    }
	    if ($(hasDineIn).is(':checked')) {
	        arr = $.grep(arr, function (n, j) {
	            return $.trim(''+n.hasDineIn) != "";
	        });
	    }
	    if ($(hasDriveThru).is(':checked')) {
	        arr = $.grep(arr, function (n, j) {
	            return $.trim(''+n.hasDriveThru) != "";
	        });
	    }
	    if ($(hasPickup).is(':checked')) {
	        arr = $.grep(arr, function (n, j) {
	            return $.trim(''+n.hasPickup) != "";
	        });
	    }

	}
	return arr;
}

function implementLocationFilters(){
	var $filterOptions=$("#location-filter-list input[type=checkbox]");
	$filterOptions.on("change",function(){
		$('.infoBox').hide();
	    if (marker) {
	        for (var ii = 0, n = marker.length; ii < n; ii++) {
	            marker[ii].setMap(null);
	        }
	        marker.length = 0;
	    }
	    // Variables
	    lat, lng = 0;
	    infowindowid = "";
	    var arr, grp = [];
	
	    // Empty the Address Info Div  
	    $('#cafe-locator-list').html("");
	    // Caching the local variables 
	    var arr = filterData(cacheData), arrData = [],selObj = $(':checkbox'),wifi = $('#wi_fi');
   		// Passing the filterd JSON data to Drop Function
		drop(arr);
	});
}
function adjustScrollContentWidth(){
    var $filterList=$("#location-filter-list"),$searchList=$("#cafe-search-results");
    if($filterList.find("li").length>5) $filterList.removeClass("adjust-width");
    else $filterList.addClass("adjust-width");
    if($("#location-filter-options").css("display")=="none") $filterList.addClass("adjust-width");
    if($searchList.find("li").length>3) $searchList.removeClass("adjust-width"); else $searchList.addClass("adjust-width");
}

function initializeCafeLocator(){
	google.maps.event.addDomListener(window, 'load', initialize);
}
function initializeCustomScrollBar(){
    var $locationFilterList=$("#location-filter-options"),$locationResults=$("#cafe-search-results"),$filterContent=$(".scrolling-filter-content"),$filterList=$("#location-filter-list"),$searchResultsList=$("#cafe-locator-list");
    $(".scrolling-content").mCustomScrollbar({
        scrollButtons:{
            enable:false
        },
        callbacks:{
            whileScrolling: function(){
                var $dragger=$(this).find(".mCSB_dragger");
                $("#results-fade-top,#results-fade-bottom").removeClass("hide");
                //parseInt($dragger.height())+
                if(mcs.draggerTop==0) $("#results-fade-top").addClass("hide");
                if((parseInt($dragger.height())+parseInt($dragger.css("top")))==$(this).find(".mCSB_draggerRail").height()) $("#results-fade-bottom").addClass("hide");
            }
        }
    });
    $(".scrolling-filter-content").mCustomScrollbar({
            scrollButtons:{
                enable:false
            }
    });
    $("#location-filter").click(function(event){
        event.preventDefault();
        var scrollCont = $('#cafe-search-results .scrolling-content');
	    var fadeDiv = $("#results-fade-top");
	    scrollContHeight = ($('.coffee-at-home .one-column').height() - ($locationFilterList.height() + $('.cafe-locator-search').height() + $('.cafe-locator-search-border').innerHeight())) + 'px';
        if($locationFilterList.css("display")=="none"){
            $(this).addClass("active").find("span").html("-");
            if($('#cafe-locator-list li').length > 1){
	            scrollCont.css('height', scrollContHeight);
	            fadeDiv.css("height", '30px');
            }
            $locationFilterList.slideDown("slow",function(){
                            $filterContent.mCustomScrollbar("update");
							$filterContent.mCustomScrollbar("scrollTo","top");
                            adjustScrollContentWidth();
                            implementLocationFilters();
            });
            //$locationResults.slideUp("slow",function(){$locationResults.mCustomScrollbar("update");});
            //$( ".cafe-locator-search-border" ).animate({marginBottom: 0}, 500);
        }

        else{
            scrollCont.css('height', '44.2em');
            fadeDiv.css("height", '60px');
            $(this).removeClass("active").find("span").html("+");
            $locationFilterList.slideUp("slow",function(){
                            $filterContent.mCustomScrollbar("update");
							$filterContent.mCustomScrollbar("scrollTo","top");
                            $filterList.addClass("adjust-width");
            });
            /*$locationResults.slideDown("slow",function(){
                            $locationResults.mCustomScrollbar("update");
                            adjustScrollContentWidth();
            });*/
            //$( ".cafe-locator-search-border" ).animate({marginBottom: "1em"}, 500);
        }
        $(".scrolling-content").mCustomScrollbar("update");
		$(".scrolling-content").mCustomScrollbar("scrollTo","top");
    });
    $(".hor-scroll").mCustomScrollbar({
        horizontalScroll:true,
        advanced:{

            autoExpandHorizontalScroll:true
        },
        scrollButtons:{
            enable:false
        }
    });
    initializeCafeLocator();
}

$(document).ready(function(e) {
    if($(".scrolling-content,.scrolling-filter-content").length>0)
    	initializeCustomScrollBar();
});
