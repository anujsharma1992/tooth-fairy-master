/* javascript */
function admingppResize() {
    $('.adminPopup').each(function() {
        var gppDiv = $(this).find('.popContainer');
        var gppHeight = gppDiv.height();
        if (gppHeight >= ($(window).height())) {
            $(this).addClass('relative');
        } else {
            $(this).removeClass('relative');
        }
    });
}
/* jquery */
$(function() {
    $(window).resize(function() {
        admingppResize();
    });
});

function showMessage(e) {
    $('#' + e).fadeIn('fast');
    $('#' + e).find('.popContainer').css({
        'marginTop': '-' + ($('#' + e).find('.popContainer').height() / 2) + 'px'
    }, 100, 'linear');
    //$('html').css({'overflow':'hidden'});
    admingppResize();
}

function admingppClose(e) {
    $('#' + e).fadeOut('fast');
    //$('html').css({'overflow':'scroll'});
}