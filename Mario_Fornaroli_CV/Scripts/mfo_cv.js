$(document).ready(function () {
    $('.comment_form input, .comment_form textarea').focus(function () {
        $(this).css({ "-webkit-box-shadow": "0px 0px 0px rgba(0, 0, 0, 0)", "-moz-box-shadow": "0px 0px 0px rgba(0, 0, 0, 0)", "box-shadow": "0px 0px 0px rgba(0, 0, 0, 0)", "border": "1px solid #999" });
    });
    $('.comment_form input, .comment_form textarea').blur(function () {
        $(this).css({ "-webkit-box-shadow": "0px 0px 0px rgba(0, 0, 0, 0)", "-moz-box-shadow": "0px 0px 0px rgba(0, 0, 0, 0)", "box-shadow": "0px 0px 0px rgba(0, 0, 0, 0)", "border": "1px solid #e0e0e0" });
    });
    window.scrollBy(0, 1);
    window.scrollBy(0, -1);
    
});
//$(".send-button").click(function () {
//    if ($('.comment_form').parsley('validate')) {
//        var form_name = $("#form_name").val();
//        var form_email = $("#form_email").val();
//        var form_message = $("#form_message").val();
//        $.post("php/mailer.php", { name: form_name, email: form_email, message: form_message }, function (results) {
//            alert(results);
//        });
//    }
//});
$(window).on('load resize', function () {
    current_width = $(window).width();
    if (current_width < 767) {
        $("br").hide();
    } else {
        $("br").show();
    }
});

// Cache selectors
if ($(window).width() > 940) {
    var lastId,
        topMenu = $("#site_nav")
    topMenuHeight = topMenu.outerHeight() + 40,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });
} else {
    var lastId,
        topMenu = $("#site_nav")
    topMenuHeight = topMenu.outerHeight() - 140,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

}


// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          .parent().removeClass("active")
          .end().filter("[href=#" + id + "]").parent().addClass("active");
    }
});// $('.scrollup').fadeIn();

$(window).scroll(function () {
    var pos = $(window).scrollTop();
    if (pos > 55 && current_width > 940) {
        $(".site_nav").css({
            "position": "fixed",
            "top": "0",
            "width": "940px",
            "margin-bottom": "55px",
        });
        $("#aftermenuspace").css({
            "height": "55px",
        });
    } else {
        $(".site_nav").css({
            "position": "relative",
            "margin-bottom": "0",
            "width": "100%",
        });
        $("#aftermenuspace").css({
            "height": "0",
        });
    }
    if (pos > 600) { $('.upbtn').fadeIn(); } else { $('.upbtn').fadeOut(); }
});

$('.upbtn').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
});


$('#sendAjax').click(function () {
    var _form_name = $('#form_name').val();
    var _form_email = $('#form_email').val();
    var _form_message = $('#form_message').val();
    $.ajax({
        url: '/Home/ContactMe',
        contentType: 'application/html; charset=utf-8',
        data: { form_name: _form_name, form_email: _form_email, form_message: _form_message },
        dataType: "json",
        error: function (data) {
            console.log(data);
            $("#sendMailResult").html("<i class=\"fa fa-check\"></i>" + data);
            $("#sendMailResult").addClass("mailError");
        },
        success: function (data) {
            if (data.res === true) {
                $("#sendMailResult").html("<i class=\"fa fa-check\"></i>" + data.resStr);
                $("#sendMailResult").removeClass("mailError");
                $("#sendMailResult").addClass("mailSuccess");
            }
            else {
                $("#sendMailResult").html("<i class=\"fa fa-times\"></i>" + data.resStr);
                $("#sendMailResult").removeClass("mailSuccess");
                $("#sendMailResult").addClass("mailError");
            }
            console.log(data);            
        }
    })
});


$("#enLang").attr("href", "/Home/SetCulture?culture=en");
$("#itLang").attr("href", "/Home/SetCulture?culture=it");
$("#frLang").attr("href", "/Home/SetCulture?culture=fr");