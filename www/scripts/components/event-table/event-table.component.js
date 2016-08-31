'use strict'

import Vue from 'vue';
import template from './event-table.template.html'
import eventsService from '../../services/events.service.js';
import utils from '../../services/utils.js';
import VueResource from 'vue-resource';
import moment from 'moment';
import _ from 'lodash';

Vue.use(VueResource);

// Get shorthands to utils.storage and utils.http
const {storage, http} = utils;

const EventTable = Vue.extend({
    template,
    props: {
        connectionOk: {
            type: Boolean,
            default: true,
        },
        loading: {
            type: Boolean,
            default: false,
        }
    },
    data: function() {

        let events = storage.get('allEvents') || [];
        eventsService.getAllEvents().then(function () {
            let events = storage.get('allEvents');
            var i;
            for (i = 0; i < events.length; i++){
                events[i]['Date'] = new Date(events[i]['Date']);
            };
            this.events = events;
        }.bind(this))
        .catch( err => {console.log(err)});
        
        return {
            events: events,
        }
    },
    method: {
        getdate: function(value) {
            return moment(new Date(value)).isValid();
        },
    }
});

Vue.component('event-table', EventTable)

export default EventTable;

/**
 * Date filer, similar to that of Angular's
 */
Vue.filter('date', (value, format) => {
  return moment(new Date(value)).isValid()
    ? moment(value).format(!!format ? format
    : 'YYYY-MM-DD') : value;
});