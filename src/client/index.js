import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import MyApp from 'main/app';

const app = createElement('main-app', { is: MyApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
