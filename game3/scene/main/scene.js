// var config = {
//     player_speed: 10,
//     bullet_speed: 10,
//     cooldown_speed: 10,
//     enemy_bullet_speed: -10,
//     enemy_cooldown_speed: 20,
// }



class Scene extends GuaScene {
    constructor(game) {
        super(game)
        // game.registerAction('k', function(){
        //     var s = Scene(game)
        //     game.replaceScene(s)
        // })
        this.step()
        this.setupInput()
    }
    step() {
        var game = this.game
        this.numberOfEnemis = 3
        this.bg = GuaImage.new(game, 'background')
        this.player = Player.new(game)
        this.player.x = 150
        this.player.y = 500
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addEnemies()
        var ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)
    }
    addEnemies() {
        var es = []
        for (var i = 0;  i < this.numberOfEnemis; i++){
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInput() {
        var game = this.game
        var player = this.player
        game.registerAction('a', function(){
            player.moveLeft()
        })
        game.registerAction('d', function(){
            player.moveRight()
        })
        game.registerAction('w', function(){
            player.moveUp()
        })
        game.registerAction('s', function(){
            player.moveDown()
        })
        game.registerAction('f', function(){
            player.fire()
        })
    }
    // draw() {
    //     this.game.drawImage(this.bg)
    //     this.game.drawImage(this.player)
    // }
}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = 1
    }
    update() {
        this.speed = config.bullet_speed
        this.y -= this.speed
    }
}

class EnemyBullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = 1
    }
    update() {
        this.speed = config.enemy_bullet_speed
        this.y -= this.speed
    }
}


class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 10
        this.cooldown = config.cooldown_speed
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0){
            this.cooldown--
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.cooldown_speed
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game, )
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
}

const randonBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}


class Enemy extends GuaImage {
    constructor(game, player, bullet) {
        var type = randonBetween(0, 2)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.cooldown = config.enemy_cooldown_speed
        this.speed = randonBetween(2, 5)
        this.x = randonBetween(0, 350)
        this.y = randonBetween(0, 0)
    }

    new(game, player, bullet) {

    }

    update() {
        this.y += this.speed
        if (this.y > 700) {
            this.setup()
        }
        if (this.cooldown > 0){
            this.cooldown--
        }
        this.fire()

    }

    fire() {
        log('test', this.cooldown)
        if (this.cooldown == 0) {
            this.cooldown = config.enemy_cooldown_speed
            var x = this.x + this.w / 2
            var y = this.y + this.h
            var b = EnemyBullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }

    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }

    collide(player_bullet) {
        var a = this
        var b = player_bullet
        if (this.aInb(a.x, b.x, b.x + b.w) || this.aInb(b.x, a.x, a.x + a.w)) {
            if (this.aInb(a.y, b.y, b.y + b.h) || this.aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
}


