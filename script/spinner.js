
function isSpinner( isload ){
	if( $("#loading_window").css('visibility') == 'hidden' && isload){
		$("#loading_window").css('visibility', 'visible');
	}
	else if( $("#loading_window").css('visibility') == 'visible' && !isload){
		$("#loading_window").css('visibility', 'hidden');
	}
}