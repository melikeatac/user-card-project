$(document).ready(function () {

    if ($('.cs-select2-1').length > 0) {
        $('.cs-select2-1').select2({
            minimumResultsForSearch: -1,
            dropdownCssClass: 'cs-select2-dd-1',
        });
    }

    // File ekleme butonlarının işlevselliği start
    $('#cs-create-project').click(function () {
        console.log("tıklandı")
        $('.cs-modal-1').show();
        $('.cs-modal-2').hide();
    });

    $('#cs-newproject-btn').click(function (e) {
        e.preventDefault();
        $('.cs-modal-1').hide();
        $('.cs-modal-2').show();
    });

    $('#cs-add-btn-1').click(function () {
        $('.cs-add-project-modal').show();
    });

    $('#cs-close-btn').click(function () {
        $('.cs-add-project-modal').hide();
    })
    // File ekleme butonlarının işlevselliği end

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
    $(document).on('click', function (event) {
        if (!modal.is(event.target) && modal.has(event.target).length === 0) {
            $('.cs-add-project-modal').hide();
        }
    });

    // Media alanındaki butonlar seçildiğinde yapılacak işlemler başlangıç
    $('.cs-butons-list button').click(function () {
        $(this).toggleClass("active");
    });
    // Media alanındaki butonlar seçildiğinde yapılacak işlemler bitiş

    // Files kısmı eekstra butonların eklenmesi başlangıç
    function filesBtnGroupVisible() {
        if ($('#files-tab').hasClass('active')) {
            $('.cs-files-btn-group').addClass('active');
        }
        else {
            $('.cs-files-btn-group').removeClass('active');
        }
    }
    // Files kısmı ekstra butonların eklenmesi bitiş

    $('#report-tab .nav-link').on('click', function () {

        if ($(this).attr('id') == 'files-tab') {
            filesBtnGroupVisible();
        }
        else {
            filesBtnGroupVisible();
        }
    })

    // Report tag için ileri geri mekanizması başlangıç
    $('#cs-back-btn').click(function () {
        var activeTabIndex = $('#report-tab .nav-link.active').parent().index();
        if (activeTabIndex > 0) {
            $('#report-tab li:eq(' + (activeTabIndex - 1) + ') button').tab('show');
        }
        filesBtnGroupVisible();
    });

    $('#cs-next-btn').click(function () {
        var activeTabIndex = $('#report-tab .nav-link.active').parent().index();
        var tabCount = $('#report-tab li').length;
        if (activeTabIndex < tabCount - 1) {
            $('#report-tab li:eq(' + (activeTabIndex + 1) + ') button').tab('show');
        }
        filesBtnGroupVisible();
    });
    // Report tag için ileri geri mekanizması bitiş

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
    });

    $('#cs-next-btn-2').click(function () {
        $('.cs-step-main.active .cs-main-radiogroup .form-check-change').each(function () {
            console.log(this)
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

    $('.cs-right-side-main .cs-button-list button').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });
});