class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModEnabled = true
        this.element_array = []

        this.grounds = []
        this.birds = []
        this.pipes = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(GuaImage) {
        GuaImage.scene = this
        this.element_array.push(GuaImage)
    }
    addElementGrounds(GuaImage) {
        GuaImage.scene = this
        this.grounds.push(GuaImage)
        // log(this.grounds.length)
    }
    delElementGrounds() {
        this.grounds.splice(0, 50)
    }

    addElementBirds(GuaImage) {
        GuaImage.scene = this
        this.birds.push(GuaImage)
    }
    addElementPipes(GuaImage) {
        GuaImage.scene = this
        this.pipes.push(GuaImage)
    }

    clearArray() {
        this.grounds.length = 0
        this.birds.length = 0
        this.element_array.length = 0
        this.pipes.length = 0
    }

    draw() {
        for (var e of this.element_array){
            e.draw()
        }
        for (var p of this.pipes){
            p.draw()
        }
        for (var u of this.grounds){
            // log(1)
            u.draw()
        }
        for (var o of this.birds){
            o.draw()
        }

    }
    update() {
        this.debug && this.debug()
        if (this.debugModEnabled) {
            for (var i = 0; i < this.element_array.length; i++) {
                var e = this.element_array[i]
                e.debug && e.debug()
            }
            // for (var h = 0; h < this.grounds.length; h++){
            //     // log('fire', this.fire_system)
            //     var n = this.grounds[h]
            //     // log('fire', b)
            //     n.debug && n.debug()
            //
            //     // n.update()
            // }
            for (var j = 0; j < this.birds.length; j++){
                var m = this.birds[j]
                m.debug && m.debug()
            }
            // for (var k = 0; k < this.pipes.length; k++){
            //     // log('fire', this.fire_system)
            //     var l = this.pipes[k]
            //     l.debug && l.debug()

                // log('fire', b)
                // l.update()
            // }
        }
        for (var i = 0; i < this.element_array.length; i++){
            var e = this.element_array[i]
            // log('n', n.name)

            e.update(this.birds)
        }
        for (var k = 0; k < this.pipes.length; k++){
            // log('fire', this.fire_system)
            var l = this.pipes[k]
            // log('fire', b)
            l.update(this.birds)
        }
        for (var h = 0; h < this.grounds.length; h++){
            // log('fire', this.grounds)
            var n = this.grounds[h]
            // log('fire', b)
            // log('n', n.name)
            n.update(this.birds)
        }
        for (var j = 0; j < this.birds.length; j++){
            // log('fire', this.fire_system)
            var m = this.birds[j]
            // log('fire', b)
            m.update(this.grounds)
        }


    }
}
