/* Projects Collection - An ordered list of Projects */
var ProjectModel = require('../models/projectModel.js');

module.exports = Backbone.Firebase.Collection.extend({
    model: ProjectModel,
    firebase: new Firebase(app.fbUrl + '/projects/'),
    initialize: function() {
    }
  });