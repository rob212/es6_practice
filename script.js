// Lecture: let and const 

// ES5 
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
// let is block scoped so it should be used instead of var. Var in ES5 are function scoped but let in ES6 are block scoped.
// const name6 = 'Jane Smith';
// let age6 = 23;
// name6 = 'Jane Miller';
// console.log(name6);


// ES5 - function scoped var variables - seems weird due to not being block scoped. 
function driverLicense5(passedTest) {
    if(passedTest) {
        console.log(firstName);
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    console.log(firstName + ' born in ' + yearOfBirth + ' is now allowed to drive a car!');
};

driverLicense5(true);


// ES6 - block scoped let variables 
// function driverLicense6(passedTest) {
//     if (passedTest) {
//         let firstName = 'John';
//         const yearOfBirth = 1990;

//     }
//     console.log(firstName + ' born in ' + yearOfBirth + ' is now allowed to drive a car!');
// };

// driverLicense6(true);

function driverLicense6(passedTest) {
    // you would have gotten firstName undefined here in ES5 due to variables being hoisted and set to undefined. But in ES6 you would get an error as firstName has not been initialized, much safer. 
    //console.log(firstName);
    let firstName;
    // you have to init a const when it is declared.
    const yearOfBirth = 1990;

    if (passedTest) {
        firstName = 'John';
    }
    console.log(firstName + ' born in ' + yearOfBirth + ' is now allowed to drive a car!');
};

driverLicense6(true);



// block scoping allows this to not intefere with the i's if they were both var then they would interupt each other as they are hoisted to the top of the file (function) and therefore the same thing.
let i = 23;

for(let i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i);
console.log('                                       ');

// ======================================================================================================================

////////////////////////////////
// Blocks and IIFEs 

// we don't have to use IIFE like we did in ES5 to provide data privacy. We can use blocks due to block scoping.
{
    const a = 1;
    const b = 2;
    var c = 3;
}
// console.log(a + b);
console.log(c);

// to do this in ES5 we would have had to create an IIFE
(function() {
    var c = 3
})();

console.log(c);

// c is populting as its a var. Just use let and blocks for the win !! 

console.log('                                       ');

// ======================================================================================================================


//////////////////////////////////////
// Strings in ES6

// let firstName = 'Rob';
// let lastName = 'McBryde';
// const yearOfBirth = 1983;

// function calcAge(year) {
//     return 2020 - year;
// };

// // ES5 
// console.log('This is firstName: ' + firstName + ', lastName: ' + lastName + '. Born in: ' + yearOfBirth + '. So they are ' + calcAge(yearOfBirth) + ' years old.');

// //ES6 - template literals using back ticks `
// console.log(`This is firstName: ${firstName}, lastName: ${lastName}. Born in: ${yearOfBirth}. So they are ${calcAge(yearOfBirth)} years old.`);

// // THere are also some new string methods in ES6
// const n = `${firstName} ${lastName}`;
// console.log(n.startsWith('R'));
// console.log(n.startsWith('r'));
// console.log(n.endsWith('McB'));
// console.log(n.endsWith('de'));
// console.log(n.includes(' '));
// console.log(n.includes(' R'));

// console.log(`${firstName} `.repeat(5));


console.log('                                       ');

// ======================================================================================================================


//////////////////////////////////////
// ES6 arrow functions

const years = [1990, 1982, 1937, 1965];

// ES5 using the map
var ages5 = years.map(function(element) {
    return 2020 - element;
});
console.log(ages5);

// ES6 - don't need to return or funtion keywords 
let ages6 = years.map(element => 2020 - element);
console.log(ages6);

// if you have more than one parameter you need paranthesis - Using map you have access to element, the current index and the array itself
ages6 = years.map((el, idx) => `Age element ${idx + 1}: ${2020 - el}.`);
console.log(ages6);

// If we have more than one line then we do need curly braces and the return keyword
ages6 = years.map((el, idx) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age is: ${age}`;
});
console.log(ages6);

console.log('                                       ');

// ======================================================================================================================


//////////////////////////////////////
// ES6 arrow functions - lexical 'this' keyword

// arrow functions share the surrounding this keyword. They have a lexical this variable

// ES5 
// var box5 = {
//     color: 'green',
//     position: 1,
//     clickMe: function() {
//         // known hacky work aorund in ES5
//         var self = this;
//         // the this keywords point to the window context here not the box5 object
//         document.querySelector('.green').addEventListener('click', function() {
//             alert('The box is: ' + self.color + ' and is at position: ' + self.position);
//         });
//     }
// }
// box5.clickMe();


// ES6 
// Always use arrows when you want to preserve the this of a surrounding object. 
const box6 = {
    color: 'green',
    position: 1,
    // we cannot make this an arrow function as when you do it shares the this with the surrounding object which is now the global context which does not have color or position defined.
    clickMe: function () {
        document.querySelector('.green').addEventListener('click', () => {
            alert('The box is: ' + this.color + ' and is at position: ' + this.position);
        });
    }
}

box6.clickMe();


// One more fun arrow function example 

function Person(name) {
    this.name = name;
}

// ES5 
// Person.prototype.myFriends5 = function(friends) {
//     var arr = friends.map(function(el) {
//         return this.name + ' is friends with ' + el;
//     }.bind(this));
//     console.log(arr);
// };

// var friends = ['Bob', 'Jane', 'Mark'];
// new Person('John').myFriends5(friends);


// ES6 
Person.prototype.myFriends6 = function(friends) {
    const arr = friends.map((el) => `${this.name} is friends with ${el}`);
    console.log(arr);
};

const friends = ['Bob', 'Jane', 'Mark'];
new Person('Mike').myFriends6(friends);


console.log('                                       ');

// ======================================================================================================================


//////////////////////////////////////
// Destructuring - a convenient way to extract data from an array



// ES5
var john = ['John', 26];
//var name = john[0];
//var age = john[1];

// ES6
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName, lastName} = obj;
console.log(firstName, lastName);

// can provide aliases after a colon
const {firstName: a, lastName: b} = obj;
console.log(a,b);

// Returning multiple items from a function 
// ES6 
function calcAgeAndRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age2, retirement] = calcAgeAndRetirement(1990);
console.log(age2);
console.log(retirement);
