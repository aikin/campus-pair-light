$(function () {
    function getWindowWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }

    var wookmark;

    $('#container').imagesLoaded()
        .done(function (instance) {
            wookmark = new Wookmark('#container', {
                itemWidth: function () {
                    if (getWindowWidth() < 768) return "100%";
                    return getWindowWidth() < 960 ? '40%' : '24%'
                },
                outerOffset: 20,
                flexibleWidth: true,
                autoResize: true,
                onLayoutChanged: function () {
                    var $hero = $('.hero--tint');
                    if (getWindowWidth() < 960) {
                        $hero.removeClass('hover');
                        $hero.click(function () {
                            event.preventDefault();
                            $hero.removeClass('hover');
                            $(this).addClass('hover');
                            $('#intro-modal p').html($('#hero-' + $(this).children('img').attr('id')).html());
                            $('#intro-modal').modal();
                            $('#intro-modal pre').perfectScrollbar();
                        }).unbind('mouseenter mouseleave');

                        return
                    }

                    $('.ghost-btn-line-frame__content').hover(function () {
                        $hero.removeClass('hover');
                        var $parents = $(this).parents('.hero--tint');
                        $parents.addClass('hover');
                        $('.hero-show').html($('#hero-' + $parents.children('img').attr('id')).html());
                        $('.intro pre').perfectScrollbar();
                    }).unbind('click');

                    setTimeout(function () {
                        $('.auto-hover')
                            .trigger('mouseenter')
                            .parents('.hero--tint')
                            .addClass('hover');
                    }, 1000);
                }
            });
            setTimeout(function () {
                $('.auto-hover')
                    .trigger('mouseenter')
                    .parents('.hero--tint')
                    .addClass('hover');
            }, 1000);
        });
});





