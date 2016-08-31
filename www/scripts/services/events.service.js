'use strict'

import Promise from 'bluebird';
import utils from './utils.js';

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

export default {
    getAllEvents: getCurrentRemoteEvents
}