function getLifegroupAjax(){

	var res = $.ajax({
		url: feedsLink+"api/lifegroup/" + campusId,
		type: "GET",
		crossDomain: true,
		async: false,
		timeout: 15000,
		dataType: "json",
		contentType: 'application/json'
	});

	
	if(res.status == 200)
		return res.responseJSON;
	else
		return null;
}

function getNoOfFeeds(){
	var res = $.ajax({
		url: feedsLink+"api/feeds_get_count/" + campusId,
		type: "GET",
		crossDomain: true,
		dataType: "json",
		async: false,
		timeout: 15000,
		contentType: 'application/json'
	});

	if(res.status == 200)
		return res.responseJSON;
	else
		return null;
}

function putNoOfLikes(id, newLikeCount){
	var res = $.ajax({
		url: feedsLink+"api/likes/"+id+"/" + newLikeCount,
		type: "PUT",
		crossDomain: true,
		dataType: "json",
		async: false,
		timeout: 15000,
		contentType: 'application/json'
	});

	if(res.status == 200)
		return true;
	else
		return false;

}

function getPaginationForFeeds(offset, totalPostPerPage){

	var res = $.ajax({
		url: feedsLink+"api/feeds/" + campusId + "/"+offset+"/"+totalPostPerPage,
		type: "GET",
		crossDomain: true,
		dataType: "json",
		contentType: 'application/json',
		async: false,
		timeout: 15000
	});

	if(res.status == 200)
		return res.responseJSON;
	else
		return null;
}

function postBatchExams(json){
	var res = $.ajax({
		url: "https://hopenus-examtt-backend.herokuapp.com/batch_insert_exams/",
		type: "POST",
		crossDomain: true,
		async: false,
		dataType: "json",
		timeout: 15000,
		data: JSON.stringify(json),
		contentType: 'application/json'

	});
	
	if(res.status == 200)
		return res.responseJSON;
	else
		return null;
}

function postNewFeeds(jsonData){
	var res = $.ajax({
		url: feedsLink+"api/feeds",
		type: "POST",
		crossDomain: true,
		async: false,
		dataType: "json",
		timeout: 15000,
		data: JSON.stringify( jsonData ),
		contentType: 'application/json'

	});
	
	if(res.status == 200)
		return res.responseJSON;
	else
		return null;

}

function getExamsInformation(jsonData){

	var res = $.ajax({
		url: "https://hopenus-examtt-backend.herokuapp.com/get_exams/",
		type: "GET",
		crossDomain: true,
		dataType: "json",
		async: false,
		timeout: 15000,
		data : jsonData,
		contentType: 'application/json'
	});

	if(res.status == 200 && res.responseJSON.error == undefined)
		return res.responseJSON;
	else
		return null;
}

function postPrayerWarrior(jsonData){
	var res = $.ajax({
		url: "https://hopenus-examtt-backend.herokuapp.com/batch_insert_prayer_warriors/",
		type: "POST",
		crossDomain: true,
		async: false,
		dataType: "json",
		timeout: 15000,
		data: JSON.stringify( jsonData ),
		contentType: 'application/json'

	});
	
	if(res.status == 200 && res.responseJSON.error == undefined)
		return res.responseJSON;
	else
		return null;

}

function deletePrayerWarrior(dataArr){
	console.log(dataArr)
	var res = $.ajax({
		url: "https://hopenus-examtt-backend.herokuapp.com/batch_delete_prayer_warriors/",
		type: "POST",
		crossDomain: true,
		dataType: "json",
		async: false,
		timeout: 15000,
		data : JSON.stringify(dataArr),
		contentType: 'application/json'
	});

	if(res.status == 200 && res.responseJSON.error == undefined)
		return res.responseJSON;
	else
		return null;
}