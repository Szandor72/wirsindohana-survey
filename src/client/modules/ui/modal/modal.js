import { LightningElement, api } from 'lwc';

export default class Modal extends LightningElement {
    @api
    title;

    cancelClick() {
        const cancelEvent = new CustomEvent('cancelmodal');
        this.dispatchEvent(cancelEvent);
    }
}
