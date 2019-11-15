var data = {
	"exams" : {
		'29/11/2019 09:00': [
			{id: 1, name: "viena", code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""},	
			{id: 2, name: "viena", code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""},
			{id: 3, name: "viena", code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""}
		],
		'30/11/2019 09:00': [
			{id: 4, name: "viena", code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""},	
			{id: 5, name: "viena", code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""},
			{id: 6, name: "viena", code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""}
		]

	},
	"prayer_warrior" : [
		{exam_id: 1,contact: 92781728,name: "xt"},
		{exam_id: 2,contact: 92781728,name: "xt1"},
		{exam_id: 6,contact: 92781728,name: "xt2"}
	]
};


$( document ).ready(function() {
	retrievePrayerWall();
	isSpinner(false);
});

function retrievePrayerWall(){
	var Mark = "mark";
	var cardStr = "";
	$( "#exam-content" ).html("");

	Object.keys(data.exams).forEach(function (item) {
		// console.log(item); // key
		// console.log(course_code_mapping[item]); // value
		console.log(item)
		cardStr += '<div class="card mb-3 col-md-12">'
	        +'<div class="card-header">'
	        + item
	        +'</div>'
	        +'<div class="card-body">'
	        +'<table class="table">'
	        +'<thead>'
	        +'<tr>'
	        +'<th scope="col">Examinee</th>'
	        +'<th scope="col">Course</th>'
	        +'<th scope="col">LG</th>'
	        +'<th scope="col">Venue</th>'
	        +'<th scope="col">Contact No</th>'
	        +'<th scope="col">Special Request</th>'
	        +'<th scope="col">Prayer Warrior</th>'
	        +'</tr>'
	        +'</thead>'
	        +'<tbody>';
		for(var i=0; i<data.exams[item].length; i++){

			cardStr += '<tr>'
	        +'<td>'+data.exams[item][i].name+'</td>'
	        +'<td>'+data.exams[item][i].course_name+'</td>'
	        +'<td>'+data.exams[item][i].lifegroup+'</td>'
	        +'<td>'+data.exams[item][i].place+'</td>'
	        +'<td>'+data.exams[item][i].contact+'</td>'
	        +'<td>'+data.exams[item][i].request+'</td>'
	        +'<td>'+"Mark"+'</td>' //havent link with prayer id
	        +'</tr>';

		}
		cardStr += 
	        '</tbody>'
	        +'</table>'
	        +'</div>'
	        +'</div>';

		$( "#exam-content" ).append(cardStr);
	});


}