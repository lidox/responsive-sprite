# responsive-sprite.js :boom:

### Description
Responsive-Sprite displays video preview thumbnails on mouse over (hover). It's a diashow.

### Demo
![demo-gif](https://cloud.githubusercontent.com/assets/7879175/15327639/7667f508-1c52-11e6-886d-b79f53db8d4b.gif)

### Installation
+ Download [responsive-sprite.js](https://raw.githubusercontent.com/lidox/responsive-sprite/master/responsive-sprite.js)

+ Add following code to your HTML:
```javascript
    <script>
        $( document ).ready(function() {
            var thumbs = new VideoThumbnail();
            thumbs.setThumbnailClassName('this-is-spartaaa');
            thumbs.setThumbnailCountOfSprite(6);
            thumbs.imagePaddingBottomInPercentage(100);
            thumbs.setMouseMoveActive();
            thumbs.displayThumbs();
            
            // example 2: fifty-images
            var thumbsSecondRow = new VideoThumbnail();
            thumbsSecondRow.setThumbnailClassName('fifty-images');
            thumbsSecondRow.setThumbnailCountOfSprite(50);
            thumbsSecondRow.imagePaddingBottomInPercentage(43);
            thumbsSecondRow.setMouseMoveActive();
            thumbsSecondRow.displayThumbs();
        });
    </script>

```
+ Now your HTML should contain these div elements
```HTML
<div class="this-is-spartaaa" data-defaultimgnr="5" data-img="/assets/super-sprite.jpg"></div>
```
