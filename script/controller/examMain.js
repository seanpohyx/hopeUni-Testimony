var vis = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();
var objArr = [];

$( document ).ready(function() {

  var examObjArr = [];
  var lg = getLifegroupAjax();

  if(lg != null){
    examObjArr = loadData(lg);
    if(examObjArr.length != 0)
      generatePrayerWall(examObjArr);
    //have data
    isSpinner(false);
  }
  else{
    isSpinner(false);
    $( "#exam-content" ).html('<p>Sorry, there is a bug with the website, it will be fixed shortly. <a href="'+websiteFeedback+'">Report Bug</a></p>');
  }

  vis(function(){
    var show = vis() ? 'Visible' : 'Not visible';
    console.log(show);
  });

});

function loadData(lgData){
  objArr = [];

  var data = getExamsInformation({
    "from_datetime": "20/11/2019 00:00",
    "duration_days": 7,
    "lifegroup": 90
  });

  if(data != null){
    //O(N)
    data.exams.forEach(function(obj) {
      //examId, placeId, datetime, courseName, courseCode, examinee, eContactNo, lg, request, placeMapping
      objArr.push(new Exam(obj.exam_id, obj.place, obj.datetime,obj.course_name, 
                      obj.course_code, obj.name, obj.contact, obj.lifegroup, obj.request, VENUEMAPPING, lgData));
    });
    //O(N^2)
    data.prayer_warriors.forEach(function(obj) {
      var exam = this.searchForExamId(obj.exam_id, objArr);
      if(exam != null){
        exam.prayerWarriorArr.push(new PrayerWarrior(obj.prayer_warrior_id, obj.name, obj.contact));
      }
    });
  }
  
  console.log(objArr);
  return objArr;
}

function searchForExamId(examId, dataArr){
    for (var i=0; i < dataArr.length; i++) {
        if (dataArr[i].examId === examId) {
            return dataArr[i];
        }
    }
    return null;
}

function generatePrayerWall(examObjArr){
	var cardStr = "";
  var nextDate = "";
  var prayerWarrior = "";
	$( "#exam-content" ).html("");

	for(var i=0; i<examObjArr.length; i++){
    prayerWarrior = ''
    if(nextDate != examObjArr[i].date){
      nextDate = examObjArr[i].date;

      cardStr += '<div class ="table-responsive">'
      + '<p class="mb-0 ml-3 briyaniBoldFont">'+ DateFormatter.getLongDate(examObjArr[i].date) + '</p>'
      + '<table class="table borderless font-10">'
      + '<thead>'
      + '<tr class="shadow-sm p-3 mb-5 bg-white rounded grey-color briyaniBoldFont">'
      + '<th scope="col">Time</th>'
      + '<th scope="col">Examinee</th>'
      + '<th scope="col">Venue</th>'
      + '<th scope="col">Prayer Warrior</th>'
      + '<th scope="col">Lg</th>'
      + '<th scope="col">Course</th>'
      + '<th scope="col">Contact No</th>'
      + '<th scope="col">Special Request</th>'
      + '</tr>'
      + '</thead>'
      + '<tbody>';
    }

    var request = (examObjArr[i].request != undefined)?examObjArr[i].request:'-';
    cardStr += '<tr class="shadow-sm p-3 mb-5 bg-white rounded">'
    + '<td>'+ examObjArr[i].time +'</td>' //time
    + '<td>'+ examObjArr[i].examinee +'</td>' //examinee
    + '<td>'+ examObjArr[i].place +'</td>'; //venue

    for(var j=0; j<examObjArr[i].prayerWarriorArr.length;j++){
      prayerWarrior += examObjArr[i].prayerWarriorArr[j].pwName;
      if(j != examObjArr[i].prayerWarriorArr.length-1)
        prayerWarrior += '<br>';
    }
    cardStr += '<td>'+ prayerWarrior +'</td>'; //prayer warrior

    cardStr += '<td>'+ examObjArr[i].lg +'</td>' //lg
    + '<td>'+ examObjArr[i].courseName.toLowerCase() + '</td>' //course [course index]
    + '<td>'+ examObjArr[i].eContactNo +'</td>' //number
    + '<td>'+ request +'</td>' //request
    + '<td>'
    + '<div class="dropdown">'
    + '<button class="btn dropdown-toggle no-arrow" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
    + '<i class="fas fa-ellipsis-v grey-color"></i>'
    + '</button>'
    + '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
    + '<a class="dropdown-item" href="#" onclick="onClickAddPrayerWarrior('+ examObjArr[i].examId+')">Add Prayer Warrior</a>'
    + '<a class="dropdown-item" href="#" onclick="onClickDeletePrayerWarrior('+ examObjArr[i].examId+')">Remove Prayer Warrior</a>'
    + '<a class="dropdown-item" href="#" onclick="onClickDeleteExam('+ examObjArr[i].examId+')">Delete my schedule</a>'
    + '</div>'
    + '</div>'
    + '</td>'
    + '</tr>';

    if(i == examObjArr.length-1 || examObjArr[i+1].date != nextDate){

      cardStr += '</tbody>'
      + '</table>'
      + '</div>';
    }

	};

  $( "#exam-content" ).append(cardStr);


}

function onClickAddPrayerWarrior(examId){

  var submitBtn = $('.modal-footer .btn-custom-blue');
  var msg = '<div class="input-group mb-3">'
        +'<div class="input-group-prepend">'
        +'<span class="input-group-text" id="basic-addon1">Name</span>'
        +'</div>'
        +'<input id="prayerwarriorTB" type="text" class="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1">'
        +'</div>';

  showModal(msg, 'Insert your Name', false);

  var nametb = $('#prayerwarriorTB');
  nametb.on("input", function(){
      //if input is not null
      if($(this).val() != '')
        submitBtn.css('visibility', 'visible');
      else
        submitBtn.css('visibility', 'hidden');
  });

  $('#submit').on('click',{
  }, (event) => {

    isSpinner(true);

    var response = postPrayerWarrior([{
        "name": nametb.val(),
        "exam_id": examId
      }]);

    if(response != null){
      //successful

      showModal("Your name has been added into the prayerwarrior list. Thanks for contributing.", 'Success', false);
      isSpinner(false);

      $('.modal-footer .btn-secondary').on('click',{
      }, (event) => {
        var exam = this.searchForExamId(examId, objArr);
        if(exam != null){
          // const index = array.indexOf(5);
          // if (index > -1) {
          //   array.splice(index, 1);
          // }
          exam.prayerWarriorArr.push(new PrayerWarrior(response[0].prayer_warrior_id, response[0].name, response[0].contact));
          generatePrayerWall(objArr);
        }
      });
    }
    else{
      showModal('<p>Sorry, there is an error, please try again later. <a href="'+websiteFeedback+'">Report Bug</a></p>', 'Error', false);
      isSpinner(false);
    }

  });

  isSpinner(false);

}


function onClickDeletePrayerWarrior(examId){
  var submitBtn = $('.modal-footer .btn-custom-blue');
  var msg = '<p>Enter the name that is stored in the system</p>';

  var exam = this.searchForExamId(examId, objArr);

  for( var i=0; i<exam.prayerWarriorArr.length; i++){
    
    msg += '<div class="form-check">'
        + '<input class="form-check-input" type="checkbox" id="nameDelete'+i+'" value="'+exam.prayerWarriorArr[i].pwId+'">'
        + '<label class="form-check-label" for="nameDelete'+i+'">'
        + exam.prayerWarriorArr[i].pwName
        + '</label>'
        +'</div>';
  }

  showModal(msg, 'Insert your Name', false);

  $("input[type='checkbox']").on("change", function(){
      //if input is not 0
      if($("input[type='checkbox']:checked").length > 0)
        submitBtn.css('visibility', 'visible');
      else
        submitBtn.css('visibility', 'hidden');
  });

  $('#submit').on('click',{
  }, (event) => {
    var deleteIdArr = [];
    $.each($("input[type='checkbox']:checked"), function(){
        deleteIdArr.push(parseInt($(this).val()));
    });


    if(deletePrayerWarrior(deleteIdArr) != null){

      showModal("Delete Successful", 'Success', false);
      $('.modal-footer .btn-secondary').on('click',{
      }, (event) => {
        location.reload();
      });

      isSpinner(false);
    }
    else{
      showModal('<p>Sorry, there is an error, please try again later. <a href="'+websiteFeedback+'">Report Bug</a></p>', 'Error', false);
      isSpinner(false);

    }

  });
}

function onClickDeleteExam(examId){

  var exam = this.searchForExamId(examId, objArr);
  var submitBtn = $('.modal-footer .btn-custom-blue');
  
  var msg ='<p>Enter "'+exam.courseName+'" to cancel.</p>'
        +'<div class="input-group mb-3">'
        +'<div class="input-group-prepend">'
        +'<span class="input-group-text" id="basic-addon1">Module</span>'
        +'</div>'
        +'<input id="prayerwarriorTB" type="text" class="form-control" placeholder="Module Name" aria-label="Name" aria-describedby="basic-addon1">'
        +'</div>';

  showModal(msg, "Insert Module Name to Delete", false);

  $('#prayerwarriorTB').on("input", function(){
      //if input is not null
      if($(this).val() != '')
        submitBtn.css('visibility', 'visible');
      else
        submitBtn.css('visibility', 'hidden');
  });


  $('#submit').on('click',{
  }, (event) => {

    isSpinner(true);
    if($('#prayerwarriorTB').val().toUpperCase() == exam.courseName.toUpperCase()){
      var deleteIdArr = [];
      deleteIdArr.push(parseInt(examId));
      
      if(deleteExam(deleteIdArr) != null){

        showModal("Delete Successful", 'Success', false);
        $('.modal-footer .btn-secondary').on('click',{
        }, (event) => {
          location.reload();
        });

        isSpinner(false);
      }
      else{
        showModal('<p>Sorry, there is an error, please try again later. <a href="'+websiteFeedback+'">Report Bug</a></p>', 'Error', false);
        isSpinner(false);
      }

    }

  });

}

function showModal(msg, title, isDisplayBtn){

  var submitBtn = $('.modal-footer .btn-custom-blue');
  var modal = $('#confirmationModal');

  modal.find('.modal-body').html(msg);
  modal.find('.modal-title ').html(title);
  if(isDisplayBtn)
    submitBtn.css('visibility', 'visible');
  else
    submitBtn.css('visibility', 'hidden');

  modal.modal('show');

}