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

    $(window).resize(parallax);

    function parallax(){
        var urls = _.chain(config).map(function(config){
            return 'url("' + config.pictureUrl + '")';
        }).join(', ').value();

        backgroundContainer.css('background-image', urls);


        var yPositions = _.chain(config).map(function(config){
            var picturePos = calcPicturePos(config);

            return Math.floor(picturePos) + 'px';
        }).join(', ').value();


        backgroundContainer.css('background-position-y', yPositions);
    }

    function calcPicturePos(config) {
        var section = $(config.section);
        var sectionPos = section.offset().top;
        var sectionHeight = section.height();
        var sectionVisibility = calcSectionVisibility(sectionPos, sectionHeight);

        var sectionAnimatedDistance = calcSectionAnimatedDistance(config, sectionPos, sectionHeight, sectionVisibility);
        return sectionPos - sectionVisibility * sectionAnimatedDistance;
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

    function getPictureHeight(config) {
      var _picHeight = config.pictureHeight;
      var _picWidth = config.pictureWidth;
      return (_picHeight / _picWidth) * backgroundContainer.width();
    }

    function calcSectionAnimatedDistance(config, sectionPos, sectionHeight, sectionVisibility) {
      var sectionAnimatedDistance = getPictureHeight(config) - sectionHeight;
      if(sectionAnimatedDistance < 0) {
        return 0;
      }
      return sectionAnimatedDistance;
    }
};
