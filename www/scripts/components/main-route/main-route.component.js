'use strict'

import Vue from 'vue';
import template from './main-route.template.html'
import eventsService from '../../services/events.service.js';
import utils from '../../services/utils.js';
import moment from 'moment';

// Get shorthands to utils.storage and utils.http
const {storage, http} = utils;

const MainRouteComponent = Vue.extend({
    template,
    data: function() {

        let date = moment(new Date()).format("YYYY-MM-DD");
        eventsService.getOnDate(date)
        .then( function(result) {
            storage.set('currentEvents', result);
        }.bind(this).bind(this))
        .catch( err => {
            console.log(err);
            storage.set('currentEvents', {});
        });
        let events = storage.get('currentEvents');
        console.log(events);
        return {
            events: events,
            date: date,
        }
    },
});

export default MainRouteComponent;