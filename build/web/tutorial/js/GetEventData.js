function GetEventData(id){
    var content = `
        <div id="event_data"></div>
    `;
    document.getElementById(id).innerHTML = content;

    ajax("webAPIs/listEventsAPI.jsp", foo, "event_data");

    function foo(obj){
        console.log("Ajax success!");
        console.log(obj["eventList"]);
    }

}
