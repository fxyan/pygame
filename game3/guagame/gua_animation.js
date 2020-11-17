class GuaAnimation {
    constructor(game) {
        this.game = game
        this.animations = {
            idle: [],
        }
        for (var i = 1; i < 4; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
        this.flipx = false
        this.rotation = 0
        this.alpha = 1
        this.gy = 10
        this.vy = 0

    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        if (this.y > 0) {
            this.vy = -10
        }
        this.rotation = -90
    }
    update(ground) {
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 470
        if (this.y > h) {
            this.y = h
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 45
        }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
        // if(this.animations['idle'].length > 0 && ground.length > 0) {
        //     for (var i = 0; i < this.animations['idle'].length; i++) {
        //         var e = this.animations['idle'][i]
        //         for (var j = 0; j < ground.length; j++) {
        //             var c = ground[j]
        //             var type = this.collide(e, c)
        //             log('bird_ground', type)
        //             if (type === true) {
        //                 log('bird_ground', type)
        //             }
        //             // log('enemy_type', i, type)
        //         }
        //     }
        // }
    }
    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h /2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipx) {
            context.scale(-1, 1)
        }
        var alpha = context.globalAlpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        context.drawImage(this.texture, 0, 0)
        context.restore()

    }
    move(x, keyStatus) {
        this.flipx = x < 0
        this.x += x
        // log('keyStatus', keyStatus, this.animationName)
        // var animationNames = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }
    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }

    collide(bird, pipe) {
        var a = pipe
        var b = bird
        if (this.aInb(a.x, b.x, b.x + b.w) || this.aInb(b.x, a.x, a.x + a.w)) {
            if (this.aInb(a.y, b.y, b.y + b.h) || this.aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
}