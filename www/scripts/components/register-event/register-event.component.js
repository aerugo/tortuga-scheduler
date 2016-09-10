'use strict'

import Vue from 'vue';
import template from './register-event.template.html';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const RegisterEvent = Vue.extend({
  template,
  props: {
    allevents: {},
  },
  data: function() {
    return {
        comment: '',
        person: '',
        date: new Date(),
        starttime: "12:00",
        endtime: "17:00",
        email: '',
        place: '',
    }
  },
  methods: {
    post: function (event) {
      let item = {
        "comment": this.comment,
        "person": this.person,
        "date": this.date,
        "isdeleted": false,
        "starttime": this.starttime,
        "endtime": this.endtime,
        "email": this.email,
        "place": this.place,
      };
      let url = '/api/events/create/';
      Vue.http.put(url, item).then((response) => {
        this.connectionOk = true;
        item.ID = response.data.ID;
        this.allevents.push(item);
      }, (response) => {
        this.connectionOk = false;
      });
    }
  },
});

Vue.component('register-event', RegisterEvent)

export default RegisterEvent;