var Block = function(position) {
    // 参数的格式是[1, 1]
    var p = position
    var image = imageFromPath('block.png')
    var o = {
        image : image,
        x : p[0],
        y : p[1],
        w : 60,
        h : 20,
        alive : true,
        lifes : p[2] || 1 
    }

    o.kill = function() {
        o.lifes--
        if (o.lifes < 1){
            o.alive = false
        }
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
    
    o.collide = function(ball) {
        return o.alive && (rectIntersects(o, ball) || rectIntersects(ball, o))
    }
    return o
}