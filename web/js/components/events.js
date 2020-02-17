function events(id){
    var content = `
        <div id="event_calendar"></div>
    `;

    document.getElementById(id).innerHTML = content;

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    MakeEventCalendar("event_calendar", month, year);

}
