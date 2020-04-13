var parks = {};

(function () {  // This is an IIFE, an immediately executing (anonymous) function
    //alert("I am an IIFE!");
    parks.list = function (targetId) {

        // clear out whatever may be currently in the content area
        var contentDOM = document.getElementById(targetId);
        contentDOM.innerHTML = "";

        // Remember: getting a successful ajax call does not mean you got data.
        // There could have been a DB error (like DB unavailable).
        ajax2({
            url: "webAPIs/listParksAPI.jsp",
            successFn: success,
            errorId: targetId
        });

        function success(obj) {

            // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
            console.log(obj);

            if (obj.dbError.length > 0) {
                contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
                return;
            }

            // Want the User List UI (plus headings and search filter) all to be centered.
            // Cannot be sure content area will be like this, so create a div inside of the
            // content area and set the div to be aligned center (HTML table will be styled
            // margin: auto to make it centered as well).
            var div = Utils.make({
                htmlTag: "div",
                parent: contentDOM
            });
            div.style.textAlign = "center";

            var heading = Utils.make({
                htmlTag: "h2",
                parent: div
            });

            Utils.make({// don't need reference to this span tag...
                htmlTag: "span",
                innerHTML: "Park List ",
                parent: heading
            });

            var img = Utils.make({
                htmlTag: "img",
                parent: heading
            });
            img.src = CRUD_icons.insert;
            img.onclick = function () { // you cant pass input params directly into an event handler

                // Originally I had this line of code here:
                //     users.insertUI(targetId);
                // And that worked (insert UI displayed and save worked), BUT, afterwards, if you tried to re-run
                // the user list, nothing would happen -- because this would cause no change in the
                // browser's address bar (the window.location.hash).
                //
                // The solution here is to invoke the user insert UI through a routing rule (since we
                // happen to have "user register" that can be directly invoked).
                // For "other" insert (even though you probably won't have a Nav Bar link for inserting "other",
                // you may need to create a routing rule and invoke that similarly (from the "other" list UI).
                window.location.hash = "#/parkInsert";
            };

            Utils.make({
                htmlTag: "span",
                innerHTML: " Search Filter: ",
                parent: div
            });

            var searchBox = Utils.make({
                htmlTag: "input",
                parent: div
            });
            searchBox.type = "text";
            //searchBox.setAttribute("type", "text");  // same thing...

            var deleteErrorMsg = Utils.make({
                htmlTag: "div",
                innerHTML: "",
                parent: div
            });
            deleteErrorMsg.id = "deleteErrorMsgId";

            var tableDiv = Utils.make({
                htmlTag: "div",
                parent: div
            });

            // create userList (new array of objects) to have only the desired properties of obj.webUserList.
            // Add the properties in the order you want them to appear in the HTML table.
            var parkList = [];
            for (var i = 0; i < obj.parkList.length; i++) {
                parkList[i] = {}; // add new empty object to array

                parkList[i].name = obj.parkList[i].name;
                parkList[i].image = obj.parkList[i].image;
                parkList[i].description = obj.parkList[i].description;
                parkList[i].rating = obj.parkList[i].rating;
                parkList[i].cost = obj.parkList[i].cost;
                parkList[i].parkId = obj.parkList[i].parkId;
                parkList[i].webUserId = obj.parkList[i].webUserId;
                parkList[i].webUserImage = obj.parkList[i].webUserImage;
                parkList[i].webUserEmail = obj.parkList[i].webUserEmail;

                // Remove this once you are done debugging...
                parkList[i].errorMsg = obj.parkList[i].errorMsg;

                // *** NEW: ADD EXTRA COLUMN TO DELETE THE RECORD
                // Note: this needs the word "icon" somewhere in userList[i].delete. Otherwise, the alignTableData function
                // of TableBuilder will try to turn the delete column (aleady an <img> tag complete with onclick function)
                // into an <img> tag.

                // here we have single quote around the onclick function call.
                // Inside the single quote we need to put quotes around the value of targetId (which is content).
                // For this, we use the back tick and it works.
                parkList[i].update = "<img src='" + CRUD_icons.update + "' alt='update icon' onclick='parks.updateUI(" +
                        parkList[i].parkId + ", `" + targetId + "` )' />";
                parkList[i].delete = "<img src='" + CRUD_icons.delete + "' alt='delete icon' onclick='parks.delete(" +
                        parkList[i].parkId + ",this)'  />";
            }

            // add click sortable HTML table to the content area

            // ********************** function tableBuilder.build ***********************************
            // params.list: an array of objects that are to be built into an HTML table.
            // params.target: reference to DOM object where HTML table is to be placed (by buildTable) --
            //         (this is not the id string but actual reference like you get from method getElementById()
            // params.style: will be added as className to DOM element target,
            // params.orderPropName (string): name of property (of objects in list) for iniial sort
            // params.reverse (boolean): if true, initial sort will be high to low (else low to high).
            // params.imgWidth: any columns that hold image files will be turned into <img> tags with this width.

            tableBuilder.build({
                list: parkList,
                target: tableDiv,
                style: "clickSort",
                orderPropName: "name",
                searchKeyElem: searchBox,
                reverse: false,
                imgWidth: "50px"
            });
        } // end of function success
    }; // end of function parks.list

    // this code called by insertUI and updateUI -- shared common code.
    function createInsertUpdateArea (isUpdate, targetId) {

        // set variables as if it will be insert...
        var parkIdRowStyle = ' style="display:none" '; // hide row with webUserId
        var saveFn = "parks.insertSave()";

        // change variables for update
        if (isUpdate) {
            parkIdRowStyle = ""; // don't hide row with webUserId
            saveFn = "parks.updateSave()";
        }

        var html = `
            <div id="insertArea">
                <div id="ajaxError">&nbsp;</div>
                <table>
                    <tr ${parkIdRowStyle}>
                        <td>Park Id</td>
                        <td><input type="text"  id="parkId" disabled /></td>
                        <td id="parkIdError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input type="text"  id="name" /></td>
                        <td id="nameError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><input type="text"  id="description" /></td>
                        <td id="descriptionError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Rating</td>
                        <td><input type="text" id="rating" /></td>
                        <td id="ratingError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Cost</td>
                        <td><input type="text" id="cost" /></td>
                        <td id="costError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Web User</td>
                        <td>
                            <select id="userPickList">
                            </select>
                        </td>
                        <td id="webUserIdError" class="error"></td>
                    </tr>
                    <tr>
                        <td><button onclick="${saveFn}">Save</button></td>
                        <td id="recordError" class="error"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        `;

        document.getElementById(targetId).innerHTML = html;
    }

    parks.updateUI = function (webUserId, targetId) {
        createInsertUpdateArea(true, targetId); // first param is isUpdate (boolean)
        ajax2({
            url: "webAPIs/getParkWithUsersAPI.jsp?id=" + webUserId,
            successFn: proceed,
            errorId: "ajaxError"
        });
        function proceed(obj) { // obj is what got JSON.parsed from Web API's output
            dbDataToUI(obj);
        }
    };

    parks.insertUI = function (targetId) {

        createInsertUpdateArea(false, targetId); // first param is isUpdate (boolean)

        ajax2({
            url: "webAPIs/getUsersAPI.jsp",
            successFn: setUserPickList,
            errorId: "webUserIdError"
        });

        function setUserPickList(jsonObj) {

            console.log("setUserPickList was called, see next line for object holding list of roles");
            console.log(jsonObj);

            if (jsonObj.dbError.length > 0) {
                document.getElementById("webUserIdError").innerHTML = jsonObj.dbError;
                return;
            }
            var userList = jsonObj.webUserList;

            Utils.makePickList({
                id: "userPickList", // id of select tag on the page
                list: userList, // JS array that holds the objects to populate the select tag
                valueProp: "userEmail", // field name of objects in list that holds the values of the select tag options
                keyProp: "webUserId"      // field name of objects in list that holds the keys of the options
            });

        } // setRolePickList

    }; // parks.insertUI


    function dbDataToUI(obj) {

      console.log("dbDataToUI was called");
      console.log(obj);

        var parkObj = obj.park;
        var userList = obj.userInfo.webUserList;

        document.getElementById("parkId").value = parkObj.parkId;
        document.getElementById("name").value = parkObj.name;
        document.getElementById("description").value = parkObj.description;
        document.getElementById("rating").value = parkObj.rating;
        document.getElementById("cost").value = parkObj.cost;

        console.log("selected web user id is " + parkObj.webUserId);
        Utils.makePickList({
            id: "userPickList", // id of <select> tag in UI
            list: userList, // JS array that holds objects to populate the select list
            valueProp: "userEmail", // field name of objects in list that hold the values of the options
            keyProp: "webUserId", // field name of objects in list that hold the keys of the options
            selectedKey: parkObj.webUserId  // key that is to be pre-selected (optional)
        });
    }

    // a private function
    function getParkDataFromUI() {

        // New code for handling role pick list.
        var ddList = document.getElementById("userPickList");

        var cost = document.getElementById("cost").value;
        cost = cost.replace("$", "");

        var parkInputObj = {
            "parkId": document.getElementById("parkId").value,
            "name": document.getElementById("name").value,
            "description": document.getElementById("description").value,
            "rating": document.getElementById("rating").value,
            "cost": cost,

            // Modification here for role pick list
            //"userRoleId": document.getElementById("userRoleId").value,
            "webUserId": ddList.options[ddList.selectedIndex].value,

            "webUserEmail": "",
            "errorMsg": ""
        };

        console.log(parkInputObj);

        // JSON.stringify converts the javaScript object into JSON format
        // (the reverse operation of what gson does on the server side).
        //
        // Then, you have to encode the user's data (encodes special characters
        // like space to %20 so the server will accept it with no security error.
        return encodeURIComponent(JSON.stringify(parkInputObj));
        //return escape(JSON.stringify(userInputObj));
    }

    function writeErrorObjToUI(jsonObj) {
        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);

        document.getElementById("parkIdError").innerHTML = jsonObj.parkId;
        document.getElementById("nameError").innerHTML = jsonObj.name;
        document.getElementById("descriptionError").innerHTML = jsonObj.description;
        document.getElementById("ratingError").innerHTML = jsonObj.rating;
        document.getElementById("costError").innerHTML = jsonObj.cost;
        document.getElementById("webUserIdError").innerHTML = jsonObj.webUserId;
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }

    parks.insertSave = function () {

        console.log("parks.insertSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getParkDataFromUI();

        ajax2({
            url: "webAPIs/insertParkAPI.jsp?jsonData=" + myData,
            successFn: processInsert,
            errorId: "recordError"
        });

        function processInsert(jsonObj) {

            // the server prints out a JSON string of an object that holds field level error
            // messages. The error message object (conveniently) has its fiels named exactly
            // the same as the input data was named.

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }

            writeErrorObjToUI(jsonObj);
        }
    };

    parks.updateSave = function () {

     console.log("parks.updateSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getParkDataFromUI();

        ajax2({
            url: "webAPIs/updateParkAPI.jsp?jsonData=" + myData,
            successFn: processInsert,
            errorId: "recordError"
        });

        function processInsert(jsonObj) {

            // the server prints out a JSON string of an object that holds field level error
            // messages. The error message object (conveniently) has its fiels named exactly
            // the same as the input data was named.

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated !!!";
            }

            writeErrorObjToUI(jsonObj);
        }

    };

}());  // the end of the IIFE
