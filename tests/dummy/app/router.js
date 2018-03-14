import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {
    path: '/'
  });
  this.route('range');
  this.route('day');
  this.route('week');
  this.route('month');
  this.route('quarter');
  this.route('year');
  this.route('custom');
});

export default Router;