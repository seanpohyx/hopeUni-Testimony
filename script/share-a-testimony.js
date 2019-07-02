var campus_id = 1;

$( document ).ready(function() {


	var modal = $('#confirmationModal');
		var nameStr = $('#nameTB')[0];
		var testimonyStr = $('#testimonyTA')[0];
		var lgInt = $('#lg-grpselectInput')[0];

	$.ajax({
		url: "https://hope-nyc.herokuapp.com/api/Lg/" + campus_id,
		type: "GET",
		crossDomain: true,
		async: false,
		dataType: "json",
		contentType: 'application/json',
		success: function (response) {
			console.log(response);
			$.each(response, function( index, value ) {
				$("#lg-grpselectInput").append("<option value='"+value.id+"'>"+value.lg+"</option>");
			})
		},
		error: function (xhr, status) {
			console.log(xhr);
		},
		complete: function(){
			console.log("done1");
		}
	});

	$('#verification-btn').on('click',{
	}, (event) => {

		if(nameStr.value== "" || testimonyStr.value == "" || parseInt(lgInt.value) == 0){

	        modal.find('.modal-body').html('Please fill in all the blanks');
	        modal.find('.modal-title ').html('Error');
	        $('.modal-footer .btn-primary').css('visibility', 'hidden');
            modal.modal('show');
		}
		else{
			modal.find('.modal-body').html('Are you sure?');
	        modal.find('.modal-title ').html('Confirmation');
	        $('.modal-footer .btn-primary').css('visibility', 'visible');
            modal.modal('show');
		}

	});

	$('#submit').on('click',{
	}, (event) => {

		isSpinner(true);

		$.ajax({
			url: "https://hope-nyc.herokuapp.com/api/testimonies",
			type: "POST",
			crossDomain: true,
			async: false,
			dataType: "json",
			data: JSON.stringify( {
			    "name": nameStr.value,
			    "lg_id": parseInt(lgInt.value),
			    "testimony": testimonyStr.value,
			    "likes_count": 0
			}),
			contentType: 'application/json',
			success: function (response) {
				console.log(response);
				isSpinner(false);
				window.location="/#";
			},
			error: function (xhr, status) {
				console.log(xhr);
				modal.find('.modal-body').html('Error, please contact admin');
		        modal.find('.modal-title ').html('Error');
		        $('.modal-footer .btn-primary').css('visibility', 'hidden');
	            modal.modal('show');
				isSpinner(false);
			},

		});

	});

	isSpinner(false);

});

function isSpinner( isload ){
	if( $("#loading_window").css('visibility') == 'hidden' && isload){
		console.log("visible")
		$("#loading_window").css('visibility', 'visible');
	}
	else if( $("#loading_window").css('visibility') == 'visible' && !isload){
		console.log("hidden")
		$("#loading_window").css('visibility', 'hidden');
	}
}