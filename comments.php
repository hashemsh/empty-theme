<?php
/**
 * The template for displaying comments
 *
 * The area of the page that contains both current comments
 * and the comment form.
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}
?>

<div id="comments" class="comments-area box">

        <?php
            // If comments are closed and there are comments, let's leave a little note, shall we?
            if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
        ?>
            <p class="no-comments"><?php _e( 'Comments are closed.', HWP::$text_domain ); ?></p>
        <?php endif; ?>

        <?php
            comment_form( array(
                'title_reply_before'    => '<header class="subtitle"><h4 id="reply-title" class="comment-reply-title">',
                'title_reply_after'     => '</h4></header>',
                'logged_in_as'          => '<p class="logged-in-as">' .
                                              sprintf(
                                              __( 'You are logged in as  <a href="%1$s">%2$s</a>. <a href="%3$s">Logout?</a>', HWP::$text_domain ),
                                                admin_url( 'profile.php' ),
                                                $user_identity,
                                                wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) )
                                              ) . '</p>',
                'comment_field'         =>  '<p class="comment-form-comment"><textarea id="comment" class="form-control" name="comment" placeholder="'.__( 'Comment text', HWP::$text_domain ).'" cols="45" rows="8" aria-required="true">'.'</textarea></p>',
                'comment_notes_before'  => '',
                'fields' => apply_filters( 'comment_form_default_fields', array(
                        'author'    => '<p class="comment-form-author">'.'<input id="author" placeholder="نام" name="author" type="text" value="'.esc_attr( $commenter['comment_author'] ).'" size="30"/></p>',
                        'email'     => '<p class="comment-form-email">'.'<input id="email" name="email" placeholder="ایمیل" type="email" value="'.esc_attr(  $commenter['comment_author_email'] ).'" size="30"/></p>',
                        'url'       => ''
                  )
                ),
            ) );
        ?>
    <header class="subtitle">
        <h4 id="reply-title" class="comment-reply-title">
            <?php _e('Post\'s Comments', HWP::$text_domain); ?>
            <?php $type = get_query_var( 'comment_type', 'newest' ); ?>
            <a href="<?php echo add_query_arg('comment_type', 'newest', get_the_permalink()).'#comments' ?>" class="comment_type_selector <?php echo ($type == 'newest') ? 'active' : ''; ?>"><i class="fa fa-clock-o"></i> <?php _e('Newest', HWP::$text_domain); ?></a>
            <a href="<?php echo add_query_arg('comment_type', 'featured', get_the_permalink()).'#comments' ?>" class="comment_type_selector featured <?php echo ($type == 'featured') ? 'active' : ''; ?>"><i class="fa fa-star"></i> <?php _e('Featured', HWP::$text_domain); ?></a>
        </h4>
    </header>
	<?php

        if( $type != 'featured' ) {
            $args = array(
                'meta_key' => 'featured',
                'meta_value' => '1',
                'number' => '5',
                'post_id' => get_the_ID(),
            );
            $featured_comments = get_comments( $args );
            if( !empty($featured_comments) ) {
                echo '<ol class="comment-list featured_list">';
                foreach ($featured_comments as $featured_comment) {
                    $comment = get_comment($featured_comment->comment_ID);
                    $args = array();
                    $depth = 2;
                    hwp_comment($comment, $args, $depth);
                }
                echo '</ol><!-- .comment-list -->';
            }

        }

        if ( have_comments() ) :
            if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) :
                echo '<nav class="woocommerce-pagination">';
                paginate_comments_links( apply_filters( 'woocommerce_comment_pagination_args', array(
                    'prev_text' => '&larr;',
                    'next_text' => '&rarr;',
                    'type'      => 'list',
                ) ) );
                echo '</nav>';
            endif;

            echo '<ol class="comment-list">';
            wp_list_comments( array(
                'style'       => 'ul',
                'short_ping'  => true,
                'avatar_size' => 42,
                'callback' => 'hwp_comment',
                'max_depth' => 2
            ) );
            echo '</ol>';

            if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) :
                echo '<nav class="woocommerce-pagination">';
                paginate_comments_links( apply_filters( 'woocommerce_comment_pagination_args', array(
                    'prev_text' => '&larr;',
                    'next_text' => '&rarr;',
                    'type'      => 'list',
                ) ) );
                echo '</nav>';
            endif;
		    echo '</ol><!-- .comment-list -->';
        else :
           echo '<p class="no-comment">'. __('There is no comments for this post', HWP::$text_domain).'</p>';
        endif; // Check for have_comments().
    ?>

</div><!-- .comments-area -->
