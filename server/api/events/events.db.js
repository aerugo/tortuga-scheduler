'use strict'

import _ from 'lodash';
import sql from 'seriate';
import Promise from 'bluebird';

export function getAll() {
    return new Promise((resolve, reject) => {
        sql.execute({
            query: sql.fromFile('./sql/events.getAll.sql')
        })
        .then((events) => {
            resolve(events);
        })
        .catch(reject);
    })
}

export function create(event) {
    return new Promise((resolve, reject) => {
        sql.execute({
            query: sql.fromFile('./sql/events.create.sql'),
            params: {
                person: {
                    type: sql.NVarChar,
                    val: event['Person']
                },
                event: {
                    type: sql.NVarChar,
                    val: event['Event']
                },
                date: {
                    type: sql.Date,
                    val: event['Date']
                }
            }
        })
        .then((event) => resolve(event[0]))
        .catch(reject)
    });
}

export function update(id, event) {
    return new Promise((resolve, reject) => {
        sql.execute({
            query: sql.fromFile('./sql/events.update.sql'),
            params: {
                id: {
                type: sql.BigInt,
                val: id,
                },
                person: {
                    type: sql.NVarChar,
                    val: event['Person']
                },
                event: {
                    type: sql.NVarChar,
                    val: event['Event']
                },
                date: {
                    type: sql.Date,
                    val: event['Date']
                },
                isdeleted: {
                    type: sql.Bit,
                    val: event['isDeleted']
                }
            }
        })
        .then((event) => resolve(event[0]))
        .catch(reject)
    });
}

export default {
    getAll: getAll,
    create: create,
    update: update,
}