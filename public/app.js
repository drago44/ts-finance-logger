import { Invoice } from './classes/Invoice.js';
import { Payment } from './classes/Payment.js';
import { ListTemplate } from './classes/ListTemplate.js';
const form = document.querySelector('.new-item-form');
// inputs
const type = document.querySelector('#type');
const tofrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
// list template instance
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
const oldDoc = JSON.parse(localStorage.getItem('doc') || '[]');
oldDoc.forEach((item) => {
    const [type, data] = item;
    let doc;
    if (type === 'invoice') {
        doc = new Invoice(data.client, data.details, data.amount);
    }
    else {
        doc = new Payment(data.recipient, data.details, data.amount);
    }
    list.render(doc, type, 'end');
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let doc;
    if (type.value === 'invoice') {
        doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
    }
    else {
        doc = new Payment(tofrom.value, details.value, amount.valueAsNumber);
    }
    list.render(doc, type.value, 'end');
    localStorage.setItem('doc', JSON.stringify([...oldDoc, [type.value, doc]]));
});
