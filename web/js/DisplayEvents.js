function DisplayEvents(year, month, date){

  var d = new Date(year, month, date, 0, 0, 0, 0);
  return d.toUTCString() + " is the date";
}
