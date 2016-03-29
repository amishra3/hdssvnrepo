var hds = window.hds || {};

(function(window, document, $, hds) {

    hds.serviceTraining = {
        init: function(options) {
            hds.serviceTraining.loadCalender();  
            hds.serviceTraining.bindEventsSelectors();                
        },
        loadCalender: function() {
            $("#two-inputs").dateRangePicker({
                autoClose: true,
                format: 'MM/DD/YYYY',
                showTopbar: false,
                stickyMonths: true,
                //startDate: '2013-01-10',
                //endDate: '2013-05-10'
                separator: ' to ',
                getValue: function() {
                    if ($('#date-range200').val() && $('#date-range201').val())
                        return $('#date-range200').val() + ' to ' + $('#date-range201').val();
                    else
                        return '';
                },
                setValue: function(s, s1, s2) {
                    $('#date-range200').val(s1);
                    $('#date-range201').val(s2);
                }
            });
        },
        bindEventsSelectors: function() {
            /* Bind events here */
			var locationSelected = false;
			$('.dropdown-menu a').on('click',function(){
				$('.buttonLabel').text($(this).text());
				locationSelected = true;
			});
			if(locationSelected == false){
				var locations = "";
			}else{
				var locations = $('.buttonLabel').text();
			}
			
            $('.btn-square-red a').on('click',function(){
				if($('.training-search input').val() == "" && $('.from_date').val() == "" && $('.to_date').val() == "" && locations == ""){
					var url = "/content/hdscorp/en_us/services/training-details.html";
					console.log("aLL EMPTY")
				}else if($('.training-search input').val() == "" && $('.from_date').val() != "" && locations == ""){
					var url = "/content/hdscorp/en_us/services/training-details.html?lowerBound="+$('.from_date').val()+"&upperBound="+$('.to_date').val()
				}else if($('.training-search input').val() != "" && $('.from_date').val() == "" && locations == "" ){
					var url = "/content/hdscorp/en_us/services/training-details.html?searchKey="+$('.training-search input').val();
				}else{
					console.log("ALL not EMPTY")
					var url = "/content/hdscorp/en_us/services/training-details.html?searchKey="+$('.training-search input').val()+"&lowerBound="+$('.from_date').val()+"&upperBound="+$('.to_date').val()+"&locations="+locations
				}
                window.location.href = url;
            })
        }
    }
}(window, document, jQuery, hds));

$(function() {
    if($('#serviceTraining').length>0){
    hds.serviceTraining.init();
}
})