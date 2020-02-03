function blog(id){
    var content = `
    
            <div>
            <div class="row">
                <div class='column column66'>
                    <h3>HW3: Data Display Homework</h3>
                    <p>
                        For this homework assignment, I was able to familiarize
                        myself with HTML tables.  This was a good assignment
                        because I think it has been my most in-depth look
                        at Javascript yet.  The example code shows us how to 
                        create sortable HTML tables and filterable HTML tables, 
                        but it does not show how to  combine the two.  By 
                        combining the two, I was able to get to know HTML 
                        tables a lot better as well as Javascript.
                    </p>
                    <p>
                        I think the most challenging part of this assignment
                        was writing users.js and parks.js.  The components
                        that I wrote before (blog.js and home.js) only really
                        had a variable that held some HTML, while user.js
                        and parks.js combine HTML and Javascript together.
                    </p>
                    <p>
                        Writing the JSON files was the easiest part of the 
                        assignment.  I do, however, look forward to writing 
                        the server side Web API that will generate JSON files 
                        from my database.  I've never worked with databases 
                        before so I look forward to writing web apps that can 
                        interact with a database.
                    </p>
                </div>
            </div>
        </div>
    
        <div>
            <div class="row">
                <div class='column column66'>
                    <h3>HW2: My Database Experience</h3>
                    <p>
                        I think the database portion was more difficult than
                        the routing portion of the homework.  Creating my
                        database required a lot of attention to detail, as I had
                        to make sure each entry and all of the data was correct.
                    </p>
                    <p>
                        My only experience with MySQL before was with online
                        tutorials that I had done in the past, but I had always
                        found them confusing, unintuitive, and hard to remember.
                        In this assignment, I actually enjoyed writing scripts
                        for MySQL a lot.  This introduction to writing scripts
                        was really easy and straightforward and progressed in a
                        way that made sense to me.  I think these concepts are
                        going to stick with me, as opposed to before when I 
                        would just immedietly forget what each keyword meant.
                    </p>
                    <p>
                        <a href="MSimonsHW2.pdf">
                            Here is a link to the associated document.
                        </a>
                    </p>
                </div>
            </div>
        </div>


        <div style="padding-bottom:800px">
            <div class="row">
                <div class='column column66'>
                    <h3>HW2: My Routing Experience</h3>
                    <p>
                        I found this portion to be relatively easy.  Although
                        I dont have a lot of experience with html and javascript,
                        I do have a lot of experience with data structures, 
                        Java, and OOP.  When reading the example code, it made
                        a lot of sense.  The example code was very helpful.
                    </p>
                    <p>
                        The only part that was somewhat difficult was debugging
                        the Javascript.  Initially, router() in routeFw.js
                        wasn't being called when I expected it too and 
                        printRoutes() wasn't defined.  I thought this was a
                        problem with the event listener, but really I just had
                        the brackets in the wrong place.  I think if Javascript
                        was a compiled language, it may have been able to catch
                        that, but it didn't.
                    </p>
                    <p>
                        I learned how routing works and I became more familiar
                        and comfortable with Javascript and HTML.
                    </p>
                </div>
            </div>
        </div>
    `;
    document.getElementById(id).innerHTML = content;
}