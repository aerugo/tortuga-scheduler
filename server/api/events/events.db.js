'use strict'

import pg from 'pg';
import fs from 'fs';
import Promise from 'bluebird';
import moment from 'moment';

var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://rrqczhyd:XZ1AtR_Bn6wEtX7DEe21UvpQv_LhZ5r5@horton.elephantsql.com:5432/rrqczhyd';
var db = pgp(connectionString);

export function getAll() {
    return new Promise((resolve, reject) => {
        let query = 'select * from timeslots WHERE isdeleted IS NOT TRUE'
        db.any(query)
        .then((events) => resolve(events))
        .catch(reject)
    });
}

export function getOnDate(date) {
    let _date = moment(date, "DDMMYYYY").format("DD-MM-YYYY");
    return new Promise((resolve, reject) => {
        let query = `select * from timeslots WHERE date = '${_date}' AND isdeleted IS NOT TRUE`
        db.any(query)
        .then((events) => resolve(events))
        .catch(reject)
    });
}

export function create(event) {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO timeslots
        (
              "person"
            , "comment"
            , "date"
            , "starttime"
            , "endtime"
            , "place"
            , "email"
        ) 
        VALUES 
        (
              '${event['person']}'
            , '${event['comment']}'
            , '${event['date']}'
            , '${event['starttime']}'
            , '${event['endtime']}'
            , '${event['place']}'
            , '${event['email']}'
        )
        RETURNING *
        `
        db.any(query)
        .then((events) => resolve(events))
        .catch(reject)
    });
}

export function update(id, event) {
    return new Promise((resolve, reject) => {
        console.log(event);
        console.log(id);
        let person = event['person'];
        let comment = event['comment'];
        let date = event['date'];
        let isdeleted = event['isdeleted'];
        let query = `UPDATE timeslots SET
        (
              "person"
            , "comment"
            , "date"
            , "starttime"
            , "endtime"
            , "isdeleted"
            , "place"
            , "email"
        ) 
        = 
        (
              '${event['person']}'
            , '${event['comment']}'
            , '${event['date']}'
            , '${event['starttime']}'
            , '${event['endtime']}'
            , '${event['place']}'
            , '${event['email']}'
            , '${isdeleted}'
        )
        WHERE id = ${id} 
        RETURNING person, comment, date, email, place, id, isdeleted;
        `
        db.any(query)
        .then((events) => resolve(events))
        .catch(reject)
    });
}

export default {
    getAll: getAll,
    getOnDate: getOnDate,
    create: create,
    update: update,
}