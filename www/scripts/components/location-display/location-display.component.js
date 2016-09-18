'use strict'

import Vue from 'vue';
import template from './location-display.template.html';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const LocationDisplay = Vue.extend({
  template,
  props: {
    open: {
      type: Boolean,
    },
    place: {
      type: String,
    },
    items: {
    },
  },
});

Vue.component('location-display', LocationDisplay)

export default LocationDisplay;

Vue.filter('dateandplace', function (value, date, place) {
  let _date = moment(value[0].date).format("YYYY-MM-DD");
  let _place = value[0].place;
  return _date == date && _place == place;
})