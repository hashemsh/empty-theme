<?php
/**
 * hamyarWp Main Class.
 */
class HWP_Woocommerce
{
    public function __construct()
    {
        $this->load_dependencies();
        $this->run();

    }

    private function run()
    {
        new HWP_WC_Customizer();

    }

    private function load_dependencies()
    {
        require_once get_template_directory().'/inc/woocommerce/wc_customize_theme.class.php';
    }


}
