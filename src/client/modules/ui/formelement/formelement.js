import { LightningElement, api, track } from 'lwc';

export default class FormElement extends LightningElement {
    @api
    label;

    @api
    helptext;

    @api
    type;

    @api
    placeholdertext;

    @api
    stacked;

    @api
    value;

    @track
    fieldName;

    @track
    options = [];

    @track
    charactercount = 0;

    @track
    maxCharacters = 1200;

    @api
    get name() {
        return this.fieldName;
    }

    set name(value) {
        this.fieldName = value;
        this.setAttribute('name', this.fieldName);
        if (this.type === 'Picklist' && this.options.length < 1) {
            fetch('/data/surveyOptions')
                .then(response => {
                    return response.json();
                })
                .then(picklistDefinition => {
                    picklistDefinition[value].values.forEach(option => {
                        this.options.push(option.value.replace('&lt;', '<'));
                    });
                    //this.value = picklistDefinition[value].values[0].value;
                });
        }
    }

    count(event) {
        let count = event.target.value.length;
        this.charactercount = count;
    }

    handleChange(event) {
        this.value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('valuechange', {
                value: this.value
            })
        );
    }

    handleCheckbox(event) {
        if (event.target.value === 'true') {
            this.value = false;
            event.target.value = 'false';
        } else {
            this.value = true;
            event.target.value = 'true';
        }
        this.dispatchEvent(
            new CustomEvent('valuechange', {
                value: this.value
            })
        );
    }

    get formElementClass() {
        let cssClass = 'slds-form-element';
        if (this.stacked) {
            cssClass += ' slds-form-element-stacked';
        }
        cssClass += ' slds-p-around_xx-small';
        return cssClass;
    }

    get isTextarea() {
        if (this.type === 'TextArea') {
            return true;
        }
        return false;
    }

    get isPicklist() {
        if (this.type === 'Picklist') {
            return true;
        }
        return false;
    }

    get isInput() {
        if (this.type === 'Text') {
            return true;
        }
        return false;
    }

    get isCheckbox() {
        if (this.type === 'Checkbox') {
            return true;
        }
        return false;
    }
}
