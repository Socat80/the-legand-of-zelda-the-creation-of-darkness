scene.onHitTile(SpriteKind.Player, 9, function (sprite) {
    sprite.setPosition(24, mySprite.y)
})
function restartCurrentLevel () {
    cleanupLevel()
    initialiseLevel()
}
scene.onHitTile(SpriteKind.Enemy, 0, function (sprite) {
    if (isGameRunning) {
        scene.placeOnRandomTile(mySprite, 2)
    }
})
function switchToLevel (levelNum: number) {
    currentLevel = levelNum
    coins = []
    game.splash("Level", convertToText(currentLevel))
    for (let value of coins) {
        value.destroy()
    }
    if (currentLevel == 1) {
        scene.setTileMap(img`
d d d d d d d d d d 
d d . . . d . . 2 d 
d . . d . . . d . d 
d . d d d d . d . d 
d . . . . . . d . d 
d . d d d . d d . d 
d 1 . . . . . . . d 
d d d d d d d d d d 
`)
    } else if (currentLevel == 2) {
        scene.setTileMap(img`
d d d d d d d d d d d d d d d f 
d . . . . . d d d . . . . . d f 
d . d d d . . d . . d d d . d f 
d . . . d d . . . d d . . . d f 
d . d . d d d d d d d . d . d f 
d . . . . . . d . . . . . . d f 
d . d d d d . d . d d d d . d f 
d . d d d d . d . d d d d . d f 
d . f f f f f f f f f f f f d f 
d d d d f d d d d d f d d d d f 
d d d d f d d d d d f d d d d f 
d . f f 2 f f f f f 4 f f . d f 
d f d d d d d f d d d d d f d f 
d . d d d d d f d d d d d . d f 
d f d d d d d f d d d d d f d f 
d . d f f f d f d f f f d . d f 
d f d f d f d f d f d f d f d f 
d . d f d f d f d f d f d . d f 
d f f f d f f 3 f f d f f f d f 
d . d d d d d d d d d d d . d f 
d f d d d d d d d d d d d f d f 
d . f f f f f f f f f f f . d f 
d d . d d d d f d d d d . d d f 
d d . . d d d f d d d . . d d f 
d d d . d d d f d d d . d d d f 
d d d . d d . 1 . d d . d d d f 
d . . . . d . d . d . . . . d f 
d . d d . d . d . d . d d . d f 
d . d d . . . d . . . d d . d f 
d . d d d . d d d . d d d . d f 
d . . . . . . . . . . . . . d f 
d d d d d d d d d d d d d d d f 
`)
    } else if (currentLevel == 3) {
        scene.setTileMap(img`
d d d d d d d d d d d d d d d f 
d . . . . . d d d . . . . . d f 
d . d d d . . d . . d d d . d f 
d . . . d d . . . d d . . . d f 
d . d . d d d d d d d . d . d f 
d . . . . . . d . . . . . . d f 
d . d d d d . d . d d d d . d f 
d . d d d d . d . d d d d . d f 
d . f f f f f f f f f f f . d f 
d d d . d d d d d d d . d d d f 
d d d . d f f f f f d . d d d f 
d d d . d f d d d f d . d d d f 
d d f f f 2 f f f 4 f f f d d f 
8 f f d d d d f d d d d f f 9 f 
d d f d d d d f d d d d f d d f 
d . f f f f d f d f f f f . d f 
d f d f d f d f d f d f d f d f 
d . d f d f d f d f d f d . d f 
d f f f d f f 3 f f d f f f d f 
d . d d d d d d d d d d d . d f 
d f d d d d d d d d d d d f d f 
d . f f f f f f f f f f f . d f 
d d . d d d d f d d d d . d d f 
d d . . d d d f d d d . . d d f 
d d d . d d d f d d d . d d d f 
d d d . d d . 1 . d d . d d d f 
d . . . . d . d . d . . . . d f 
d . d d . d . d . d . d d . d f 
d . d d . . . d . . . d d . d f 
d . d d d . d d d . d d d . d f 
d . . . . . . . . . . . . . d f 
d d d d d d d d d d d d d d d f 
`)
    } else {
        game.over(true)
    }
    list = scene.getTilesByType(0)
    foodCount = list.length
    for (let value of list) {
        coin = sprites.create(img`
. . . . . . . . 
. . . . . . . . 
. . . . . . . . 
. . . 1 1 . . . 
. . . 1 1 . . . 
. . . . . . . . 
. . . . . . . . 
. . . . . . . . 
`, SpriteKind.Food)
        coin.setPosition(value.x, value.y)
        coins.push(coin)
    }
}
function startGame () {
    switchToLevel(1)
    initialiseLevel()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (false) {
        levelComplete()
    }
})
function initialiseLevel () {
    ghosts = []
    scene.placeOnRandomTile(mySprite, 1)
    isDying = false
    if (currentLevel >= 1) {
        ghost = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 f 7 f 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 7 . . . . 
. . . . . 7 7 . . . . 7 7 . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)
        ghost.setVelocity(40, 0)
        scene.placeOnRandomTile(ghost, 2)
        ghosts.push(ghost)
    }
    if (currentLevel >= 2) {
        ghost = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 f 7 f 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 7 . . . . 
. . . . . 7 7 . . . . 7 7 . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)
        ghost.setVelocity(-40, 0)
        scene.placeOnRandomTile(ghost, 4)
        ghosts.push(ghost)
    }
    if (currentLevel >= 3) {
        ghost = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 f 7 f 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 . . . . . 
. . . . . . 7 7 7 7 7 7 . . . . 
. . . . . 7 7 . . . . 7 7 . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)
        ghost.setVelocity(Math.randomRange(-40, 40), 0)
        scene.placeOnRandomTile(ghost, 3)
        ghosts.push(ghost)
    }
    controller.moveSprite(mySprite, 60, 60)
    isGameRunning = true
}
function setupGame () {
    scene.setTile(13, img`
f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f 
8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
8 8 8 f f f f f f f f f f 8 8 8 
8 8 f 8 8 8 8 8 8 8 8 8 8 f 8 8 
8 8 f 8 8 a a a a a a 8 8 f 8 8 
8 8 f 8 a 8 8 8 8 8 8 a 8 f 8 8 
8 8 f 8 a 8 8 8 8 8 8 a 8 f 8 8 
8 8 f 8 a 8 8 8 8 8 8 a 8 f 8 8 
8 8 f 8 a 8 8 8 8 8 8 a 8 f 8 8 
8 8 f 8 a 8 8 8 8 8 8 a 8 f 8 8 
8 8 f 8 a 8 8 8 8 8 8 a 8 f 8 8 
8 8 f 8 8 a a a a a a 8 8 f 8 8 
8 8 f 8 8 8 8 8 8 8 8 8 8 f 8 8 
8 8 8 f f f f f f f f f f 8 8 8 
8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f 
`, true)
    scene.setTile(1, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, false)
    scene.setTile(2, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, false)
    scene.setTile(3, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, false)
    scene.setTile(4, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, false)
    scene.setTile(8, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, true)
    scene.setTile(9, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, true)
    scene.setTile(15, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, false)
    mySprite = sprites.create(img`
. . . 7 7 7 7 7 7 . . . . . 
. . . . 7 7 7 7 7 7 . . . . 
. . . . 7 7 7 7 7 7 . . . . 
. . . . 5 5 5 5 5 5 . . . . 
. . . . d f d d f d . . . . 
. . . . d d d d d d . . . . 
. . 7 7 7 7 7 7 7 7 7 7 . . 
. . 7 7 7 7 7 7 7 7 7 7 . . 
. . 7 7 7 7 7 7 7 7 7 7 . . 
. . d d 7 7 7 7 7 7 8 8 8 . 
. . 8 6 7 7 7 7 7 7 8 6 8 . 
. 8 6 8 7 7 7 7 7 7 8 6 8 . 
8 6 8 . 7 7 . . . 7 7 8 . . 
6 8 . . 7 7 . . . 7 7 . . . 
`, SpriteKind.Player)
    isDying = false
    scene.cameraFollowSprite(mySprite)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    foodCount += -1
    info.changeScoreBy(1)
    otherSprite.destroy()
    music.playTone(523, music.beat(BeatFraction.Quarter))
})
function whileGameIsRunning () {
    if (foodCount == 0) {
        levelComplete()
    }
    for (let value of ghosts) {
        if (value.vx == 0 && value.vy == 0) {
            scene.placeOnRandomTile(value, 2)
        }
        Testing.mazeMove(value, mySprite, 40)
    }
}
scene.onHitTile(SpriteKind.Player, 8, function (sprite) {
    sprite.setPosition(216, mySprite.y)
})
scene.onHitTile(SpriteKind.Enemy, 8, function (sprite) {
    sprite.setPosition(216, mySprite.y)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (!(isDying)) {
        isDying = true
        controller.moveSprite(sprite, 0, 0)
        mySprite.startEffect(effects.fire)
        music.wawawawaa.playUntilDone()
        effects.clearParticles(mySprite)
        restartCurrentLevel()
        controller.moveSprite(mySprite, 60, 60)
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.placeOnRandomTile(sprite, 2)
})
function levelComplete () {
    cleanupLevel()
    switchToLevel(currentLevel + 1)
    initialiseLevel()
}
function cleanupLevel () {
    isGameRunning = false
    for (let value of ghosts) {
        value.destroy()
    }
}
scene.onHitTile(SpriteKind.Enemy, 9, function (sprite) {
    sprite.setPosition(24, mySprite.y)
})
let ghost: Sprite = null
let isDying = false
let ghosts: Sprite[] = []
let coin: Sprite = null
let foodCount = 0
let list: tiles.Tile[] = []
let coins: Sprite[] = []
let mySprite: Sprite = null
let currentLevel = 0
let isGameRunning = false
isGameRunning = false
currentLevel = 0
setupGame()
startGame()
game.onUpdate(function () {
    if (isGameRunning) {
        whileGameIsRunning()
    }
})
forever(function () {
    music.playTone(466, music.beat(BeatFraction.Half))
    music.playTone(440, music.beat(BeatFraction.Half))
    music.playTone(554, music.beat(BeatFraction.Half))
    music.playTone(466, music.beat(BeatFraction.Half))
    music.playTone(523, music.beat(BeatFraction.Half))
    music.playTone(392, music.beat(BeatFraction.Half))
    music.playTone(196, music.beat(BeatFraction.Half))
})
