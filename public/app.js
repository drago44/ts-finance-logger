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
    const thisData = Object.values(data);
    const res = doc(String(thisData[0]), String(thisData[1]), Number(thisData[2]));
    list.render(res, type, 'end');
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const res = doc(tofrom.value, details.value, amount.valueAsNumber);
    list.render(res, type.value, 'end');
    localStorage.setItem('doc', JSON.stringify([...oldDoc, [type.value, res]]));
});
function doc(v1, v2, v3) {
    let values;
    values = [v1, v2, v3];
    let doc;
    if (type.value === 'invoice') {
        doc = new Invoice(...values);
    }
    else {
        doc = new Payment(...values);
    }
    return doc;
}
