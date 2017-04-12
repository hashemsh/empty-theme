<?php
class HWP_Options {

    private $wp_pages;

    public function __construct() {

        $this->wp_pages = get_pages();

        add_action( 'admin_menu', array($this, 'admin_menu') );
        add_action( 'admin_init', array($this, 'settings'));
	}

    public function admin_menu()
    {
        add_menu_page(
            __('HamyarWp Options', HWP::$text_domain),
            __('HamyarWp Options', HWP::$text_domain),
            'manage_options',
            'hamyarwp_options',
            array($this, 'main_menu'),
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAA2FBMVEUAAAAAAAD/AAD/AADMAADjHByiFxfVFRXqFRXYFBTrFBTfECCqHBzjHBzpFiHdGiLmGSHgFx/pHSThHiTgGh+sIh3kGySuHx/lHiKsIB2uICDjHCOrHx/LHx/jHCLlHiHiHSTkHiSvIR6uICDiHSPiHSLjHCThHiPlHSTkHSPjHCLjHiPiHSTjHSPjHSSuIh/FICLjHiTjHSPkHiTjHSTkHSTjHSTjHSTiHSPjHSOtIh/jHiPkHiPjHSTjHSTjHiPjHSPjHiTjHSStIR/QHyLjHSOuIiDjHiRWxVQTAAAARnRSTlMAAQEDBQkLDAwNDRASEhceHyEjKzE0ODlER0hISUpKTU5VXF9gYmRma31/iY+TnJ6nrLCyubrBydTh5Ofo6uzv9fj7/f7+tSNQKQAAAJZJREFUeAFlyNW2gkAABdBzw+5usbtbMRBxzv//kazlwwzDftzQtMeQfhtBAP8HLuQVj86l84MQ1RzeHCEqCMtMAYithKiruV1ngK4QVU/y4eZrGfemBZQKgJ5fEV8aeV+md6whqWWPbPZNf15JmoaaA7qe0yhkBiYW+d5kAZn2meSpDKjpuo/+oKU9TwBa7nPQzVpafAC1cyIIZdCl8gAAAABJRU5ErkJggg==',
            81
        );
        //add_submenu_page('hamyarwp_options', __('Hamyarwp settings', HWP::$text_domain), __('General Settings', HWP::$text_domain), 'manage_options', 'hamyarwp_options');
    }

    public function main_menu() {
        include get_template_directory().'/inc/options/settings.php';
    }

    public function settings() {
        register_setting(
            'hwp_options_group',
            'hwp_options',
            array($this, 'sanitize_options')
        );

        // Settings Sections
        add_settings_section(
            'pages_section',
            __('Pages', HWP::$text_domain),
            NULL,
            'hwp_general_page'
        );
        add_settings_section(
            'contact_section',
            __('Contacts information', HWP::$text_domain),
            NULL,
            'hwp_general_page'
        );
        add_settings_section(
            'codes_section',
            __('Additional Codes', HWP::$text_domain),
            NULL,
            'hwp_general_page'
        );
        add_settings_section(
            'mailerlite_section',
            __('Mailerlite Settings', HWP::$text_domain),
            NULL,
            'hwp_mailerlite_page'
        );
        add_settings_section(
            'woocommerce_section',
            __('Woocommerce Settings', HWP::$text_domain),
            NULL,
            'hwp_woocommerce_page'
        );

        // Settings fields
        add_settings_field(
            'register',
            __('Register', HWP::$text_domain),
            array($this, 'register_page_callback'),
            'hwp_general_page',
            'pages_section'
        );
    }

    public function sanitize_options($new_options) {
        $old_options = self::get_option();
        foreach ($new_options as $key => $value) {
	        if( $key == 'woocommerce' ) {
		        $new_tabs = array();
		        foreach ($value['acc_tabs'] as $acc_tab) {
			        $new_tabs[] = $acc_tab;
		        }
		        $value['acc_tabs'] = $new_tabs;
	        }
	        if( $key == 'slides' ) {
		        $new_slides = array();
		        foreach ($value as $slide) {
			        $new_slides[] = $slide;
		        }
		        $value = $new_slides;
	        }
            $old_options[$key] = $value;
        }
        return $old_options;
    }

    public function profile_page_callback() {
        ?>
        <select name="hwp_options[pages][profile]">
            <?php foreach ($this->wp_pages as $key => $page): ?>
                <option value="<?php echo $page->ID ?>" <?php selected( self::get_option('profile_page'), $page->ID ) ?>><?php echo $page->post_title ?></option>
            <?php endforeach; ?>
        </select>
        <?php
    }

    public function register_page_callback() {
        printf(
            '<input class="regular-text" type="text" name="hwp_options[pages][register]" id="hwp_api_key" value="%s">',
            self::get_option('register_page')
        );
    }

    public static function get_option($option_name='all') {

        $options = get_option( 'hwp_options' );
        $register_page = ( isset($options['pages']['register']) && !empty($options['pages']['register']) ) ? $options['pages']['register'] : 0 ;

        switch ($option_name) {

            case 'register_page':
                return $register_page;
                break;

            case 'login_page':
                return $login_page;
                break;


            default:
                return $options;
                break;
        }

    }

}
