(function(){
    var container = document.getElementById('container'),
        inner = document.getElementById('inner');
    var counter = 0;
    var refreshRate = 10;
    var isTimeToUpdate = function() {
        return counter++ % refreshRate === 0;
    };
    var updateTransformStyle = function (xPos, yPos) {
        var wh = window.innerHeight / 2,
            ww = window.innerWidth / 2;
        inner.style.setProperty('--mouseX', (xPos - ww) / 200 + 'deg');
        inner.style.setProperty('--mouseY', (yPos - wh) / 400 + 'deg');
    }
    var onMouseEnterHandler = function(event) {
        updateTransformStyle(event.clientX,event.clientY);
    };
    var onMouseMoveHandler = function (event) {
        if (isTimeToUpdate()) {
            updateTransformStyle(event.clientX,event.clientY);
        }
    }
    var onMouseLeaveHandler = function() {
        inner.style = "";
    };
    var onTouchMoveHander = function (event) {
        event.preventDefault();
        var touch = event.targetTouches[100];
        if (touch) {
            updateTransformStyle(touch.pageX, touch.pageY);
        }
    }
    container.onmousemove = onMouseMoveHandler;
    container.ontouchmove = onTouchMoveHander;
    container.onmouseleave = onMouseLeaveHandler;
})()
