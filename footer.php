<div class="courses_notice">
    <div class="container">
        <div class="courses_notice_bg">
            <div class="row">
                <?php
                    $args = array(
                        'posts_per_page'	=> -1,
                        'post_type'	=> 'product',
                    );
                    $my_query = new WP_Query($args);
                    $totla_courses =  $my_query->post_count;

                    $totla_studens = 0;
                    while ($my_query->have_posts()) {
                        $my_query->the_post();
                        $do_not_duplicate = $post->ID;
                        $totla_studens += get_post_meta( get_the_ID(), 'total_sales', true );
                    }
                    wp_reset_postdata();?>
                    <div class="col-xs-6 visible-md visible-lg">
                        <?php
                            printf(
                                __('There are %s student in %s HamyarWp\'s Courses!', HWP::$text_domain),
                                $totla_studens,
                                $totla_courses
                            );
                        ?>
                    </div>
                    <div class="col-xs-12 col-md-6">
                    <a href="http://hamyarwp.com/tutorials/" target="_blank" class="hwp_btn green"> <i class="fa fa-university"></i> <?php _e('Get Strated with a Course', HWP::$text_domain) ?></a>
                    </div>
                </div><!-- col-xs-12 -->
            </div><!-- row -->
        </div><!-- courses_notice_bg -->
    </div><!-- container -->
</div><!-- courses_notice -->

<footer class="footer">
     <div class="container">
         <div class="row">
             <div class="col-xs-12">

                <div class="story">
                    <div class="avatar box"><a href="http://hajimohamadi.com/" target="_blank"><img src="<?php bloginfo('template_url'); ?>/assets/public/images/ali.jpg" alt=""></a></div>
                    <h6><?php _e('The Story of a Dream', HWP::$text_domain); ?></h6>
                    <div class="text">
                        <p><?php _e('Story test', HWP::$text_domain); ?></p>
                        <a href="http://hajimohamadi.com/" target="_blank"><strong><?php _e('Ali Hajimohamadi', HWP::$text_domain); ?></strong></a>
                        <strong><?php _e('Founder Of HamyarWp', HWP::$text_domain); ?></strong>
                    </div>
                </div><!-- story -->

                <div class="interaction">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <form class="newsletter"
                                data-email="<?php _e('Please insert a valid email', HWP::$text_domain) ?>"
                                data-name="<?php _e('Please insert your name', HWP::$text_domain) ?>"
                                data-mobile="<?php _e('Please insert a valid mobile number', HWP::$text_domain) ?>"
                                data-success="<?php _e('Thanks! Your email address has benn added to our newsletter', HWP::$text_domain) ?>"
                                data-failed="<?php _e('Something goes wrong, please try again', HWP::$text_domain) ?>"
                            >
                                <input type="text" class="name" class="error" placeholder="<?php _e('Your Name', HWP::$text_domain); ?>">
                                <input type="text" class="mobile" placeholder="<?php _e('Your Mobile', HWP::$text_domain); ?>">
                                <input type="email" class="email" placeholder="<?php _e('Your Email', HWP::$text_domain); ?>">
                                <button type="submit" name="button"><?php _e('Subscribe!' ,HWP::$text_domain) ?></button>
                                <div class="hwp_loader">
                                    <div class="hwp_wheel"></div>
                                </div>
                            </form>
                            <div class="newsletter_result"></div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="android">
                                <a href="https://cafebazaar.ir/app/hamyarwpapp.hamyarwp.com.hamayarwordpress/?l=fa" target="_blank">
                                    <i class="fa fa-android"></i>
                                    <strong><?php _e('Download HamyarWp App', HWP::$text_domain) ?></strong>
                                    <span><?php _e('Download From Bazaar', HWP::$text_domain) ?></span>
                                </a>
                            </div><!-- android -->
                        </div>
                    </div>
                </div><!-- interaction -->

                <div class="end">
                    <?php
                        if (has_nav_menu('footer')) {
                            wp_nav_menu(array(
                                'theme_location' => 'footer',
                                 'menu_class' => 'col-xs-12 col-sm-6',
                                'container' => false,
                                'walker'         => new HWP_Menu_Walker()
                            ));
                        }
                    ?>


                </div><!-- end -->

                <div class="contactus">
	                <div class="row">
		                <div class="col-xs-12 col-sm-6">
			                <address class="address"><?php _e('Address:', HWP::$text_domain) ?> <?php echo persian_number(HWP_Options::get_option('address')) ?></address>
			                <address class="phone"><?php _e('Phone:', HWP::$text_domain) ?> <a href="tel://<?php echo HWP_Options::get_option('phone') ?>"><?php echo persian_number(HWP_Options::get_option('phone')) ?></a></address>
		                </div>
		                <ul class="socials col-xs-12 col-sm-6">
			                <li class="facebook"><a href="http://fb.com/hamyarwp" target="_blank"><i class="fa fa-facebook"></i></a></li>
			                <li class="twitter"><a href="http://twitter.com/hamyarwp" target="_blank"><i class="fa fa-twitter"></i></a></li>
			                <li class="google"><a href="https://plus.google.com/b/101071710506674158818/+Hamyarwpteam/" target="_blank"><i class="fa fa-google-plus"></i></a></li>
			                <li class="instagram"><a href="http://instagram.com/hamyarwp" target="_blank"><i class="fa fa-instagram"></i></a></li>
			                <li class="telegram"><a href="https://telegram.me/hamyarwp" target="_blank"><i class="fa fa-paper-plane"></i></a></li>
			                <li class="rss"><a href="<?php bloginfo('rss2_url'); ?>" target="_blank"><i class="fa fa-rss"></i></a></li>
		                </ul>
	                </div>
                </div>

             </div><!-- col-xs-12 -->
         </div><!-- row -->
     </div><!-- container -->
</footer>

<?php if( !is_user_logged_in() ): ?>
    <div class="modal fade" id="login_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><i class="fa fa-times" aria-hidden="true"></i></span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel"><?php _e('Login to Site', HWP::$text_domain) ?></h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-6">
                            <?php echo do_shortcode( '[wppb-login]' ) ?>
                            <p>
                                <a href="<?php echo esc_url( HWP_Options::get_option('forgot_page') ); ?>"><?php _e('Forgot Password', HWP::$text_domain) ?></a>
                            </p>
                        </div>
                        <div class="col-xs-6 other_login">
                            <img src="<?php bloginfo('template_url'); ?>/assets/public/images/login.svg" alt="" />
                            <p align="center"><?php _e('Not registred yet?', HWP::$text_domain) ?></p>
                            <p align="center"><a href="<?php echo esc_url( HWP_Options::get_option('register_page') ); ?>"><?php _e('Register Now', HWP::$text_domain) ?></a></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
<?php endif; ?>
<?php global $post; if( !is_user_logged_in() ): ?>
    <div class="modal fade"  id="hamyar-dl-modal" tabindex="-1" role="dialog" aria-labelledby="hamyar-dl" aria-hidden="true">
        <div style="z-index: 99999;" class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                         <span aria-hidden="true"><i class="fa fa-times" aria-hidden="true"></i></span>
                     </button>
                    <h4 class="modal-title" id="hamyar-dl"> <?php _e('get download link', HWP::$text_domain); ?> </h4>
                </div>
                <div class="modal-body">

                    <div class="row">
                        <div class="col-xs-6">
                            <form id="hamyar_dl_frm" action="" method="POST" role="form">
                                <?php
                                    $top_popup=get_option('hdl_top_popup');
                                    if(!empty($top_popup)):
                                ?>
                                <div><?php echo $top_popup; ?></div>
                                <?php endif; ?>
                                <div class="form-group">
                                    <label for="hdl_name"><?php _e('Name (Optional)', HWP::$text_domain); ?></label>
                                    <input type="text" class="form-control" id="hdl_name" name="text" placeholder="<?php _e('Enter your name', HWP::$text_domain); ?>">
                                </div>
                                <div class="form-group">
                                    <label for="hdl_email"><?php _e('Email Address', HWP::$text_domain); ?></label>
                                    <input type="email" class="form-control" id="hdl_email" name="email" placeholder="<?php _e('Enter your email address', HWP::$text_domain); ?>">
                                </div>
                                <div class="form-group">
                                    <label for="hdl_phone"><?php _e('Mobile Number (Optional)', HWP::$text_domain); ?></label>
                                    <input type="number" class="form-control" id="hdl_phone" name="phone" placeholder="<?php _e('Enter your mobile number', HWP::$text_domain); ?>">
                                </div>

                                <p align="center"><button id="hamyar_dl_btn" type="submit" class="hwp_btn green"><?php _e('Email download link now', HWP::$text_domain); ?></button></p>
	                            <div class="spinner">
		                            <div class="rect1"></div>
		                            <div class="rect2"></div>
		                            <div class="rect3"></div>
	                            </div><!-- spinner -->
                            </form>
                            <div id="hdl-message" role="alert"></div>
                        </div>
                        <div class="col-xs-6 other_login">
                            <img src="<?php bloginfo('template_url'); ?>/assets/public/images/dl_popup.svg" alt="" />
                            <p align="center"><?php printf(__('Why did not <a href="%s" target="_blank"> register </a> to hide this window and direct download?', HWP::$text_domain), 'http://hamyarwp.com/my-account') ?></p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
<?php endif; ?>

<div class="scroll_to_top box"><i class="fa fa-angle-up" aria-hidden="true"></i></div>
<?php wp_footer(); ?>
</body>

</html>
