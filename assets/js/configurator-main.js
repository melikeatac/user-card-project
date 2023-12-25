$(document).ready(function () {
    var currentStep = currentStep || 1;
    showStep(currentStep);

    var totalStep = $('.right-area-1 .cs-content-main').length;
    function togglePasswordVisibility(toggleItem, passwordInput) {
        toggleItem = $('#' + toggleItem);
        passwordInput = $('#' + passwordInput);

        passwordInput.prop('type', (passwordInput.prop('type') === 'password') ? 'text' : 'password');
        toggleItem.toggleClass('icon-eye-open icon-eye-close');
    }

    $('.cs-pass-main [id^="cs-icon-close"]').on('click', function () {
        var clickedIcon = $(this).attr('id');
        const containInput = $(this).closest('.cs-pass-main').find('input').attr('id');
        togglePasswordVisibility(clickedIcon, containInput);
    })
    $('.cs-step-main-2 .cs-main-radiogroup .form-check-change').on('change', function () {
        $('#cs-continue-btn-1').addClass('active')
        if ($(this).find('.form-check-input').prop('checked')) {
            $('.change-area-label').removeClass('active3')
            $(this).find('.change-area-label').addClass('active3');
        }
    })

    // Check input control start
    $('.cs-login-form input, .cs-login-form select, .cs-login-form input[type="checkbox"], #forgotpass-modal input, #accordion_main_pp input').on('input', function () {
        var form = $(this).closest('.cs-login-form');
        var allInputs = form.find('input[type="password"], input[type="email"],input[type="text"], .cs-login-form select');
        var allCheck = form.find('input[type="checkbox"]');
        var allFilled = true;
        var allSelectsExist = form.find('select').length > 0;
        var allSelects = true;

        const phoneValue = form.find('#floatPhone-1').val()?.trim();
        var phoneRegex = /^\(\d{3}\) \d{3} \d{2} \d{2}$/;
        var isValidPhone = phoneRegex.test(phoneValue);
        console.log(phoneValue);
        if (phoneValue == null) {
            isValidPhone = true;
        }
        var enteredEmail = form.find(".floatingEmail-1").val()?.trim();
        var emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        var isValidEmail = emailRegex.test(enteredEmail);
        console.log(enteredEmail);
        if (enteredEmail == null) {
            isValidEmail = true;
        }
        console.log(isValidEmail, isValidPhone);
        if (allSelectsExist) {
            form.find('select').each(function () {
                if (!$(this).val()) {
                    allSelects = false;
                    return false;
                }
            });
        }

        allInputs.each(function () {
            if ($(this).val().trim() === '' && $(this).text() === '') {
                allFilled = false;
                return false;
            }
        });

        allCheck.each(function () {
            if (!$(this).prop('checked')) {
                allFilled = false;
                return false;
            }
        });
        if (allFilled && (allSelectsExist ? allSelects : true) && isValidPhone && isValidEmail) {
            form.find('.cs-btn-type-1').addClass("active");
            console.log(allFilled)
        } else {
            form.find('.cs-btn-type-1').removeClass("active");
        }
    });
    // Check input control end

    $('.cs-read-more').on('click', function () {
        $('.cs-other-list').toggleClass('active');
        $('.cs-read-more i').toggleClass('icon-arrow-up icon-arrow-down');
    })

    $('#cs-add-to-btn').on('click', function () {
        $('.cs-sec-1').addClass('deactive');
        $('.cs-sec-main').removeClass('active');
        $('.cs-sec-3').addClass('active');
    })
    $('.cs-to-download').on('click', function () {
        $('.cs-sec-1').addClass('deactive');
        $('.cs-sec-main').removeClass('active');
        $('.cs-sec-3').addClass('active');
    })
    $('#cs-doc-download-btn').on('click', function () {
        $('.cs-sec-1').addClass('deactive');
        $('.cs-sec-main').removeClass('active');
        $('.cs-sec-2').addClass('active');
    })
    $('.cs-to-main').on('click', function () {
        $('.cs-sec-1').removeClass('deactive');
        $('.cs-sec-main').removeClass('active');
    })
    $('#cs-newproject-btn-2').on('click', function () {
        $('.cs-sec-main').removeClass('active');
        $('.cs-sec-4').addClass('active');
    })


    $('#cs-mobile-menu-3').click(function () {
        $('.cs-product-configurator .cs-left-side-main').toggle();
    });

    $('.cs-menu-2 .cs-item').on('click', function () {
        $('#cs-next-btn-5').removeClass('active');
        $('#cs-next-btn-4').removeClass('active');
        $('#cs-next-btn-3').show();
        $('.cs-menu-2 .cs-item').removeClass('active');
        $(this).addClass('active');

        var menuItem = parseInt($(this).attr('step'));
        currentStep = menuItem;
        $('.cs-menu-2 .cs-item').each(function () {
            var currentStep = parseInt($(this).attr('step'));
            if (currentStep < menuItem) {
                $(this).find('i.icon-check').show();
                $(this).addClass('active2');
            }
            else if (currentStep >= menuItem && currentStep != 0 && currentStep != 1) {
                $(this).find('i.icon-check').hide();
                $(this).removeClass('active2');
            }

        });

        $(this).closest('.cs-product-configurator').find('.cs-content-main').each(function () {
            selectedTextShow($(this))

            var contentItem = parseInt($(this).attr('step'));
            var cardArea = $(this).find('.cs-card-area');
            var imageArea = $(this).find('.cs-pic-img-area')
            if (contentItem <= menuItem) {
                $(this).addClass('active1');
                cardArea.addClass('deactive');
                imageArea.addClass('deactive');
                if (contentItem === menuItem) {
                    cardArea.removeClass('deactive');
                    imageArea.removeClass('deactive');
                }
            }

            else {
                $(this).removeClass('active1');
                cardArea.removeClass('deactive');
                imageArea.removeClass('deactive');
            }
        });

    });


    // İÇERİK KISMINDA DEĞİŞİKLİK OLDUĞUNDA
    function selectedTextShow(selected) {

        $('input[type="radio"]:not(:checked) + .list-area-label').removeClass('active');
        $('input[type="radio"]:not(:checked) + .list-area-label').removeClass('active2');
        $('input[type="radio"]:not(:checked) + .list-area-label').removeClass('active3');
        var stepValue = selected.attr('step');

        var item = selected.find('input[type="radio"]:checked + .list-area-label');

        var item2 = selected.find('input[type="radio"]:checked + .list-area-label .cs-title-2');
        var selectedInfo = selected.find('.cs-info-select');
        var selectedInfoMenu = selected.closest('.cs-product-configurator').find('.cs-item[step="' + stepValue + '"] .cs-menu-info');
        var deactiveMenu = selected.closest('.cs-product-configurator')
            .find(selected)
            .filter(function () {
                return $(this).hasClass('deactive');
            });

        deactiveMenu.closest('.cs-product-configurator').find('.cs-item[step="' + stepValue + '"]').addClass('deactive');

        if (!selected.hasClass('deactive')) {
            selectedInfo.text(item.text())
            selectedInfoMenu.text(item.text())
        }
        if (item.hasClass('cs-inc-img')) {
            item.addClass('active2');
        }
        else {
            item.addClass('active');
        }
        if (item.hasClass('cs-inc-img-2')) {
            item.addClass('active3');
            selectedInfo.text(item2.text());
            selectedInfoMenu.text(item2.text());
        }
        else {
            item.addClass('active');
        }
    }
    $('.cs-content-main').on('change', function () {
        selectedTextShow($(this));
    })

    $("#cs-next-btn-3").click(function () {
        if (currentStep < totalStep) {
            currentStep++;
            showStep(currentStep);
        }

        $(".cs-menu-2 .cs-item").each(function () {
            if (currentStep === totalStep) {
                $('#cs-next-btn-5').addClass('active');
                $('#cs-next-btn-4').addClass('active');
                $('#cs-next-btn-3').hide();
            }
        })
    });

    $("#cs-back-btn-3").click(function () {
        if (currentStep > 1) {
            currentStep--;
            hideStep(currentStep);
        }
    });

    function showStep(step) {
        $(".cs-content-main").each(function (index, element) {
            selectedTextShow($(this));
            var cardArea = $(this).find('.cs-card-area');
            var imageArea = $(this).find('.cs-pic-img-area');
            var stepAttribute = parseInt($(element).attr('step'));

            if (stepAttribute <= step) {
                $(element).addClass('active1');
                cardArea.add(imageArea).addClass('deactive');

                if (stepAttribute === step) {
                    cardArea.add(imageArea).removeClass('deactive');
                }
            }
        });

        var menuItem = step;

        $('.cs-menu-2 .cs-item').each(function () {
            var currentStep = parseInt($(this).attr('step'));

            if (currentStep - 1 < menuItem) {
                $(this).addClass('active2');
                $(this).removeClass('active');
                $('.cs-menu-2 .cs-item').removeClass('active-red');
                $(this).addClass('active-red');

                if (currentStep < menuItem) {
                    $(this).find('i.icon-check').show();
                    $(this).find('.cs-menu-info').addClass('deactive');
                }
            } else if (currentStep >= menuItem && currentStep !== 0 && currentStep !== 1) {
                $(this).find('i.icon-check').hide();
                $(this).find('.cs-menu-info').removeClass('deactive');
                $(this).removeClass('active2');
            }
        });
    }

    function hideStep(step) {
        $('#cs-next-btn-5').removeClass('active');
        $('#cs-next-btn-4').removeClass('active');
        $('#cs-next-btn-3').show();
        $(".cs-content-main").each(function (index, element) {
            selectedTextShow($(this));
            var cardArea = $(this).find('.cs-card-area');
            var imageArea = $(this).find('.cs-pic-img-area');
            var stepAttribute = parseInt($(element).attr('step'));

            if (stepAttribute > step) {
                $(element).removeClass('active1');
                cardArea.add(imageArea).addClass('deactive');
            } else if (stepAttribute === step) {
                cardArea.add(imageArea).removeClass('deactive');
            }

            var menuItem = step;

            $('.cs-menu-2 .cs-item').each(function () {
                var currentStep = parseInt($(this).attr('step'));

                if (currentStep - 1 < menuItem) {
                    $(this).addClass('active2');
                    $('.cs-menu-2 .cs-item').removeClass('active-red');
                    $(this).addClass('active-red');
                    if (currentStep < menuItem) {
                        $(this).find('i.icon-check').show();
                        $(this).find('.cs-menu-info').addClass('deactive');
                    }
                } else if (currentStep >= menuItem && currentStep !== 0 && currentStep !== 1) {
                    $(this).find('i.icon-check').hide();
                    $(this).removeClass('active2');
                    $(this).removeClass('active');
                }
            });
        });
    }

    $('#cs-mobile-product-menu').click(function () {
        $('.cs-product-configurator .cs-left-side-main').toggle();
    });

    $('.cs-login-icon').on('click', function () {
        $('.cs-profile-modal').toggle();
        $('.cs-modal-backdrop').toggleClass('active', $('.cs-profile-modal').is(':visible'));
    });

    $('.cs-pp-close-btn').on('click', function (e) {
        e.preventDefault();
        $('.cs-profile-modal').hide();
        $('.cs-modal-backdrop').removeClass('active')
    })

    $('.cs-radio-area').each(function () {
        var currentArea = $(this);

        currentArea.find('input[type="radio"], input[type="checkbox"], input').on('input', function () {

            var checkedInputs = currentArea.find('input[type="radio"]:checked, input[type="checkbox"]:checked');
            var textInputs = currentArea.find('input').filter(function () {
                return $(this).val().trim() !== '';
            });

            currentArea.closest('.cs-sec-main').find('.cs-btn-type-1').toggleClass('active', checkedInputs.length > 0 || textInputs.length > 0);
        });
    });


})