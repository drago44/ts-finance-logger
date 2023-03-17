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
  const thisData = Object.values(data);
  const res = doc(
    String(thisData[0]),
    String(thisData[1]),
    Number(thisData[2]),
  );

  list.render(res, type, 'end');
});

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const res = doc(tofrom.value, details.value, amount.valueAsNumber);

  list.render(res, type.value, 'end');
  localStorage.setItem('doc', JSON.stringify([...oldDoc, [type.value, res]]));
});

function doc(v1: string, v2: string, v3: number) {
  let values: [string, string, number];
  values = [v1, v2, v3];

  let doc: HasFormatter;
  if (type.value === 'invoice') {
    doc = new Invoice(...values);
  } else {
    doc = new Payment(...values);
  }

  return doc;
}
