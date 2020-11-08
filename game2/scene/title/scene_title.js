class GuaLable {
    constructor(game, text) {
        this.game = game
        this.text = text
    }

    static new(game, text) {
        return new this(game, text)
    }

    draw() {
        // draw labels
        this.game.context.fillText(this.text, 100, 190)
    }

    update() {

    }
}

class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }

    setup() {
        this.life = 20
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        this.vx += factor *  this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.setup(x, y)
    }

    static new(game, x, y) {
        return new this(game, x, y)
    }

    setup(x, y) {
        this.x = x
        this.y = y
        this.numberOfParticles = 50
        this.particles = []
    }

    draw() {
        // draw labels
        for(var p of this.particles) {
            p.draw()
        }
    }

    update() {
        // 添加小火花
        // if (this.particles.length < this.numberOfParticles) {
        // log('fire update')
        if (this.numberOfParticles > 0) {
            var p = GuaParticle.new(this.game)
            var s = 2
            var vx = randonBetween(-s, s)
            var vy = randonBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
            this.numberOfParticles -= 1
        }
        // }
        // 更新小火花
        for(var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
}



class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var lable = GuaLable.new(game, 'hello')
        this.addElement(lable)

        var ps = GuaParticleSystem.new(game)
        this.addElement(ps)
    }
    // draw() {
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)

    // }
}
