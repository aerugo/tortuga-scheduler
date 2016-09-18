'use strict'

import Promise from 'bluebird';
import utils from './utils.js';
import moment from 'moment';

// Get shorthands to utils.storage and utils.http
const {storage, http} = utils;

function getCurrentRemoteEvents() {
    let _headers = {};
    return http.get('/api/events/all', {headers: _headers})
    .then((events) => {
        storage.set('allEvents', events);
        return Promise.resolve(events);
    })
}

function getOnDate(date) {
    let _headers = {};
    let _date = moment(date).format("DDMMYYYY");
    return http.get('/api/events/all/' + _date, {headers: _headers})
    .then(function(events) {
        storage.set('currentEvents', events);
    }, function(error) {
        console.log(error);
    });
}

export default {
    getOnDate: getOnDate,
    getAllEvents: getCurrentRemoteEvents
}