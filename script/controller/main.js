var totalPostPerPage = 10;
var currentPage = 1;
var feeds;

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

}


function onClickRefreshTestimonies(total_post_count, to_go_page){

	isSpinner(true);
	var pages = Math.ceil(total_post_count/totalPostPerPage);
	var offset = (to_go_page-1)*totalPostPerPage;

	var response = getPaginationForFeeds(offset, totalPostPerPage);
	if(response == null){
		$( "#feeds-body" ).html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+websiteFeedback+'">Report Bug</a></p>');
		$('#errorModel').modal('show');
	}
	else{
		currentPage = to_go_page;
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
					'<p class="text-center pt-2 text-monospace robotoFont">'+ value.author.toUpperCase() +'<span class="text-muted">'
					+' AFFIRMS </span>' +value.recipients.toUpperCase()+'</p>'
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

}

function pagination(total_post_count){
	var pages = Math.ceil(total_post_count/totalPostPerPage);
	var i = (currentPage==1)?1:(currentPage==pages && pages > 2)?currentPage-2:currentPage-1;
	var limit = (currentPage==1 && pages > 2)?3:(currentPage==pages)?pages:currentPage+1;


	$("#page-index").html('<li class="page-item '+((currentPage==1)?'disabled':' ')+'">'
					        +'<a class="page-link" href="#" aria-label="Previous" onclick="onClickRefreshTestimonies('+total_post_count+','+(currentPage-1)+')">'
							+'<span aria-hidden="true">&laquo;</span>'
					        +'</a>'
					        +'</li>');

	for(i; i <= limit; i++){
		$("#page-index").append('<li class="page-item '+ ((currentPage==i)?'active':'') +'"><a class="page-link" href="#" onclick="onClickRefreshTestimonies('+total_post_count+','+i+')">'+i+'</a></li>');
	}

	$("#page-index").append('<li class="page-item '+((currentPage==pages)?'disabled':' ')+'">'
					        +'<a class="page-link" href="#" aria-label="Next" onclick="onClickRefreshTestimonies('+total_post_count+','+(currentPage+1)+')">'
					        +'<span aria-hidden="true">&raquo;</span>'
					        +'</a>'
					        +'</li>');

}