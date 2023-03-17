type StringOrNum = string | number;
type ObjWithName = { name: string; uid: StringOrNum };

const greet = (user: ObjWithName) => {
  console.log(`${user.name} say hello`);
};

const greetAgain = (user: ObjWithName) => {
  console.log(`This ${user.uid}`);
};
