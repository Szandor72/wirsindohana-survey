require('dotenv').config();

const jsforce = require('jsforce');
const express = require('express');

const username = process.env.SFDC_USERNAME;
const password = process.env.SFDC_PASSWORD;

const conn = new jsforce.Connection({
    loginUrl: 'https://login.salesforce.com',
    version: '47.0'
});

let surveyFields = [];
let picklistOptions = {};

const topicAnswerDefinitionRequest = {
    url:
        '/services/data/v47.0/ui-api/record-defaults/create/TopicSurveyAnswer__c',
    method: 'get',
    body: '',
    headers: {
        'Content-Type': 'application/json'
    }
};

const picklistOptionsRequest = {
    url:
        '/services/data/v47.0/ui-api/object-info/TopicSurveyAnswer__c/picklist-values/012000000000000AAA',
    method: 'get',
    body: '',
    headers: {
        'Content-Type': 'application/json'
    }
};

conn.login(username, password, error => {
    if (error) {
        console.error(error);
        process.exit(-1);
    } else {
        console.log('Connected.');
    }
});

// eslint-disable-next-line no-undef
module.exports = app => {
    // tell express server to expect json requests
    app.use(express.json());

    app.get('/data/accounts', (request, result) => {
        // do stuff
        conn.query(
            'SELECT Id, Rating, Description, Name FROM Account',
            (error, data) => {
                if (error) {
                    console.error(error);
                }
                result.json(data.records);
                console.log(data.records);
            }
        );
    });

    app.get('/data/survey', (request, result) => {
        if (surveyFields.length > 0) {
            result.json(surveyFields);
            return;
        }
        conn.request(topicAnswerDefinitionRequest, (error, response) => {
            if (error) {
                console.error(error);
            }
            surveyFields = response.objectInfos.TopicSurveyAnswer__c.fields;
            result.json(surveyFields);
        });
    });

    app.get('/data/surveyOptions', (request, result) => {
        if (Object.keys(picklistOptions).length > 0) {
            result.json(picklistOptions);
            return;
        }
        conn.request(picklistOptionsRequest, (error, response) => {
            if (error) {
                console.error(error);
            }
            picklistOptions = response.picklistFieldValues;
            result.json(picklistOptions);
        });
    });

    app.post('/data/savesurvey', (req, res) => {
        conn.sobject('TopicSurveyAnswer__c').create(req.body, (err, data) => {
            if (err) {
                console.error(err);
            }
            console.log(data);
            res.json(data);
        });
    });
};
