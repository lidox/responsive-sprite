function VideoThumbnail() {
	
	this.thumbnailClassName = 'video-thumbnail';
	this.thumbnailDivList = document.getElementsByClassName(this.thumbnailClassName);
	this.maxThumbnailNr = 0;
	this.isMouseMoveActive = false;
	this.defaultThumbNrName = 'defaultimgnr';
    this.imageFitSize = 100;
}

VideoThumbnail.prototype.setThumbnailClassName = function (thumbnailClassName) {
	this.thumbnailClassName = thumbnailClassName;
	this.thumbnailDivList = document.getElementsByClassName(this.thumbnailClassName);
};

VideoThumbnail.prototype.setThumbnailCountOfSprite = function (thumbnailCountOfSprite) {
	this.maxThumbnailNr = thumbnailCountOfSprite;
    this.imageFitSize = thumbnailCountOfSprite * 100;
};

VideoThumbnail.prototype.imagePaddingBottomInPercentage = function (imagePaddingBottomInPercentage, imageFitSizeInPercentage) {
	var css = document.createElement("style");
	css.type = "text/css";
	var cssRules = '.'+ this.thumbnailClassName +' { width: '+ 100 +'%; height: 0; padding-bottom: ' + imagePaddingBottomInPercentage + '%; background-size: ' + this.imageFitSize + '%; display:block; background-repeat: no-repeat; margin:0 auto;'
	css.innerHTML = cssRules;
	document.body.appendChild(css);
};

VideoThumbnail.prototype.setMouseMoveActive = function () {
	this.isMouseMoveActive = true;
};

VideoThumbnail.prototype.getXPositionByDefaultThumbnailNr = function (defaultThumbnailNr) {
	var xPosition = 0;
    xPosition = (100 / (this.maxThumbnailNr - 1));
    xPosition = xPosition * (defaultThumbnailNr - 1);
	return xPosition;
};

VideoThumbnail.prototype.getXPositionByDefaultThumbnailNr2 = function (defaultThumbnailNr) {
	return -1;
};

VideoThumbnail.prototype.getImageNrByMousePosition = function (thumbnailMapWidth, thumbnailWidth, currentThumbnailMapPosition) {
	currentThumbnailMapPosition *= thumbnailMapWidth;
	var imageNr = 0
		, minDeviation = currentThumbnailMapPosition
		, summedThumbnailWidth = thumbnailWidth
		, maxImageNr = (thumbnailMapWidth / thumbnailWidth);

	for (var currentImageNr = 0; currentImageNr <= maxImageNr; currentImageNr++) {
		var now = Math.abs((currentThumbnailMapPosition - summedThumbnailWidth));
		if (now < minDeviation) {
			minDeviation = now;
			imageNr = currentImageNr;
		}
		summedThumbnailWidth += thumbnailWidth;
	}
	imageNr += 1;
	return imageNr;
};

VideoThumbnail.prototype.setDivBackgroundByPosX = function (divElem, xPosition) {
	if (xPosition == 0) {
		divElem.style.backgroundPosition = xPosition + 'px ' + 0 + 'px';
	} else {
		divElem.style.backgroundPosition = xPosition + '% ' + 0 + 'px';
	}
};

VideoThumbnail.prototype.setOnMouseMoveListenerByDivElement = function (divElem, thumbnailMapWidth) {
	var self = this;
	divElem.onmousemove = function (event) {
		var percentagePos = (event.offsetX / this.offsetWidth);
		var curPx = self.getImageNrByMousePosition(thumbnailMapWidth, thumbnailMapWidth / self.maxThumbnailNr, percentagePos);
		var xPosition = self.getXPositionByDefaultThumbnailNr(curPx);
		self.setDivBackgroundByPosX(this, xPosition);
	};
};

VideoThumbnail.prototype.setOnMouseOutListenerByDivElement = function (divElem, thumbnailMapWidth) {
	var self = this;
	divElem.onmouseout = function (event) {
		var defaultThumbnailNr = this.dataset.hasOwnProperty(self.defaultThumbNrName) ? this.dataset.defaultimgnr : 0;
		var xPosition = self.getXPositionByDefaultThumbnailNr(defaultThumbnailNr);
		self.setDivBackgroundByPosX(this, xPosition);
	};
};

VideoThumbnail.prototype.setDivBackgroundImage = function (divElem) {
	var defaultThumbnailNr = divElem.dataset.hasOwnProperty(self.defaultThumbNrName) ? divElem.dataset.defaultimgnr : 1;
	var defaultBackgroundImg = divElem.dataset.hasOwnProperty('img') ? divElem.dataset.img : 1;
	divElem.style.backgroundImage = 'url(' + defaultBackgroundImg + ')';
    
    var self = this;
    var thumbnailMapWidth = 0;
	this.getThumbnailMapWidthByDivElement(divElem, function(imageWidth) { 
        thumbnailMapWidth = imageWidth;
        self.setDivBackgroundByPosX(divElem, (thumbnailMapWidth - (defaultThumbnailNr * divElem.offsetWidth)));
    });
    
	
};

VideoThumbnail.prototype.displayThumbs = function () {
	for (var i = 0; i < this.thumbnailDivList.length; ++i) {
		var defaultThumbnailNr = this.thumbnailDivList[i].dataset.hasOwnProperty(this.defaultThumbNrName) ? this.thumbnailDivList[i].dataset.defaultimgnr : 1;
		var defaultBackgroundImg = this.thumbnailDivList[i].dataset.hasOwnProperty('img') ? this.thumbnailDivList[i].dataset.img : 1;
		this.thumbnailDivList[i].style.backgroundImage = 'url(' + defaultBackgroundImg + ')';
		
        var thumbnailMapWidth = 0;
        var self = this;
        var divItem = this.thumbnailDivList[i];
        this.getThumbnailMapWidthByDivElement(divItem, defaultThumbnailNr, function(imageWidth, divElem, defaultThumbNr) { 
            thumbnailMapWidth = imageWidth;
            divItem = divElem;
            defaultThumbnailNr = defaultThumbNr;
            var xPosition = self.getXPositionByDefaultThumbnailNr(defaultThumbnailNr);
            self.setDivBackgroundByPosX(divItem, xPosition);
            if (self.isMouseMoveActive) {
                self.setOnMouseMoveListenerByDivElement(divItem, thumbnailMapWidth);
                self.setOnMouseOutListenerByDivElement(divItem, thumbnailMapWidth);
            }
        });
	}
};

VideoThumbnail.prototype.getThumbnailMapWidthByDivElement = function (divElem, defaultThumbnailNr, callback) {
	var imageSrc = divElem.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
	var image = new Image();
    image.src = imageSrc;
   
    image.onload = function(){
        callback(image.width, divElem, defaultThumbnailNr);
    };
};