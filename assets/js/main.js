/* Go Top Button Start */
var goTopButton1 = $('#goTpButton');
$(window).scroll(function () {
    if ($(window).scrollTop() > 200) {
        goTopButton1.addClass('show-active');
    } else {
        goTopButton1.removeClass('show-active');
    }

    /* Form Input Animation 1 Start */
    if ($('.cs-form-1').length > 0) {
        $('.cs-form-1 .mnt-anime-1').on('focusin change', function () {
            $(this).parent().find('label').addClass('active');
        });

        $('.cs-form-1 .mnt-anime-1').on('focusout change', function () {
            if (!this.value) {
                $(this).parent().find('label').removeClass('active');
            }
        });

        $(document).ready(function () {
            $('.cs-form-1 .mnt-anime-1').each(function () {
                if ($(this).val() != '') {
                    $(this).parent().find('label').addClass('active');
                }
            });
        });
    }
    /* Form Input Animation 1 End */
});

goTopButton1.bind('click', function () {
    $('html, body').scrollTop(0);
});
/* Go Top Button End */
