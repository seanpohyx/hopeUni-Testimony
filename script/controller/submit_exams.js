$( document ).ready(function() {

	var modal = $('#confirmationModal');
	var nameStr = $('#nameTB')[0];
	var lgInt = $('#lg-grpselectInput')[0];
	var courseCodeInput = $('#course_code_SelectInput')[0];
	var specialRequestStr = $('#requestTA')[0];
	var contactNo = $('#contactTB')[0];
	//var api_link = "";

	$.ajax({
			url: api_link+"api/Lg/" + campus_id,
			type: "GET",
			crossDomain: true,
			async: false,
			dataType: "json",
			contentType: 'application/json',
			success: function (response) {
				$.each(response, function( index, value ) {
					$("#lg-grpselectInput").append("<option value='"+value.id+"'>"+value.lg+"</option>");
				})
			},
			error: function (xhr, status) {
				console.log(xhr);
				alert("No LG, contact admin");
			}
		});

	Object.keys(course_code_mapping).forEach(function (item) {
		// console.log(item); // key
		// console.log(course_code_mapping[item]); // value
		$("#course_code_SelectInput").append("<option value='"+item+"'>"+item+"</option>");

	});

	isSpinner(false);

	$('#verification-btn').on('click',{},(event) =>{

		if(nameStr.value== "" || courseCodeInput.value == "" || parseInt(lgInt.value) == 0){

			modal.find('.modal-body').html('Please fill in all the blanks');
			modal.find('.modal-title ').html('Error');
			$('.modal-footer .btn-custom-blue').css('visibility', 'hidden');
			modal.modal('show');
		}
		else if(isNaN(parseInt(contactNo.value)) || contactNo.value.length != 8){
			modal.find('.modal-body').html('Please enter the correct contact number');
			modal.find('.modal-title ').html('Error');
			$('.modal-footer .btn-custom-blue').css('visibility', 'hidden');
			modal.modal('show');
		}
		else{
			modal.find('.modal-body').html('Are you sure?');
			modal.find('.modal-title ').html('Confirmation');
			$('.modal-footer .btn-custom-blue').css('visibility', 'visible');
			modal.modal('show');
		}
	});

	$('#submit').on('click',{},(event) =>{

		isSpinner(true);
		$.ajax({
				url: api_link+"api/testimonies",
				type: "POST",
				crossDomain: true,
				async: false,
				dataType: "json",
				data: JSON.stringify( {
					"name": nameStr.value,
					"place": (course_code_mapping[courseCodeInput.value]).place,
					"time": (course_code_mapping[courseCodeInput.value]).datetime,
					"course_code": courseCodeInput.value,
					"course_name": (course_code_mapping[courseCodeInput.value]).course_name,
					"lg": parseInt(lgInt.value),
					"contact": parseInt(contactNo.value),
					"request": specialRequestStr.value

				}),
				contentType: 'application/json',
				success: function (response) {
					isSpinner(false);
					window.location="index";
				},
				error: function (xhr, status) {
					modal.find('.modal-body').html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+website_feedback+'">Report Bug</a></p>');
					modal.find('.modal-title ').html('Error');
					$('.modal-footer .btn-custom-blue').css('visibility', 'hidden');
					modal.modal('show');
					isSpinner(false);
				},

			});

	});


});
