<?php
class HWP_Admin {

    public function __construct() {

        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts') );

	}


    public function enqueue_scripts() {

        // // Css Files
        wp_enqueue_style( 'hamyarwp', get_template_directory_uri().'/assets/admin/css/hwp.min.css', array(), HWP_Main::$version );
	    wp_enqueue_style( 'wp-color-picker' );

        // // Javascript Files
        wp_enqueue_script( 'hamyarwp', get_template_directory_uri() . '/assets/admin/js/hwp.min.js', array( 'jquery' ), HWP_Main::$version, true );
        wp_localize_script('hamyarwp', 'hwp_ajax', array(
                'url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('ajax-nonce'),
            )
        );
	    wp_enqueue_script( 'wp-color-picker');

    }


}
