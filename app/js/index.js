var dom = require('component-dom');

var bootState = require('./states/boot');
var preloadState = require('./states/preload');
var playState = require('./states/play');



var start = dom('#start');

start.on('click', function(e) {
  e.preventDefault();
  dom('#canvas').removeClass('hide');
  dom('.logo').addClass('hide');
  start.addClass('hide');

  var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'canvas');

  game.state.add('boot', bootState);
  game.state.add('preload', preloadState);
  game.state.add('play', playState);
  game.state.start('boot');
});

