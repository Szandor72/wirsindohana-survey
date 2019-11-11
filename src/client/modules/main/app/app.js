import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track accounts;
    @track isSurveyFormModalVisible = false;
    @track surveyFields;
    @track isFormDataIncomplete = true;
    @track thankyouVisible = false;
    @track numberofsubmissions = 17;
    formdata = {};
    insertResult;

    connectedCallback() {}

    openSurvey() {
        fetch('/data/survey')
            .then(response => {
                return response.json();
            })
            .then(fields => {
                this.surveyFields = fields;
                console.log('received fields');
                this.isSurveyFormModalVisible = true;
            });
    }

    hideSurvey() {
        this.isSurveyFormModalVisible = false;
    }

    onSurveyFormSaveClick() {
        this.isSurveyFormModalVisible = false;
        this.isSaving = true;
        fetch('data/savesurvey', {
            method: 'POST',
            body: JSON.stringify(this.formdata),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.thankyouVisible = true;
                this.insertResult = data;
            });
    }

    handleformdata(event) {
        let formData = event.detail;
        if (
            formData.TopicDescription__c &&
            formData.TopicDescription__c.length > 0 &&
            formData.Captcha__c &&
            formData.Captcha__c === 'Bear'
        ) {
            this.formdata = formData;
            this.isFormDataIncomplete = false;
        }
    }
}
