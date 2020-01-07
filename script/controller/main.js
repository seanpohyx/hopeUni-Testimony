var total_post_per_page = 10;
var current_page = 1;

$( document ).ready(function() {

	var totalPostCount = getNoOfFeeds().count;

	if(totalPostCount == null){
		$( "#feeds-body" ).html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+websiteFeedback+'">Report Bug</a></p>');
		$('#errorModel').modal('show');
	}
	else if(totalPostCount > 0){
		pagination(totalPostCount); //generate pagination
		onClickRefreshTestimonies(totalPostCount, 1); //generate page 1.
	}
	else{
		//0 testimonies
		$( "#feeds-body" ).html('<p>There are no post currently. Be the first!</p>');
	}

	isSpinner(false);

	// $.ajax({
	// 	url: feedsLink+"api/feeds_get_count/" + campusId,
	// 	type: "GET",
	// 	crossDomain: true,
	// 	dataType: "json",
	// 	async: false,
	// 	contentType: 'application/json',
	// 	success: function (response) {

	// 		var total_post_count = response.count;

	// 		if(total_post_count > 0){
	// 			pagination(total_post_count); //generate pagination
	// 			onClickRefreshTestimonies(total_post_count, 1); //generate page 1.
	// 		}
	// 		else{
	// 			//0 testimonies
	// 			$( "#feeds-body" ).html('<p>There are no post currently. Be the first!</p>');
	// 			isSpinner(false);
	// 		}

	// 	},
	// 	error: function (xhr, status) {
	// 		$( "#feeds-body" ).html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+websiteFeedback+'">Report Bug</a></p>');
	// 		$('#errorModel').modal('show');
	// 	},
	// 	complete: function(response){
	// 		isSpinner(false);
	// 	}

	// });

});

function onClick_likeBtn(id){

	var like_count = $("#likeCount_"+id).html();
	var isLike = ($("#likeBtn_"+ id).hasClass("clicked"));
	var newLikeCount = (isLike)?parseInt(like_count)-1:parseInt(like_count)+1;

	var check = putNoOfLikes(id, newLikeCount);
	if(check){
		$("#likeCount_"+ id).html(newLikeCount);
		$("#likeBtn_"+ id).toggleClass("clicked");
		(isLike)?localStorage.removeItem("likeBtn_"+ id):localStorage.setItem("likeBtn_"+ id, "clicked");
	}
	else{
		$("#feeds-body" ).html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+websiteFeedback+'">Report Bug</a></p>');
		$('#errorModel').modal('show');
	}

	// $.ajax({
	// 	url: feedsLink+"api/likes/"+id+"/" + newLikeCount,
	// 	type: "PUT",
	// 	crossDomain: true,
	// 	dataType: "json",
	// 	contentType: 'application/json',
	// 	success: function (response) {
	// 		$("#likeCount_"+ id).html(newLikeCount);
	// 		$("#likeBtn_"+ id).toggleClass("clicked");
	// 		(isLike)?localStorage.removeItem("likeBtn_"+ id):localStorage.setItem("likeBtn_"+ id, "clicked");

	// 	},
	// 	error: function (xhr, status) {
	// 		$("#feeds-body" ).html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+websiteFeedback+'">Report Bug</a></p>');
	// 		$('#errorModel').modal('show');
	// 	}
	// });
}

function onClickRefreshTestimonies(total_post_count, to_go_page){

	isSpinner(true);
	var pages = Math.ceil(total_post_count/total_post_per_page);
	var offset = (to_go_page-1)*total_post_per_page;
	console.log(pages)

	var response = getPaginationForFeeds(offset, total_post_per_page);
	if(response == null){
		$( "#feeds-body" ).html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+websiteFeedback+'">Report Bug</a></p>');
		$('#errorModel').modal('show');
	}
	else{
		current_page = to_go_page;
			pagination(total_post_count);

			feeds = response;

			var body = $( "#feeds-body" );
			body.html("");

			$.each(feeds, function( index, value ) {

				var msg = '<div class="card-deck mb-3 col-md-12">'
					+'<div class="card mb-4 box-shadow">'
					+'<div class="card-body">'
					+'<h4 class="card-title briyaniBoldFont pricing-card-title text-center">'+ value.title.toUpperCase() +'</h4>';


				msg += (value.type != "AFFIRMATION")?'<p class="text-center robotoFont pt-2">'+ value.author.toUpperCase() 
					+'<span class="ml-3 ">'+ value.lg +'</span>'
					+'<span class="ml-3 ">'+value.type+'</span></p>':
					'<p class="text-center pt-2 text-monospace robotoFont">'+ value.author.toUpperCase() +'<small class="text-muted">'
					+' AFFIRMS </small>' +value.recipients.toUpperCase()+'</p>'
              		+'<h5 class="text-center robotoFont"><small class="ml-3 text-muted">'+value.lg+'</small>'
              		+'<small class="ml-3 text-muted">'+value.type+'</small></h5>';

				msg +='<p class="text-left robotoFont py-2 px-5">'+value.message+'</p>'
					+'<button id="likeBtn_'+value.id+'" type="button" class="pl-5 btn icon-heart float-left '+ localStorage.getItem("likeBtn_"+value.id) +'"></button>'
					+'<small id="likeCount_'+value.id+'" class="text-secondary robotoFont float-left" style="padding: .375rem .75rem;">'+ value.no_of_likes +'</small>'
					+'<small class="pr-5 text-secondary robotoFont float-right">'+ value.datetime +'</small>'
					+'</div>'
					+'</div>'
					+'</div>';

				body.append(msg);

				$('#likeBtn_'+value.id).on('click',{
					id: value.id
				}, (event) => {
					onClick_likeBtn(event.data.id);
				});

			});
	}
	isSpinner(false);

	// $.ajax({
	// 	url: feedsLink+"api/feeds/" + campusId + "/"+offset+"/"+total_post_per_page,
	// 	type: "GET",
	// 	crossDomain: true,
	// 	dataType: "json",
	// 	contentType: 'application/json',
	// 	async: false,
	// 	success: function (response) {


			

	// 	},
	// 	error: function (xhr, status) {
	// 		$( "#feeds-body" ).html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+websiteFeedback+'">Report Bug</a></p>');
	// 		$('#errorModel').modal('show');
	// 	},
	// 	complete: function(){
	// 		isSpinner(false);
	// 	}
	// });

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