function blog(id){
    var content = `
        <div id ="blog_post1">
            <div class="row">
                <div class='column column66'>
                    <h3>My Database Experience</h3>
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


        <div id ="blog_post2" style="padding-bottom:600px">
            <div class="row">
                <div class='column column66'>
                    <h3>My Routing Experience</h3>
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