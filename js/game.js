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
    this.load.image("platform", "../assets/platform.png");
    this.load.spritesheet("player", "../assets/player.png", {frameWidth: 24, frameHeight: 24});
    this.load.image("jewel", "../assets/jewel.png");
    this.load.image("skull", "../assets/skull.png");
}

function create(){
    cursors = this.input.keyboard.createCursorKeys();
    
    createBackground.call(this);
    createPlatforms.call(this);
    createPlayer.call(this);
    createAnimations.call(this);
    createJewels.call(this);
    createSkulls.call(this);
    
    scoreText = this.add.text(10,10, 'Score: 0', {fontSize: '32px', fill: '#000'});
    
    createOverlapAndCollide.call(this);
}

function update(){
    checkPlayerMovement();
}

//***************** NON PHASER.SCENE FUNCTIONS ************//
//*************** CREATE FUNCTIONS*************************//

function createBackground(){
    var background = this.add.image(config.width/2, config.height/2, "background");    
    background.setScale(2.2, 2.5);
}

function createPlatforms(){
    platforms = this.physics.add.staticGroup();
    platforms.create(300, 300, "platform");    
    
    var floor = platfor