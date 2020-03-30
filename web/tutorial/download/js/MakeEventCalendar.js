function MakeEventCalendar(params){

    if(!params.id){ // check for id param
        alert("parameter object must have an 'id' property");
        return;
    }

    if(!params.tableName){ // check for tableName param
        alert("parameter object must have a 'tableName property");
        return;
    }

    if(!params.dbUrl){ // check for dbUrl param
      alert("parameter object must have a 'dbUrl' property");
      return;
    }

    // AJAX
    function ajax(url, callBackSuccess, errorId){
      var httpReq;
      if(window.XMLHttpRequest){
        httpReq = new XMLHttpRequest(); // Firefox, Safari, Opera
      } else if(window.ActiveXObject){
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); // IE 5+
      } else {
        alert('ajax not supported');
      }

      httpReq.open("GET", url); // page we're getting
      httpReq.onreadystatechange = dataReady;
      httpReq.send(null); // initiate ajax call

      function dataReady(){
        if(httpReq.readyState === 4){ // http request is complete
          if(httpReq.status === 200){
            var jsonData = httpReq.responseText;

            console.log("Data retrieved from AJAX call: ");
            console.log(jsonData);

            var jsObj = JSON.parse(jsonData);
            callBackSuccess(jsObj); // success
          }else{
            document.getElementById(errorId).innerHTML = "Error (" + httpReq.status + " " + httpReq.statusText +
                    ") while attempting to read '" + url + "'. NOTE: You must RUN not VIEW the page when using AJAX.";
          }
        }
      }
    } // end of ajax()

    // Returns HTML for pop-up modal
    function GetEventInfo(eventsList, eventDate){
      // header is the date clicked
      var text = "<h1>" + eventDate.toLocaleDateString("en-US") + "</h1>";

      for(var j = 0; j < eventsList.length; j++){ // traverse all events
        var date = new Date(Date.parse(eventsList[j].date));
        if(date.getDate() == eventDate.getDate()
                && date.getMonth() == eventDate.getMonth()
                && date.getFullYear() == eventDate.getFullYear()){ // check for given date
            text += "<h2>" + eventsList[j].name + "</h2>"; // event name
            if(eventsList[j].location.length > 0){
                text += "<p>Where: " + eventsList[j].location + "</p>"; // event location
            }else{
                text += "<p>Where: Unknown</p>"; // unknown location
            }
        }
      }
      return text;
    } // end of GetEventInfo

    var id = params.id; // div where calendar will be added
    var tableName = params.tableName; // name of db table
    var dbUrl = encodeURIComponent(params.dbUrl); // encode nested url

    var primaryColor = "rgb(2, 61, 118)"; // calendar is blue by default

    var rightNow = new Date(); // calendar starts on today by default
    var year = rightNow.getFullYear(); // year displayed on calendar
    var month = rightNow.getMonth(); // month displayed on calendar

    var pageTitle = document.createElement("h1"); // calendar title
    pageTitle.innerHTML = "Events";

    var submitEventsTitle = document.createElement("h2"); // form title / instructions
    submitEventsTitle.innerHTML = "Submit Your Own Event";

    var calendarErrorMsg = document.createElement("div"); // calendar errors
    calendarErrorMsg.innerHTML = "";

    // Takes in a number and returns the actual name of the month
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

    // Updates calendar whenever there's been a change
    function UpdateCalendar(){

      var monthName = GetMonthName(month); // get name of the month
      monthTitle.innerHTML = monthName + " " + year; // set month on calendar header

      var hasEvents = new Array(32); // whether or not theres an event on a given day
      var myUrl = "webAPIs/listEventsAPI.jsp?tableName=" // get events web api
                    + tableName
                    + "&dbUrl="
                    + dbUrl;
      ajax(myUrl, getDays, id);

      function getDays(obj){

        if(obj.dbError.length > 0){
          calendarErrorMsg.innerHTML = obj.dbError;
        }else{
          calendarErrorMsg.innerHTML = "";
        }

        var eventsList = obj.eventList; // all events

        for(var j = 0; j < eventsList.length; j++){ // traverse events

            // get date of event
            var eventDate = new Date(Date.parse(eventsList[j].date));
            var eventYear = eventDate.getFullYear();
            var eventMonth = eventDate.getMonth();
            var eventDay = eventDate.getDate();

          if(eventYear == year && eventMonth == month){
            hasEvents[eventDay] = 200; // set to 200 if theres an event that day
          }
        }

        // remove old days so we can put updated days
        while(calendarDays.firstChild){
          calendarDays.removeChild(calendarDays.firstChild);
        }

        // get first day of the displayed month
        var d = new Date();
        var i = 1;
        d.setMonth(month);
        d.setYear(year);
        d.setDate(i);

        // add blank entries so calendar starts on the right weekday
        var firstDayOfTheMonth = d.getDay();
        for(var j = 0; j < firstDayOfTheMonth; j++){
            var day = document.createElement("li");
            calendarDays.appendChild(day);
        }

        while(d.getMonth() === month){ // traverse days of the month
            var day = document.createElement("li"); // add day

            if(hasEvents[i] == 200){ // if theres an event, highlight the day and add a modal

              // highlight days with events
              var dayHighlight = document.createElement("span");
              dayHighlight.setAttribute('class', 'active');
              dayHighlight.setAttribute('style', 'cursor: pointer; background: ' + primaryColor);
              dayHighlight.innerHTML = i;

              // create modal
              var modal = document.createElement("div");
              modal.setAttribute('class', 'modal');
              document.getElementById(id).appendChild(modal);

              // create modal content
              var modalContent = document.createElement("div");
              modalContent.setAttribute('class', 'modal-content');
              modal.appendChild(modalContent);

              // create close button for modal
              var modalClose = document.createElement("span");
              modalClose.setAttribute('class', 'close');
              modalClose.innerHTML = "&times;"
              modalClose.onclick = function(){
                modal.style.display = "none";
              }
              modalContent.appendChild(modalClose);

              // create text for modal
              var modalText = document.createElement("p");
              modalContent.appendChild(modalText);

              // open modal when highlighted day is clicked
              dayHighlight.onclick = function(){
                modal.style.display = "block";
                var clickedDate = new Date(year, month, this.innerHTML); // get day clicked
                modalText.innerHTML = GetEventInfo(eventsList, clickedDate); // get text for modal
              }
              day.appendChild(dayHighlight);

            }else{
              day.innerHTML = i; // no event on this day
            }

            calendarDays.appendChild(day); // add day to calendar
            i++;
            d.setDate(i); // go to next dates
        }
      }
    }

    // top of calendar
    var calendarHeader = document.createElement("div");
    calendarHeader.setAttribute('class', 'month');
    calendarHeader.setAttribute('style', 'background: '+ primaryColor);

    // displays month
    var monthList = document.createElement("ul");
    calendarHeader.appendChild(monthList);

    // back arrow
    var prevArrow = document.createElement("li");
    prevArrow.innerHTML = "&#10094;"; // left arrow
    prevArrow.setAttribute('class', 'prev');
    prevArrow.onclick = function() {
        var prevMonth = month-1; // get last month
        if(prevMonth === -1){ // if current month is jan, prev month is dec
            prevMonth = 11;
            year = year - 1;
        }
        month = prevMonth; // change displayed month
        UpdateCalendar(); // update calendar
    }
    monthList.appendChild(prevArrow);

    // next arrow
    var nextArrow = document.createElement("li");
    nextArrow.innerHTML = "&#10095;"; // right arriw
    nextArrow.setAttribute('class', 'next');
    nextArrow.onclick = function() {
        var nextMonth = month+1; // get next month
        if(nextMonth === 12){ // if current month is dec, next month is jan
            nextMonth = 0;
            year = year + 1;
        }
        month = nextMonth; // change displayed month
        UpdateCalendar(); // update calendar
    }
    monthList.appendChild(nextArrow);

    var monthTitle = document.createElement("li"); // name of month
    monthList.appendChild(monthTitle);

    // days of the week
    var calendarWeekdays = document.createElement("ul");
    calendarWeekdays.setAttribute('class', 'weekdays');

    var weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    for(var i = 0; i < weekdays.length; i++){ // add each day in english
        var weekday = document.createElement("li");
        weekday.innerHTML = weekdays[i];
        calendarWeekdays.appendChild(weekday);
    }

    var calendarDays = document.createElement("ul");
    calendarDays.setAttribute('class', 'days');


    UpdateCalendar(); // update calendar for the first time

    // form for adding new events
    var eventSubmissionForm = document.createElement("div");
    eventSubmissionForm.setAttribute('style', 'padding-top:10px');

    // actual form itself
    var actionPage = document.createElement("form");
    actionPage.setAttribute('action', '/action_page.php');
    eventSubmissionForm.appendChild(actionPage);

    // event name label
    var eventNameLabel = document.createElement("label");
    eventNameLabel.setAttribute('for', 'eventname');
    eventNameLabel.innerHTML = "Event Name";
    actionPage.appendChild(eventNameLabel);

    // event name input
    var eventNameInput = document.createElement("input");
    eventNameInput.setAttribute('type', 'text');
    eventNameInput.setAttribute('name', 'eventname');
    eventNameInput.setAttribute('placeholder', 'Event Name');
    actionPage.appendChild(eventNameInput);

    // location label
    var locationLabel = document.createElement("label");
    locationLabel.setAttribute('for', 'location');
    locationLabel.innerHTML = "Location";
    actionPage.appendChild(locationLabel);

    // location input
    var locationInput = document.createElement("input");
    locationInput.setAttribute('type', 'text');
    locationInput.setAttribute('name', 'location');
    locationInput.setAttribute('placeholder', 'Location');
    actionPage.appendChild(locationInput);

    // date label
    var dateLabel = document.createElement("label");
    dateLabel.setAttribute('for', 'date');
    dateLabel.innerHTML = "Date";
    actionPage.appendChild(dateLabel);

    // date input
    var dateInput = document.createElement("input");
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('name', 'date');
    actionPage.appendChild(dateInput);

    // submit button
    var submitButton = document.createElement("div");
    submitButton.setAttribute('class', 'submitbutton');
    submitButton.setAttribute('style', 'background-color:'+ primaryColor);
    submitButton.innerHTML = "Submit";
    actionPage.appendChild(submitButton);

    // submission error message
    var formErrorMsg = document.createElement("div");
    actionPage.appendChild(formErrorMsg);

    // add event when clicked
    submitButton.onclick = function(){

        var eventInputObj = { // user input
          "name" : eventNameInput.value,
          "date": dateInput.value,
          "location": locationInput.value,
        };
        var myData = escape(JSON.stringify(eventInputObj));
        var url = "webAPIs/insertEventSimpleAPI.jsp?jsonData=" // insert event web api
            + myData
            + "&tableName="
            + tableName
            + "&dbUrl="
            + dbUrl;
        ajax(url, insertReqGood, id);

        function insertReqGood(obj) {
            if(obj.errorMsg.length > 0){ // failed to add event
              formErrorMsg.innerHTML = "Failed to add event.  Please check that the name and date of your event are valid.";
            }else{ // successfully added event -- update calendar
              formErrorMsg.innerHTML = "";
              UpdateCalendar();
            }
        }
    }

    // put everything togethers
    document.getElementById(id).appendChild(pageTitle);
    document.getElementById(id).appendChild(calendarHeader);
    document.getElementById(id).appendChild(calendarWeekdays);
    document.getElementById(id).appendChild(calendarDays);
    document.getElementById(id).appendChild(calendarErrorMsg);

    document.getElementById(id).appendChild(submitEventsTitle);
    document.getElementById(id).appendChild(eventSubmissionForm);

    // public customization methods
    var widget = {}

    // change primary color
    widget.changeColor = function(newColor){
        primaryColor = newColor;
        calendarHeader.setAttribute('style', 'background: '+ primaryColor);
        submitButton.setAttribute('style', 'background-color:'+ primaryColor);
        UpdateCalendar();
    };

    // change calendar title
    widget.changeCalendarTitle = function(newTitle){
      pageTitle.innerHTML = newTitle;
    };

    // change form title/instructions
    widget.changeFormTitle = function(newTitle){
      submitEventsTitle.innerHTML = newTitle;
    };

    return widget;
}
