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

$("#fileInput").change(function() {
    var file = this.files[0];
    $("#previewImage").attr("src", file ? URL.createObjectURL(file) : "assets/img/pp.png");
});
/* Select2 1 Start */
$(document).ready(function() {
    if($('.cs-global-select2-1').length > 0){
        $('.cs-global-select2-1').select2({
            dropdownCssClass: 'cs-global-select2-dd-1',
        });
    }
});
/* Select2 1 End */