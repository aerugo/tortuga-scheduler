'use strict'

import Vue from 'vue';
import template from './item-field.template.html';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const ItemField = Vue.extend({
  template,
  props: {
    content: {
      type: null,
    },
    item: {
      type: Object,
    },
    fieldtype: {
      type: String,
    },
    dateTo: {
      type: null,
    },
    dateFrom: {
      type: null,
    },
  },
  methods: {
    update: function (event) {
      let url = '/api/events/update/' + this.item.ID;
      Vue.http.put(url, this.item).then((response) => {
        this.connectionOk = true;
      }, (response) => {
        this.connectionOk = false;
      });
    },
  },
  computed: {
    _dateFrom: {
      get: function () {
        return this.dateFrom;
      },
      set: function (dateFrom) {
        if (!moment(dateFrom).isSame(this.dateFrom, 'day')) {
          this.dateFrom = dateFrom;
        }
      },
    },
    _dateTo: {
      get: function () {
        return this.dateTo;
      },
      set: function (dateTo) {
        if (!moment(dateTo).isSame(this.dateTo, 'day')) {
          this.dateTo = dateTo;
        }
      },
    },
  },
});

Vue.component('item-field', ItemField)

export default ItemField;