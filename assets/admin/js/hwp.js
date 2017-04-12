(function($) {
    'use strict';

    $(document).ready(function($) {

        $(document).on('click', '#hwp_course_info .add-cover-image', function(e) {
			var send_attachment_bkp = wp.media.editor.send.attachment;
			var button = $(this);
			wp.media.editor.send.attachment = function(props, attachment){
				$("#product_cover").val(attachment.id);
				$('.product_cover img').remove();
				$('.product_cover .dashicons.dashicons-no-alt').remove();
				$(".product_cover").append('<a href="'+attachment.link+'" target="_blank" class="view_cover"><img src="'+attachment.sizes.thumbnail.url+'"></a><span class="dashicons dashicons-no-alt"></span>');
				wp.media.editor.send.attachment = send_attachment_bkp;
			}
			wp.media.editor.open(button);
			event.preventDefault();
		});

        $(document).on('click', '#hwp_course_info .add-video-poster', function(e) {
			var send_attachment_bkp = wp.media.editor.send.attachment;
			var button = $(this);
			wp.media.editor.send.attachment = function(props, attachment){
				$("#video_poster").val(attachment.id);
				$('.video_poster img').remove();
				$('.video_poster .dashicons.dashicons-no-alt').remove();
				$(".video_poster").append('<a href="'+attachment.link+'" target="_blank" class="view_cover"><img src="'+attachment.sizes.thumbnail.url+'"></a><span class="dashicons dashicons-no-alt"></span>');
				wp.media.editor.send.attachment = send_attachment_bkp;
			}
			wp.media.editor.open(button);
			event.preventDefault();
		});

        $(document).on('click', '.product_cover .dashicons.dashicons-no-alt', function(event) {
            $(this).remove();
            $('.product_cover .view_cover').remove();
            $("#product_cover").val('');
        });

		$('.hwp-datepicker').datepicker({
			dateFormat: "yy-mm-dd"
		});


        $(document).on('click', '.withdraw_actions a.button', function(event) {
            event.preventDefault();
            var thisAction = jQuery(this);
            if (!thisAction.hasClass('disabled')) {
                thisAction.parents('.withdraw_actions').find('div').html('');
                var postID = thisAction.data('post-id');
                var action = thisAction.data('action');
                var amount = thisAction.data('amount');
                var actionText  = thisAction.parents('.withdraw_actions').find('.action_text').val();
                $('.withdraw_actions a.button').removeClass('waiting');
                thisAction.addClass('waiting');
                $.ajax({
                    url: hwp_ajax.url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        action: 'hwp_withdraw_action',
                        nonce: hwp_ajax.nonce,
                        post_id: postID,
                        hwp_action: action,
                        amount: amount,
                        action_text : actionText
                    },
                })
                .done(function(result) {
                    console.log(result);
                    if( result.success == true) {
                        if (action=='refunded') {
                            thisAction.parents('.withdraw_actions').find('a#approved, a#deposited, a#rejected').remove();
                            thisAction.removeClass('waiting').addClass('disabled');
                            thisAction.parents('.withdraw_actions').find('div').html('<p>'+result.data+'</p>');
                        } else {
                            thisAction.parents('.withdraw_actions').find('a.button').removeClass('disabled');
                            thisAction.removeClass('waiting').addClass('disabled');
                            thisAction.parents('.withdraw_actions').find('div').html('<p>'+result.data+'</p>');
                        }
                    } else {
                        thisAction.removeClass('waiting');
                        thisAction.parents('.withdraw_actions').find('div').html('<p>'+result.data+'</p>');
                    }

                })
                .fail(function(result) {
                    thisAction.parents('.withdraw_actions').find('a.button').removeClass('disabled');
                })
            }
        });

        $('ul.hwp_sort').sortable({
            cursor: 'move',
            handle: 'span.dashicons-editor-code',
            placeholder: "hwp-sortable-placeholder"
        });

        $('table.hwp_slides tbody').sortable({
            cursor: 'move',
            handle: 'span.dashicons-editor-code',
            placeholder: "hwp-sortable-placeholder-tr"
        });

        $('.hwp_search_post').select2({
            dir: "rtl",
            ajax: {
                url:  hwp_ajax.url,
                dataType: 'json',
                delay: 250,
                data: function(params) {
                    return {
                        action: 'hwp_search_post',
                        q: params // search term
                    };
                },
                processResults: function(data) {
                    return {
                        results: data
                    };
                },
                cache: false
            },
            minimumInputLength: 3,
        });

        $('.hwp_search_product').select2({
            dir: "rtl",
            ajax: {
                url:  hwp_ajax.url,
                dataType: 'json',
                delay: 250,
                data: function(params) {
                    return {
                        action: 'hwp_search_post',
                        q: params,
                        post_type : 'product' // search term
                    };
                },
                processResults: function(data) {
                    return {
                        results: data
                    };
                },
                cache: false
            },
            minimumInputLength: 3,
            initSelection: function (element, callback) {
                var selectedID = parseInt(element.data('id'));
                var selectedText = element.data('text');
                if( typeof(selectedID) == 'number' && typeof(selectedText) == 'string' ) {
                    callback({ id: selectedID, text: selectedText });
                }
            }
        });

        $('.hwp_search_users').select2({
            dir: "rtl",
            ajax: {
                url:  hwp_ajax.url,
                dataType: 'json',
                delay: 250,
                data: function(params) {
                    return {
                        action: 'hwp_search_users',
                        q: params,
                    };
                },
                processResults: function(data) {
                    return {
                        results: data
                    };
                },
                cache: false
            },
            minimumInputLength: 3,
            initSelection: function (element, callback) {
                var selectedID = parseInt(element.data('id'));
                var selectedText = element.data('text');
                if( typeof(selectedID) == 'number' && typeof(selectedText) == 'string' ) {
                    callback({ id: selectedID, text: selectedText });
                }
            }
        });


        $('.hwp_select').select2({
            dir: "rtl",
        });

        $('.access_changer.disabled').click(function(event) {
            event.preventDefault();
        });

        $(document).on('change', '.access_changer', function(event) {
            event.preventDefault();
            if (this.checked) {
                $(this).parents('tr').find('input[type="checkbox"].key_stat').attr('checked', true);
                $(this).parents('tr').addClass('error');
            } else {
                $(this).parents('tr').find('input[type="checkbox"].key_stat').attr('checked', false);
                $(this).parents('tr').addClass('error');
            };
        });

        $(document).on('click', 'a.upload_passwords', function(event) {
            event.preventDefault();
            var thisAction = jQuery(this);
            var product_id = thisAction.data('product-id');
            thisAction.parents('.update_download_access').find('.result').html('');
            thisAction.addClass('waiting');
            $.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'hwp_upload_passwords_list',
                    nonce: hwp_ajax.nonce,
                    product_id: product_id,
                },
            })
            .done(function(result) {
                thisAction.removeClass('waiting');
                if(result.success == true) {
                    thisAction.parents('.update_download_access').find('.result').html('<div class="updated fade"><p>'+result.data+'</p></div>');
                } else {
                    thisAction.parents('.update_download_access').find('.result').html('<div class="error fade"><p>'+result.data+'</p></div>');
                }
            })
            .fail(function(result) {
                thisAction.removeClass('waiting');
                thisAction.parents('.update_download_access').find('.result').html('<div class="error fade"><p>'+result.data+'</p></div>');
            })
        });

        $(document).on('click', 'a.regenerate_passwords', function(event) {
            event.preventDefault();
            var thisAction = jQuery(this);
            var product_id = thisAction.data('product-id');
            thisAction.parents('.update_download_access').find('.result').html('');
            thisAction.addClass('waiting');
            $.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'hwp_regenerate_passwords_list',
                    nonce: hwp_ajax.nonce,
                    product_id: product_id,
                },
            })
            .done(function(result) {
                thisAction.removeClass('waiting');
                if(result.success == true) {
                    thisAction.parents('.update_download_access').find('.result').html('<div class="updated fade"><p>'+result.data+'</p></div>');
                } else {
                    thisAction.parents('.update_download_access').find('.result').html('<div class="error fade"><p>'+result.data+'</p></div>');
                }
            })
            .fail(function(result) {
                thisAction.removeClass('waiting');
                thisAction.parents('.update_download_access').find('.result').html('<div class="error fade"><p>'+result.data+'</p></div>');
            })
        });

        $(document).on('click', 'a.hwp_add_new_buyer', function(event) {
            event.preventDefault();
            var thisAction = jQuery(this);
            var product_id = thisAction.data('product-id');
            var email = thisAction.prev().val();
            thisAction.parents('.add_custom_buyer').find('.result').html('');
            thisAction.addClass('waiting');
            $.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'hwp_add_new_buyer_to_list',
                    nonce: hwp_ajax.nonce,
                    product_id: product_id,
                    email: email,
                },
            })
            .done(function(result) {
                thisAction.removeClass('waiting');
                if(result.success == true) {
                    thisAction.parents('.add_custom_buyer').find('.result').html('<div class="updated fade"><p>'+result.data+'</p></div>');
                } else {
                    thisAction.parents('.add_custom_buyer').find('.result').html('<div class="error fade"><p>'+result.data+'</p></div>');
                }
            })
            .fail(function(result) {
                thisAction.removeClass('waiting');
                thisAction.parents('.add_custom_buyer').find('.result').html('<div class="error fade"><p>'+result.data+'</p></div>');
            })
        });


        $(document).on('click', 'a.hwp_remove_buyer', function(event) {
            event.preventDefault();
            var thisAction = jQuery(this);
            var product_id = thisAction.data('product-id');
            var key = thisAction.data('key');
            thisAction.addClass('waiting');
            $.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'hwp_remove_buyer_from_list',
                    nonce: hwp_ajax.nonce,
                    product_id: product_id,
                    key: key,
                },
            })
            .done(function(result) {
                thisAction.removeClass('waiting');
                if(result.success == true) {
                    thisAction.parent().parent().html('').html('<td colspan="5"><div class="updated fade"><p>'+result.data+'</p></div></td>');
                }
            })
            .fail(function(result) {
                thisAction.removeClass('waiting');
                thisAction.parent().parent().html('').html('<td colspan="5"><div class="error fade"><p>Error</p></div></td>');
            })
        });

        $(document).on('click', '.add_slide_image', function(e) {
            var send_attachment_bkp = wp.media.editor.send.attachment;
            var button = $(this);
            wp.media.editor.send.attachment = function(props, attachment){
                button.next().val(attachment.id);
                button.prev().css('background-image', 'url('+attachment.sizes.full.url+')');
                wp.media.editor.send.attachment = send_attachment_bkp;
            }
            wp.media.editor.open(button);
            event.preventDefault();
        });

        $('.hwp_bg_selector').wpColorPicker();

        $(document).on('click', '.hwp_change_cart_authentication', function(event) {
            event.preventDefault();
            var thisAction = jQuery(this);
                var code = thisAction.data('code');
                var action = thisAction.data('action');
                thisAction.addClass('waiting');
                $.ajax({
                    url: hwp_ajax.url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        action: 'hwp_change_cart_authentication',
                        nonce: hwp_ajax.nonce,
                        code: code,
                        hwp_action: action,
                    },
                })
                    .done(function(result) {
                        console.log(result);
                        if( result.success == true) {
                            thisAction.parent().html(result.data.html+'<p>'+result.data.message+'</p>');
                        } else {
                            thisAction.parent().html(result.data.html+'<p>'+result.data+'</p>');
                        }
                    })
                    .fail(function(result) {
                        alert('Failed!');
                    })
                    .always(function(result) {
                        thisAction.removeClass('waiting');
                    })
        });

        $(document).on('click', '.add_reply_btn', function(event) {
            event.preventDefault();
            var thisEl = jQuery(this);
            var thisEl = thisEl.addClass('waiting');
            var form = thisEl.parents('.reply_form');
            var reply_text = tinymce.activeEditor.getContent();
            var emptyReply = thisEl.data("error");
            var ticketId = thisEl.data("ticket-id");
            var error = false;
            if (reply_text=='') {
                alert(emptyReply);
                error = true;
                jQuery(this).removeClass('waiting');
            }
            if (error===false) {
                jQuery.ajax({
                    url: hwp_ajax.url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        action: 'hwp_add_ticket_reply_ajax',
                        nonce: hwp_ajax.nonce,
                        reply_text: reply_text,
                        ticket_id: ticketId,
                    },
                    })
                    .done(function(data) {
                        console.log(data);
                            thisEl.removeClass('waiting');
                            jQuery('.hwp_ticket_reply_list').prepend(data.data);
                            jQuery('.hwp_ticket_reply_list li:first-child').slideDown('300');
                        })
                    .fail(function() {
                        alert('failed');
                    });
            }
        });

        $(document).on('click', '.hwp_ticket_delete_reply', function(event) {
            event.preventDefault();
            var thisEl = jQuery(this);
            var parentEl = thisEl.parent().parent().parent();
            var reply_id = thisEl.data('delete');
            parentEl.addClass('removing');
            jQuery.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'hwp_ticket_delete_reply_ajax',
                    nonce: hwp_ajax.nonce,
                    reply_id: reply_id,
                },
            })
                .done(function(data) {
                    console.log(data);
                    if (data==1) {
                        parentEl.remove();
                    } else {
                        alert('Something goes wrong! Please try again');
                        parentEl.removeClass('removing');
                    }
                })
                .fail(function() {
                    alert('failed');
                });

        });


        $(document).on('click', 'a.hwp_featured_toggle', function(event) {
            event.preventDefault();
            var thisAction = $(this);
            var comment = thisAction.data('comment');
            thisAction.addClass('waiting');
            $.ajax({
                url: hwp_ajax.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'hwp_featured_comment_toggle',
                    nonce: hwp_ajax.nonce,
                    comment: comment,
                },
            })
                .done(function(result) {
                    thisAction.find('span.dashicons').removeClass().addClass(result.data);
                })
                .fail(function(result) {
                })
                .always(function(result) {
                    console.log(result);
                    thisAction.removeClass('waiting');
                })
        });



    });

})(jQuery);
