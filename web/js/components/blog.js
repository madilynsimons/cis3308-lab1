function blog(id){
    var content = `
        <div id ="blog_post1">
            <div class=row">
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


        <div id ="blog_post2">
            <div class=row">
                <div class='column column66'>
                    <h3>My Routing Experience</h3>
                    <p>
                        This is where Post 2 goes. 
                    </p>
                </div>
            </div>
        </div>
    `;
    document.getElementById(id).innerHTML = content;
}