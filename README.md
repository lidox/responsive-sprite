# responsive-sprite.js

### Demo
![demo-gif](https://cloud.githubusercontent.com/assets/7879175/15245758/e4e9c576-1908-11e6-9d53-51ce3023e726.gif)

### Installation
1. Dowload responsive-sprite.js

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
3. Now your HTML should contain these divs elements
```HTML
<div class="video-thumbnail2" data-thumbnail="3" data-img="/images/sprite-example.jpg"></div>
```
