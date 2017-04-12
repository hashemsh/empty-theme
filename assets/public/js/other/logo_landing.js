	jQuery(document).ready(function($) {
		$(document).on('click', '.logo.far', function(event) {
        // $('.logo.en').toggleClass('disappear');
        $('.logo_detail.far ').fadeToggle('fast').toggleClass('appear');
        $('.logo.far h3').toggleClass('disappear');
        $('.logo.far span').toggleClass('appear');
        event.preventDefault();
    });
    $(document).on('click', '.logo.en', function(event) {
        // $('.logo.fa').toggleClass('disappear');
        $('.logo_detail.en ').fadeToggle('fast').toggleClass('appear');
        $('.logo.en h3').toggleClass('disappear');
        $('.logo.en span').toggleClass('appear');
        event.preventDefault();
    });
	});
