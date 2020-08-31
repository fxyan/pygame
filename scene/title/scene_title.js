class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('q', function(){
            // var blocks = loadLevel(game, 1)
            // var s = Scene(game, blocks)
            // game.replaceScene(s)
            var s = SceneLevel.new(game)
            game.runWithScene(s)
        })
        game.registerAction('k', function(){
            var blocks = loadLevel(game, 0)
            var s = Scene(game, blocks)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('按 k 开始游戏  按q键开始关卡编辑', 100, 190)
    }
}
