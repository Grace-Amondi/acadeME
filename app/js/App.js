/**
 * @jsx React.DOM
 */
'use strict';

var React              = require('react/addons');
var Reflux             = require('reflux');
var Navigation         = require('react-router').Navigation;
var State              = require('react-router').State;
var RouteHandler       = React.createFactory(require('react-router').RouteHandler);

var UserActions        = require('./actions/UserActions');
var CurrentUserStore   = require('./stores/CurrentUserStore');
var CurrentCourseStore = require('./stores/CurrentCourseStore');
var Header             = require('./components/Header');
var Sidebar            = require('./components/Sidebar');
var Footer             = require('./components/Footer');

var App = React.createClass({

  mixins: [Navigation, State, Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      currentUser: {},
      course: {}
    };
  },

  _onUserChange: function(err, user) {
    if ( err ) {
      // handle error
    } else {
      this.setState({ currentUser: user });
    }
  },

  _onCourseChange: function(err, course) {
    if ( err ) {
      // TODO: handle error
    } else if ( !err ) {
      this.setState({ currentCourse: course });
    }
  },

  componentWillReceiveProps: function() {
    if ( !this.isActive('Course') ) {
      this._onCourseChange(null, null);
    }
  },

  componentDidMount: function() {
    UserActions.check(this._onUserChange);
    this.listenTo(CurrentUserStore, this._onUserChange);
    this.listenTo(CurrentCourseStore, this._onCourseChange);
  },

  render: function() {
    return (
      <div>

        <Header currentUser={this.state.currentUser} />

        <div className="body-container">
          <Sidebar course={this.state.currentCourse} />
          <div className="content-container">
            <RouteHandler currentUser={this.state.currentUser}
                          course={this.state.currentCourse} />
          </div>
        </div>

        <Footer />

      </div>
    );
  }

});

module.exports = React.createFactory(App);