function MakeEventCalendar(id, tableName){
    
    var rightNow = new Date();
    var year = rightNow.getFullYear();
    var month = rightNow.getMonth();

    var pageTitle = document.createElement("h1");
    pageTitle.innerHTML = "Events";

    var submitEventsTitle = document.createElement("h2");
    submitEventsTitle.innerHTML = "Submit Your Own Event";

    // Check that month is valid
    if (isNaN(month) || isNaN(year)){
        console.log("Error in MakeEventCalender: Invalid date");
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
      var myUrl = "webAPIs/listEventsAPI.jsp?tableName=" + tableName;
      ajax(myUrl, getDays, "event_calendar");
      function getDays(obj){
          
        // TODO -- check for error
          
        var eventsList = obj.eventList; 
          
        for(var j = 0; j < eventsList.length; j++){
            
            var eventDate = new Date(Date.parse(eventsList[j].date));
            var eventYear = eventDate.getFullYear();
            var eventMonth = eventDate.getMonth();
            var eventDay = eventDate.getDate();
          
          if(eventYear == year && eventMonth == month){
            hasEvents[eventDay] = 200;
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
                
                var clickedDate = new Date(year, month, this.innerHTML);
                modalText.innerHTML = DisplayEvents(eventsList, clickedDate);
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

    var locationLabel = document.createElement("label");
    locationLabel.setAttribute('for', 'location');
    locationLabel.innerHTML = "Location";
    actionPage.appendChild(locationLabel);

    var locationInput = document.createElement("input");
    locationInput.setAttribute('type', 'text');
    locationInput.setAttribute('name', 'location');
    locationInput.setAttribute('placeholder', 'Location');
    actionPage.appendChild(locationInput);

    var dateLabel = document.createElement("label");
    dateLabel.setAttribute('for', 'date');
    dateLabel.innerHTML = "Date";
    actionPage.appendChild(dateLabel);

    var dateInput = document.createElement("input");
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('name', 'date');
    actionPage.appendChild(dateInput);

    var submitButton = document.createElement("div");
    submitButton.setAttribute('class', 'submitbutton');
    submitButton.innerHTML = "Submit";
    actionPage.appendChild(submitButton);
    
    submitButton.onclick = function(){
        var eventInputObj = {
          "eventId" : "",
          "name" : eventNameInput.value,
          "date": dateInput.value,
          "location": locationInput.value,
        };
        var myData = escape(JSON.stringify(eventInputObj));
        var url = "webAPIs/insertEventSimpleAPI.jsp?jsonData=" + myData
            + "&tableName=" + tableName;
        ajax(url, insertReqGood, "recordError");
        
        function insertReqGood(httpRequest) {
            // TODO -- check for errors
            UpdateCalendar();

        }
    }

    document.getElementById(id).appendChild(pageTitle);
    document.getElementById(id).appendChild(calendarHeader);
    document.getElementById(id).appendChild(calendarWeekdays);
    document.getElementById(id).appendChild(calendarDays);

    document.getElementById(id).appendChild(submitEventsTitle);
    document.getElementById(id).appendChild(eventSubmissionForm);
}
