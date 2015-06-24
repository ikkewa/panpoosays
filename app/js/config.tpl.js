
var publicUrl = 'bit.ly/1JiGPKz'
var localUrl = '127.0.0.1';
var url = process.env.NODE_ENV === 'development' ? localUrl : publicUrl;

module.exports = {
  socketUrl: 'http://' + url + ':8080'
};
