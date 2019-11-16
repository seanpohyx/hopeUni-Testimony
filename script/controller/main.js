var total_post_per_page = 10;
var current_page = 1;

$( document ).ready(function() {

	if($("body").attr("id") == "main-page"){
		$.ajax({
			url: api_link+"api/testimonies_get_count/" + campus_id,
			type: "GET",
			crossDomain: true,
			dataType: "json",
			async: false,
			contentType: 'application/json',
			success: function (response) {

				var total_post_count = response.count;

				if(total_post_count > 0){
					pagination(total_post_count); //generate pagination
					onClickRefreshTestimonies(total_post_count, 1); //generate page 1.
				}
				else{
					//0 testimonies
					$( "#testimony-body" ).html('<p>There are no testimonies currently.</p>');
					isSpinner(false);
				}

			},
			error: function (xhr, status) {
				$( "#testimony-body" ).html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+website_feedback+'">Report Bug</a></p>');
				$('#errorModel').modal('show');
			},
			complete: function(response){
				isSpinner(false);
			}

		});
	}//end of main-page

	if($("body").attr("id") == "testimony-page"){
		var modal = $('#confirmationModal');
		var nameStr = $('#nameTB')[0];
		var testimonyStr = $('#testimonyTA')[0];
		var lgInt = $('#lg-grpselectInput')[0];

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

		$('#verification-btn').on('click',{
		}, (event) => {

			if(nameStr.value== "" || testimonyStr.value == "" || parseInt(lgInt.value) == 0){

				modal.find('.modal-body').html('Please fill in all the blanks');
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

		$('#submit').on('click',{
		}, (event) => {

			isSpinner(true);

			$.ajax({
				url: api_link+"api/testimonies",
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

		isSpinner(false);
	} //end of testimony-page
	

});

function onClick_likeBtn(id){

	var like_count = $("#likeCount_"+id).html();
	var isLike = ($("#likeBtn_"+ id).hasClass("clicked"));
	var newLikeCount = (isLike)?parseInt(like_count)-1:parseInt(like_count)+1;

	$.ajax({
		url: api_link+"api/likes/"+id+"/" + newLikeCount,
		type: "PUT",
		crossDomain: true,
		dataType: "json",
		contentType: 'application/json',
		success: function (response) {
			$("#likeCount_"+ id).html(newLikeCount);
			$("#likeBtn_"+ id).toggleClass("clicked");
			(isLike)?localStorage.removeItem("likeBtn_"+ id):localStorage.setItem("likeBtn_"+ id, "clicked");

		},
		error: function (xhr, status) {
			$( "#testimony-body" ).html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+website_feedback+'">Report Bug</a></p>');
			$('#errorModel').modal('show');
		}
	});
}

function onClickRefreshTestimonies(total_post_count, to_go_page){

	isSpinner(true);
	var pages = Math.ceil(total_post_count/total_post_per_page);
	var offset = (to_go_page-1)*total_post_per_page;

	$.ajax({
		url: api_link+"api/testimonies/" + campus_id + "/"+offset+"/"+total_post_per_page,
		type: "GET",
		crossDomain: true,
		dataType: "json",
		contentType: 'application/json',
		async: false,
		success: function (response) {


			current_page = to_go_page;
			pagination(total_post_count);

			testimonies = response;

			$( "#testimony-body" ).html("");

			$.each(testimonies, function( index, value ) {
				$( "#testimony-body" ).append('<div class="card-deck mb-3 col-md-12">'
					+'<div class="card mb-4 box-shadow">'
					+'<div class="card-body">'
					+'<h4 class="card-title pricing-card-title">'+ value.name.toUpperCase()+ '<small class="ml-5 text-muted">'+value.lg+'</small></h4>'
					+'<p>'+value.testimony+'</p>'
					+'<button id="likeBtn_'+value.id+'" type="button" class="btn icon-heart float-left '+ localStorage.getItem("likeBtn_"+value.id) +'"></button>'
					+'<small id="likeCount_'+value.id+'" class="text-secondary float-left" style="padding: .375rem .75rem;"> '+value.likes_count+'</small>'
					+'<small class="text-secondary float-right">'+value.date.substring(0, value.date.length - 7)+'</small>'
					+'</div>'
					+'</div>'
					+'</div>');

				$('#likeBtn_'+value.id).on('click',{
					id: value.id
				}, (event) => {
					onClick_likeBtn(event.data.id);
				});

			});

		},
		error: function (xhr, status) {
			$( "#testimony-body" ).html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+website_feedback+'">Report Bug</a></p>');
			$('#errorModel').modal('show');
		},
		complete: function(){
			isSpinner(false);
		}
	});

}

function pagination(total_post_count){
	var pages = Math.ceil(total_post_count/total_post_per_page);
	var i = (current_page==1)?1:(current_page==pages && pages > 2)?current_page-2:current_page-1;
	var limit = (current_page==1 && pages > 2)?3:(current_page==pages)?pages:current_page+1;


	$("#page-index").html('<li class="page-item '+((current_page==1)?'disabled':' ')+'">'
					        +'<a class="page-link" href="#" aria-label="Previous" onclick="onClickRefreshTestimonies('+total_post_count+','+(current_page-1)+')">'
							+'<span aria-hidden="true">&laquo;</span>'
					        +'</a>'
					        +'</li>');

	for(i; i <= limit; i++){
		$("#page-index").append('<li class="page-item '+ ((current_page==i)?'active':'') +'"><a class="page-link" href="#" onclick="onClickRefreshTestimonies('+total_post_count+','+i+')">'+i+'</a></li>');
	}

	$("#page-index").append('<li class="page-item '+((current_page==pages)?'disabled':' ')+'">'
					        +'<a class="page-link" href="#" aria-label="Next" onclick="onClickRefreshTestimonies('+total_post_count+','+(current_page+1)+')">'
					        +'<span aria-hidden="true">&raquo;</span>'
					        +'</a>'
					        +'</li>');

}