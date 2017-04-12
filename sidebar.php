<div class="sidebar_area col-xs-12 col-sm-3">
    <aside class="sidebar">

        <?php
            if ( is_home() ) {
                if (function_exists('dynamic_sidebar') && dynamic_sidebar('home_conditional')) : else : endif;
                if (function_exists('dynamic_sidebar') && dynamic_sidebar('home')) : else : endif;
                if (function_exists('dynamic_sidebar') && dynamic_sidebar('general_conditional')) : else : endif;
                if (function_exists('dynamic_sidebar') && dynamic_sidebar('general')) : else : endif;
            } else {
                if (function_exists('dynamic_sidebar') && dynamic_sidebar('single_conditional')) : else : endif;
                if (function_exists('dynamic_sidebar') && dynamic_sidebar('single')) : else : endif;
	            if (function_exists('dynamic_sidebar') && dynamic_sidebar('general_conditional')) : else : endif;
	            if (function_exists('dynamic_sidebar') && dynamic_sidebar('general')) : else : endif;
            }
        ?>

    </aside>
</div><!-- col-xs-12 col-sm-3 -->
