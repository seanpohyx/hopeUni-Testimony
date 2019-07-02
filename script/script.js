var total_post_per_page = 10;
var campus_id = 1;
var current = 1;

$( document ).ready(function() {
	var testimony_card_msg = "";

	$.ajax({
		url: "https://hope-nyc.herokuapp.com/api/testimonies_get_count/" + campus_id,
		type: "GET",
		crossDomain: true,
		dataType: "json",
		async: false,
		contentType: 'application/json',
		success: function (response) {

			var total_post_count = response.count;

			if(total_post_count > 0){
				var pages = Math.ceil(total_post_count/total_post_per_page);
				var offset = (pages==1)?total_post_count:total_post_per_page; // only practical for first load


				$("#page-index").html('<li class="page-item">'
								        +'<a class="page-link" aria-label="Previous">'
            							+'<span aria-hidden="true">&laquo;</span>'
								        +'</a>'
								        +'</li>');

				for(var i=1; i <= pages; i++){
					$("#page-index").append('<li class="page-item"><a class="page-link" onclick="onClickRefreshTestimonies('+total_post_count+','+i+')">'+i+'</a></li>');
				}

				$("#page-index").append('<li class="page-item">'
								        +'<a class="page-link" href="#" aria-label="Next">'
								        +'<span aria-hidden="true">&raquo;</span>'
								        +'</a>'
								        +'</li>');

				onClickRefreshTestimonies(total_post_count, 1);

			}
			else{
				//0 testimonies
				$( "#testimony-body" ).html('<p>There are no testimonies currently.</p>');
				isSpinner(false);
			}

		},
		error: function (xhr, status) {
			console.log(xhr);
			$( "#testimony-body" ).html('<p>Error, please let the admin know.</p>');
			$('#errorModel').modal('show');
		},
		complete: function(response){

			isSpinner(false);
		}

	});
	

});

function onClick_likeBtn(id){

	isSpinner(true);
	var like_count = $("#likeCount_"+id).html();
	var isLike = ($("#likeBtn_"+ id).hasClass("clicked"));
	var newLikeCount = (isLike)?parseInt(like_count)-1:parseInt(like_count)+1;

	$.ajax({
		url: "https://hope-nyc.herokuapp.com/api/likes/"+id+"/" + newLikeCount,
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
			console.log(xhr);
			$( "#testimony-body" ).html('<p>Error, please let the admin know.</p>');
			$('#errorModel').modal('show');
		},
		complete: function(){

			isSpinner(false);
		}
	});
}

function onClickRefreshTestimonies(total_post_count, to_go_page){

	isSpinner(true);

	var pages = Math.ceil(total_post_count/total_post_per_page);
	var offset = (to_go_page-1)*total_post_per_page;

	$.ajax({
		url: "https://hope-nyc.herokuapp.com/api/testimonies/" + campus_id + "/"+offset+"/"+total_post_per_page,
		type: "GET",
		crossDomain: true,
		dataType: "json",
		contentType: 'application/json',
		async: false,
		success: function (response) {
			testimonies = response;

			$( "#testimony-body" ).html("");

			$.each(testimonies, function( index, value ) {
				// console.log(value);
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
			console.log(xhr);
			$( "#testimony-body" ).html('<p>Error, please let the admin know.</p>');
			$('#errorModel').modal('show');
		},
		complete: function(){
			isSpinner(false);
		}
	});

}

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


