'use strict';

var Reflux = require('reflux');

var CourseActions = Reflux.createActions([

  'openCourse',
  'openLessons',
  'openConversations'

]);

module.exports = CourseActions;