function MakeEventCalendar(id, month, year){

    var pageTitle = document.createElement("h1");
    pageTitle.innerHTML = "Events";

    var submitEventsTitle = document.createElement("h2");
    submitEventsTitle.innerHTML = "Submit Your Own Event";

    // Check that month is valid
    if (isNaN(month) || isNaN(year)){
        console.log("Month set to " + month);
        console.log("Year is set to " + year)
        console.log("Parameter month must be a number between 0 and 11");
        console.log("Parameter year must be set to a valid year");
        return;
    }

    if(month > 11 || month < 0 || year < 1000 || year > 9999){
        console.log("Month set to " + month);
        console.log("Year is set to " + year)
        console.log("Parameter month must be a number between 0 and 11");
        console.log("Parameter year must be set to a valid year");
        return;
    }

    function GetMonthName(month){
      var monthName = "UNKNOWN_MONTH";
      switch(month){
          case 0:
              monthName = "January";
              break;
          case 1:
              monthName = "February";
              break;
          case 2:
              monthName = "March";
              break;
          case 3:
              monthName = "April";
              break;
          case 4:
              monthName = "May";
              break;
          case 5:
              monthName = "June";
              break;
          case 6:
              monthName = "July";
              break;
          case 7:
              monthName = "August";
              break;
          case 8:
              monthName = "September";
              break;
          case 9:
              monthName = "October";
              break;
          case 10:
              monthName = "November";
              break;
          case 11:
              monthName = "December";
              break;
          default:
              monthName = "UNKNOWN_MONTH";
      }
      return monthName;
    }

    function UpdateCalendar(){
      var monthName = GetMonthName(month);
      monthTitle.innerHTML = monthName + " " + year;

      var hasEvents = new Array(32);
      ajax("json/events.json", getDays, "event_calendar");
      function getDays(eventsList){
        for(var j = 0; j < eventsList.length; j++){

          var eventYear = eventsList[j].year;
          var eventMonth = eventsList[j].month;
          var eventDate = eventsList[j].day;

          if(eventYear == year && eventMonth == month){
            hasEvents[eventDate] = 200;
          }
        }

        var d = new Date();
        var i = 1;
        d.setMonth(month);
        d.setYear(year);
        d.setDate(i);

        while(calendarDays.firstChild){
          calendarDays.removeChild(calendarDays.firstChild);
        }

        var firstDayOfTheMonth = d.getDay();
        for(var j = 0; j < firstDayOfTheMonth; j++){
            var day = document.createElement("li");
            calendarDays.appendChild(day);
        }

        while(d.getMonth() === month){
            var day = document.createElement("li");

            if(hasEvents[i] == 200){
              var dayHighlight = document.createElement("span");
              dayHighlight.setAttribute('class', 'active');
              dayHighlight.setAttribute('style', 'cursor: pointer;');
              dayHighlight.innerHTML = i;

              var modal = document.createElement("div");
              modal.setAttribute('class', 'modal');
              document.getElementById(id).appendChild(modal);

              var modalContent = document.createElement("div");
              modalContent.setAttribute('class', 'modal-content');
              modal.appendChild(modalContent);

              var modalClose = document.createElement("span");
              modalClose.setAttribute('class', 'close');
              modalClose.innerHTML = "&times;"
              modalClose.onclick = function(){
                modal.style.display = "none";
              }
              modalContent.appendChild(modalClose);

              var modalText = document.createElement("p");
              modalContent.appendChild(modalText);

              dayHighlight.onclick = function(){
                modal.style.display = "block";
                //modal.style.overflow = "auto"; TODO: Play with this
                modalText.innerHTML = DisplayEvents(year, month, this.innerHTML, eventsList);
              }
              day.appendChild(dayHighlight);

            }else{
              day.innerHTML = i;
            }

            calendarDays.appendChild(day);
            i++;
            d.setDate(i);
        }
      }
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
        if(prevMonth === -1){
            prevMonth = 11;
            year = year - 1;
        }
        month = prevMonth;
        UpdateCalendar();
    }
    monthList.appendChild(prevArrow);

    var nextArrow = document.createElement("li");
    nextArrow.innerHTML = "&#10095;";
    nextArrow.setAttribute('class', 'next');
    nextArrow.onclick = function() {
        var nextMonth = month+1;
        if(nextMonth === 12){
            nextMonth = 0;
            year = year + 1;
        }
        month = nextMonth;
        UpdateCalendar();
    }
    monthList.appendChild(nextArrow);

    var monthTitle = document.createElement("li");
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

    UpdateCalendar();

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

    ajax("json/parks.json", getParkOptions, "event_calendar");
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

    var submitButton = document.createElement("div");
    submitButton.setAttribute('class', 'submitbutton');
    submitButton.innerHTML = "Submit";
    actionPage.appendChild(submitButton);

    document.getElementById(id).appendChild(pageTitle);
    document.getElementById(id).appendChild(calendarHeader);
    document.getElementById(id).appendChild(calendarWeekdays);
    document.getElementById(id).appendChild(calendarDays);

    document.getElementById(id).appendChild(submitEventsTitle);
    document.getElementById(id).appendChild(eventSubmissionForm);
}
