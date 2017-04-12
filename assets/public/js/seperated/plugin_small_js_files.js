jQuery(document).ready(function($) {

    /*
    Plugin name: interlinks-manager
    JS Url: http://hamyarwp.com/wp-content/plugins/interlinks-manager/public/assets/js/track-internal-links.js?ver=1.00
     */
    $('a[data-ail]').mousedown(function(event) {

        var link_type = 'ail';

        //save the click with an ajax request
        track_link(link_type, $(this));

    });

    $('a[data-mil]').mousedown(function(event) {

        var link_type = 'mil';

        //save the click with an ajax request
        track_link(link_type, $(this));

    });

    //track the link with an ajax request
    function track_link(link_type, caller_element){

        //set source
        var source_post_id = caller_element.attr('data-' + link_type);

        //set target
        var target_url = caller_element.attr('href');

        //prepare ajax request
        var data = {
            "action": "track_internal_link",
            "security": dagp_nonce,
            "link_type": link_type,
            "source_post_id": source_post_id,
            "target_url": target_url
        };

        //send the ajax request
        $.post(dagp_ajax_url, data, function(data) {});

    }


    /*
     Plugin name: pb-add-on-placeholder-labels
     JS Url: http://hamyarwp.com/wp-content/plugins/pb-add-on-placeholder-labels/assets/js/init.js?ver=4.6.1
     */
    var wppb_login_form = [
        '.login-username',
        '.login-password'
    ];

    wppb_login_form.forEach( function ( field ) {
        jQuery( field + ' :input' ).each( function( index, elem ) {
            var element_id = jQuery( elem ).attr( 'id' );
            var label = null;

            if( jQuery( elem ).is( 'input' ) ) {
                if( element_id && ( label = jQuery( elem ).parents( '#wppb-login-wrap' ).find( 'label[for=' + element_id + ']' ) ).length === 1 ) {
                    jQuery( elem ).attr( 'placeholder', jQuery( label ).text() );
                }
            }
        });
    });


});


/*
 Plugin name: woocommerce
 JS Url: http://hamyarwp.com/wp-content/plugins/woocommerce/assets/js/frontend/woocommerce.min.js?ver=2.6.8
 */
jQuery(function(a){a(".woocommerce-ordering").on("change","select.orderby",function(){a(this).closest("form").submit()}),a("input.qty:not(.product-quantity input.qty)").each(function(){var b=parseFloat(a(this).attr("min"));b>=0&&parseFloat(a(this).val())<b&&a(this).val(b)})});

/*
 Plugin name: woocommerce
 JS Url: http://hamyarwp.com/wp-content/plugins/woocommerce/assets/js/prettyPhoto/jquery.prettyPhoto.init.min.js?ver=2.6.8
 */
!function(a){a(function(){a("a.zoom").prettyPhoto({hook:"data-rel",social_tools:!1,theme:"pp_woocommerce",horizontal_padding:20,opacity:.8,deeplinking:!1}),a("a[data-rel^='prettyPhoto']").prettyPhoto({hook:"data-rel",social_tools:!1,theme:"pp_woocommerce",horizontal_padding:20,opacity:.8,deeplinking:!1})})}(jQuery);
