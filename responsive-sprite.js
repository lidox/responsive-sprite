function VideoThumbnail() {
	
	this.thumbnailClassName = 'video-thumbnail';
	this.thumbnailDivList = document.getElementsByClassName(this.thumbnailClassName);
	this.maxThumbnailNr = 0;
	this.isMouseMoveActive = false;
}

VideoThumbnail.prototype.setThumbnailClassName = function (thumbnailClassName) {
	this.thumbnailClassName = thumbnailClassName;
	this.thumbnailDivList = document.getElementsByClassName(this.thumbnailClassName);
};

VideoThumbnail.prototype.setThumbnailCountOfSprite = function (thumbnailCountOfSprite) {
	this.maxThumbnailNr = thumbnailCountOfSprite;
};

VideoThumbnail.prototype.setImageHeightInPercentage = function (imgHeightInPercentage) {
	var css = document.createElement("style");
	css.type = "text/css";
	var cssRules = '.'+ this.thumbnailClassName +' { width: 200%; height: 0; padding-bottom: ' + imgHeightInPercentage + '%; background-size: 200%; display:block;'
	css.innerHTML = cssRules;
	document.body.appendChild(css);
};

VideoThumbnail.prototype.displayThumbs = function () {
	for (var i = 0; i < this.thumbnailDivList.length; ++i) {					//default-thumb-nr
		var defaultThumbnailNr = this.thumbnailDivList[i].dataset.hasOwnProperty('thumbnail') ? this.thumbnailDivList[i].dataset.thumbnail : 1;
		var defaultBackgroundImg = this.thumbnailDivList[i].dataset.hasOwnProperty('img') ? this.thumbnailDivList[i].dataset.img : 1;
		this.thumbnailDivList[i].style.backgroundImage = 'url(' + defaultBackgroundImg + ')';
		var thumbnailMapWidth = this.getThumbnailMapWidthByDivElement(this.thumbnailDivList[i]);

		var xPosition = this.getXPositionByDefaultThumbnailNr(defaultThumbnailNr);
		this.setDivBackgroundByPosX(this.thumbnailDivList[i], xPosition);

		if (this.isMouseMoveActive) {
			this.setOnMouseMoveListenerByDivElement(this.thumbnailDivList[i], thumbnailMapWidth);
		}

		this.setOnMouseOutListenerByDivElement(this.thumbnailDivList[i], thumbnailMapWidth);
	}
};

VideoThumbnail.prototype.setMouseMoveActive = function () {
	this.isMouseMoveActive = true;
};

VideoThumbnail.prototype.getXPositionByDefaultThumbnailNr = function (defaultThumbnailNr) {
	var xPosition = 0;

	if (defaultThumbnailNr == 1) {
		xPosition = 0;
	} else if (defaultThumbnailNr == this.maxThumbnailNr) {
		xPosition = 100 + (100 / this.maxThumbnailNr * 2);
	} else {
		xPosition = (100 / (this.maxThumbnailNr - defaultThumbnailNr));
	}

	return xPosition;
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

VideoThumbnail.prototype.getThumbnailMapWidthByDivElement = function (divElem) {
	var imageSrc = divElem.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
	var image = new Image();
	image.src = imageSrc;
	return image.width;
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
		var percentagePos = 2 * (event.offsetX / this.offsetWidth);
		var curPx = self.getImageNrByMousePosition(thumbnailMapWidth, thumbnailMapWidth / self.maxThumbnailNr, percentagePos);
		var xPosition = self.getXPositionByDefaultThumbnailNr(curPx);
		self.setDivBackgroundByPosX(this, xPosition);
	};
};

VideoThumbnail.prototype.setOnMouseOutListenerByDivElement = function (divElem, thumbnailMapWidth) {
	var self = this;
	divElem.onmouseout = function (event) {
		var defaultThumbnailNr = this.dataset.hasOwnProperty('thumbnail') ? this.dataset.thumbnail : 0;
		var xPosition = self.getXPositionByDefaultThumbnailNr(defaultThumbnailNr);
		self.setDivBackgroundByPosX(this, xPosition);
	};
};

VideoThumbnail.prototype.setDivBackgroundImage = function (divElem) {
	var defaultThumbnailNr = divElem.dataset.hasOwnProperty('thumbnail') ? divElem.dataset.thumbnail : 1;
	var defaultBackgroundImg = divElem.dataset.hasOwnProperty('img') ? divElem.dataset.img : 1;
	divElem.style.backgroundImage = 'url(' + defaultBackgroundImg + ')';
	var thumbnailMapWidth = this.getThumbnailMapWidthByDivElement(divElem);
	this.setDivBackgroundByPosX(divElem, (thumbnailMapWidth - (defaultThumbnailNr * divElem.offsetWidth)));
};