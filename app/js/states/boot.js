
function Boot() {

}

Boot.prototype = {
  preload: function preload() {
    this.load.image('preloadBg', 'assets/preloader_bg.png');
    this.load.image('preloadFg', 'assets/preloader_fg.png');
  },

  create: function create() {

    this.game.stage.backgroundColor = '#fff';
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.state.start('preload');
  }
};

module.exports = Boot;
