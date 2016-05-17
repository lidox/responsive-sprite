# responsive-sprite.js

### Description
Responsive-Sprite displays Video Preview Thumbnails.

### Demo
![demo-gif](https://cloud.githubusercontent.com/assets/7879175/15327639/7667f508-1c52-11e6-886d-b79f53db8d4b.gif)

### Installation
+ Download [responsive-sprite.js](https://raw.githubusercontent.com/lidox/responsive-sprite/master/responsive-sprite.js)

+ Add following code to your HTML:
```javascript
	<script>
		
		$(window).load(function(){
			var thumbs = new VideoThumbnail();
			
			// configuration
			thumbs.setThumbnailClassName('video-thumbnail2');
			thumbs.setThumbnailCountOfSprite(4);
			thumbs.setImageHeightInPercentage(42);
			thumbs.setMouseMoveActive();
			
			thumbs.displayThumbs();	
		});
		
	</script>

```
+ Now your HTML should contain these div elements
```HTML
<div class="video-thumbnail2" data-thumbnail="3" data-img="/images/sprite-example.jpg"></div>
```
