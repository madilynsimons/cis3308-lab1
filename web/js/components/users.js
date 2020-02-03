function users(id){
    var content = `
        <div id="users_table" class="clickSort"></div>
    `;
    
    document.getElementById(id).innerHTML = content;
    
    console.log("Content set!");
    
    function formatCurrency(num) {
        var myNum = Number(num);
        return myNum.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
    }
    
    ajax("json/allWebUsers.json", processData, "users_table");
    
    function processData(usersList) {

        console.log(usersList);  // users

        // modifications for the image and the membership fee
        for (var i = 0; i < usersList.length; i++) {
            usersList[i].image = "<img  src='" + usersList[i].image + "'>";
            console.log(usersList[i].membershipFee);
            usersList[i].membershipFee = formatCurrency(usersList[i].membershipFee.replace("$","").replace(",",""));
        }

        MakeTable(usersList, "users_table", "webUserId"); // iniritally sort by webUserId
    }
}