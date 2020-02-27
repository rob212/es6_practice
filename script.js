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

console.log('                                       ');

// ======================================================================================================================


//////////////////////////////////////
// Arrays in ES6

// this returns a nodelist. We want to easily convert it to a box.
const boxes = document.querySelectorAll('.box');

// ES5
// var boxesArr5 = Array.prototype.slice.call(boxes);
// boxesArr5.forEach(function(cur) {
//     cur.style.backgroundColor = 'dodgerblue';
// });

// ES6 
// const boxesArr6 = Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');


// Suppose we want to changethe text content in each of the html boxes in index.html
// ES5
// continue from within a loop


// for (var k = 0; k < boxesArr5.length; k++) {
//     if (boxesArr5[k].className === 'box blue') {
//         continue;
//     }
//     boxesArr5[k].textContent = 'I changed to blue!';
// }


// const boxesArr6 = Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');
// console.log(`say what: ${boxesArr6}`);
// // ES6 - has a new 'for of' loop 
// for (const cur of boxesArr6) {
//     if (cur.className.includes('dodgerblue')) {
//         continue;
//     }
//     cur.textContent = 'I changed to blue';
// }



// ES5 - check if array of ages are 18 or older
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function(curr) {
    return curr >= 18
});
console.log(full);
console.log(full.indexOf(true));
console.log('The person is: ' + ages[full.indexOf(true)] + ' years old');


// ES6 - same with find methods added to ES6
// findIndex gives you the index of the element according to the callback function passing true
// find gives you the content of the array if the callback function holds true on it. 
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));





console.log('                                       ');

// ======================================================================================================================


//////////////////////////////////////
// The new SPREAD operator in ES6

// its a convenient way to expand elements of an array in places like function calls and arguments 

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// imagine we had these four numbers in a n array rather than indivucally and we wanted them to be passed to the function

// ES5 
// the apply 1st param is 'this' but in this case we don't need it so its null. Here the addFourAges method will be called 4 times each with the different element in the ages array.
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6 - spread operator allows your you use each entry in an array as a param
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Anna'];

const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);

// we can also use the spread operation on NodeLists
const h = document.querySelector('h1');
const all = [h, ...boxes];
console.log(all);

Array.from(all).forEach(cur => cur.style.color = 'purple');

console.log('                                       ');

// ======================================================================================================================


//////////////////////////////////////
// Rest parameters - allow us to pass an arbitrary number of arguements into a function

// ES5

// // arguments is like the this keyword. All functions have access to it and it lists the arguements it received.
// function isFullAge5() {
//     console.log(arguments);
//     var argsArr = Array.prototype.slice.call(arguments);
//     console.log(argsArr);
//     argsArr.forEach(function(cur) {
//         console.log((2020 - cur) >= 18);
//     });
// }

// isFullAge5(1990, 1999, 1965);


// // ES6
// function isFullAge6(...args) {
//     args.forEach(cur => console.log((2020 - cur) >= 18));
// }

// isFullAge6(1990, 1999, 1965);




// ES6 - you can also have one normal arguement then the rest params arg
function isFullAge6(limit, ...args) {
    args.forEach(cur => {
        console.log('hello');
        console.log(limit);
        console.log(cur);
        console.log((2020 - cur) >= limit)
    });
}

isFullAge6(21, 1990, 1999, 1965);



console.log('                                       ');

// ======================================================================================================================


//////////////////////////////////////
// Default params

//ES5 
// function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
//     lastName ===  undefined ? lastName = 'Smith' : lastName = lastName;

//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.yearOfBirth = yearOfBirth;
//     this.nationality = nationality;
// }

// // lastname and nationality will be undefined but lastname has default in ES5 work around
// var john = new SmithPerson('John', 1990);
// console.log(john);
// var julie = new SmithPerson('Julie', 1990, 'Grant', 'British');
// console.log(julie);


//ES6 -- so much easier in ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);
console.log(john);




console.log('                                       ');



// ======================================================================================================================


//////////////////////////////////////
// Maps are completely new in ES6

// We can use anything as a key, primitives, functions or objects. 

const question = new Map();
question.set('question', 'What is the official name of the latest major JS version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer!');
question.set(false, 'Wrong, please try again.');

console.log(question.get('question'));
// note its size for maps not a length
// console.log(question.size);

if(question.has(4)) {
    question.delete(4);
}

// question.clear()

// We can also loop through Maps
// question.forEach((value, key) => console.log(key, value));

for(let [key, value] of question.entries()) {
    if(typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer'));
console.log(question.get(ans === question.get('correct')));



console.log('                                       ');



// ======================================================================================================================


//////////////////////////////////////
// Classes -  are completely new in ES6

// They don't do anything new that prototypes and function constructors do in Es5 just so much nicer


//ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');
john5.calculateAge();


// ES6 - every class MUST have a constructor in ES6. You don't need any commas or semi colons in a class either
// classes are not hoisted so we need to declare then in a file before we use them. 
// We can also only add methods to classes NOT properties
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    // no need for the function keyword in ES6 when in a class for a method.
    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(`${this.name} is currently ${age} years old.`);
    }

    // can use static methods too
    static greeting() {
        console.log('Howdy there!');
    }
}

let jane6 = new Person6('Jane', 1987, 'coder');
jane6.calculateAge();
Person6.greeting();


//////////////////////////////////////
// Subclasses in ES6


//first how to do it in ES5
// use the Person 5 from above - its so nasty 
var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
    // call is used to enjoy the this varible is set to this object with its Person context also
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
johnAthlete5.calculateAge();

Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}
johnAthlete5.wonMedal();


// ES6 
class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const janeAthlete6 = new Athlete6('Jane', 1965, 'sprinter', 4, 2);
janeAthlete6.wonMedal();
janeAthlete6.calculateAge();