class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.管子横向间距 = 200
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'p2')
            p1.flipy = true
            p1.x = 500 + i * this.管子横向间距
            var p2 = GuaImage.new(game, 'p1')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
            // var p3 = GuaImage.new(game)


        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randonBetween(-220, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
    }
    update(bird_array, pipe_array) {
        for (var i = 0; i < this.pipes.length / 2; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.管子横向间距 * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.管子横向间距 * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
        if(bird_array.length > 0 && this.pipes.length > 0) {
            // log('pipe.length', this.pipes.length)
            for (var i = 0; i < bird_array.length; i++) {
                var e = bird_array[i]
                for (var j = 0; j < this.pipes.length; j++) {
                    var c = this.pipes[j]
                    var type = this.collide(e, c)
                    if (type === true) {
                        log('bird_pipes', type)
                        var s = scenend.new(this.game)
                        this.game.replaceScene(s)
                    }
                    // log('enemy_type', i, type)
                }
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes){
            context.save()

            var w2 = p.w / 2
            var h2 = p.h /2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipx ? -1 : 1
            var scaleY = p.flipx ? -1 : 1
            context.scale(scaleX, scaleY)

            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)

            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
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


class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.clearArray()
        // var lable = GuaLable.new(game, 'hello from gua')
        // this.addElement(lable)

        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        //加入水管
        this.pipe = Pipes.new(game)
        this.addElementPipes(this.pipe)

        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 20
            g.y = 500
            this.addElementGrounds(g)
            this.grounds.push(g)

        }
        this.skipCount = 5
        this.birdSpeed = 2
        var b = GuaAnimation.new(game)
        b.x = 100
        b.y = 200
        this.bird = b
        this.addElementBirds(b)
        this.setupInputes()

    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        // log('this.birds', this.birds)
        super.update()
        this.skipCount--
        var offset = -1
        if (this.skipCount == 0) {
            this.skipCount = 5
            offset = 4
        }
        for (var i = 0; i < 50; i++){
            var g = this.grounds[i]
            g.x += offset
            g.y = 500
            this.addElementGrounds(g)
            // this.grounds.push(g)
        }
        // this.delElementGrounds(g)

        if(this.birds.length > 0 && this.grounds.length > 0) {
            // log('pipe.length', this.pipes.length)
            for (var i = 0; i < this.birds.length; i++) {
                var e = this.birds[i]
                for (var j = 0; j < this.grounds.length; j++) {
                    var c = this.grounds[j]
                    var type = this.collide(e, c)
                    if (type === true) {
                        log('bird_ground', type)
                        var s = scenend.new(this.game)
                        this.game.replaceScene(s)

                    }
                    // log('enemy_type', i, type)
                }
            }
        }
    }
    setupInputes() {
        var self = this
        var b = this.bird
        this.game.registerAction('j', function(keyStatus){
            // log('keyStatus', keyStatus)
            b.jump()
        })
        this.game.registerAction('a', function(keyStatus){
            // log('keyStatus', keyStatus)
            b.move(-self.birdSpeed, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus){
            // log('keyStatus', keyStatus)

            b.move(self.birdSpeed, keyStatus)
        })
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
    // draw() {
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)

    // }
}

class Scenfly extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            // this.grounds.length = 0
            // this.birds.length = 0
            // this.element_array.length = 0
            // this.pipes.length = 0
            // log('test', this.grounds, this.birds, this.element_array, this.pipes)


            // this.clearArray()
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
        var bg = GuaImage.new(game, 'bg')
        this.addElementPipes(bg)
        var g = GuaImage.new(game, 'message')
        g.x = 120
        g.y = 130
        this.addElementPipes(g)
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 500
            this.addElementPipes(g)
            this.grounds.push(g)
        }
    }
    // draw() {
    //
    // }
}

class scenend extends GuaScene {
    constructor(game) {
        super(game)
        var bg = GuaImage.new(game, 'bg')
        this.addElementPipes(bg)
        var g = GuaImage.new(game, 'gameover')
        g.x = 120
        g.y = 130
        this.addElementPipes(g)
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 500
            this.addElementPipes(g)
            this.grounds.push(g)
        }
    }
    // draw() {
    //
    // }
}

