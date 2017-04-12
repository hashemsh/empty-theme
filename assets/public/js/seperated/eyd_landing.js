jQuery(document).ready(function($) {

    $(document).on('click', '.arrow', function(event) {
        $('html, body').animate({
            scrollTop: $(".wwc").offset().top}, 500);
        $(this).addClass('active');
        event.preventDefault();
    });


    $(document).on('click', 'main .contact .newsletter form .ins_email button', function(event) {
        $(this).addClass('success');
        event.preventDefault();
    });



    var smart_webmaster = jQuery('header.header p').waypoint(function(direction) {
    	    	jQuery('.wwc img.object').addClass('active');
    	    	// jQuery(this.element).removeClass('active');
    		});
    var waypoints = jQuery('main .wwc .swm_intro a').waypoint(function(direction) {
                jQuery('.product img.object').addClass('active');
                // jQuery(this.element).removeClass('active');
            });



    //Check to see if the window is top if not then display button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 700) {
            $('.scroll_to_top').addClass('active');
        } else {
            $('.scroll_to_top').removeClass('active');
        }
    });


    //Click event to scroll to top
    $('.scroll_to_top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });




















});
