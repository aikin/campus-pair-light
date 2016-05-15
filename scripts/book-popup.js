$(document).ready(function() {
    var time = setInterval(function() {
        if ($('.image-popup-vertical-fit')[0] !== undefined) {
            clearInterval(time)
        }

        $('.image-popup-no-margins').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-with-zoom',
            image: {
                verticalFit: true
            },
            zoom: {
                enabled: true,
                duration: 300
            }
        });
    }, 1);
});