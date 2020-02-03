function parks(id){
    var content = `
        <div id="parks_table" class="clickSort"></div>
    `;
    
    document.getElementById(id).innerHTML = content;
    
    function formatCurrency(num) {
        var myNum = Number(num);
        return myNum.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
    }
    
    ajax("json/parks.json", processData, "parks_table");
    
    function processData(parksList) {

        console.log(parksList);  // parks

        // modifications for the image and the membership fee
        for (var i = 0; i < parksList.length; i++) {
            parksList[i].image = "<img  src='" + parksList[i].image + "'>";
            parksList[i].cost = formatCurrency(parksList[i].cost.replace("$","").replace(",",""));
        }

        MakeTable(parksList, "parks_table", "webUserId"); // iniritally sort by webUserId
    }
   
}