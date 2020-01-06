class DateFormatter{
  static getDate(dateInput){

    var rx = /\d{2}[/]\d{2}[/]\d{4}/g;
    return rx.exec(dateInput)[0];
  }

  static getTime(dateInput){
    var rx = /\d{2}[:]\d{2}/g;
    return rx.exec(dateInput)[0];
  }

  static getLongDate(dateInput){

  	const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  	const weekdays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
	var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
	var dt = new Date(dateInput.replace(pattern,'$3-$2-$1'));
	var formatted_date = dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear() + ", " + weekdays[dt.getDay()];
	
	return formatted_date;
  }
}