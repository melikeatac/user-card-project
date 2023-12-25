$(document).ready(function () {

    if ($('.cs-select2-1').length > 0) {
        $('.cs-select2-1').select2({
            minimumResultsForSearch: -1,
            dropdownCssClass: 'cs-select2-dd-1',
        });
    }

    // File ekleme butonlarının işlevselliği
    $('#cs-create-project').click(function () {
        $('.cs-modal-1').show();
        $('.cs-modal-2').hide();
    });

    $('#cs-newproject-btn').click(function (e) {
        e.preventDefault();
        $('.cs-modal-1').hide();
        $('.cs-modal-2').show();
    });

    $('.cs-radio-area input[name="folderRadios"]').change(function () {
        if ($(this).is(':checked')) {
            $('#cs-save-btn').addClass('active');
        }
        else {
            $('#cs-save-btn').removeClass('active');
        }
    });

    var modal = $('.cs-add-projects-area');
    // cs-add-project-modal dışında bir yere tıklandığında 
    // $(document).on('click', function (event) {
    //     if (!modal.is(event.target) && modal.has(event.target).length === 0) {
    //         $('.cs-add-project-modal').hide();
    //     }
    // });

    // Media alanındaki butonlar seçildiğinde yapılacak işlemler
    $('.cs-butons-list .cs-checkbtn').click(function () {
        $(this).toggleClass("active");
    });

    // Files kısmı ekstra butonların eklenmesi
    function filesBtnGroupVisible() {
        $('.cs-files-btn-group').removeClass('active');

        function handleCheckButton(boxItem, boxButton) {
            var allChecked = true;
            $(boxItem + ' .cs-g-box-1').each(function () {
                if ($(this).find('.cs-checkbtn.active').length === 0) {
                    allChecked = false;
                    return false;
                }
            });
            $(boxButton).toggleClass('active', allChecked);
        }

        if ($('#files-tab').hasClass('active')) {
            $('.cs-transfer-btn-group').removeClass('active');
            handleCheckButton('#files', '.cs-files-btn-group');
            $('#files .cs-checkbtn').on('click', function () {
                handleCheckButton('#files', '.cs-files-btn-group');
            });
        }

        else if ($('#transfer-tab').hasClass('active')) {
            $('.cs-files-btn-group').removeClass('active');
            handleCheckButton('#transfer', '.cs-transfer-btn-group');
            $('#transfer .cs-checkbtn').on('click', function () {
                handleCheckButton('#transfer', '.cs-transfer-btn-group');
            });
        }
        // else {
        //     $(boxButton).removeClass('active');
        // }
    }
    function updateButtonVisibility() {
        var activeTabIndex = $('#report-tab .nav-link.active').parent().index();
        var tabCount = $('#report-tab li').length;
        var activeTabIndex2 = $('#change-tab .nav-link.active').parent().index();
        var tabCount2 = $('#change-tab li').length;
        $('#cs-back-btn').css('display', activeTabIndex === 0 ? 'none' : 'inline-block');
        $('#cs-next-btn').css('display', activeTabIndex === tabCount - 1 ? 'none' : 'inline-block');
        $('#cs-back-btn-2').css('display', activeTabIndex2 === 0 ? 'none' : 'inline-block');
        // $('#cs-next-btn-2').css('display', activeTabIndex2 === tabCount2 - 1 ? 'none' : 'inline-block');
    }
    $('#report-tab .nav-link').on('click', function () {
        updateButtonVisibility();

        if ($(this).attr('id') == 'files-tab') {
            filesBtnGroupVisible();
        }
        else {
            filesBtnGroupVisible();
        }
    })

    // Report tag için ileri geri mekanizması
    updateButtonVisibility();

    $('#cs-back-btn').click(function () {
        var activeTabIndex = $('#report-tab .nav-link.active').parent().index();
        if (activeTabIndex > 0) {
            $('#report-tab li:eq(' + (activeTabIndex - 1) + ') button').tab('show');
        }
        updateButtonVisibility();
        filesBtnGroupVisible();
    });

    $('#cs-next-btn').click(function () {
        var activeTabIndex = $('#report-tab .nav-link.active').parent().index();
        var tabCount = $('#report-tab li').length;
        if (activeTabIndex < tabCount - 1) {
            $('#report-tab li:eq(' + (activeTabIndex + 1) + ') button').tab('show');
        }
        filesBtnGroupVisible();
        updateButtonVisibility();
    });


    function finishBtn() {
        var item_count = $('#changeModal').find('.cs-step-main').length;
        var activeItem = $('#changeModal').find('.nav-link.active').attr('controls1');
        var numericValue = activeItem.split('-')[2];

        if (item_count == numericValue) {
            $('#cs-next-btn-2').text('Finish');
        }
        else {
            $('#cs-next-btn-2').text('Next');
        }
    }

    // Change tagı için ileri geri mekanizması başlangıç
    $('#cs-back-btn-2').click(function () {

        var activeTabIndex = $('#change-tab .nav-link.active').parent().index();
        if (activeTabIndex > 0) {
            $('#change-tab li:eq(' + (activeTabIndex - 1) + ') button').tab('show');
        }
        $(this).closest('#changeModal').find('.cs-step-main').each(function () {
            var list_img = $(this).attr('id');
            var list_item = $(this).closest('#changeModal').find('#change-tab .nav-link.active').attr('controls1');

            if (list_item == list_img) {
                var nextStep = $(this).closest('.cs-step-main').next('.cs-step-main').attr('id');
                $('#' + nextStep).removeClass('active');
                $(this).find('.cs-main-radiogroup').removeClass('deactive');
                $(this).find('.cs-selected-info').text('');
                $(this).find('.cs-head i').removeClass('active');
            }
            finishBtn();
        });
        updateButtonVisibility();

    });

    $('#cs-next-btn-2').click(function () {
        $('.cs-step-main.active .cs-main-radiogroup .form-check-change').each(function () {
            selectedTextInfo($(this));
        })

        var activeTabIndex = $('#change-tab .nav-link.active').parent().index();
        var tabCount = $('#report-tab li').length;
        if (activeTabIndex < tabCount - 1) {
            $('#change-tab li:eq(' + (activeTabIndex + 1) + ') button').tab('show');
        }
        $(this).closest('#changeModal').find('.cs-step-main').each(function () {
            var list_img = $(this).attr('id');
            var list_item = $(this).closest('#changeModal').find('#change-tab .nav-link.active').attr('controls1');

            if (list_item == list_img) {
                $('#' + list_img).addClass('active');
                $('.cs-main-radiogroup').addClass('deactive');
                var stepmain_id1 = $(this).attr('id');
                $('#' + stepmain_id1 + ' .cs-main-radiogroup').removeClass('deactive')
            }
            finishBtn();
        });
        updateButtonVisibility();

    });

    // Tab kısmında değişiklik olduğunda
    $('.cs-step-main').click(function () {
        var clickedButtonId = $(this).attr('controls1');
        var numericValue1 = clickedButtonId.split('-')[2];
        $('.cs-step-main .cs-main-radiogroup .form-check-change').each(function () {
            var numericValue2 = $(this).closest('.cs-step-main').attr('controls1').split('-')[2];

            if (numericValue2 >= numericValue1) {
                $(this).closest('.cs-step-main').find('.cs-selected-info').text('');
                $(this).closest('.cs-step-main').find('.cs-head i').removeClass('active');
            }
        })
        $('input[type="radio"]:not(:checked) + .change-area-label').removeClass('active');
        $('input[type="radio"]:not(:checked) + .change-area-label').removeClass('active2');
        $('input[type="radio"]:not(:checked) + .change-area-label').removeClass('active3');
        var item = $(this).find('input[type="radio"]:checked + .change-area-label');

        if (item.hasClass('cs-inc-img')) {
            item.addClass('active2');
        }
        else {
            item.addClass('active');
        }
        if (item.hasClass('cs-inc-img-2')) {
            item.addClass('active3');
        }
        else {
            item.addClass('active');
        }
        $('#change-tab button').removeClass('active');
        $(this).prevAll().addBack().addClass('active');
        $(this).closest('#changeModal').find('.cs-step-main').each(function () {
            var list_img = $(this).attr('id');
            if ($(this).index() <= $('#' + clickedButtonId).index()) {
                $('#' + list_img).addClass('active');
            } else {
                $('#' + list_img).removeClass('active');
            }
            if (clickedButtonId == list_img) {
                var stepmain_id2 = $(this).attr('id');
                $('.cs-main-radiogroup').addClass('deactive')
                $('#' + stepmain_id2 + ' .cs-main-radiogroup').removeClass('deactive');
            }
        });
        if ($('#change-tab .nav-link[controls1="' + clickedButtonId + '"]').length > 0) {
            $('#change-tab .nav-link').removeClass('active');
            $('#change-tab .nav-link[controls1="' + clickedButtonId + '"]').addClass('active');
        }
        finishBtn();

    });

    $('#change-tab button').click(function () {
        updateButtonVisibility();
        var clickedButtonId = $(this).attr('controls1');
        var numericValue1 = clickedButtonId.split('-')[2];
        $('.cs-step-main .cs-main-radiogroup .form-check-change').each(function () {
            var numericValue2 = $(this).closest('.cs-step-main').attr('controls1').split('-')[2];
            if (numericValue2 < numericValue1) {
                selectedTextInfo($(this));
            }
            if (numericValue2 >= numericValue1) {
                $(this).closest('.cs-step-main').find('.cs-selected-info').text('');
                $(this).closest('.cs-step-main').find('.cs-head i').removeClass('active');
            }
        });

        $('#change-tab button').removeClass('active');
        $(this).closest('#changeModal').find('.cs-step-main').each(function () {
            var list_img = $(this).attr('id');
            if ($(this).index() <= $('#' + clickedButtonId).index()) {
                $('#' + list_img).addClass('active');
            } else {
                $('#' + list_img).removeClass('active');
            }
            if (clickedButtonId == list_img) {
                var stepmain_id2 = $(this).attr('id');
                $('.cs-main-radiogroup').addClass('deactive')
                $('#' + stepmain_id2 + ' .cs-main-radiogroup').removeClass('deactive');
            }
        });
        if ($('#change-tab .nav-link[controls1="' + clickedButtonId + '"]').length > 0) {
            $('#change-tab .nav-link').removeClass('active');
            $('#change-tab .nav-link[controls1="' + clickedButtonId + '"]').addClass('active');
        }
        finishBtn();
    });

    // Radio butonların aktifliği
    function selectedTextInfo(item1) {
        $('input[type="radio"]:not(:checked) + .change-area-label').removeClass('active');
        $('input[type="radio"]:not(:checked) + .change-area-label').removeClass('active2');
        $('input[type="radio"]:not(:checked) + .change-area-label').removeClass('active3');
        var item = item1.find('input[type="radio"]:checked + .change-area-label');
        var item2 = item1.find('input[type="radio"]:checked + .change-area-label .cs-title-2');
        var selected_id = item.closest('.cs-step-main').attr('id');
        var selected_infotext = $('#' + selected_id).find('.cs-selected-info');
        var selected_infoIcon = $('#' + selected_id).find('i');

        selected_infotext.text(item.text());
        selected_infoIcon.addClass('active');
        if (item.hasClass('cs-inc-img')) {
            item.addClass('active2');
        }
        else {
            item.addClass('active');
        }
        if (item.hasClass('cs-inc-img-2')) {
            item.addClass('active3');
            selected_infotext.text(item2.text())
        }
        else {
            item.addClass('active');
        }
    }

    $('.js-play-input').click(function () {
        var video = $('.js-play-video')[0];
        if (video.paused) {
            video.play();
            $(this).find('i').removeClass('icon-play')
            $(this).find('i').addClass('icon-pause')
        } else {
            video.pause();
            $(this).find('i').removeClass('icon-pause')
            $(this).find('i').addClass('icon-play')
        }
    });

    $('.cs-right-side-main .cs-button-list button,.cs-right-side-main .cs-button-list-mobile button').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });

    $('#cs-mobile-menu-2').click(function () {
        $('.cs-module-configurator .cs-left-side-main').toggle();
    });
});