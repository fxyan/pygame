class GuaImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        // log('name', name, this.texture)
        // log('name', name, this.texture)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}


