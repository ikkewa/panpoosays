
var buildPath = './build/';
var distPath = './dist/';
var appPath = './app/';
var assetsPath = './assets/';

module.exports = {
  appPath: appPath,
  buildPath: buildPath,
  distPath: distPath,

  dist: {
    srcPath: buildPath + 'index.html',
    distPath: distPath
  },

  clean: {
    srcPath: [
      distPath + '*',
      buildPath + '*'
    ]
  },

  styles: {
    srcPath: appPath + 'stylesheets/style.styl',
    watchPath: appPath + 'stylesheets/**/*.styl',
    buildPath: buildPath + 'css',
    distPath: distPath + 'css',
  },

  markup: {
    srcPath: [
      appPath + '*.jade'
    ],
    buildPath: buildPath,
    distPath: distPath
  },

  images: {
    srcPath: appPath + 'images/**/*.png',
    buildPath: buildPath + 'images',
    distPath: distPath + 'images'
  },

  jshint: {
    srcPath: [
      appPath + '**/*.js'
    ]
  },

  copyjs: {
    srcPathBuild: [
      'node_modules/phaser/dist/phaser.js',
      assetsPath + 'js/devreload.js'
    ],
    srcPathDist: [
      'node_modules/phaser/dist/phaser.min.js'
    ],
    buildPath: buildPath + 'js',
    distPath: distPath + 'js'
  },

  copycss: {
    srcPath: [
      assetsPath + 'css/normalize.css',
      assetsPath + 'css/Skeleton/css/skeleton.css'
    ],
    buildPath: buildPath + 'css/',
    distPath: distPath + 'css/'
  },

  copyassets: {
    srcPath: [
      assetsPath + 'images/*.png'
    ],
    buildPath: buildPath + 'assets/',
    distPath: distPath + 'assets/'
  },

  spritesheet: {
    srcPath: [
      assetsPath + 'images/eyes_*.png',
      assetsPath + 'images/mouth_*.png'
    ],

    buildPath: buildPath + 'assets/',
    distPath: distPath + 'assets/',
    imageName: 'sprites.png',
    mapName: 'sprites.json',
    algorithm: 'binary-tree'
  },

  browserify: {
    entryPoint: appPath + 'js/index.js',
    buildPath: buildPath + 'js',
    distPath: distPath + 'js'
  }
};
