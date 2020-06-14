var Ball = function() {
    var image = imageFromPath('ball.png')
    var o = {
        image : image,
        x : 300,
        y : 400,
        speedX : 10,
        speedY : 10,
        fired : false,
    }

    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            if (o.x < 0 || o.x > 800){
                o.speedX *= -1
            }
            if (o.y < 0 || o.y > 600){
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.反弹 = function() {
        o.speedY *= -1
    }
    return o
}