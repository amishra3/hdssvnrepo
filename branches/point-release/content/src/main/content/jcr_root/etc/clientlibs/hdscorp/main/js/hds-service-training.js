var hds = window.hds || {};

(function(window, document, $, hds) {

    hds.serviceTraining = {
        init: function(options) {
            //hds.serviceTraining.loadCalender();  
            hds.serviceTraining.bindEventsSelectors();   
             $(document).on('keypress', '.training-search input', function(event) {                
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == 13) {
                    event.preventDefault();                    
                    var txtVal = $.trim($(this).val());
                    if(txtVal.length > 0){
  					$('.btn-square-red a').trigger('click');
                    }

                }
            });

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
			var locations = "";
			var locationSelected = false;
			$('#allRegion').change(function(){
				//$('#locationSelectButton').text($(this).text());
				locationSelected = true;
				if(locationSelected == false){
				locations = "";
                }else{
                    locations = $('#allRegion').val();
                }
            }); 

			  if(locations==''){
	                locations = $('#allRegion').val();
	            }            

            $('.btn-square-red a').unbind('click').click(function(){
				if($('.training-search input').val() == "" && $('.from_date').val() == "" && $('.to_date').val() == "" && locations == ""){
					var url = "training-certification/training.html#trainingDetail";
					
				}else if($('.training-search input').val() == "" && $('.from_date').val() != "" && locations == ""){
					
					var url = "training-certification/training.html#lowerBound="+$('.from_date').val()+"&upperBound="+$('.to_date').val()
				}else if($('.training-search input').val() != "" && $('.from_date').val() != "" && locations == ""){
					
					var url = "training-certification/training.html#searchKey="+$('.training-search input').val()+"&lowerBound="+$('.from_date').val()+"&upperBound="+$('.to_date').val()
				}else if($('.training-search input').val() == "" && $('.from_date').val() != "" && locations != ""){
					
					var url = "training-certification/training.html#lowerBound="+$('.from_date').val()+"&upperBound="+$('.to_date').val()+"&locations="+locations
				}else if($('.training-search input').val() != "" && $('.from_date').val() == "" && locations != ""){
					
					var url = "training-certification/training.html#searchKey="+$('.training-search input').val()+"&locations="+locations
				}else if($('.training-search input').val() == "" && $('.from_date').val() == "" && locations != ""){
					
					var url = "training-certification/training.html#locations="+locations
				}else if($('.training-search input').val() != "" && $('.from_date').val() == "" && locations == "" ){
					
					var url = "training-certification/training.html#searchKey="+$('.training-search input').val();
				}else{
					
					var url = "training-certification/training.html#searchKey="+$('.training-search input').val()+"&lowerBound="+$('.from_date').val()+"&upperBound="+$('.to_date').val()+"&locations="+locations
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