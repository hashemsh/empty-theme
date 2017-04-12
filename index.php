<?php get_header(); ?>
        <main role="main" class="main">
            <div class="container">
                <div class="row">

                    <div class="col-xs-12 col-sm-9">

                        <div class="box">
                            <header>
                                <i class="fa fa-coffee"></i>
                                <h4><?php _e('Newest Free Articles', HWP::$text_domain); ?></h4>
                            </header>
                            <section class="posts">
                                <?php
                                if (have_posts()) :
                                    while (have_posts()) : the_post();
                                        get_template_part('template-parts/content');
                                    endwhile;
                                    the_posts_pagination(array(
                                        'prev_text' => __('Previous page', 'twentysixteen'),
                                        'next_text' => __('Next page', 'twentysixteen'),
                                        'before_page_number' => '<span class="meta-nav screen-reader-text">'.__('Page', 'twentysixteen').' </span>',
                                    ));
                                else :
                                    get_template_part('template-parts/content', 'none');
                                endif;
                                ?>
                            </section>
                        </div><!-- box -->

                    </div><!-- col-xs-12 col-sm-9 -->

                </div><!-- row -->
            </div><!-- container -->
        </main>
<?php get_footer(); ?>
