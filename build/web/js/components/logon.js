var logon = {};

logon.logonUI = function (targetId) {
    
    var contentDOM = document.getElementById(targetId);
    var content = `
        <div class='logon'>
            <br/>
            Email: <input type="text" id="emailInput" style="width: 200px; margin-right:10px"/>
            Password: <input type="text" id = "passwordInput" style="width: 200px; margin-right:10px"/>
            <input type="button" value="Submit" onclick="logon.findUser('emailInput', 'passwordInput', 'msgArea')"/>
            <br/> <br/>
            <div id="msgArea"></div> 
        </div>
    `;
    contentDOM.innerHTML = content;
};

// This public function of global object will be called when the user clicks the button created just above.
// This function will 
logon.findUser = function (idOfEmailInput, idOfPassInput, targetId) {
    
    // clear out any previous values in the target area
    var targetDOM = document.getElementById(targetId);
    targetDOM.innerHTML = "";
    
    var desiredUserEmail = escape(document.getElementById(idOfEmailInput).value);
    var desiredUserPass = escape(document.getElementById(idOfPassInput).value);
    
    console.log("Attempting to log in user " + desiredUserEmail);

    // the JS escape function cleans input so it can be used as a URL paramenter
    var myUrl = "webAPIs/logonAPI.jsp?email=" + desiredUserEmail + "&password=" + desiredUserPass;

    // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: targetId
    });


    function success(obj) {

        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            targetDOM.innerHTML += "logon.findUser (success private fn): Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log("logon.findUser (success private fn): the obj passed in by ajax2 is on next line.");
        console.log(obj);
        
        if (obj.dbError.length > 0) {
            targetDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        } else if (obj.webUserList.length === 0 ) {
            targetDOM.innerHTML = "Incorrect log in.  Double check credentials or register a new account."
        } else {
            var msg = "Found Web User " + obj.webUserList[0].webUserId;
            msg += "<br/> &nbsp; Birthday: " +  obj.webUserList[0].birthday;
            msg += "<br/> &nbsp; MembershipFee: " +  obj.webUserList[0].membershipFee;
            msg += "<br/> &nbsp; User Role: " +  obj.webUserList[0].userRoleId + " " +  obj.webUserList[0].userRoleType;
            msg += "<br/> <img src ='" +  obj.webUserList[0].image + "'>";
            targetDOM.innerHTML = msg;  
        }

    } // end of function success
};  // logon.findUser

logon.profile = function(targetId){
    console.log("Displaying profile...");
    
    var contentDOM = document.getElementById(targetId);
    var content = `
        <div class='logon'>
            <div id="msgArea">No user found.  Please log in.</div> 
        </div>
    `;
    contentDOM.innerHTML = content;
    
    var myUrl = "webAPIs/getProfileAPI.jsp";
    
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: targetId
    });
    
    function success(obj){
        console.log("logon.profile successfully called ajax");
        console.log(obj);
        var msg = "";
        if(obj.errorMsg.length > 0){
            msg += obj.errorMsg;
        }else{
            msg += "User " + obj.webUserId;
            msg += "<br/> &nbsp; Birthday: " +  obj.birthday;
            msg += "<br/> &nbsp; MembershipFee: " +  obj.membershipFee;
            msg += "<br/> &nbsp; User Role: " +  obj.userRoleId + " " +  obj.userRoleType;
            msg += "<br/> <img src ='" +  obj.image + "'>";
        }
        document.getElementById("msgArea").innerHTML = msg;
    }
}

logon.logout = function(targetId){
    var contentDOM = document.getElementById(targetId);
    var content = `
        <div class='logon'>
            <div id="msgArea"></div> 
        </div>
    `;
    contentDOM.innerHTML = content;
 
    var myUrl = "webAPIs/logoffAPI.jsp";
        ajax2({
        url: myUrl,
        successFn: success,
        errorId: targetId
    });
    
    function success(obj){
        document.getElementById("msgArea").innerHTML = obj;
    }
}