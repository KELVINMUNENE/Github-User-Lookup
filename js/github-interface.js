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
