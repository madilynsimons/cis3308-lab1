function routeFw(params){
    
    // object to be passed back to HTML
    var fw = {};
    
    var contentId = params.contentId || "view";
    
    // check for existing parameters
    if(!params.routeArray || params.routeArray[0]){
        alert("parameter object must specify array 'routeArray' with at least one element");
        return;
    }
    
    // our routes
    var routes = params.routeArray;
    
    // called whenever link is clicked
    function router(){
        var path = location.hash;
        console.log('path is '+ path); // for debugging
        
        // check that path exists
        if(!routes[path]){
            document.getElementById(contentId).innerHTML = "Error link '" + path + 
                    "' was never added to the routing table.";
        }
        else // route exists, get desired content
        {
            routes[path](contentId);
        }
        
        fw.printRoutes = function() {
            console.log("routes: ");
            console.log(routes);
        };
        
        // listen for hash changes
        window.addEventListener('hashchange', router);
        
        // content for rendered page
        window.location.hash = "#/";
        
        return fw;
    }
}