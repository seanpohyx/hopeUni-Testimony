var data = {
	"exams" : {
		'29/11/2019 09:00': [
			{id: 1, code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""},	
			{id: 2, code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""},
			{id: 3, code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""}
		],
		'30/11/2019 09:00': [
			{id: 4, code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""},	
			{id: 5, code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""},
			{id: 6, code_code: "CZ2001", course_name: "PRINCIPLES OF NUTRITION", place: "NIE", lifegroup: 1, contact: 92721782, request: ""}
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
	// var Mark = "mark";
	// $( "#exam-content" ).html("");
	// Object.keys(data.exams).forEach(function (item) {
	// 	// console.log(item); // key
	// 	// console.log(course_code_mapping[item]); // value
	// 	console.log(data.exams[item])
	// 	$( "#exam-content" ).append(
	// 		'<div class="card mb-3 col-md-12">'
	//         +'<div class="card-header">'
	//         + "29/12/19 1am"
	//         +'</div>'
	//         +'<div class="card-body">'
	//         +'<table class="table">'
	//         +'<thead>'
	//         +'<tr>'
	//         +'<th scope="col">Examinee</th>'
	//         +'<th scope="col">Course</th>'
	//         +'<th scope="col">LG</th>'
	//         +'<th scope="col">Venue</th>'
	//         +'<th scope="col">Contact No</th>'
	//         +'<th scope="col">Special Request</th>'
	//         +'<th scope="col">Prayer Warrior</th>'
	//         +'</tr>'
	//         +'</thead>'
	//         +'<tbody>');
	// 	for(var i=0; i<data.exams[item].length; i++){

	// 		console.log(data.exams[item][i])
	// 		$( "#exam-content" ).append(
	//         '<tr>'
	//         +'<td>'+Mark+'</td>'
	//         +'<td>'+Mark+'</td>'
	//         +'<td>'+Mark+'</td>'
	//         +'<td>'+Mark+'</td>'
	//         +'<td>'+Mark+'</td>'
	//         +'<td>'+Mark+'</td>'
	//         +'<td>'+Mark+'</td>'
	//         +'</tr>');

	// 	}
	// 	$( "#exam-content" ).append(
	//         '</tbody>'
	//         +'</table>'
	//         +'</div>'
	//         +'</div>');
	// });


}