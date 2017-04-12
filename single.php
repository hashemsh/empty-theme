<?php get_header(); ?>
        <main role="main" class="main">
            <div class="container">
                <div class="row">
                    <div class="content_area col-xs-12 col-sm-9">
                        <?php
                            if (have_posts()) :
                                while (have_posts()) : the_post();
                                    get_template_part('template-parts/content', 'share');
                                    get_template_part('template-parts/content', 'single');
                                    if ( comments_open() || get_comments_number() ) {
                        				comments_template();
                        			}
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

                            get_template_part( 'template-parts/content', 'related' );

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
