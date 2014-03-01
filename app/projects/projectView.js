/* Project View - displays a single projects */

var ProjectModelFirebase = require('./projectModelFirebase.js');

var projectTemplate = require('./projectTemplate.hbs');

var ShotsCollectionFirebase = require('../shots/shotsCollectionFirebase.js');

var ShotsView = require('../shots/shotsView.js');

module.exports = Backbone.View.extend({
  tagName: 'div',

  template: projectTemplate,

  initialize: function() {
    if(!this.model) {
      this.model = new ProjectModelFirebase({id: this.id});
    }
  
    this.listenTo(this.model, 'sync', this.render); // Without this, the collection doesn't render after it completes loading
    
    this.shotsCollectionFirebase = new ShotsCollectionFirebase([], {project: this.model.get('id')});
    this.shotsView = new ShotsView({ collection: this.shotsCollectionFirebase, project: this.model.get('id')});
  },

  render: function() {

    this.$el.html(this.template(this.model.toJSON()));

    shotDiv = this.$el.find('div.shots');
    shotDiv.html(this.shotsView.render().el);

    this.delegateEvents();  // Fix for events not firing in sub-views: http://stackoverflow.com/questions/9271507/how-to-render-and-append-sub-views-in-backbone-js    
    return this;
  }
});
