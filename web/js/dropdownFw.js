"use strict";

function dropdownFw(dropHeaderStyle, dropContentStyle){
    
    // drop down headers
    var headerList = document.getElementsByClassName(dropHeaderStyle);
    
    // add onclick functions to drop down headers
    for(var i = 0; i < headerList.length; i++){
        
        headerList[i].onclick = function () {
            // get dropcontent
            var dContent = this.parentElement.getElementsByClassName(dropContentStyle)[0];
            hideExcept(dContent); // close if opened
            toggle(dContent); // hide or show submenu
        }; // end of onclick
    } // end of for loop
    
    // hide or show dropcontent
    function toggle(ele){
        if(ele.style.visibility == "visible"){
            hide(ele);
        }else{
            show(ele);
        }
    } // end of toggle
    
    // hide element
    function hide(ele){
        ele.style.visibility = "hidden";
    } // end of hide
    
    // show element
    function show(ele){
        ele.style.visibility = "visible";
    } // end of show
    
    // hide all elements except given element
    function hideExcept(ele){
        var dropContentList = document.getElementsByClassName(dropContentStyle);
        for(var i = 0; i < dropContentList.length; i++){
            if(dropContentList[i] !== ele){
                hide(dropContentList[i]);
            }
        } // end of for loop
    } // end of hideExcept
    
    // close dropcontents if another dropcontent is clicked
    window.onclick = function (event) {
        
        if(!event.target.className.includes(dropHeaderStyle)){
            hideExcept(null);
        }
        
    } // end of onclick function
    
} // end of dropdownFw
    