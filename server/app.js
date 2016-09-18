'use strict'

import express from 'express';
import bodyParser from 'body-parser';
import sql from 'seriate';
import pg from 'pg';
import config from './config';
import utils from './utils/utils';
import schedule from 'node-schedule';
import moment from 'moment';
import mail from './utils/mail.js';

const app = express();

// Set default configuration for Seriate
sql.setDefaultConfig(config.db);

// Use the body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import routes from './routes';

routes(app, utils.logger);

const server = app.listen(config.port, config.ip, () => {
  const { address, port } = server.address();
  utils.log(`App listening on ${address} on port ${port}`);
})

// Schedule email reminders

import events from './api/events/events.db';

var rule = new schedule.RecurrenceRule();

rule.minute = new schedule.Range(0, 59, 1);

function stringifyTomorrow() {
   var today = moment();
   var tomorrow = today.add(1, 'days');
   return moment(tomorrow).format("DDMMYYYY");
}

schedule.scheduleJob(rule, function(){
    events.getOnDate(stringifyTomorrow())
    .then((eventsItems) => {

      let i;
      for(i = 0; i < eventsItems.length; ++i) {
        let event = eventsItems[i];
        let item = {
            'from_email': 'tortuga@email.hugi.se',
            'to_email': event.email,
            'subject': mail.generateSubject(event),
            'content': mail.generateContent(event),
        }
        mail.sendMail(item);
      }

      console.log(eventsItems);
    })
    .catch((err) => console.log(err));
});