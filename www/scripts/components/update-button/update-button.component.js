'use strict'

import Vue from 'vue';
import template from './update-button.template.html';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const UpdateButton = Vue.extend({
  template,
  props: {
    connectionOk: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Update"
    },
    item: {
      type: Object,
    },
    isDeleted: {
      type: Boolean,
    }
  },
  methods: {
    post: function (event) {
      let url = '/api/events/update/' + this.item.id;
      Vue.http.put(url, this._item).then((response) => {
        this.connectionOk = true;
      }, (response) => {
        this.connectionOk = false;
      });
    },
    delete: function (event) {
      this.item.isdeleted = true;
      let url = '/api/events/update/' + this.item.id;
      Vue.http.put(url, this.item).then((response) => {
        this.connectionOk = true;
      }, (response) => {
        this.connectionOk = false;
        this.item.isdeleted = false;
      });
    },
  },
  computed: {
    _item: {
      get: function () {
        var temporatyItem = jQuery.extend(true, {}, this.item);
        temporatyItem.Probability = this.probability;
        return temporatyItem;
      },
      },
    },
});

Vue.component('update-button', UpdateButton)

export default UpdateButton;