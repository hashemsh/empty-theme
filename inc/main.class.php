<?php
/**
 * hamyarWp Main Class
 */
class HWP
{
    public static $version;
    public static $text_domain;

    public function __construct()
    {
        self::$version = '4.4.4';
        self::$text_domain = 'hwp';

        $this->load_dependencies();
        $this->run();
    }

    private function run()
    {
	    new HWP_Options();
        new HWP_Setup();
        new HWP_Public();
        new HWP_Admin();
        new HWP_Features();
        new HWP_Woocommerce();
    }

    private function load_dependencies()
    {
        require_once get_template_directory().'/inc/setup.class.php';
        require_once get_template_directory().'/inc/functions.php';
        require_once get_template_directory().'/inc/public.class.php';
        require_once get_template_directory().'/inc/admin.class.php';
	    require_once get_template_directory().'/inc/options/options.class.php';
        require_once get_template_directory().'/inc/features/features.class.php';
        require_once get_template_directory().'/inc/woocommerce/woocommerce.class.php';
    }

}
