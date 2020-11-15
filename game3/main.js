var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        background: 'img/background.png',
        player: 'img/player.png', 
        bullet: 'img/bullet.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        fire: 'img/fire.png',
        //跑步
        run1: 'img/run/run1.png',
        run2: 'img/run/run2.png',
        run3: 'img/run/run3.png',
        run4: 'img/run/run4.png',
        run5: 'img/run/run5.png',
        run6: 'img/run/run6.png',
        run7: 'img/run/run7.png',
        run8: 'img/run/run8.png',
        run9: 'img/run/run9.png',
        run10: 'img/run/run10.png',
        run11: 'img/run/run11.png',
        run12: 'img/run/run12.png',
        run13: 'img/run/run13.png',
        run14: 'img/run/run14.png',
        run15: 'img/run/run15.png',
        run16: 'img/run/run16.png',
        run17: 'img/run/run17.png',
        run18: 'img/run/run18.png',
        run19: 'img/run/run19.png',
        run20: 'img/run/run20.png',
        // 走路
        idle1: 'img/idle/idle1.png',
        idle2: 'img/idle/idle2.png',
        idle3: 'img/idle/idle3.png',
        idle4: 'img/idle/idle4.png',
        idle5: 'img/idle/idle5.png',
        idle6: 'img/idle/idle6.png',
        idle7: 'img/idle/idle7.png',
        idle8: 'img/idle/idle8.png',
        idle9: 'img/idle/idle9.png',
        idle10: 'img/idle/idle10.png',
        idle11: 'img/idle/idle11.png',
        idle12: 'img/idle/idle12.png',
        idle13: 'img/idle/idle13.png',
        idle14: 'img/idle/idle14.png',
        idle15: 'img/idle/idle15.png',
        idle16: 'img/idle/idle16.png',
        // bird
        bg: 'img/bird/bg.png',
        ground: 'img/bird/fg.png',
        b1: 'img/bird/bird.png',
        b2: 'img/bird/bird1.png',
        b3: 'img/bird/bird2.png',
        b4: 'img/bird/bird3.png',
        p1: 'img/bird/p1.png',
        p2: 'img/bird/p2.png',



    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
