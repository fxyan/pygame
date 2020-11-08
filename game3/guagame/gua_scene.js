class GuaScene {
    constructor(game) {
        this.game = game
        this.element_array = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(GuaImage) {
        GuaImage.scene = this
        this.element_array.push(GuaImage)
    }
    draw() {
        for (var e of this.element_array){
            e.draw()
        }
    }
    update() {
        for (var i = 0; i < this.element_array.length; i++){
            var e = this.element_array[i]
            e.update()
        }
    }
}
