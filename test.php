<?php
/* template name: test */
	echo '<pre>';

//	wp_clear_scheduled_hook('hwp_delete_expired_gifts');

global $wpdb;
$downloads_table = $wpdb->prefix . "hwp_downloads";
$download_id = 86269;
$url = 'https://dl.hamyarwp.com/2017/03/demo.hamyarwp.com-sirius-lite-widgets.zip';
$download = $wpdb->get_row("SELECT * FROM {$downloads_table} WHERE id = '$download_id' AND url = '$url'");

var_dump($download);