function DisplayEvents(eventsList, eventDate){
  var text = "<h1>" + eventDate.toLocaleDateString("en-US") + "</h1>";

  for(var j = 0; j < eventsList.length; j++){
    var date = new Date(Date.parse(eventsList[j].date));
    if(date.getDate() == eventDate.getDate() 
            && date.getMonth() == eventDate.getMonth()
            && date.getFullYear() == eventDate.getFullYear()){
        text += "<h2>" + eventsList[j].name + "</h2>";
        if(eventsList[j].location.length > 0){
            text += "<p>Where: " + eventsList[j].location + "</p>";
        }else{
            text += "<p>Where: Unknown</p>";
        }   
    }
  }
  return text;

}
