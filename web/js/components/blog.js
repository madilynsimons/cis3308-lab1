function blog(id){
    var content = `
        <div id="blog6" style="margin: 10px"></div>
        <div id="blog5" style="margin: 10px"></div>
        <div id="blog4" style="margin: 10px"></div>
        <div id="blog3" style="margin: 10px"></div>
        <div id="blog2" style="margin: 10px"></div>
        <div id="blog1" style="margin: 10px"></div>
    `;
    document.getElementById(id).innerHTML = content;
    
    var blog1 = document.getElementById("blog1");
    var title1 = document.createElement("h2");
    title1.innerHTML = "HW2: My Routing Experience";
    blog1.appendChild(title1);
    
    var blog1body = document.createElement("p");
    blog1body.innerHTML = 
            "I found this portion to be relatively easy.  Although " +
            "I dont have a lot of experience with html and javascript, " +
            "I do have a lot of experience with data structures, " +
            "Java, and OOP.  When reading the example code, it made " +
            "a lot of sense.  The example code was very helpful.<br> <br>" +
            "The only part that was somewhat difficult was debugging " +
            "the Javascript.  Initially, router() in routeFw.js " +
            "wasn't being called when I expected it too and " +
            "printRoutes() wasn't defined.  I thought this was a " +
            "problem with the event listener, but really I just had " +
            "the brackets in the wrong place.  I think if Javascript " +
            "was a compiled language, it may have been able to catch " +
            "that, but it didn't.<br> <br>" +
            "I learned how routing works and I became more familiar " +
            "and comfortable with Javascript and HTML.";
    blog1.appendChild(blog1body);
    
    var blog2 = document.getElementById("blog2");
   
    var title2 = document.createElement("h2");
    title2.innerHTML = "HW2: My Database Experience";
    blog2.appendChild(title2);
    
    var blog2body = document.createElement("p");
    blog2body.innerHTML = "I think the database portion was more difficult than " +
                        "the routing portion of the homework.  Creating my " +
                        "database required a lot of attention to detail, as I had " +
                        "to make sure each entry and all of the data was correct. " +
                        "<br> <br> " +
                        "My only experience with MySQL before was with online " +
                        "tutorials that I had done in the past, but I had always " +
                        "found them confusing, unintuitive, and hard to remember. " +
                        "In this assignment, I actually enjoyed writing scripts " +
                        "for MySQL a lot.  This introduction to writing scripts " +
                        "was really easy and straightforward and progressed in a " +
                        "way that made sense to me.  I think these concepts are " +
                        "going to stick with me, as opposed to before when I " +
                        "would just immedietly forget what each keyword meant " +
                        "<br> <br> " +
                        "<a href=\"docs/MSimonsHW2.pdf\">" +
                        "    Here is a link to the associated document." +
                        "</a>";
    
    blog2.appendChild(blog2body);
    
    var blog3 = document.getElementById("blog3");
    var title3 = document.createElement("h2");
    title3.innerHTML = "HW3: Data Display Homework";
    blog3.appendChild(title3);
    
    var blog3body = document.createElement("p");
    blog3body.innerHTML = "For this homework assignment, I was able to familiarize " +
                        "myself with HTML tables.  This was a good assignment " +
                        "because I think it has been my most in-depth look " +
                        "at Javascript yet.  The example code shows us how to " +
                        "create sortable HTML tables and filterable HTML tables, " +
                        "but it does not show how to  combine the two.  By " +
                        "combining the two, I was able to get to know HTML " +
                        "tables a lot better as well as Javascript. " +
                        "<br> <br> " +
                        "I think the most challenging part of this assignment " +
                        "was writing users.js and parks.js.  The components " +
                        "that I wrote before (blog.js and home.js) only really " +
                        "had a variable that held some HTML, while user.js " +
                        "and parks.js combine HTML and Javascript together. " +
                        "<br> <br> " +
                        "Writing the JSON files was the easiest part of the " +
                        "assignment.  I do, however, look forward to writing " +
                        "the server side Web API that will generate JSON files " +
                        "from my database.  I've never worked with databases " +
                        "before so I look forward to writing web apps that can " +
                        "interact with a database. " +
                        "<br> <br> " +
                        "<a href=\"json/allWebUsers.json\">" +
                        "      allWebUsers.json" +
                        "</a>" + 
                        "<br> <br> " +
                        "<a href=\"json/parks.json\">" +
                        "      parks.json" +
                        "</a>";
    blog3.appendChild(blog3body);
    
    
    var blog4 = document.getElementById("blog4");
    var title4 = document.createElement("h2");
    title4.innerHTML = "HW4: Tutorial Proposal";
    blog4.appendChild(title4);
    
    
    var blog4body = document.createElement("p");

    blog4body.innerHTML = "My favorite part of this assignment was creating a " +
                        "functional calendar.  The tutorial on W3Schools presents " +
                        "a hard-coded calendar in HTML.  There's nothing to click " +
                        "on, it doesn't change at all, and the individual dates " +
                        "are hard-coded.  This means that if you were to change " +
                        "the month, the dates would be wrong since they would " +
                        "reflect the dates hard-coded in the tutorial. " +
                        "<br> <br> " +
                        "I was able to use JavaScript to generalize the calendar. " +
                        "I used the CSS components provided from the tutorial, " +
                        "but used JavaScript's Date class to get the exact " +
                        "calendar dates for each individual month and then " +
                        "generate an accurate calendar with those dates.  Now " +
                        "every month that the calendar displays is accurate. " +
                        "<br> <br> " +
                        "The most difficult part of this homework was implementing " +
                        "a modal.  Any date that has an event is highlighted blue " +
                        "and a modal is displayed when the date is clicked.  This " +
                        "modal displays the event, when the event is, and where " +
                        "the event is.  I did not originally intend to use a modal, " +
                        "but when I was creating my Proof of Concept, I realized " +
                        "that there was no good way for users to find out more " +
                        "information about the events displayed in the calendar. " +
                        "The difficult part of programming the modal was making " +
                        "sure that the information it displayed corresponded to " +
                        "the date the user clicked on.  Sometimes I would click on " +
                        "Feb 14, but the modal would display info for Feb 26.  I " +
                        "was able to fix this by creating a new function called " +
                        "DisplayEvent, which would create a String that displays " +
                        "event data, and I used the \"this\" keyword to make sure " +
                        "that the modal was pulling data from the correct components. " +
                        "<br> <br> " +
                        "<a href=\"tutorial/proposal.pdf\">" +
                        "  Here is a link to my proposal." +
                        "</a> "+
                        "<br> <br> " +
                        "<a href=\"tutorial/poc.html\"> " +
                        "  Here is a link to my Proof of Concept." +
                        "</a>";
    blog4.appendChild(blog4body);
    
    var blog5 = document.getElementById("blog5");
    var title5 = document.createElement("h2");
    title5.innerHTML = "HW5: Web APIs";
    blog5.appendChild(title5);
    
    var blog5body = document.createElement("p");
    
    blog5body.innerHTML = "I had never written any server-side code before this " +
            "class.  The only server-side code I've written are the jsp files I " +
            "wrote for selecting users and parks data from my database. " +
            "<br> <br> " + 
            "This week I learned about JavaServer Pages.  I found this interesting " +
            "since I am far more familiar with Java than I am with any of the other " +
            "languages we've worked with in class.  It was also interesting because " +
            "it provides a tool to access my database for my website.  I'm really eager " +
            "to continue working on my component for my Tutorial and this component " +
            "will likely require me to write another web API.  Now that I have these " +
            "skills, I can get started on this part of my component. " +
            "<br> <br> " +
            "The most difficult part of this week's homework was making sure all " +
            "of the files were installed correctly.  The project organization " +
            "and design is becoming more complicated and so it takes more attention " +
            "to detail to make sure that all of the files are in the correct locations. " +
            "<br> <br> " +
            "<a href=\"docs/MSimonsHW5.docx\"> " +
            "     Java DB Access Errors" +
            "</a> " +
            "<br> <br> " +
            "<a href=\"webAPIs/listUsersAPI.jsp\"> " +
            "     Web Users Database API" +
            "</a> " +
            "<br> <br> " +
            "<a href=\"webAPIs/listParksAPI.jsp\"> " +
            "     Parks Database API" +
            "</a> ";
    blog5.appendChild(blog5body);
    
    var blog6 = document.getElementById("blog6");
    var title6 = document.createElement("h2");
    title6.innerHTML = "HW6: Log On";
    blog6.appendChild(title6);
    
    var blog6body = document.createElement("p");
    
    blog6body.innerHTML = "I think the most confusing part of this assignment " + 
            "was wrapping my head around the order in which different components " +
            "were called.  For example, when logging in, users use logon.loginUI " +
            "to enter their email and password.  Then, they press the Submit button, " +
            "which calls logon.findUser, which then calls logonAPI.jsp.  After that, " +
            "logonAPI.jsp calls DbMods.logonFind.  This way of thinking about code " +
            "is a lot closer to the way you'd think about traditional software and " +
            "system design.  At the beginning of the class, we started with pretty basic " +
            "HTML and Javascript elements communicating with each other and most of what "+
            "was being displayed was hard-coded.  Now, we're implementing more formal " +
            "logic and generalizing the code a lot more. " +
            "<br> <br> " +
            "The easiest part of this assignment was writing the APIs.  For one, " +
            "the Java code was relatively short and simple.  Also, I am comfortable with " +
            "and feel confident using Java.  Therefore, it was not a particularly difficult "+
            "task." +
            "<br> <br>" +
            "<a href=\"webAPIs/logonAPI.jsp?email=madilyn.simons@temple.edu&password=aX5gAQFK\"> " +
            "     Logon" +
            "</a> " +
            "<br> <br> " +
            "<a href=\"webAPIs/logoffAPI.jsp\"> " +
            "     Logoff" +
            "</a> " +
            "<br> <br> " +
            "<a href=\"webAPIs/getProfileAPI.jsp\"> " +
            "     Get Profile" +
            "</a> " +
            "<br> <br> " +
            "<a href=\"webAPIs/listUsersAPI.jsp\"> " +
            "     Get All Users" +
            "</a> ";
    
    blog6.appendChild(blog6body);
    
    
}
