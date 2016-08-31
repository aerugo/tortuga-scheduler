'use strict'

import Vue from 'vue';
import template from './register-event.template.html';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const RegisterEvent = Vue.extend({
  template,
  props: {
    allevents: {
      type: Array,
    },
  },
  data: function() {
    return {
        event: '',
        person: '',
        date: null,
    }
  },
  methods: {
    post: function (event) {
      let item = {
        "Event": this.event,
        "Person": this.person,
        "Date": this.date,
        "isDeleted": false
      };
      let url = '/api/events/create/';
      Vue.http.put(url, item).then((response) => {
        this.connectionOk = true;
        item.ID = response.data.ID;
        this.allevents.push(item);
        this.$data = initialState()
      }, (response) => {
        this.connectionOk = false;
      });
    }
  },
});

// outside of the component:
function initialState (){
  return {
    name: '',
    news: '',
    date: new Date(),
  }
}

Vue.component('register-event', RegisterEvent)

export default RegisterEvent;