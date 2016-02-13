
HDSCORP.findDuplicatesInArray = function(mergedString) {
	var mergedArray= mergedString.split(',');
	var sorted_arr = mergedArray.sort();
	var results = [];

	for (var i = 0; i < mergedArray.length - 1; i++) {  
		if (sorted_arr[i + 1] == sorted_arr[i]) {  
	    	results.push(sorted_arr[i]);  
		}  
	}
	
	
	if(results.length > 0 ){
		CQ.Ext.Msg.alert('Error', 'Following Tag has been used more than once - '+results);
		return false;	
	}else{
		return true;
	}
	
};