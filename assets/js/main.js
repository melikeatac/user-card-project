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

$(document).ready(function () {
    var languageArea = $('.cs-language-area');
    var iconGlobal = $('.cs-header-list .icon-global');

    iconGlobal.on('click', function (event) {
        event.stopPropagation();
        languageArea.toggleClass('active');
    });

    $(document).on('click', function (event) {
        if (!languageArea.is(event.target) && languageArea.has(event.target).length === 0) {
            languageArea.removeClass('active');
        }
    });
    $('#cs-add-btn-1').click(function () {
        $('.cs-add-project-modal').show();
    });
    $('.cs-file-icon').click(function () {
        if ($('.cs-top-bar').length > 0) {
            $('.cs-add-project-modal').addClass('headopen2');
        }
        else {
            $('.cs-add-project-modal').addClass('headopen');
        }
        $('.cs-add-project-modal').show();
    });

    $('#cs-close-btn').click(function () {
        $('.cs-add-project-modal').hide();
        $('.cs-add-project-modal').removeClass('headopen2');
        $('.cs-add-project-modal').removeClass('headopen');

    })

});
