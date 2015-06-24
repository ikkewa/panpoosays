var socketio = require('socket.io-client');
var config = require('../../../config/config');

function Play() {
  this.queue = [];
  this.tid = false;
  this.supportSpeech = 'speechSynthesis' in window;
  this.hasLiveTweets = false;
  this.isTalking = false;
}

Play.prototype = {
  preload: function preload() {
    this.add.sprite(0, 0, 'landscape');
    this.panpoo = this.add.sprite(0, 0, 'panpoo');
    this.panpoo.position.set(this.world.centerX - this.panpoo.width / 2, 200);

    this.eyes = this.add.sprite(this.world.centerX - 75, 330, 'eyes', 6);
    this.eyes.animations.add('blink');

    this.mouth = this.add.sprite(this.world.centerX - 75, 430, 'mouth');
    this.mouth.animations.add('speak');

    this.socket = socketio(config.socketUrl);
    this.socket.on('connect', this.onConnect.bind(this));
    this.socket.on('tweet', this.onTweet.bind(this));
  },

  create: function create() {

  },

  onConnect: function onConnect() {
    this.socket.emit('awaiting-tweets');

    // setup a timeout. if in the first 10 seconds
    // there is no live tweet, than get the last x
    // tweets so that the user can experience something
    setTimeout(function() {
      if(this.hasLiveTweets === false) {
        this.socket.emit('last-tweets');
      }
    }.bind(this), 1000);
  },

  onTweet: function onTweet(data) {
    console.log('received tweet', new Date());
    this.hasLiveTweets = true; // used for last-tweets
    this.queue.push(data);

    if(!this.tid || this.queue.length === 1) {
      this.tid = setTimeout(this.queueTweet.bind(this), 2000);
    }
  },

  queueTweet: function queueTweet() {
    this.showTweet(this.queue.shift());
  },

  showTweet: function showTweet(data) {
    // show tweet logic

    // need to load voice here, as in preload() the getVoices() always returned empty array
    this.speechVoice = this.getSpeechSyntesisVoice();


    if(this.speechVoice) {
      if(!this.isTalking) {
        // setup the utterance
        this.speaking = new SpeechSynthesisUtterance();

        // params for the text to speak
        this.speaking.text = (data && data.msg) || 'whoops';
        this.speaking.volume = 1.0;
        this.speaking.rate = 1.0;
        this.speaking.pitch = 1.7;
        this.speaking.voice = this.speechVoice;
        // bindings when speaking to the visual
        this.speaking.onstart = function() {
          this.isTalking = true;
          this.eyes.play('blink', 4, true);
          this.mouth.play('speak', 10, true);
        }.bind(this);
        this.speaking.onerror = function() {
          this.isTalking = false;
          this.eyes.animations.stop('blink');
          this.mouth.animations.stop('speak');
        }.bind(this);
        this.speaking.onend = function() {
          this.isTalking = false;
          this.eyes.animations.stop('blink');
          this.mouth.animations.stop('speak');
        }.bind(this);

        // ok lets talk
        console.log('now talk...', this.speaking);
        window.speechSynthesis.speak(this.speaking);
      }
    }

    // queue next tweet if there is any
    if(this.queue.length > 0) {
      this.tid = setTimeout(this.queueTweet.bind(this), 5000);
    }

    this.tid = false;
  },

  getSpeechSyntesisVoice: function getSpeechSyntesisVoice() {
    if(!this.supportSpeech) {
      return false;
    }

    var voices = window.speechSynthesis.getVoices().filter(function(voice) {
      return voice.lang === 'de-DE' || voice.lang === 'de_DE';
    });

    if(voices && Array.isArray(voices) && voices.length > 0) {
      return voices[0];
    }

    return false;
  }
};

module.exports = Play;

