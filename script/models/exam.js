class Exam {

	constructor(examId, placeId, datetime, courseName, courseCode, examinee, eContactNo, lgId, request, placeMapping, lgMapping) {

		this.examId = examId;
		this.placeId = placeId;
		this.place = Exam.findPlaceWithId(placeId, placeMapping);
		this.date = DateFormatter.getDate(datetime);
		this.time = DateFormatter.getTime(datetime);
		this.courseName = courseName;
		this.courseCode = courseCode;
		this.examinee = examinee;
		this.eContactNo = eContactNo;
        this.lg = Exam.findLgWithId(lgId, lgMapping);
        this.lgId = lgId;
        this.request = request;
        this.prayerWarriorArr = new Array();
	}

	static findPlaceWithId(placeId, placeMapping){

        for(var place in placeMapping){
            if(placeMapping[place].place_id == placeId){
                return place;
            }
        }
        //shouldn't return null
        return null;

    }

    static findLgWithId(lgId, lgMapping){

        for(var i=0; i<lgMapping.length; i++){
            if(lgMapping[i].id == lgId)
                return lgMapping[i].lg
        }
        //shouldn't return null
        return null;

    }

}