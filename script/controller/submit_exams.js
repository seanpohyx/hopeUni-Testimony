$( document ).ready(function() {

	var modal = $('#confirmationModal');
	var nameStr = $('#nameTB')[0];
	var lgInt = $('#lg-grpselectInput')[0];
	var courseCodeInput = $('#course_code_SelectInput')[0];
	var specialRequestStr = $('#requestTA')[0];
	var contactNo = $('#contactTB')[0];
	//var api_link = "";

	var course_code_search = new Bloodhound({
		local: course_code_json,
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace("course_code","course_name"),
		queryTokenizer: Bloodhound.tokenizers.whitespace
	});
	course_code_search.initialize();

	var elt = $('#course_input_div > > input');

	elt.tagsinput({
		itemValue: 'course_code',
		itemText: 'course_code',
		typeaheadjs: {
			name: 'course_code_search',
			displayKey: 'course_code',
			display: 'course_name',
			limit: 10,
			source: course_code_search.ttAdapter()
		}
	});

	$('#course_input_div').on('keydown', function(e) {
	    if (e.keyCode === 13) {
	    	console.log("enter")
	        return false
	    }
	});
	
	$.ajax({
		url: api_link+"api/lifegroup/" + campus_id,
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
			modal.find('.modal-body').html('Please contact admin, unable to find lg data');
			modal.find('.modal-title ').html('Error');
			$('.modal-footer .btn-custom-blue').css('visibility', 'hidden');
			modal.modal('show');
		}
	});

	// Object.keys(course_code_mapping).forEach(function (item) {
	// 	// console.log(item); // key
	// 	// console.log(course_code_mapping[item]); // value
	// 	$("#course_code_SelectInput").append("<option value='"+item+"'>"+item+"</option>");

	// });

	isSpinner(false);

	$('#verification-btn').on('click',{},(event) =>{

		var courseCodeInput = $('#course_input_div > > input').tagsinput('items');

		if(nameStr.value == "" || courseCodeInput.length == 0 || parseInt(lgInt.value) == 0){

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
			var msg = '<ul>';

			msg += '<li><p>Name: <span class="font-weight-bold">' + nameStr.value + '</span><br>'
				+ 'Contact No: <span class="font-weight-bold">' + parseInt(contactNo.value) + '</span><br>';

			msg += (specialRequestStr.value != '')?'Special Request: <span class="font-weight-bold">' + specialRequestStr.value + '</span></p></li>':'</p></li>';

			for(var i=0; i<courseCodeInput.length;i++){

				msg += '<li><p><span class="font-weight-bold">' + courseCodeInput[i].course_name + '</span>'
					+ '<span class="text-monospace text-secondary">[' + courseCodeInput[i].course_code + ']</span><br>'
					+ 'Date & Time: '+courseCodeInput[i].datetime+'<br>'
					+ 'Venue: '+courseCodeInput[i].place+'</li>';
			}

			msg += '</ul>';

			modal.find('.modal-body').html(msg);
			modal.find('.modal-title ').html('Confirmation');
			$('.modal-footer .btn-custom-blue').css('visibility', 'visible');
			modal.modal('show');
		}
	});

	$('#submit').on('click',{},(event) =>{

		var courseCodeInput = $('#course_input_div > > input').tagsinput('items');
		var json = [];

		for(var i=0; i<courseCodeInput.length;i++){
			json.push({
				"datetime": courseCodeInput[i].datetime,
			    "place": venue_mapping[courseCodeInput[i].place].place_id,
			    "name": nameStr.value,
			    "lifegroup": parseInt(lgInt.value),
			    "course_code": courseCodeInput[i].course_code,
			    "course_name": courseCodeInput[i].course_name,
			    "contact": parseInt(contactNo.value),
			    "request": specialRequestStr.value
			});
		}
		console.log(json);

		isSpinner(true);
		$.ajax({
				url: "https://hopenus-examtt-backend.herokuapp.com/batch_insert_exams/",
				type: "POST",
				crossDomain: true,
				async: false,
				dataType: "json",
				data: JSON.stringify(json),
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
