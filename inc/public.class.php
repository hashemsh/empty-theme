<?php

class HWP_Public
{
    public function __construct()
    {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'dequeue_scripts'), 999);


        add_action('wp_ajax_hwp_mailerlite_add_subscriber', array($this, 'ajax_add_subscriber'));
        add_action('wp_ajax_nopriv_hwp_mailerlite_add_subscriber', array($this, 'ajax_add_subscriber'));

		add_action('wp_head', array($this, 'custom_css'));
		add_action('wp_footer', array($this, 'custom_script'));

    }

    public function enqueue_scripts()
    {
        // Css Files
        wp_enqueue_style('hamyarwp-theme', get_template_directory_uri().'/assets/public/css/theme.min.css', array(), HWP_Main::$version);

        // Javascript Files
        wp_enqueue_script('hamyarwp-libraries', get_template_directory_uri().'/assets/public/js/libraries.min.js', array('jquery'), HWP_Main::$version, true);
        wp_enqueue_script('hamyarwp-theme', get_template_directory_uri().'/assets/public/js/theme.min.js', array('jquery'), HWP_Main::$version, true);
        wp_localize_script('hamyarwp-theme', 'hwp_ajax', array(
            'url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('ajax-nonce'),
            )
        );
    }

    public function dequeue_scripts()
    {
        wp_dequeue_style( 'search-filter-plugin-styles' );

        wp_deregister_script( 'prettyPhoto-init' );

    }



    /*
    *  Add subscribers to newsletter
    */
    public function ajax_add_subscriber()
    {
        $nonce = (isset($_POST['nonce']) && !empty($_POST['nonce'])) ? $_POST['nonce'] : false;
        $email = (isset($_POST['email']) && !empty($_POST['email'])) ? strip_tags($_POST['email']) : false;
        $name = (isset($_POST['name']) && !empty($_POST['name'])) ? strip_tags($_POST['name']) : false;
        $mobile = (isset($_POST['mobile']) && !empty($_POST['mobile'])) ? strip_tags($_POST['mobile']) : false;
        if (!wp_verify_nonce($nonce, 'ajax-nonce')) {
            die('Nope!');
        }

        if ($email == false || $name == false || $mobile == false) {
            wp_send_json_error(__('Please insert your email address', 'hwp'));
        }

        $api_key = HWP_Options::get_option('api_key');
        $register_group = HWP_Options::get_option('footer_newsletter_group');
        $groups_api = (new \MailerLiteApi\MailerLite($api_key))->groups();
        if (isset($api_key) && !empty($api_key) && isset($register_group) && !empty($register_group)) {
            $subscriber = [
              'email' => $email,
              'fields' => [
                  'name' => $name,
                  'phone' => $mobile,
              ],
            ];
            $added_subscriber = $groups_api->addSubscriber($register_group, $subscriber);
            wp_send_json_success($added_subscriber);
        }
        wp_send_json_error(__('Something goes wrong', 'hwp'));
    }

	public function custom_css()
	{
		$custom_css = HWP_Options::get_option('css');
		if( !empty($custom_css) ) {
			echo '<style type="text/css">'.$custom_css.'</style>';
		}
    }

	public function custom_script()
	{
		$custom_js = HWP_Options::get_option('js');
		if( !empty($custom_js) ) {
			echo $custom_js;
		}
    }

}
