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
var player;
var score = 0, scoreText;

//***************** PHASER.SCENE BUILT-IN FUNCTIONS ************//

function preload(){
    console.log(this);
    this.load.image("background", "../assets/background.png");
    this.load.image