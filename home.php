<?php
	get_header();
	$categories = HWP_Options::get_option('home_filter_categories');
	$orderby = get_query_var('orderby_filter', 'date-desc');
	$date = get_query_var('date_filter', 'all');
	$cat = get_query_var('cat_filter', 'all_cat');
?>
<main role="main" class="main">
	<div class="container">
		<div class="row">

			<div class="content_area col-xs-12 col-sm-9">

				<?php get_template_part('template-parts/content', 'slider'); ?>

				<div class="box">
					<header class="title">
						<i class="fa fa-coffee"></i>
						<h4>
							<?php _e('Newest Free Articles', HWP::$text_domain); ?>
							<input type="checkbox" class="ios_btn" id="popular_posts" value="" <?php echo ($date == 'month' && $orderby == 'views') ? 'checked=checked' : ''; ?>>
							<label for="popular_posts"><?php _e('Populars', HWP::$text_domain); ?></label>
						</h4>
					</header>
					<?php get_template_part('template-parts/content', 'filter'); ?>
					<section class="posts home">
						<?php
							if (have_posts()) :
								while (have_posts()) : the_post();
									get_template_part('template-parts/content', 'home');
								endwhile;
								$pagination = get_the_posts_pagination(array(
									'prev_text' => '&larr;',
									'next_text' => '&rarr;',
									'screen_reader_text' => false,
									'before_page_number' => '',
								));
								echo $pagination;
							else :
								get_template_part('template-parts/content', 'none');
							endif;
						?>
					</section>
				</div><!-- box -->

				<?php
					if (class_exists('Woocommerce')) {
						get_template_part( 'template-parts/content', 'top-course' );
					}
				?>

			</div><!-- col-xs-12 col-sm-9 -->

			<?php get_sidebar(); ?>

		</div><!-- row -->
	</div><!-- container -->
</main>
<?php get_footer(); ?>
