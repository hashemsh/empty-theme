<?php
add_action('after_setup_theme', 'mwp_fake_gateway_init', 0);
function mwp_fake_gateway_init() {
	if ( !class_exists( 'WC_Payment_Gateway' ) ) return;
	class WC_MWP_FAKE extends WC_Payment_Gateway {
			public function __construct(){
				$this->author = 'Mojtab Darvishi';
				$this->id = 'mwp_fake';
				$this->method_title = 'Fake Gateway';
				$this->method_description = 'Fake Gateway Settings';
				$this->icon = apply_filters('WC_MWP_FAKE_logo', get_template_directory_uri() . '/assets/images/wallet.png');
				$this->has_fields = false;

				$this->init_form_fields();
				$this->init_settings();

				$this->title = $this->settings['title'];
				$this->description = $this->settings['description'];

				/*$this->success_massage = $this->settings['success_massage'];
				$this->deficit_massage = $this->settings['deficit_massage'];
				$this->illegal_type_massage = $this->settings['illegal_type_massage'];
				$this->cancelled_massage = $this->settings['cancelled_massage'];*/

				add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );

			}
			public function init_form_fields(){
				$this->form_fields = apply_filters('WC_MWP_FAKE_Config',
					array(
						'base_confing' => array(
							'title'       => __( 'Settings', 'hwp' ),
							'type'        => 'title',
							'description' => '',
						),
						'enabled' => array(
							'title'   => __( 'Active/Deactive', 'hwp' ),
							'type'    => 'checkbox',
							'label'   => 'Activate Fake Gateway',
							'default' => 'yes',
							'desc_tip'    => true,
						),
						'title' => array(
							'title'       => __( 'Title', 'hwp' ),
							'type'        => 'text',
							'default'     => 'Fake Gateway',
							'desc_tip'    => true,
						),
						'description' => array(
							'title'       => __( 'Description', 'hwp' ),
							'type'        => 'text',
							'desc_tip'    => true,
							'default'     => __( 'Description', 'hwp' )
						),
						// 'payment_confing' => array(
						// 	'title'       => __( 'تنظیمات عملیات پرداخت', 'woocommerce' ),
						// 	'type'        => 'title',
						// 	'description' => '',
						// ),
						// 'deficit_massage' => array(
						// 	'title'       => __( 'پیام کسری موجودی', 'woocommerce' ),
						// 	'type'        => 'textarea',
						// 	'default'     => __( 'موجودی درگاه جعلی شما کمتر از جمع فاکتور است.', 'woocommerce' ),
						// ),
						// 'illegal_type_massage' => array(
						// 	'title'       => __( 'پیام محصول غیر مجاز', 'woocommerce' ),
						// 	'type'        => 'textarea',
						// 	'default'     => __( 'در سبد خرید شما محصولی که قابل پرداخت با کیف نیست، وجود دارد.', 'woocommerce' ),
						// ),
                        // 'success_massage' => array(
						// 	'title'       => __( 'پیام خرید با موفقیت', 'woocommerce' ),
						// 	'type'        => 'textarea',
						// 	'default'     => __( 'پرداخت شما با موفقیت انجام شد.', 'woocommerce' ),
						// ),
						// 'cancelled_massage' => array(
						// 	'title'       => __( 'پیام کنسل کردن پرداخت', 'woocommerce' ),
						// 	'type'        => 'textarea',
						// 	'default'     => __( 'عملیات پرداخت توسط شما لغو شد.', 'woocommerce' ),
						// ),
					)
				);
			}

			public function process_payment( $order_id ) {
				$order = wc_get_order( $order_id );

					// Reduce stock levels
					$order->reduce_order_stock();

					// Remove cart
					WC()->cart->empty_cart();
					// Make payment comlete
					$order->payment_complete();

					// Return thankyou redirect
					return array(
						'result' 	=> 'success',
						'redirect'	=> $this->get_return_url( $order )
					);
			}

	}

	function woocommerce_add_gateway_mwp_fake($methods) {
		$methods[] = 'WC_MWP_FAKE';
		return $methods;
	}
	add_filter('woocommerce_payment_gateways', 'woocommerce_add_gateway_mwp_fake' );
}
