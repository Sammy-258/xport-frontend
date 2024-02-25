"use strict";
THEMEREX_GLOBALS['ajax_url']          = '#';
THEMEREX_GLOBALS['ajax_nonce']      = '4ffe40f4e6';
THEMEREX_GLOBALS['ajax_nonce_editor'] = '7d3035c1d4';
THEMEREX_GLOBALS['site_url']            = '#';
THEMEREX_GLOBALS['theme_font']      = '';
THEMEREX_GLOBALS['theme_skin']     = 'globallogistics';
THEMEREX_GLOBALS['theme_skin_bg']   = '';
THEMEREX_GLOBALS['slider_height']  = 100;
THEMEREX_GLOBALS['system_message']    = {message: '',status: '',header: ''};
THEMEREX_GLOBALS['user_logged_in']    = false;
THEMEREX_GLOBALS['toc_menu']        = 'fixed';
THEMEREX_GLOBALS['toc_menu_home'] = true;
THEMEREX_GLOBALS['toc_menu_top'] = true;
THEMEREX_GLOBALS['menu_relayout']   = 959;
THEMEREX_GLOBALS['menu_responsive']   = 959;
THEMEREX_GLOBALS['menu_slider']     = false;
THEMEREX_GLOBALS['demo_time']     = 0;
THEMEREX_GLOBALS['media_elements_enabled'] = true;
THEMEREX_GLOBALS['ajax_search_enabled']   = true;
THEMEREX_GLOBALS['ajax_search_min_length']   = 3;
THEMEREX_GLOBALS['ajax_search_delay']       = 200;
THEMEREX_GLOBALS['css_animation']      = true;
THEMEREX_GLOBALS['menu_animation_in']  = 'none';
THEMEREX_GLOBALS['menu_animation_out'] = 'fadeOut';
THEMEREX_GLOBALS['popup_engine'] = 'magnific';
THEMEREX_GLOBALS['popup_gallery']  = true;
THEMEREX_GLOBALS['email_mask']       = '^([a-zA-Z0-9_\-]+\.)*[a-zA-Z0-9_\-]+@[a-z0-9_\-]+(\.[a-z0-9_\-]+)*\.[a-z]{2,6}$';
THEMEREX_GLOBALS['contacts_maxlength']  = 1000;
THEMEREX_GLOBALS['comments_maxlength']   = 1000;
THEMEREX_GLOBALS['remember_visitors_settings']   = false;
THEMEREX_GLOBALS['admin_mode']          = false;
THEMEREX_GLOBALS['isotope_resize_delta']    = 0.3;
THEMEREX_GLOBALS['error_message_box'] = null;
THEMEREX_GLOBALS['video_resize_inited'] = false;
THEMEREX_GLOBALS['top_panel_height']        = 0;
if (THEMEREX_GLOBALS['theme_font']=='') THEMEREX_GLOBALS['theme_font'] = 'Hind';
THEMEREX_GLOBALS['main_color'] = '#eeba00';
THEMEREX_GLOBALS['accent_color'] = '#5cb9e2';
THEMEREX_GLOBALS["reviews_allow_user_marks"] = true;
THEMEREX_GLOBALS["reviews_max_level"] = 100;
THEMEREX_GLOBALS["reviews_levels"] = "bad,poor,normal,good,great";
THEMEREX_GLOBALS["reviews_vote"] = "";
THEMEREX_GLOBALS["strings"] = {
        bookmark_add:       "Add the bookmark",
        bookmark_added:     "Current page has been successfully added to the bookmarks. You can see it in the right panel on the tab \'Bookmarks\'",
        bookmark_del:       "Delete this bookmark",
        bookmark_title:     "Enter bookmark title",
        bookmark_exists:        "Current page already exists in the bookmarks list",
        search_error:       "Error occurs in AJAX search! Please, type your query and press search icon for the traditional search way.",
        email_confirm:      "On the e-mail address <b>%s</b> we sent a confirmation email.<br>Please, open it and click on the link.",
        reviews_vote:       "Thanks for your vote! New average rating is:",
        reviews_error:      "Error saving your vote! Please, try again later.",
        error_like:         "Error saving your like! Please, try again later.",
        error_global:       "Global error text",
        name_empty:         "The name can\'t be empty",
        name_long:           "Too long name",
        email_empty:            "Too short (or empty) email address",
        email_long:         "Too long email address",
        email_not_valid:        "Invalid email address",
        subject_empty:      "The subject can\'t be empty",
        subject_long:       "Too long subject",
        criteria_empty:      "The predefined destinations can\'t be empty",
        criteria_long:        "Too long predefined destinations",
        date_start_empty:    "The date start can\'t be empty",
        date_time:          "The time can\'t be empty",
        text_empty:         "The message text can\'t be empty",
        text_long:          "Too long message text",
        send_complete:      "Send message complete!",
        send_order_complete:    "Your request has been received. We will get back to you asap!",
        send_error:         "Transmit failed!",
        login_empty:            "The Login field can\'t be empty",
        login_long:         "Too long login field",
        password_empty:     "The password can\'t be empty and shorter then 5 characters",
        password_long:      "Too long password",
        password_not_equal: "The passwords in both fields are not equal",
        registration_success:"Registration success! Please log in!",
        registration_failed:    "Registration failed!",
        geocode_error:      "Geocode was not successful for the following reason:",
        googlemap_not_avail:    "Google map API not available!",
        editor_save_success:    "Post content saved!",
        editor_save_error:  "Error saving post data!",
        editor_delete_post: "You really want to delete the current post?",
        editor_delete_post_header:"Delete post",
        editor_delete_success:  "Post deleted!",
        editor_delete_error:        "Error deleting post!",
        editor_caption_cancel:  "Cancel",
        editor_caption_close:   "Close",
        username_empty:     "The First Name can\'t be empty",
        username2_empty:        "The Last Name can\'t be empty",
        company_empty:      "The Company can\'t be empty",
        address_empty:      "The Address can\'t be empty",
        city_empty:     "The City can\'t be empty",
        zip_empty:      "The Zip can\'t be empty",
        phone_empty:        "The Telephone can\'t be empty",
        pieces_empty:   "The Number Of Pieces can\'t be empty",
        weight_empty:   "The Total Weight (LBS) can\'t be empty",
        height_empty:   "The Height (inches) can\'t be empty",
        width_empty:    "The Width (inches) can\'t be empty",
        depth_empty:    "The Depth (inches) can\'t be empty",
        commodity_empty:    "The Commodity can\'t be empty"
    };

/* calculator config */
var cp_calculatedfieldsf_fbuilder_config_1 = {"obj":"{\"pub\":true,\"identifier\":\"_1\",\"messages\": {\n\t\t\"number\": \"Please enter a valid number.\"\n\t}}"};

jQuery(window).load(function() {
"use strict";
    preloader();
});

jQuery(document).ready(function() {
"use strict";
    mainmenu_init();
    themerex_reviews();
    themerex_reviews_stars();
    isotope_filters_init();
    rev_slider_init();
    timeline_init();
    custom_options();
    themerex_contact_form_send();
});


/* mainmenu init */
function mainmenu_init() {
"use strict";
    if (jQuery('body').hasClass("fixed_top_menu")) {
        THEMEREX_GLOBALS['menu_fixed']       = true;
    } else {
        THEMEREX_GLOBALS['menu_fixed']       = false;

    }     
}


/*timeline options*/
function timeline_init() {
    "use strict";
    if (jQuery(".timeline_section").length === 1) {
        jQuery(".timeline_section").find(".timeline").timeline({ 
            itemMargin : 40, 
            scrollSpeed : 500, 
            easing : "easeOutSine", 
            openTriggerClass : 'none', 
            swipeOn : true, 
            startItem : "11/04/2015", 
            yearsOn : true, 
            hideTimeline : false, 
            hideControles : false, 
            closeText : "Close", 
            closeItemOnTransition: true 
        }); 
    }
}

/*slider options*/
function rev_slider_init() {
"use strict";
    /******************************************
        -   PREPARE PLACEHOLDER FOR SLIDER  -
    ******************************************/
    if (jQuery("#rev_slider_wrapper").length > 0) {
        /*slider1*/
        if(jQuery('#rev_slider_1_1').revolution == undefined){
            revslider_showDoubleJqueryError('#rev_slider_1_1');
        }else{
            
            var setREVStartSize = function() {
                var tpopt = new Object();
                    tpopt.startwidth = 1240;
                    tpopt.startheight = 630;
                    tpopt.container = jQuery('#rev_slider_1_1');
                    tpopt.fullScreen = "off";
                    tpopt.forceFullWidth="off";

                tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),0);tpopt.height=parseInt(tpopt.container.height(),0);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
            };

            /* CALL PLACEHOLDER */
            setREVStartSize();

            var revapi1;

           revapi1 = jQuery('#rev_slider_1_1').show().revolution(
            {   
                dottedOverlay:"none",
                delay:8000,
                startwidth:1240,
                startheight:630,
                hideThumbs:0,
                thumbWidth:200,
                thumbHeight:200,
                thumbAmount:3,
                simplifyAll:"off",
                navigationType:"none",
                navigationArrows:"solo",
                navigationStyle:"round",
                touchenabled:"on",
                onHoverStop:"on",
                nextSlideOnWindowFocus:"off",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                drag_block_vertical: false,
                keyboardNavigation:"on",
                navigationHAlign:"center",
                navigationVAlign:"bottom",
                navigationHOffset:0,
                navigationVOffset:0,
                soloArrowLeftHalign:"left",
                soloArrowLeftValign:"center",
                soloArrowLeftHOffset:30,
                soloArrowLeftVOffset:0,
                soloArrowRightHalign:"right",
                soloArrowRightValign:"center",
                soloArrowRightHOffset:30,
                soloArrowRightVOffset:0,
                shadow:0,
                fullWidth:"on",
                fullScreen:"off",
                spinner:"spinner0",
                stopLoop:"off",
                stopAfterLoops:-1,
                stopAtSlide:-1,
                shuffle:"off",
                autoHeight:"off",
                forceFullWidth:"off",
                hideThumbsOnMobile:"off",
                hideNavDelayOnMobile:1500,
                hideBulletsOnMobile:"off",
                hideArrowsOnMobile:"off",
                hideThumbsUnderResolution:0,
                hideSliderAtLimit:0,
                hideCaptionAtLimit:0,
                hideAllCaptionAtLilmit:509,
                startWithSlide:0                    
            });
        }

        /*slider2*/
        if(jQuery('#rev_slider_2_1').revolution == undefined){
          revslider_showDoubleJqueryError('#rev_slider_2_1');
        }else{
            var setREVStartSize_2 = function() {
                var tpopt = new Object();
                tpopt.startwidth = 1200;
                tpopt.startheight = 580;
                tpopt.container = jQuery('#rev_slider_2_1');
                tpopt.fullScreen = "off";
                tpopt.forceFullWidth="off";

                tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),0);tpopt.height=parseInt(tpopt.container.height(),0);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
            };

            /* CALL PLACEHOLDER */
            setREVStartSize_2();

            var revapi2;

            revapi2 = jQuery('#rev_slider_2_1').show().revolution(
            { 
                dottedOverlay:"none",
                delay:9000,
                startwidth:1200,
                startheight:580,
                hideThumbs:0,
                thumbWidth:100,
                thumbHeight:50,
                thumbAmount:3,
                simplifyAll:"off",
                navigationType:"bullet",
                navigationArrows:"none",
                navigationStyle:"round",
                touchenabled:"on",
                onHoverStop:"on",
                nextSlideOnWindowFocus:"off",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                drag_block_vertical: false,
                keyboardNavigation:"on",
                navigationHAlign:"center",
                navigationVAlign:"bottom",
                navigationHOffset:0,
                navigationVOffset:33,
                soloArrowLeftHalign:"left",
                soloArrowLeftValign:"center",
                soloArrowLeftHOffset:20,
                soloArrowLeftVOffset:0,
                soloArrowRightHalign:"right",
                soloArrowRightValign:"center",
                soloArrowRightHOffset:20,
                soloArrowRightVOffset:0,
                shadow:0,
                fullWidth:"on",
                fullScreen:"off",
                spinner:"spinner0",
                stopLoop:"off",
                stopAfterLoops:-1,
                stopAtSlide:-1,
                shuffle:"off",
                autoHeight:"off",
                forceFullWidth:"off",
                hideThumbsOnMobile:"off",
                hideNavDelayOnMobile:1500,
                hideBulletsOnMobile:"off",
                hideArrowsOnMobile:"off",
                hideThumbsUnderResolution:0,
                hideSliderAtLimit:0,
                hideCaptionAtLimit:0,
                hideAllCaptionAtLilmit:0,
                startWithSlide:0          
            });
        };

        /*slider 3*/
        if(jQuery('#rev_slider_3_1').revolution == undefined){
            revslider_showDoubleJqueryError('#rev_slider_3_1');
        }else{

            var setREVStartSize_slider3 = function() {
                var tpopt = new Object();
                    tpopt.startwidth = 1240;
                    tpopt.startheight = 680;
                    tpopt.container = jQuery('#rev_slider_3_1');
                    tpopt.fullScreen = "off";
                    tpopt.forceFullWidth="off";

                tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),0);tpopt.height=parseInt(tpopt.container.height(),0);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
            };

            /* CALL PLACEHOLDER */
            setREVStartSize_slider3();

            var revapi3;

            revapi3 = jQuery('#rev_slider_3_1').show().revolution(
            {   
                dottedOverlay:"none",
                delay:8000,
                startwidth:1240,
                startheight:680,
                hideThumbs:0,
                thumbWidth:200,
                thumbHeight:200,
                thumbAmount:3,
                simplifyAll:"off",
                navigationType:"none",
                navigationArrows:"solo",
                navigationStyle:"round",
                touchenabled:"on",
                onHoverStop:"on",
                nextSlideOnWindowFocus:"off",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                drag_block_vertical: false,
                keyboardNavigation:"on",
                navigationHAlign:"center",
                navigationVAlign:"bottom",
                navigationHOffset:0,
                navigationVOffset:0,
                soloArrowLeftHalign:"left",
                soloArrowLeftValign:"center",
                soloArrowLeftHOffset:30,
                soloArrowLeftVOffset:0,
                soloArrowRightHalign:"right",
                soloArrowRightValign:"center",
                soloArrowRightHOffset:30,
                soloArrowRightVOffset:0,
                shadow:0,
                fullWidth:"on",
                fullScreen:"off",
                spinner:"spinner0",
                stopLoop:"off",
                stopAfterLoops:-1,
                stopAtSlide:-1,
                shuffle:"off",
                autoHeight:"off",
                forceFullWidth:"off",
                hideThumbsOnMobile:"off",
                hideNavDelayOnMobile:1500,
                hideBulletsOnMobile:"off",
                hideArrowsOnMobile:"off",
                hideThumbsUnderResolution:0,
                hideSliderAtLimit:0,
                hideCaptionAtLimit:0,
                hideAllCaptionAtLilmit:0,
                startWithSlide:0                    
            });
        }

        /* init slider background */
        var source = jQuery(".tp-bgimg").attr("data-src");
        jQuery(".tp-bgimg.defaultimg").each(function(){
            jQuery(this).css({'background-image': 'url(' + source +')', 'background-size': 'cover', 'background-position': '50% 0%', 'background-repeat': 'no-repeat', 'height': 'inherit'});                    
        });
    }

}

/*custom options*/
function custom_options() {
    "use strict";
    if (jQuery("#custom_options").length === 1) {

        var swither = jQuery("#custom_options .co_switch_box:not(.inited)" )
        if (swither.length > 0) {
            swither.each(function() {
                jQuery(this).addClass('inited');
                themerex_custom_options_switcher(jQuery(this));
            });
            jQuery("#custom_options .co_switch_box a" ).on("click", function(e) {
                "use strict";
                var value = jQuery(this).data('value');
                var wrap = jQuery(this).parent('.co_switch_box');
                var options = wrap.data('options');
                wrap.find('.switcher').data('value', value);
                jQuery(document).find("body").removeClass("bg_pattern_0 bg_pattern_1 bg_pattern_2 bg_pattern_3 bg_pattern_4 bg_pattern_5 bg_pattern_6 bg_pattern_7 bg_pattern_8 bg_pattern_9 bg_image_1 bg_image_2 bg_image_3 bg_image_4 bg_image_5 bg_image_6 body_style_wide body_style_boxed body_style_fullscreen").addClass( value );
                jQuery(document).find("#custom_options .switcher").css("left", "");
                var page_content = jQuery('body').eq(0);
                if (page_content.hasClass("body_style_wide")) {
                    jQuery(document).find(".page_content").addClass("container");
                } else {
                        jQuery(document).find(".page_content").removeClass('container');
                    }
                var page_content = jQuery('body').eq(0);
                if (page_content.hasClass("body_style_boxed")) {
                    jQuery(document).find(".page_wrap").addClass("container");
                } else {
                        jQuery(document).find(".page_wrap").removeClass('container');
                    }                    
                e.preventDefault();
                return false;
            });
        }

        jQuery("#custom_options #co_bg_pattern_list a").on("click", function(b) {
            jQuery("#custom_options #co_bg_pattern_list .co_pattern_wrapper,#custom_options #co_bg_images_list .co_image_wrapper").removeClass("current");
            var a = jQuery(this).addClass("current");
            var c = a.attr("id").substr(-1);
            jQuery(document).find("body").removeClass("bg_pattern_0 bg_pattern_1 bg_pattern_2 bg_pattern_3 bg_pattern_4 bg_pattern_5 bg_pattern_6 bg_pattern_7 bg_pattern_8 bg_pattern_9 bg_image_1 bg_image_2 bg_image_3 bg_image_4 bg_image_5 bg_image_6 body_style_wide body_style_boxed body_style_fullscreen").addClass("bg_pattern_" + c);
            //jQuery(document).find(".body_wrap").addClass("container");
            jQuery(document).find("body").addClass("body_style_boxed");
            jQuery(document).find("#custom_options .switcher").css("left" , "0" , "!important");
            var page_content = jQuery('body').eq(0);
            if (page_content.hasClass("body_style_boxed")) {
                jQuery(document).find(".page_wrap").addClass("container");
            } else {
                    jQuery(document).find(".page_wrap").removeClass('container');
                }  
            b.preventDefault();
            return false
        });
        jQuery("#custom_options #co_bg_images_list a").on("click", function(b) {
            jQuery("#custom_options #co_bg_images_list .co_image_wrapper,#custom_options #co_bg_pattern_list .co_pattern_wrapper").removeClass("current");
            var a = jQuery(this).addClass("current");
            var c = a.attr("id").substr(-1);
            jQuery(document).find("body").removeClass("bg_pattern_0 bg_pattern_1 bg_pattern_2 bg_pattern_3 bg_pattern_4 bg_pattern_5 bg_pattern_6 bg_pattern_7 bg_pattern_8 bg_pattern_9 bg_image_1 bg_image_2 bg_image_3 bg_image_4 bg_image_5 bg_image_6 body_style_wide body_style_boxed body_style_fullscreen").addClass("bg_image_" + c);
            jQuery(document).find("body").addClass("body_style_boxed");
            jQuery(document).find("#custom_options .switcher").css("left" , "0" , "!important");
            var page_content = jQuery('body').eq(0);
            if (page_content.hasClass("body_style_boxed")) {
                jQuery(document).find(".page_wrap").addClass("container");
            } else {
                    jQuery(document).find(".page_wrap").removeClass('container');
                }              
            b.preventDefault();
            return false
        });
    }
}

/*isotope*/
function isotope_filters_init() {
    "use strict";
    jQuery("#profile_gallery .isotope_filters").append("<a href=\"#\" data-filter=\"*\" class=\"theme_button active\">All</a><a href=\"#\" data-filter=\".flt_23\" class=\"theme_button\">Carrier</a><a href=\"#\" data-filter=\".flt_28\" class=\"theme_button\">Transportation</a><a href=\"#\" data-filter=\".flt_29\" class=\"theme_button\">Supply Management</a><a href=\"#\" data-filter=\".flt_25\" class=\"theme_button\">Delivery</a><a href=\"#\" data-filter=\".flt_27\" class=\"theme_button\">Change</a>");
}

/*preloader*/
function preloader() {
    "use strict";
    jQuery(".preloaderimg").fadeOut();
    jQuery(".preloader").delay(200).fadeOut("slow").delay(200, function(){
        jQuery(this).remove();
    });
}

