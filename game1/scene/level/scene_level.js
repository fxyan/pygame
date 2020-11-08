class SceneLevel extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('Enter', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
            // game.runWithScene(game.main)

            // var blocks = loadLevel(game, 0)
            // var s = Scene(game, blocks)
            // game.replaceScene(s)
        })
        this.edit_array = [
            [0, 0,],
        ]
        this.level_array = levels[0]
        this.blocks = loadLevel(game, 0, this.edit_array)
        this.enableDrag = false
        this.enableArray = false
        this.bricks = -1
        this.level_num = 1
        // var edit_array = this.edit_array
        // this.len_array = levels[0].length + 1
        // var enableDrag = this.enableDrag
        // var block = this.blocks
        // log('test', this.blocks, this.edit_array)

        game.canvas.addEventListener('mousedown', event => {
            var x = event.offsetX
            var y = event.offsetY
            // 检查是否点中了 ball
            if (this.blocks[0].hasPoint(x, y)) {
                // 设置拖拽状态
                // log('test', this.edit_array.length, this.len_array, levels[0])
                if (this.edit_array.length < levels[0].length + 1) {
                    
                    this.edit_array.push([x, y,])
                    this.blocks = loadLevel(game, 0, this.edit_array)
                    this.enableDrag = true

                    // log(this.blocks, this.edit_array)
                }
            }
            else{
                for (var i = 0; i < this.edit_array.length; i++) {
                    if (this.blocks[i].hasPoint(x, y)) {
                    
                        this.bricks = i
                        this.enableArray = true
                        this.enableDrag = true
                        break
                    }  
                }
            }
        })
        game.canvas.addEventListener('mousemove', event => {
            var x = event.offsetX
            var y = event.offsetY
            // log(x, y, 'move')
            // log(enableDrag, 'move')

            if (this.enableDrag && this.enableArray) {
                length = this.bricks
                this.edit_array[length][0] = x
                this.edit_array[length][1] = y

            }
            else if (this.enableDrag) {
                // log(x, y, 'drag', this.blocks, this.edit_array, this.len_array-1, levels[0])
                // this.blocks[this.len_array-1].x = x
                // this.blocks[this.len_array-1].y = y
                log(levels[0].length)
                length = this.edit_array.length
                this.edit_array[length - 1][0] = x
                this.edit_array[length - 1][1] = y
                // log(this.edit_array[this.len_array-1])
            }
        })
        game.canvas.addEventListener('mouseup', event => {
            var x = event.offsetX
            var y = event.offsetY
            // if (enableDrag) {
            //     status = true
            // }
            // log(x, y, 'up')
            // log('1', status)
            this.enableDrag = false
            this.enableArray = false
            this.bricks = -1
            levels[0] = this.edit_array
            // if (status) {
            //     edit_array.push([x, y,])
            // }
        })

        game.registerAction('l', event => {
            // var k = event.key
            // log('test', k)
            // if (k == 'p') {
                // 存储不同关卡的数据
                // log(parseInt(k))
            if (this.level_num < 5 && this.edit_array.length >= 2) {
                var del = this.edit_array.splice(0, 1)
                levels[this.level_num] = this.edit_array
                levels[0] = del
                this.edit_array = del

                this.level_array = levels[0]
                this.blocks = loadLevel(game, 0, this.edit_array)
                this.enableDrag = false
                this.enableArray = false
                this.bricks = -1
                this.level_num += 1
            } else if(this.level_num >= 5 && this.edit_array.length >= 2) {
                var del = this.edit_array.splice(0, 1)
                levels[this.level_num] = this.edit_array
                levels[0] = [
                    [0, 0,],
                ] 
                this.edit_array = [
                    [0, 0,],
                ]
                this.level_array = levels[0]
                this.blocks = loadLevel(game, 0, this.edit_array)
                this.enableDrag = false
                this.enableArray = false
                this.bricks = -1
                this.level_num = 1
                log(levels)
            }
                
            // }
        })
    }

    draw() {
        // draw 背景
        this.game.context.fillStyle = "#ffffff"
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
        this.game.context.fillStyle="red"

        this.game.context.fillText('按l键存储关卡，按Enter回到标题， 当前是第' + this.level_num + '关', 100, 290)
    }
}
