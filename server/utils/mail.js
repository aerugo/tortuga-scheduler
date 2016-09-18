import moment from 'moment';
var helper = require('sendgrid').mail;
const sg = require('sendgrid')("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");


function _request(item) {
    var from_email = new helper.Email(item.from_email);
    var to_email = new helper.Email(item.to_email);
    var subject = item.subject;
    var content = new helper.Content('text/html', item.content);
    var mail = new helper.Mail(from_email, subject, to_email, content);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });
    return request;
}

function generateContent(event) {
    let body = `
        <p>Sæl(l) ${event.person}!</p>
        
        <p>Þú hefur skráð þig í sjálfboðastarf fyrir Pírata á morgun (${moment(event.date).format("YYYY-MM-DD")}) klukkan ${event.starttime}, í ${event.place}.</p> 
        <p>Ef þú þarft nánari upplýsingar, hafðu samband við hugi@piratar.is.
        
        <p>Þessi áminning er send sjálfkrafa, og þessum pósti er ekki hægt að svara.</p>
        
    `
    return body;
}

function generateSubject(event) {
    let subject = `
        ${event.place} klukkan ${event.starttime} á morgun.
    `
    return subject;
}

function sendMail(item) {
    let request = _request(item);
    sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
    });
}

export default {
    sendMail: sendMail,
    generateContent: generateContent,
    generateSubject: generateSubject,
}