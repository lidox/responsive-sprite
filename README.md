# responsive-sprite.js

### Demo
![demo-gif](https://cloud.githubusercontent.com/assets/7879175/15247175/ac6a4d56-1912-11e6-99b0-4298263d7574.gif)

### Installation
1. Download responsive-sprite.js

2. Add following code to your HTML:
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
3. Now your HTML should contain these div elements
```HTML
<div class="video-thumbnail2" data-thumbnail="3" data-img="/images/sprite-example.jpg"></div>
```
