(function($) {
    'use strict';

    jQuery(document).ready(function($) {

        // Login Popup
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        var loginerror = getParameterByName('loginerror');
        if (loginerror !== null) {
            jQuery('a.login.hwp_modal').trigger('click');
        }


        // SlideBar
        $('.hwp_sidr').each(function(index, el) {
            var side = $(this).data('side'),
                name = $(this).data('name');
            $(this).sidr({
                 side: side,
                 name: name,
                onOpenEnd: function(){
                    $('#'+name).addClass('hwp_sidr_open');
                },
                onCloseEnd: function(){
                    $('#'+name).removeClass('hwp_sidr_open');
                }
            });
        });

        var ua = navigator.userAgent,
            pickclick = (ua.match(/iPad/i) || ua.match(/iPhone/)) ? "touchstart" : "click";
        $("body").on(pickclick, function(event) {
            if(!$(event.target).is('.hwp_sidr_open, .hwp_sidr_open *')){
                if($('body').hasClass('sidr-open')) {
                    event.preventDefault();
                    var target = $('.hwp_sidr_open').attr('id');
                    $.sidr('close', target);
                }
            }
        });

        //modal
        $(document).on('click', '.hwp_modal', function(event) {
            event.preventDefault();
            var target = jQuery(this).data('target');
            jQuery(target)
                .prop('class', 'modal fade') // revert to default
                .addClass(jQuery(this).data('direction'));
            jQuery(target).modal('show');
        });

        // Sidebar Fixer
        $('.content_area, .sidebar_area').theiaStickySidebar();

        // Article share
        if ($(window).width() > 767) {
            if($('.article_share').length) {
                var shareElem = $('.article_share');
                var content_areaElem = $('.content_area'),
                    cntTop = content_areaElem.offset().top;

                $(window).scroll(function (event) {
                    var docViewTop = $(window).scrollTop();
                    if (cntTop <= docViewTop) {
                        shareElem.css({
                            'position': 'fixed',
                            'top': '15px'
                        });
                    } else {
                        shareElem.css({
                            'position': 'absolute',
                            'top': 'auto'
                        });
                    }

                });
            }
        }


        // Newsletter
        $(document).on('submit', 'form.newsletter', function(event) {
            event.preventDefault();
            var thisForm = $(this),
                name = thisForm.find('input.name').val(),
                mobile = thisForm.find('input.mobile').val(),
                email = thisForm.find('input.email').val(),
                emailPattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
                mobilePattern = /^09(1[0-9]|3[1-9]|2[1-9]|0[1-9]|9[1-10])-?[0-9]{3}-?[0-9]{4}$/i,
                hasError = false,
                nameError = thisForm.data('name'),
                mobileError = thisForm.data('mobile'),
                emailError = thisForm.data('email'),
                successMsg = thisForm.data('success'),
                failedMsg = thisForm.data('failed');
            thisForm.find('input').removeClass('error');
            thisForm.next('.newsletter_result').removeClass('error').html('');
            thisForm.addClass('loading');
            if (name === '') {
                thisForm.find('input.name').addClass('error');
                thisForm.next('.newsletter_result').addClass('error').append('<p>'+nameError+'</p>');
                hasError = true;
                thisForm.removeClass('loading');
            }
            if (mobilePattern.test(mobile) === false) {
                thisForm.find('input.mobile').addClass('error');
                thisForm.next('.newsletter_result').addClass('error').append('<p>'+mobileError+'</p>');
                hasError = true;
                thisForm.removeClass('loading');
            }
            if (emailPattern.test(email) === false) {
                thisForm.find('input.email').addClass('error');
                thisForm.next('.newsletter_result').addClass('error').append('<p>'+emailError+'</p>');
                hasError = true;
                thisForm.removeClass('loading');
            }
            if (hasError === false) {
                $.ajax({
                    url: hwp_ajax.url,
    				type: 'POST',
    				dataType: 'json',
    				data: {
    					action: 'hwp_mailerlite_add_subscriber',
    					nonce: hwp_ajax.nonce,
    					name: name,
    					mobile: mobile,
    					email: email,
                    }
                })
                .done(function(result) {
                    console.log(result);
                    if (result.success===true) {
                        thisForm.next('.newsletter_result').removeClass('error').html('').addClass('success').html('<p>'+successMsg+'</p>');
                    } else {
                        thisForm.next('.newsletter_result').removeClass('success').html('').addClass('error').html('<p>'+failedMsg+'</p>')
                    }
                })
                .fail(function() {
                    thisForm.next('.newsletter_result').removeClass('success').html('').addClass('error').html('<p>'+failedMsg+'</p>')
                })
                .always(function() {
                    thisForm.removeClass('loading');
                });

            }
        });


        // Rating
        $(document).on('click', '.hwp-rating span.add_rate.logged_in i', function(event) {
            event.preventDefault();
            var checkRate = 6 - ($(this).index()+1),
                rate = $(this).data('value'),
                thisEl = $(this),
                post_id = $(this).data('post');
            if (checkRate != rate) {
                if ( checkRate > rate) {
                    rate = checkRate;
                }
            }
            if (rate > 5) {
                rate = 5;
            }
            if (rate < 1) {
                rate = 1;
            }
            $(this).parents('.hwp-rating').find('.fill_container').css('width', rate*20+'%');
            $(this).parents('.hwp-rating-container').find('.rate-loader i').css('opacity', '1');
            $.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'hwp_add_rate',
                    nonce: hwp_ajax.nonce,
                    rate: rate,
                    post_id: post_id,
                }
            })
            .done(function(result) {
                if (result.success===true) {
                    thisEl.parents('.hwp-rating').find('.fill_container').css('width', result.data.rate*20+'%');
                    thisEl.parents('.hwp-rating-container').find('.rate_summary .rate_num').text(result.data.rateText);
                    thisEl.parents('.hwp-rating-container').find('.rate_summary .count_num').text(result.data.count);
                } else {
                    alert(result.data)
                }
            })
            .fail(function() {
            })
            .always(function() {
                thisEl.parents('.hwp-rating-container').find('.rate-loader i').css('opacity', '0');
            });

        });

        // Open login modal in rate action for guest_user
        $(document).on('click', '.hwp-rating span.add_rate.guest_user i', function(event) {
            event.preventDefault();
            jQuery('a.login.hwp_modal').trigger('click');
        });

        $(document).on('click', 'ul.main_lessons>li .lesson_title, ul.main_lessons>li .course_number', function(event) {
            event.preventDefault();
            if (jQuery(this).parent().hasClass('active')) {
                jQuery(this).parent().find('ul').slideUp('150');
                jQuery(this).parent().removeClass('active');
            } else {
                // jQuery(this).parent().find('ul.ticket_reply_form').slideUp('150');
                // jQuery(this).parent().find('a.ticket_reply_link').removeClass('active');
                jQuery(this).parent().find('ul.sub_topics').slideDown('150');
                jQuery(this).parent().addClass('active');
            }
        });

        // Faq
        $(document).on('click', 'ul.faq_list li a', function(event) {
            event.preventDefault();
            jQuery(this).parent().toggleClass('active');
            jQuery(this).next('div').slideToggle('150');
        });

        // Tab
        $(document).on('click', 'ul.hwp_tab li a', function(event) {
            event.preventDefault();
            var target = jQuery(this).attr('href');
            jQuery('ul.hwp_tab li').removeClass('active');
            jQuery(this).parent().addClass('active');
            jQuery(this).parents('ul').next('.hwp_tab_container').find('.hwp_tab_content').removeClass('active');
            jQuery(this).parents('ul').next('.hwp_tab_container').find(target).addClass('active');
        });

        // Reting
        $(document).on('click', '.your_rate a', function(event) {
            event.preventDefault();
            var rateVal = parseInt(jQuery(this).text());
            var thisEl = jQuery(this);
            var post_id = thisEl.parents('.your_rate').data('post');
            thisEl.parents('.your_rate').find('.spinner').show();
            jQuery.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    "action": "woo_review_rate_ajax",
                    "nonce": hwp_ajax.nonce,
                    rateVal: rateVal,
                    post_id: post_id,
                }
            })
                .done(function(data) {
                    console.log(data);
                    if (data.status==0) {
                        thisEl.parents('.your_rate').find('#rate_message').slideDown('300').removeClass().addClass('rate_message alert alert-warning').text(data.data.msg);
                    } else {
                        thisEl.parents('.your_rate').find('#rate_message').slideDown('300').removeClass().addClass('rate_message alert alert-success').text(data.data.msg);
                        thisEl.parents('.your_rate').find('.star-rating span').css('width', rateVal*20+'%')
                        //thisEl.parents('.your_rate').find('.rate_container .stars.pull-left').hide();
                        //thisEl.parents('.your_rate').find('.rate_container .stars.pull-left').after('<div class="star-rating" title="نمره '+data.rate+' از 5"><span style="width:' + ( (data.rate / 5 ) * 100 ) + '%"><strong class="rating">'+data.rate+'</strong> از 5</span></div>');
                    }
                })
                .fail(function(data) {
                    thisEl.parents('.your_rate').find('#rate_message').slideDown('300').removeClass().addClass('rate_message alert alert-error').text('خطایی رخ داد! لطفا دوباره سعی کنید.');
                })
                .always(function(data) {
                    thisEl.parents('.your_rate').find('.spinner').hide();
                });
        });

        $('.timer').startTimer();

        $('.download_timer').startTimer({
            onComplete: function(element){
                var url = $(this).data('url');
                var download_id = $(this).data('id');

                console.log(url);
                console.log(download_id);
                $.ajax({
                    url: hwp_ajax.url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        "action": "hwp_check_download_valid",
                        "nonce": hwp_ajax.nonce,
                        url: url,
                        download_id: download_id
                    }
                })
                    .done(function(data) {
                        console.log(data);
                        if (data.success == true) {
                            window.open(url, '_self');
                            $(".help_download").addClass('show_me');
                        } else {
                            $(".help_download").before('<div class="alert alert-danger" role="alert">'+data.data+'</div>');
                        }
                    })
                    .fail(function(data) {
                    })
                    .always(function(data) {
                    });
            }
        });

        if( $('body').hasClass('hwp_no_logged_in_my_account_page') ) {

            var login_tab = getParameterByName('tab');
            if (login_tab == 'login') {
                var winHeight = $(window).height();
                $("main.main").height(winHeight - 90);
                $('header.header, .breadcrumb_container, .courses_notice, footer.footer, .modal').remove();
            }
        }

        $(document).on('click','.no-download',function(event){
            event.preventDefault();
            var thisdownload=jQuery(this);
            $('#hamyar_dl_frm').find("#hidden_dl_link").remove();
            $('#hamyar_dl_frm').find("#hdl_post_title").remove();
            var dl_link = thisdownload.data('dl');
            var title = thisdownload.data('title');
            var post_id = thisdownload.data('post_id');
            $('#hdl-message').html('').hide();
            $('#hamyar_dl_frm').find('#hdl_email').removeAttr('disabled');
            $('#hamyar_dl_frm').find('#hamyar_dl_btn').removeAttr('disabled');
            $('#hamyar_dl_frm').append('<input name="dl_link" id="hidden_dl_link" type="hidden" value="'+dl_link+'">');
            $('#hamyar_dl_frm').append('<input name="hdl_post_title" id="hdl_post_title" type="hidden" value="'+title+'">');
            $('#hamyar_dl_frm').append('<input name="hdl_post_id" id="hdl_post_id" type="hidden" value="'+post_id+'">');
        });

        $(document).on('submit','#hamyar_dl_frm',function(event){
            event.preventDefault();
            var thisform = $(this);
            thisform.find('#hdl_email').attr('disabled','disabled');
            thisform.find('#hamyar_dl_btn').attr('disabled','disabled');
            var email = thisform.find('#hdl_email').val();
            var phone = thisform.find('#hdl_phone').val();
            var hdl_name = thisform.find('#hdl_name').val();
            var dl = thisform.find('#hidden_dl_link').val();
            var title = thisform.find('#hdl_post_title').val();
            var post_id = thisform.find('#hdl_post_id').val();
            thisform.find('.spinner').show();
            $.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data:{
                    action:'hwp_dl_send_mail',
                    email: email,
                    phone: phone,
                    hdl_name: hdl_name,
                    dl: dl,
                    title: title,
                    post_id: post_id
                }
            })
            .done(function(data){
                console.log(data);
                thisform.find('.spinner').hide();
                if(data.success){
                    jQuery('#hdl-message').css('background',' #27AE61').html('<p>'+data.data.message+'</p>').slideDown(300);
                }else{
                    jQuery('#hdl-message').css('background','#DE1F18').html('<p>'+data.data.message+'</p>').slideDown(300);
                    thisform.find('#hdl_email').removeAttr('disabled');
                    thisform.find('#hamyar_dl_btn').removeAttr('disabled');
                }
            })
            .fail(function() {
                alert("ddd");
            });

        });

        $(".owl-carousel").owlCarousel({
            'items': 1,
            'rtl': true,
            'loop': true,
            'dots': true,
            'autoplay': true,
            'responsive': {
                 0: {
                     'dots': false
                 },
                 768: {
                      'dots': true
                 },

             }
        });



        //Check to see if the window is top if not then display button
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('.scroll_to_top').fadeIn();
            } else {
                $('.scroll_to_top').fadeOut();
            }
        });

        //Click event to scroll to top
        $('.scroll_to_top').click(function(event){
            $('html, body').animate({scrollTop : 0},800);
            event.preventDefault();
        });
        //Click event to scroll to top
        $(document).on('click','.add_to_cart_fixed',function(event){
            event.preventDefault();
            $('html, body').animate({scrollTop : $('.course_info_box').offset().top},800);
        });

        $(document).on('submit','.hwp_filter_form',function(event){
            event.preventDefault();
            var thisform = $(this),
                postsArea = thisform.parent().next();
            thisform.find('.spinner').addClass('show');
            postsArea.addClass('loading');
            var orderby = thisform.find('#orderby option:selected').val(),
                date = thisform.find('#date option:selected').val(),
                category = thisform.find('#category option:selected').val(),
                url = window.location.href.split('?')[0];

            $.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data:{
                    action:'hwp_filter',
                    nonce: hwp_ajax.nonce,
                    orderby: orderby,
                    date: date,
                    category: category,
                    url: url,
                }
            })
            .always(function(result){
                thisform.find('.spinner').removeClass('show');
                postsArea.removeClass('loading');
            })
            .done(function(result){
                // console.log(result.data.args);
                if(result.success == true) {
                    postsArea.html(result.data.loop);
                    var queryVars = {};
                    queryVars['orderby_filter'] = orderby;
                    if(date != 'all') {
                        queryVars['date_filter'] = date;
                    }
                    if(category != 'all_cat') {
                        queryVars['cat_filter'] = category;
                    }
                    var new_url = appendQueryString(url, queryVars);
                    window.history.pushState(null, null, new_url);
                }
            })
            .fail(function() {
                // alert("ddd");
            });
        });

        function appendQueryString(url, queryVars) {
            var firstSeperator = (url.indexOf('?')==-1 ? '?' : '&');
            var queryStringParts = new Array();
            for(var key in queryVars) {
                queryStringParts.push(key + '=' + queryVars[key]);
            }
            var queryString = queryStringParts.join('&');
            return url + firstSeperator + queryString;
        }

        $(document).on('change', '.box header.title h4 input[type=checkbox]#popular_posts', function(event) {
            if(this.checked) {
                var thisCat = $(this).data('category');
                $('select#date option').prop('selected', false);
                $('select#orderby option').prop('selected', false);
                $('select#date option[value="month"]').prop('selected', true);
                $('select#orderby option[value="views"]').prop('selected', true);
                if( thisCat != 'undefined') {
                    $('select#category option[value="'+thisCat+'"]').prop('selected', true);
                }
                $("ul.hwp_filter li button.hwp_btn").trigger('click');
            } else {
                $('select#date option[value="all"]').prop('selected', true);
                $('select#orderby option[value="date-desc"]').prop('selected', true);
                $("ul.hwp_filter li button.hwp_btn").trigger('click');
            }
        });
        $(document).on('change', '.box header.title h4 input[type=checkbox]#popular_products', function(event) {
            if(this.checked) {
                var thisCat = $(this).data('category');
                $('.sidebar .searchandfilter input[type="text"]').val('');
                $('.sidebar .searchandfilter input[type="checkbox"]').prop('checked', false);
                $('.sidebar .searchandfilter select option').prop('selected', false);
                $('.sidebar .searchandfilter option[value="_sfm_total_sales+desc+num"]').prop('selected', true);
                $('.sidebar .searchandfilter input[type="submit"]').trigger('click');
            } else {
                $(".sidebar .searchandfilter  a.search-filter-reset").trigger('click');
            }
        });

        $('.google_s').bind('change', function() {
            $(this).val(function(i, val) {
                $('.wp_s').val(val);
                return val;
            });
        });


        $(document).on('click','.generate_download',function(event){
            event.preventDefault();
            var thisLink = $(this),
                fileName = thisLink.attr('href'),
                productID = thisLink.data('product');
            thisLink.next('.spinner').show();
            $.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data:{
                    action:'hwp_download_generator',
                    nonce: hwp_ajax.nonce,
                    file_name: fileName,
                    product: productID,
                }
            })
                .always(function(result){
                    thisLink.next('.spinner').hide();
                })
                .done(function(result){
                    if(result.success == true) {
                        window.location = result.data;
                    } else {
                        thisLink.next('.generate_error').html(result.data);
                    }
                })
                .fail(function() {
                    // alert("ddd");
                });
        });


        // Nima add js

        $('#search_icon').on('click',function() {
            event.preventDefault();
            $('#search_popup').addClass('open');
            $('header.header').css({
                visibility: 'hidden'
            });
        });

        $("#mobile_main_menu ul li a , #mobile_user_menu ul li a").on('click', function(event) {
            $(this).addClass("activated").delay(400).queue(function(next){
            $(this).removeClass("activated");
                next();
            });
        });

        $('a.cancel').on('click',function() {
            $('#search_popup').removeClass('open');
            $('#search_popup').addClass('close');
            $('header.header').css({
                visibility: 'visible'
            });
        });

        $('.mobile_main_menu').dcAccordion({
            menuClose   : false,
            autoExpand  : true,
            classExpand : 'parent-item',
            speed       : 'fast',
            saveState 	: false,
            eventType	 : 'click',
            autoClose    : true,
            disableLink	 : true,
        });


        // Rating
        $(document).on('click', '.hwp_rate_comment a.add_rate', function(event) {
            event.preventDefault();
            var thisRate = $(this),
                comment = $(this).data('comment');
            thisRate.find('i').attr('class', 'fa fa-spinner fa-pulse fa-fw');
            $.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'hwp_add_comment_rate',
                    nonce: hwp_ajax.nonce,
                    comment_id: comment,
                }
            })
                .done(function(result) {
                    if (result.success===true) {
                        thisRate.parent().attr('class', 'hwp_rate_comment '+result.data.class);
                        thisRate.find('i').attr('class', result.data.icon);
                        thisRate.find('span').html(result.data.number);
                    } else {
                        thisRate.find('i').attr('class', 'fa fa-thumbs-up');
                    }
                })
                .fail(function() {
                    thisRate.find('i').attr('class', 'fa fa-thumbs-up');
                })
                .always(function(result) {
                });

        });


    });


})(jQuery);
