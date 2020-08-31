class SceneLevel extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('Enter', function(){
            var blocks = loadLevel(game, 1)
            var s = Scene(game, blocks)
            game.replaceScene(s)
        })
        this.edit_array = [
            [0, 0,],
        ]
        this.blocks = loadLevel(game, 0, this.edit_array)
        this.enableDrag = false

    }

    draw() {
        // draw 背景
        this.game.context.fillStyle = "#554"
        this.game.context.fillRect(0, 0, 400, 300)
        // draw blocks
        // log('test block', blocks)

        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            // log(block.x, block.y)
            if (block.alive) {
                this.game.drawImage(block)
            }
        }
        this.blocks = loadLevel(this.game, 0, this.edit_array)
        // draw labels
        this.game.context.fillText('按数字键存储关卡，按Enter开始游戏', 100, 190)
    }


    update() {
        var block = this.blocks[0]
        log(this.blocks)
        // log(block)
        var edit_array = this.edit_array
        var enableDrag = this.enableDrag
        var status = false
        // mouse event
        this.game.canvas.addEventListener('mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // 检查是否点中了 ball
            if (block.hasPoint(x, y)) {
                // 设置拖拽状态
                enableDrag = true
            }
        })
        this.game.canvas.addEventListener('mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // log(x, y, 'move')
            // log(enableDrag, 'move')

            if (enableDrag) {
                // log(x, y, 'drag')
                block.x = x
                block.y = y
            }
        })
        this.game.canvas.addEventListener('mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if (enableDrag) {
                status = true
            }
            // log(x, y, 'up')
            // log('1', status)
            enableDrag = false
            if (status) {
                edit_array.push([x, y,])
            }
        })
        // log('2', status)
    }
     
 
}
