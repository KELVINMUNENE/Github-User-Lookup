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
