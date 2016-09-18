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

        let places = [
                          'Tortuga'
                        , 'Kosningamiðstöð'
                        , 'S Kosningaskrifstofa'
                        , 'NA Kosningaskrifstofa'
                        , 'NV Kosningaskrifstofa'
                        , 'Kolaportið'
                    ];

        let date = moment(new Date()).format("YYYY-MM-DD");

        let events = [];
        eventsService.getOnDate(this.date)
        .then(function() {
            let events = storage.get('currentEvents');
            this.events = events;
        }.bind(this))
        .catch( err => {console.log(err)});

        return {
            date: date,
            places: places,
            events: events,
        }
    },
    methods: {
        openOnDate: function (list, date, place) {
            let open = false;
            let i;
            for (i = 0; i < list.length; i++) { 
                if(moment(list[i].date).format("YYYY-MM-DD") == date && list[i].place == place) {
                    open = true;
                }
            }
            return open;
        },
        placeFilter: function (place, value, index, array) {
            if(value.place == place) {
                return true
            } else {
                return false
            }
        }
    },
});

export default MainRouteComponent;
