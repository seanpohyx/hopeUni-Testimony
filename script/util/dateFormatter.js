class DateFormatter{
  static getDate(dateInput){

    var rx = /\d{2}[/]\d{2}[/]\d{4}/g;
    return rx.exec(dateInput)[0];
  }

  static getTime(dateInput){
    var rx = /\d{2}[:]\d{2}/g;
    return rx.exec(dateInput)[0];
  }
}