(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "f75e3e40f61d160df8123d4ae30f5502b37b787e";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;


User = function() {

};
User.prototype.getAvatar = function(name, displayFunction) {
  $.get('https://api.github.com/users/' + name + '?access_token=' + apiKey).then(function(avatar) {
    displayFunction(avatar);
  }).fail(function(error) {
    $('.showAvatar').text("This Username " + name + " is " + error.responseJSON.message + "." +
      "Please Enter the Correct Username");
  });
};

User.prototype.getUser = function(name, displayFunction) {
  $.get('https://api.github.com/users/' + name + '?access_token=' + apiKey).then(function(users) {
    displayFunction(users);
  }).fail(function(error) {
    $('.showUser').text("This Username " + name + " is " + error.responseJSON.message + "." +
      "Please Enter the Correct Username");
  });
};

User.prototype.getRepos = function(name, displayFunction) {
  $.get('https://api.github.com/users/' + name + '/repos?access_token=' + apiKey).then(function(repos) {
    displayFunction(repos);
  }).fail(function(error) {
    $('.showUser').text("This Username " + name + " is " + error.responseJSON.message + "." +
      "Please Enter the Correct Username");
  });
};

exports.userModule = User;

},{"./../.env":1}],3:[function(require,module,exports){
var User = require('./../js/github.js').userModule;

var displayAvatar = function(avatar) {
  $('#showAvatar').empty();
  $('#showAvatar').html('<img src="' + avatar.avatar_url + '">');
};

var displayUser = function(user) {
  $('#showUser').empty();
  $('#showUser').append("<li>" + user.name + "</li > ");
};

var displayRepositories = function(repos) {
  $('#showRepos').empty();
  repos.forEach(function(repo) {
    $('#showRepos').append("<li><a href='" + repo.html_url + "'>" + repo.name + "</a>: " + repo.description + "</li > ");
  });
};

$(document).ready(function() {
  var searchUsers = new User();
  $('#search').click(function() {
    var name = $('#username').val();
    console.log(name);
    searchUsers.getAvatar(name, displayAvatar);
    searchUsers.getUser(name, displayUser);
    searchUsers.getRepos(name, displayRepositories);
  });
});

},{"./../js/github.js":2}]},{},[3]);
