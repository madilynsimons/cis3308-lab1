function users(id){
    var content = `
        <div id="users_table" class="clickSort"></div>
    `;
    
    document.getElementById(id).innerHTML = content;
    
    function formatCurrency(num) {
        var myNum = Number(num);
        return myNum.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
    }
    
    ajax("webAPIs/listUsersAPI.jsp", processData, "users_table");
    
    function processData(obj) {

        console.log(obj);
        
        if(obj.dbError.length > 0){
            document.getElementById("users_table").innerHTML = obj.dbError;
            return;
        }
        
        var usersList = obj.webUserList;

        // modifications for the image and the membership fee
        for (var i = 0; i < usersList.length; i++) {
            usersList[i].image = "<img  src='" + usersList[i].image + "'>";
            usersList[i].membershipFee = formatCurrency(usersList[i].membershipFee.replace("$","").replace(",",""));
        }

        MakeTable(usersList, "users_table", "webUserId"); // iniritally sort by webUserId
    }
}