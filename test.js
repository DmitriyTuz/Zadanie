/*let books = {
        'lermontov': ['book4', 'book5'],
        'pushkin': ['book1', 'book2', 'book3'],
        'chaykovskiy': ['book6']
    };

    let a = [];

    console.log(Array.from(books).length);
//    for (let k = 0; k < Array.from(books).length; k++) {
//      a.push(Autor)
//    }

    let res = [{id: 1, name: 'pushkin'}, {id: 2, name: 'lermontov'}, {id: 3, name: 'chaykovskiy'}];

    console.log(books[res[0].name]);
    console.log(books[res[0].name][0]);
    /*let b = [];

    for (let i = 0; i < res.length; i++) {
        if (books[res[i].name]) {
            for (let j = 0; j < books[res[i].name].length; j++) {
                b.push(Book.create({authorId: res[i].id, name: books[res[i].name][j]}));
            }
        }
    }*/

    //Promise.all(b).then((resolve) => {

    //});


// разбираюсь с колбеками

/*const readlineSync = require('readline-sync');

// пример №1 синхронного колбека
function greeting(name) {
  console.log('Hello ' + name);
}

function processUserInput(callback) {
  let name = readlineSync.question('Please enter your name - ');
  callback(name);
}

processUserInput (greeting);*/

// пример №2 (https://ru.hexlet.io/blog/posts/javascript-what-the-heck-is-a-callback)
/*function first() {
  console.log(1);
}

function  second() {
  console.log(2);
}
first();
second();*/

// пример №3
/*function first() {
  // Как будто бы запрос к API
  setTimeout(function() {
    console.log(1);
  }, 500);
}
function second() {
  console.log(2);
}
first();
second();*/

// пример №4
/*function doHomework(subject) {
  console.log(`Starting my ${subject} homework`)
}

doHomework('math');*/

/*function doHomework(subject, callback) {
  console.log(`Starting my ${subject} homework`);
  callback();
}

doHomework('math', function() {
  console.log('Finished my homework');
})*/

/*// или вот так
function doHomework(subject, callback) {
  console.log(`Starting my ${subject} homework`);
  callback();
}
function alertFinished(){
  console.log('Finished my homework');
}
doHomework('math', alertFinished);*/

// пример №5
/*let numbers = [1, 2, 4, 7, 3, 5, 6];

function isOddNumber(number) {
    return number % 2;
}

const oddNumbers = numbers.filter(isOddNumber);
console.log(oddNumbers); // [ 1, 7, 3, 5 ]*/

/*// пример №6 (прям то что нужно для обёртки на колбэках)
function first(callback) {
  console.log("1st");

  callback();
}

function second(callback) {
  console.log("2nd");

  callback();
}

function third() {
  console.log("3rd");
}

setTimeout(function () {
  first(function () {
    second(function () {
      third();
    });
  });
}, 0);*/

/*const readlineSync = require('readline-sync');
let age = readlineSync.question('Input your age please ? ');
console.log(`My age is ${age} years !`);*/

console.log("asdf\tsdga");