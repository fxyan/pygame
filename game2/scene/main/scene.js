var config = {
    player_speed: 10,
    bullet_speed: 10,
    cooldown_speed: 10,
    enemy_bullet_speed: -10,
    enemy_cooldown_speed: 40,
}



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
        this.addElementPlayer(this.player)
        this.addEnemies()
        var ps = GuaParticleSystem.new(this.game)
        this.addElementFireSystem(ps)
    }
    addEnemies() {
        var es = []
        for (var i = 0;  i < this.numberOfEnemis; i++){
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElementEnemy(e)
        }
        // log('test', es)
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
    update(enemy_bullet_array, player_array, scene) {
        this.speed = config.player_speed
        if (this.cooldown > 0){
            this.cooldown--
        }
        if(enemy_bullet_array.length > 0){
            for (var i = 0; i < enemy_bullet_array.length; i++){
                var e = enemy_bullet_array[i]
                var bullet_player_type = this.collide(e)
                if(bullet_player_type === true){
                    // log('enemy_bullet_player_boom', bullet_player_type)
                    enemy_bullet_array.splice(i, 1)
                    player_array.splice(0, 1)
                    log(enemy_bullet_array, player_array)
                    var ps = GuaParticleSystem.new(scene.game, this.x, this.y)
                    scene.addElementFireSystem(ps)
                }
            }
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
            this.scene.addElementBullet(b)
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

const randonBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}


class Enemy extends GuaImage {
    constructor(game) {
        var type = randonBetween(0, 1)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.cooldown = 0
        this.speed = randonBetween(2, 5)
        this.x = randonBetween(0, 350)
        this.y = randonBetween(0, 0)
    }

    new(game, player, bullet) {

    }

    update(player_array, player_bullet_array, enemy_array, enemy_num, scene) {
        this.y += this.speed
        if (this.y > 700) {
            this.setup()
        }
        if (this.cooldown > 0){
            this.cooldown--
        }
        this.fire()
        // var delete_bullet = []

        if(player_array.length > 0){
            for (var i = 0; i < player_array.length; i++){
                var e = player_array[i]
                var type = this.collide(e)
                 if(type === true){
                    log('player_enemy_boom', type)
                    enemy_array.splice(enemy_num, 1)
                    player_array.splice(0, 1)
                    var ps1 = GuaParticleSystem.new(scene.game, e.x, e.y)
                    var ps2 = GuaParticleSystem.new(scene.game, this.x, this.y)
                    scene.addElementFireSystem(ps1)
                    scene.addElementFireSystem(ps2)
                }
                // log('enemy_type', i, type)
            }
        }
        if(player_bullet_array.length > 0){
            for (var o = 0; o < player_bullet_array.length; o++){
                var x = player_bullet_array[o]
                // log(x, player_bullet_array, player_bullet_array.length, o)
                var bullet_enemy_type = this.collide(x)
                 if(bullet_enemy_type === true){
                    log('player_bullet_enemy_boom', bullet_enemy_type)
                    enemy_array.splice(enemy_num, 1)
                    player_bullet_array.splice(o, 1)
                    var ps1 = GuaParticleSystem.new(scene.game, this.x, this.y)
                    scene.addElementFireSystem(ps1)
                }
                // if (bullet_enemy_type === true) {
                //     delete_bullet.push(o)
                // }
                // log('bullet_enemy_type', bullet_enemy_type)
            }
            // log('delete_bullet', delete_bullet)
        }


    }

    fire() {
        // log('test', this.cooldown, 22, config.enemy_cooldown_speed)
        if (this.cooldown == 0) {
            this.cooldown = config.enemy_cooldown_speed
            var x = this.x + this.w / 2
            var y = this.y + this.h
            var b = EnemyBullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElementEnemyBullet(b)
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


