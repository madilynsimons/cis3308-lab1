function MakeEventCalendar(id, month, year){

    // Check that month is valid
    if (isNaN(month) || isNaN(year)){
        console.log("Month set to " + month);
        console.log("Year is set to " + year)
        console.log("Parameter month must be a number between 1 and 12");
        console.log("Parameter year must be set to a valid year");
        return;
    }

    if(month > 12 || month < 1 || year < 1000 || year > 9999){
        console.log("Month set to " + month);
        console.log("Year is set to " + year)
        console.log("Parameter month must be a number between 1 and 12");
        console.log("Parameter year must be set to a valid year");
        return;
    }

    var monthName = "UNKNOWN_MONTH";
    switch(month){
        case 1:
            monthName = "January";
            break;
        case 2:
            monthName = "February";
            break;
        case 3:
            monthName = "March";
            break;
        case 4:
            monthName = "April";
            break;
        case 5:
            monthName = "May";
            break;
        case 6:
            monthName = "June";
            break;
        case 7:
            monthName = "July";
            break;
        case 8:
            monthName = "August";
            break;
        case 9:
            monthName = "September";
            break;
        case 10:
            monthName = "October";
            break;
        case 11:
            monthName = "November";
            break;
        case 12:
            monthName = "December";
            break;
        default:
            monthName = "UNKNOWN_MONTH";
    }

    function clearCalendar(){
        var oldCalendarHeader = document.getElementById("calendarHeader");
        var oldCalendarWeekdays = document.getElementById("calendarWeekdays");
        var oldCalendarDays = document.getElementById("calendarDays");

        document.getElementById(id).removeChild(oldCalendarHeader);
        document.getElementById(id).removeChild(oldCalendarWeekdays);
        document.getElementById(id).removeChild(oldCalendarDays);

    }

    var calendarHeader = document.createElement("div");
    calendarHeader.setAttribute('id', 'calendarHeader');
    calendarHeader.setAttribute('class', 'month');

    var monthList = document.createElement("ul");
    calendarHeader.appendChild(monthList);

    var prevArrow = document.createElement("li");
    prevArrow.innerHTML = "&#10094;";
    prevArrow.setAttribute('class', 'prev');
    prevArrow.onclick = function() {
        var prevMonth = month-1;
        if(prevMonth === 0){
            prevMonth = 12;
            year = year - 1;
        }
        clearCalendar();
        MakeEventCalendar(id, prevMonth, year);
    }
    monthList.appendChild(prevArrow);

    var nextArrow = document.createElement("li");
    nextArrow.innerHTML = "&#10095;";
    nextArrow.setAttribute('class', 'next');
    nextArrow.onclick = function() {
        var nextMonth = month+1;
        if(nextMonth === 13){
            nextMonth = 1;
            year = year + 1;
        }
        clearCalendar();
        MakeEventCalendar(id, nextMonth, year);
    }
    monthList.appendChild(nextArrow);

    var monthTitle = document.createElement("li");
    monthTitle.innerHTML = monthName + " " + year;
    monthList.appendChild(monthTitle);

    var calendarWeekdays = document.createElement("ul");
    calendarWeekdays.setAttribute('class', 'weekdays');
    calendarWeekdays.setAttribute('id', 'calendarWeekdays');

    var weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    for(var i = 0; i < weekdays.length; i++){
        var weekday = document.createElement("li");
        weekday.innerHTML = weekdays[i];
        calendarWeekdays.appendChild(weekday);
    }

    var calendarDays = document.createElement("ul");
    calendarDays.setAttribute('class', 'days');
    calendarDays.setAttribute('id', 'calendarDays');

    var d = new Date();
    var i = 1;
    d.setMonth(month-1);
    d.setYear(year);
    d.setDate(i);

    var firstDayOfTheMonth = d.getDay();
    for(var j = 0; j < firstDayOfTheMonth; j++){
        var day = document.createElement("li");
        calendarDays.appendChild(day);
    }

    while(d.getMonth() === (month-1)){
        var day = document.createElement("li");
        day.innerHTML = i;
        calendarDays.appendChild(day);
        i++;
        d.setDate(i);
    }

    var eventSubmissionForm = document.createElement("div");
    eventSubmissionForm.setAttribute('style', 'padding-top:10px');
    eventSubmissionForm.setAttribute('id', 'eventSubmissionForm');

    var actionPage = document.createElement("form");
    actionPage.setAttribute('action', '/action_page.php');
    eventSubmissionForm.appendChild(actionPage);

    var eventNameLabel = document.createElement("label");
    eventNameLabel.setAttribute('for', 'eventname');
    eventNameLabel.innerHTML = "Event Name";
    actionPage.appendChild(eventNameLabel);

    var eventNameInput = document.createElement("input");
    eventNameInput.setAttribute('type', 'text');
    eventNameInput.setAttribute('name', 'eventname');
    eventNameInput.setAttribute('placeholder', 'Event Name');
    actionPage.appendChild(eventNameInput);

    var parkLabel = document.createElement("label");
    parkLabel.setAttribute('for', 'park');
    parkLabel.innerHTML = "Park";
    actionPage.appendChild(parkLabel);

    var parkInput = document.createElement("select");
    parkInput.setAttribute('name', 'park');

    ajax("json/parks.json", getParkOptions, "event_calenar");
    function getParkOptions(parksList){
      for(var i = 0; i < parksList.length; i++){
        var option = document.createElement("option");
        option.setAttribute('value', parksList[i].parkId);
        option.innerHTML = parksList[i].name;
        parkInput.appendChild(option);
      }
    }
    actionPage.appendChild(parkInput);

    var dateLabel = document.createElement("label");
    dateLabel.setAttribute('for', 'date');
    dateLabel.innerHTML = "Date";
    actionPage.appendChild(dateLabel);

    var dateInput = document.createElement("input");
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('name', 'date');
    actionPage.appendChild(dateInput);

    var timeLabel = document.createElement("label");
    timeLabel.setAttribute('for', 'time');
    timeLabel.innerHTML = "Time";
    actionPage.appendChild(timeLabel);

    var timeInput = document.createElement("input");
    timeInput.setAttribute('type', 'time');
    timeInput.setAttribute('name', 'time');
    actionPage.appendChild(timeInput);

    var submitButton = document.createElement("input");
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'Submit');
    actionPage.appendChild(submitButton);

    document.getElementById(id).appendChild(calendarHeader);
    document.getElementById(id).appendChild(calendarWeekdays);
    document.getElementById(id).appendChild(calendarDays);
    document.getElementById(id).appendChild(eventSubmissionForm);
}
