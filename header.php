<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <?php if ( get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' ); ?>

    <link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo( 'url' ); ?>/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="<?php bloginfo( 'url' ); ?>/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="<?php bloginfo( 'url' ); ?>/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="<?php bloginfo( 'url' ); ?>/manifest.json">
    <link rel="mask-icon" href="<?php bloginfo( 'url' ); ?>/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="theme-color" content="#ffffff">

    <meta name="samandehi" content="576722012"/>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>