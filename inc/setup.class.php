<?php
class HWP_Setup {

    public function __construct() {

        add_action('after_setup_theme', array($this, 'setup'), 1 );
        add_action('widgets_init', array($this, 'widgets') );

        if ( !(is_admin()) ) {
            add_filter( 'clean_url', array($this, 'defer_js'), 11, 1 );
        }

        if (! wp_next_scheduled ( 'hwp_delete_expired_gifts' )) {
           wp_schedule_event(strtotime('today'), 'hourly', 'hwp_delete_expired_gifts');
        }

    }

    public function defer_js($url)
    {
        if ( FALSE === strpos( $url, '.js' ) ) return $url;
        if (
            strpos( $url, 'jquery.js' )

        ) {
            return $url;
        }
        // return "$url' defer ";
        return "$url' defer onload='";
    }

    public function setup() {

        // Set local translation
        load_theme_textdomain( HWP::$text_domain, get_template_directory() . '/languages' );

        // Woocommerce Setup
        add_theme_support('woocommerce');

        // Title Tag Support
        add_theme_support( 'title-tag' );

        // Posts Thumbnail Support
        add_theme_support('post-thumbnails');

        // Set Post Thumbnail Sizes
        add_image_size('home', 300, 300, true);

        // Register Nav menus
        register_nav_menus(
            array(
                'top' => __( 'Main Menu', HWP::$text_domain ),
                'footer' => __( 'Footer Menu', HWP::$text_domain ),
                'mobile' => __( 'Mobile Menu', HWP::$text_domain ),
                'usermenu' => __( 'User Menu', HWP::$text_domain ),
            )
        );

        // HTML5 Support
        add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
    }

    public function widgets() {

        register_sidebar(array(
            'name' => __('Home Sidebar', HWP::$text_domain),
            'id'   => 'home',
            'before_widget' => '<div class="widget_menu box">',
            'after_widget'  => '</section></div><!-- side_menu -->',
            'before_title'  => '<header><h3>',
            'after_title'   => '</h3></header><section>'
        ));


    }

}
