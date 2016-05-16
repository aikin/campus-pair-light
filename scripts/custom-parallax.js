window.Parallax = function(config, backgroundContainerSelector, customWindowOffsets) {
    var backgroundContainer = $(backgroundContainerSelector);
    backgroundContainer.css('background-size', 'contain');
    backgroundContainer.css('background-repeat', 'no-repeat');

    var watcher = setInterval(function() {
        if($(_.last(config).section).length !== 0){
            clearInterval(watcher);
            parallax();
        }
    }, 10);

    $(window).scroll(parallax);

    function parallax(){
        var sectionConfigs = _.map(config, readConfig);

        var urls = _.chain(sectionConfigs).map(function(config){
            return 'url("' + config._pictureUrl + '")';
        }).join(', ').value();

        backgroundContainer.css('background-image', urls);


        var yPositions = _.chain(sectionConfigs).map(function(config){
            var picturePos = calcPicturePos(config);

            return Math.floor(picturePos) + 'px';
        }).join(', ').value();


        backgroundContainer.css('background-position-y', yPositions);
    }

    function readConfig(config) {
        var _sectionSelector = config.section;
        var _pictureUrl = config.pictureUrl;
        var _picHeight = config.pictureHeight;
        var _picWidth = config.pictureWidth;

        var _pictureHeight = (_picHeight / _picWidth) * backgroundContainer.width();
        return {_sectionSelector: _sectionSelector, _pictureUrl: _pictureUrl, _pictureHeight: _pictureHeight};
    }

    function calcPicturePos(config) {
        var section = $(config._sectionSelector);
        var sectionPos = section.offset().top;
        var sectionHeight = section.height();
        var sectionVisibility = calcSectionVisibility(sectionPos, sectionHeight);

        return sectionPos - sectionVisibility * (config._pictureHeight - sectionHeight);
    }

    function calcSectionVisibility(sectionPos, sectionHeight) {
        var sectionVanishOffset = -sectionHeight;
        var sectionOffset = sectionPos - getWindowTopPos();

        var sectionProgress = (sectionOffset - sectionVanishOffset) / (sectionHeight + getWindowHeight());
        return 1 - sectionProgress;
    }

    function getWindowTopPos() {
      return $(window).scrollTop() + customWindowOffsets.windowTopOffset;
    }

    function getWindowHeight() {
      return $(window).height() - customWindowOffsets.windowBottomOffset;
    }
};
