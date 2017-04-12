<?php get_header(); ?>
<main role="main" class="main">
    <div class="container">
        <div class="row">

            <div class="content_area col-xs-12">
                <?php
                if (have_posts()) :
                while (have_posts()) : the_post();
                ?>
                <div class="box">
                    <header class="title">
                        <i class="fa fa-coffee"></i>
                        <h4><?php the_title(); ?></h4>
                    </header>
                    <article class="page_content">
                        <div class="entry-content">
                            <?php
                            the_content();
                            endwhile;
                            $pagination = get_the_posts_pagination(array(
                                'prev_text' => '&larr;',
                                'next_text' => '&rarr;',
                                'screen_reader_text' => false,
                                'before_page_number' => '',
                            ));
                            echo $pagination;
                            endif;
                            ?>
                        </div>
                    </article>
                </div><!-- box -->

                <?php
                if ( comments_open() || get_comments_number() ) {
                    comments_template();
                }
                ?>

            </div><!-- col-xs-12  -->
        </div><!-- row -->
    </div><!-- container -->
</main>
<?php get_footer(); ?>
