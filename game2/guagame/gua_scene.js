class GuaScene {
    constructor(game) {
        this.game = game
        this.enemy_array = []
        this.element_array = []
        this.enemy_bullet_array = []
        this.player_bullet_array = []
        this.player_array = []
        this.fire_system = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(GuaImage) {
        GuaImage.scene = this
        this.element_array.push(GuaImage)
    }

    addElementPlayer(GuaImage) {
        GuaImage.scene = this
        this.player_array.push(GuaImage)
    }

    addElementEnemy(GuaImage) {
        GuaImage.scene = this
        this.enemy_array.push(GuaImage)
    }

    addElementEnemyBullet(GuaImage) {
        GuaImage.scene = this
        this.enemy_bullet_array.push(GuaImage)
    }

    addElementBullet(GuaImage) {
        GuaImage.scene = this
        this.player_bullet_array.push(GuaImage)
    }

    addElementFireSystem(GuaImage) {
        GuaImage.scene = this
        this.fire_system.push(GuaImage)
    }

    draw() {
        for (var e of this.element_array){
            e.draw()
        }
        for (var q of this.enemy_array){
            q.draw()
        }
        for (var w of this.enemy_bullet_array){
            w.draw()
        }
        for (var r of this.player_bullet_array){
            r.draw()
        }
        for (var t of this.player_array){
            t.draw()
        }
        for (var y of this.fire_system){
            y.draw()
        }
    }
    update() {
        for (var g = 0; g < this.fire_system.length; g++){
            // log('fire', this.fire_system)
            var b = this.fire_system[g]
            // log('fire', b)
            b.update()
        }
        for (var i = 0; i < this.element_array.length; i++){
            var e = this.element_array[i]
            e.update()
        }
        for (var a = 0; a < this.enemy_array.length; a++){
            var z = this.enemy_array[a]
            // log('enemy', this.player_bullet_array, this.player_array)
            z.update(this.player_array, this.player_bullet_array, this.enemy_array, a, this)
        }
        for (var s = 0; s < this.enemy_bullet_array.length; s++){
            var x = this.enemy_bullet_array[s]
            x.update(this.enemy_bullet_array, this.player_bullet_array)
        }
        for (var d = 0; d < this.player_bullet_array.length; d++){
            var c = this.player_bullet_array[d]
            c.update()
        }
        for (var f = 0; f < this.player_array.length; f++){
            var v = this.player_array[f]
            v.update(this.enemy_bullet_array, this.player_array, this)
        }
    }
}
