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