// Out of bounds 
// Checks wether the element has been hidden by the user scrolling its parent
// Returns an object with, if above
//   above : true
//   crop : 92
// If below 
//   below : true
//   crop 182
// Where crop is the no of pixels is it cropped by
// return Object will be empty if its not out of bounds  


(function($) {

	$.fn.scrolledOut = function( $wrapper ) {

		var $el = this;
		var elOffset = $el.offset();
		var wrapperOffset = $wrapper.offset();
		var result = {};

		// Bottom Positions
		elOffset.bottom = elOffset.top + $el.height();
		wrapperOffset.bottom = wrapperOffset.top + $wrapper.height();

		// Right Positions
		elOffset.right = elOffset.left + $el.width();
		wrapperOffset.right = wrapperOffset.left + $wrapper.width();

		// Cropped at the top
		if ( elOffset.top < wrapperOffset.top ) {

			result.top = wrapperOffset.top - elOffset.top;

		}

		// Cropped at the bottom
		if ( elOffset.bottom > wrapperOffset.bottom ) {

			result.bottom = elOffset.bottom - wrapperOffset.bottom;

		} 

		// Cropped at the left
		if ( elOffset.left < wrapperOffset.left ) {

			result.left = ( elOffset.left - wrapperOffset.left ) * -1;

		} 	

		// Cropped at the left
		if ( elOffset.right > wrapperOffset.right ) {

			result.right = elOffset.right - wrapperOffset.right ;

		} 				

		return result;

	}

}($) );