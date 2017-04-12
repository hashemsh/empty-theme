<div class="wrap">
    <h1><?php _e('HamyarWp Options', HWP::$text_domain) ?></h1>
    <?php $active_tab = isset( $_GET[ 'tab' ] ) ? $_GET[ 'tab' ] : 'general'; ?>
    <h2 class="nav-tab-wrapper" style="margin-bottom: 10px">
        <a href="<?php echo admin_url('admin.php?page=hamyarwp_options&tab=general') ?>" class="nav-tab <?php echo $active_tab == 'general' ? 'nav-tab-active' : ''; ?>"><?php _e('General', HWP::$text_domain) ?></a>
        <a href="<?php echo admin_url('admin.php?page=hamyarwp_options&tab=woocommerce') ?>" class="nav-tab <?php echo $active_tab == 'woocommerce' ? 'nav-tab-active' : ''; ?>"><?php _e('Woocommerce', HWP::$text_domain) ?></a>
    </h2>
        <form method="post" action="options.php">
        <?php
            settings_errors();
            if( $active_tab == 'general' ) {
                settings_fields( 'hwp_options_group' );
                do_settings_sections( 'hwp_general_page' );
            } elseif( $active_tab == 'woocommerce' ) {
                settings_fields( 'hwp_options_group' );
                do_settings_sections( 'hwp_woocommerce_page' );
            }
            submit_button();
        ?>
    </form>
</div>
