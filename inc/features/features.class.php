<?php
/**
 * HamyarWp Features Class
 */
class HWP_Features
{

    public function __construct()
    {
        $this->load_dependencies();
        $this->run();
    }

    private function run()
    {
        new HWP_Menu_Icon();
    }

    private function load_dependencies()
    {
        require_once get_template_directory().'/inc/features/menu-icon/menu-icon.class.php';
    }

}
