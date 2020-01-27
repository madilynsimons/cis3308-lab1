function home(id) {

    var content = `
        <div id ="content">
            <div class=row">
                <div class='column column66'>
                    <p>
                        Quads PA provides resources, reviews, and info for quad skaters
                        on skate parks in the greater Philadelphia area.  Typically, 
                        skate parks cater to skateboarders.  However, any seasoned 
                        skate park vet knows that boards aren't the only way to shred. 
                    </p>
                    <p>
                        We offer perspectives on local skate parks from the perspective 
                        of quad skaters.  Our aim to create a skate park resource that 
                        caters to Philly quad skaters.  Quad skaters can look up 
                        different parks to help decide which park is best for them, as 
                        well as review parks to help inform other skaters.
                    </p>
                    <p>
                        New to skating quads at parks?  Check out Planet Roller Skate's
                        guide for beginners 
                        <a href="https://www.youtube.com/watch?v=0FQMrYJpFZI">here</a>
                        !
                    </p>
                </div>
                
                <!-- Picture of skater -->
                <div class='column column33'>
                    <img src="pics/home_skater.jpg" Alt='Skater'>
                </div>
            </div>
        </div>
    `;
    document.getElementById(id).innerHTML = content;
}