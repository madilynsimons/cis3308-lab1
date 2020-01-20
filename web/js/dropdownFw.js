"use strict";

function dropdownFw(dropHeaderStyle, dropContentStyle, hiddenRight){
    
    var headerList = document.getElementsByClassName(dropHeaderStyle);
    
    for(var i = 0; i < headerList.length; i++){
        
        headerList[i].onclick = function () {
            var dContent = this.parentElement.getElementsByClassName(dropContentStyle)[0];
            hideExcept(dContent);
            toggle(dContent);
        }; // end of onclick
    } // end of for loop
    
    function toggle(ele){
        if(ele.style.visibility == "visible"){
            hide(ele);
        }else{
            show(ele);
        }
    } // end of toggle
    
    function hide(ele){
        ele.style.right = hiddenRight;
        ele.style.visibility = "hidden";
    } // end of hide
    
    function show(ele){
        ele.style.visibility = "visible";
        ele.style.right = "0px";
    } // end of show
    
    function hideExcept(ele){
        var dropContentList = document.getElementsByClassName(dropContentStyle);
        for(var i = 0; i < dropContentList.length; i++){
            if(dropContentList[i] !== ele){
                hide(dropContentList[i]);
            }
        } // end of for loop
    } // end of hideExcept
    
    window.onclick = function (event) {
        
        if(!event.target.className.includes(dropHeaderStyle)){
            hideExcept(null);
        }
        
    } // end of onclick function
    
} // end of dropdownFw
    