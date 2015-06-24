
function Preload() {
}

Preload.prototype = {
  preload: function preload() {
    this.assetBg = this.add.sprite(200, 60, 'preloadBg');
    this.assetFg = this.add.sprite(200, 60, 'preloadFg');

    this.load.setPreloadSprite(this.assetFg);

    this.load.image('panpoo', 'assets/panpoo.png');
    this.load.spritesheet('eyemouth', 'assets/ss_eyemouth.png', 110, 60);
    this.load.spritesheet('eyes', 'assets/ss_eyes.png', 110, 60);
    this.load.spritesheet('mouth', 'assets/ss_mouth.png', 110, 60);
    this.load.image('landscape', 'assets/landscape.png');
  },

  create: function create() {
    this.state.start('play');
  }
};

module.exports = Preload;
