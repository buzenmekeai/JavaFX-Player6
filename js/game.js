var config = {
    width: 512,
    height: 512,
    type: Phaser.AUTO,
    
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    
    physics: {
        default: 'arcade',
        
        arcade: {
            gravity: {y: 350}
        }
    },
    
    pixelArt: true
}

var game = new Phaser.Game(config);

var cursors;
var platforms, jewels, skulls;
var 