'use strict'

import events from './events.db';
import utils from '../../utils/utils';

/**
 * Route: GET '/api/factProject/all'
 */
export const getAll = (req, res) => {
    events.getAll()
    .then((eventsItems) => {
        return res.status(200).json(eventsItems);
    })
    .catch((err) => utils.handleError(res, err));
}

export const createEvent = (req, res) => {
    let _event = req.body;
    events.create(_event)
    .then((eventItem) => res.status(200).json(eventItem))
    .catch((err) => utils.handleError(res, err));
}

export const updateEvent = (req, res) => {
    let {id} = req.params;
    let _event = req.body;
    console.log(_event);
    events.update(id, _event)
    .then((eventItem) => res.status(200).json(eventItem))
    .catch((err) => utils.handleError(res, err));
}

export default {
    all: getAll,
    create: createEvent,
    update: updateEvent,
}