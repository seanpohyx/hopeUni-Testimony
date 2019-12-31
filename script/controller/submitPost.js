$( document ).ready(function() {

	var modal = $('#confirmationModal');
	var nameStr = $('#nameTB')[0];
	var titleStr = $('#titleTB')[0];
	var recipientStr = $('#recipientTB')[0];
	var messageStr = $('#messageTA')[0];
	var lgInt = $('#lg-grpselectInput')[0];
	var type = $('#type-grpselectInput');
	var lg = getLifegroupAjax();

	if(lg != null){
		$.each(lg, function( index, value ) {
			$("#lg-grpselectInput").append("<option value='"+value.id+"'>"+value.lg+"</option>");
		})
	}
	else{
		modal.find('.modal-body').html('Please contact admin, unable to find lg data');
			modal.find('.modal-title ').html('Error');
			$('.modal-footer .btn-custom-blue').css('visibility', 'hidden');
			modal.modal('show');
	}
	isSpinner(false);

	//the type of post chosen, determines recipient input to be displayed
	type.change(function(){
	    var selected = $(this).val();
	    var div = $("#display-recipient");
	    if(selected == 'AFFIRMATION' && div.hasClass('display-none'))
	    	div.removeClass('display-none');
	    else
	    	div.addClass('display-none');
	});

	//confirmation btn
	$('#verification-btn').on('click',{
	}, (event) => {

		if(nameStr.value== "" || messageStr.value == "" || parseInt(lgInt.value) == 0 
			|| titleStr.value == "" || (type.val() == "NONE") 
			|| ((type.val() == "AFFIRMATION") && recipientTB.value == "")){

			modal.find('.modal-body').html('Please fill in all the blanks');
			modal.find('.modal-title ').html('Error');
			$('.modal-footer .btn-custom-blue').css('visibility', 'hidden');
			modal.modal('show');
		}
		else{
			modal.find('.modal-body').html('<p>Are you sure?</p>');
			modal.find('.modal-title ').html('Confirmation');
			$('.modal-footer .btn-custom-blue').css('visibility', 'visible');
			modal.modal('show');
		}

	});

	$('#submit').on('click',{
	}, (event) => {

		isSpinner(true);

		var jsonData = {
				"title": titleStr.value,
				"author": nameStr.value,
				"message": messageStr.value,
				"lg_id": parseInt(lgInt.value),
				"type": type.val(),
				"no_of_likes": 0
		}

		if(type.val() == "AFFIRMATION")
			jsonData["recipients"] = recipientTB.value;

		var response = postNewFeeds(jsonData);

		if(response != null){
			window.location="index";
		}
		else{
			modal.find('.modal-body').html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+websiteFeedback+'">Report Bug</a></p>');
			modal.find('.modal-title ').html('Error');
			$('.modal-footer .btn-custom-blue').css('visibility', 'hidden');
			modal.modal('show');			
		}
		isSpinner(false);

		// $.ajax({
		// 	url: feedsLink+"api/feeds",
		// 	type: "POST",
		// 	crossDomain: true,
		// 	async: false,
		// 	dataType: "json",
		// 	data: JSON.stringify( jsonData ),
		// 	contentType: 'application/json',
		// 	success: function (response) {
		// 		isSpinner(false);
		// 		window.location="index";
		// 	},
		// 	error: function (xhr, status) {
		// 		modal.find('.modal-body').html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+websiteFeedback+'">Report Bug</a></p>');
		// 		modal.find('.modal-title ').html('Error');
		// 		$('.modal-footer .btn-custom-blue').css('visibility', 'hidden');
		// 		modal.modal('show');
		// 		isSpinner(false);
		// 	},

		// });

	});

	isSpinner(false);
	

});

