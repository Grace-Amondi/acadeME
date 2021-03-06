'use strict';

var Reflux           = require('reflux');

var CourseActions    = require('../actions/CourseActions');
var ChatAPI          = require('../utils/ChatAPI');

var CourseRecipientsStore = Reflux.createStore({

  init: function() {
    this.recipients = null;

    this.listenTo(CourseActions.openChat, this.loadRecipients);
  },

  loadRecipients: function(courseId, cb) {
    cb = cb || function() {};

    console.log('load recipients for course:', courseId);

    ChatAPI.getCourseRecipients(courseId).then(function(recipients) {
      this.recipients = recipients;
      cb(null, this.recipients);
      this.trigger(null, this.recipients);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
      console.log('error getting recipients for course:', courseId);
    }.bind(this));
  }

});

module.exports = CourseRecipientsStore;