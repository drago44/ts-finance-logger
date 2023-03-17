import { Invoice } from './classes/Invoice.js';
import { Payment } from './classes/Payment.js';
import { ListTemplate } from './classes/ListTemplate.js';
import { HasFormatter } from './interfaces/HasFormatter.js';

const form = document.querySelector('.new-item-form') as HTMLFormElement;

// inputs
const type = document.querySelector('#type') as HTMLInputElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

// list template instance
const ul = document.querySelector('ul')!;
const list = new ListTemplate(ul);

type OldDoc = [
  string,
  { client?: string; recipient?: string; details: string; amount: number },
];
const oldDoc: OldDoc[] = JSON.parse(localStorage.getItem('doc') || '[]');

oldDoc.forEach((item) => {
  const [type, data] = item;

  let doc: HasFormatter;
  if (type === 'invoice') {
    doc = new Invoice(data.client!, data.details, data.amount);
  } else {
    doc = new Payment(data.recipient!, data.details, data.amount);
  }

  list.render(doc, type, 'end');
});

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  let doc: HasFormatter;
  if (type.value === 'invoice') {
    doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
  } else {
    doc = new Payment(tofrom.value, details.value, amount.valueAsNumber);
  }

  list.render(doc, type.value, 'end');
  localStorage.setItem('doc', JSON.stringify([...oldDoc, [type.value, doc]]));
});

// ENUMS

enum ResourceType { BOOK, AUTHOR, FILM, DIRECTOR };

interface Resource<T> {
  uid: number;
  resourceType: ResourceType;
  data: T;
}

const docOne: Resource<object> = {
  uid: 1,
  resourceType: ResourceType.BOOK,
  data: { title: 'name of the wind' }
}
const docTwo: Resource<object> = {
  uid: 10,
  resourceType: ResourceType.DIRECTOR,
  data: { title: 'name of the wind' }
}

console.log(docOne);
console.log(docTwo);