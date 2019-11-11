import { LightningElement, api, track } from 'lwc';

export default class FormElement extends LightningElement {
    @track
    checkboxes = [];

    @track
    picklists = [];

    @api
    textareacount = 0;

    @track
    maxCharacters = 1200;

    @track
    topic;

    currentAnswer = {};

    @api
    get fields() {
        return this.fields;
    }

    set fields(value) {
        if (value) {
            Object.keys(value).forEach(key => {
                let field = value[key];
                if (field.apiName.indexOf('__c') > -1) {
                    if (field.dataType === 'Boolean') {
                        this.checkboxes.push(field);
                    }
                    if (key === 'TopicDescription__c') {
                        this.topic = field;
                    }
                    if (field.dataType === 'Picklist') {
                        this.picklists.push(field);
                    }
                }
            });
        }
    }

    handleChange(event) {
        const fieldName = event.target.name;
        this.currentAnswer[fieldName] = event.target.value;
        console.table(this.currentAnswer);
        const formDataChange = new CustomEvent('formdatachange', {
            detail: this.currentAnswer
        });
        this.dispatchEvent(formDataChange);
    }
}
