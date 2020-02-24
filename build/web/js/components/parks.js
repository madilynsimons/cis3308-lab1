function parks(id){
    var content = `
        <div id="parks_table" class="clickSort"></div>
    `;
    
    document.getElementById(id).innerHTML = content;
    
    function formatCurrency(num) {
        var myNum = Number(num);
        return myNum.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
    }
    
    ajax("webAPIs/listParksAPI.jsp", processData, "parks_table");
    
    function processData(obj) {

        console.log(obj);
        
        if(obj.dbError.length > 0){
            document.getElementById("parks_table").innerHTML = obj.dbError;
            return;
        }
        
        var parksList = obj.parkList;

        // modifications for the image and the membership fee
        for (var i = 0; i < parksList.length; i++) {
            parksList[i].image = "<img  src='" + parksList[i].image + "'>";
            parksList[i].webUserImage = "<img  src='" + parksList[i].webUserImage + "'>";
            parksList[i].cost = formatCurrency(parksList[i].cost.replace("$","").replace(",",""));
        }

        MakeTable(parksList, "parks_table", "parkId"); // iniritally sort by webUserId
    }
   
}