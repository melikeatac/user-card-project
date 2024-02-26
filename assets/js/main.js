function togglePasswordVisibility(toggleItem, passwordInput) {
    toggleItem = $('#' + toggleItem);
    passwordInput = $('#' + passwordInput);

    passwordInput.prop('type', (passwordInput.prop('type') === 'password') ? 'text' : 'password');
    toggleItem.toggleClass('far fa-eye far fa-eye-slash');
}
$('.cs-pass-main [id^="cs-icon-close"]').on('click', function () {
    var clickedIcon = $(this).attr('id');
    const containInput = $(this).closest('.cs-pass-main').find('input').attr('id');
    togglePasswordVisibility(clickedIcon, containInput);
})