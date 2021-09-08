let db = {};
let model = {name: "Dima"};
//console.log(model.name);
//console.log(db.model);
console.log(db[model.name]);
db[model.name] = model;
console.log('***db*** = ', db);
console.log(db.Dima.name);
console.log(db.Dima);
