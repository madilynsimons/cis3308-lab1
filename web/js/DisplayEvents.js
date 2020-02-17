function DisplayEvents(year, month, date, eventsList){

  var currentDate = new Date(year, month, date, 0, 0, 0, 0);
  var text = "<h1>" + currentDate.toLocaleDateString("en-US") + "</h1>";

  for(var j = 0; j < eventsList.length; j++){

    var eventYear = eventsList[j].year;
    var eventMonth = eventsList[j].month;
    var eventDay = eventsList[j].day;
    var eventHours = eventsList[j].hours;
    var eventMinutes = eventsList[j].minutes;

    var eventDate = new Date(eventYear, eventMonth, eventDay, eventHours, eventMinutes, 0, 0);

    if(eventYear == year && eventMonth == month && eventDay == date){
      text += "<h2>" + eventsList[j].eventName + "</h2>";
      text += "<p>Where: " + eventsList[j].park + "</p>";
      text += "<p>When: " + eventDate.toLocaleString("en-US") + "</p>";
    }
  }
  return text;
}
