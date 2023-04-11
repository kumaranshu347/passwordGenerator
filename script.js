const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();  // handleSlider() ka work sirf UI par password length ko reflect krna----
//ste strength circle color to grey
setIndicator("#ccc");


//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //kush aur add krne chahiye?- HW
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize =  ( (passwordLength - min)*100/(max - min)) + "% 100%"

}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min))+ min;
}


function generateRndomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {
   return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91));
 }

 function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
 }

 function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasSym) && 
        (hasNum || hasSym) && 
        passwordLength >= 6
     ) { 
        setIndicator("#ff0");

    } else {
        setIndicator("#f00");
    }

 }

 async function copyContent() {
    try {
        await  navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( ()=> {
        copyMsg.classList.remove("active");

    },2000);   

 }
 function shufflePassword(array) {
    ///fisher yates method
    for (let i = array.length - 1; i> 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
 }

 function handleCheckBoxChange() {
     checkCount = 0;
     allCheckBox.forEach( (CheckBox) => {
        if(CheckBox.checked)
        checkCount++;
     });

     //special condition
     if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
     }
 }

allCheckBox.forEach ( (CheckBox) => {
    CheckBox.addEventListener('change',handleCheckBoxChange);
})

 inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
 })


copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
       copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected 
    if(checkCount == 0)
     return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    //let's start the journy to find to new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase(); 
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase(); 
    // }

    // if(numbersCheck.checked) {
    //     password += generateRndNumber(); 
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol(); 
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

       
    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);    

    if(numbersCheck.checked)
        funcArr.push(generateRndomNumber);  

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol); 
        
    //compulsory  addition
    for(let i = 0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }  
    console.log("Compulsory addition done");

    //remaining addition
    for(let i = 0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining addition done");

    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");

    //show in UI
    passwordDisplay.value = password;
    console.log("UI Addition done");
    //calculate strength
    calcStrength();
        
        


});








































// lecture 1------------------------------------------

// let a = 5;
// console.log(a);
// a = 'anshu';
// console.log(a);

//------object------------
// let person = {
//     firstName : 'anshu',
//     age : 22 
// };
// console.log(person.firstName);


// ----array------

// let name = ['anshu' , 'venky' ,'mohit'];
// console.log(name[1]);
// name[1] = 1;
// console.log(name);


// -----operator----

// let a = 1;
// let b = 2;
// let c = a + b;
// console.log(c);

// let a = 2;
// let b = 3;
// console.log(2**3);
// console.log(a**b);


//--pre/post increment & decrement-

// let x = 10;
// console.log(++x);
 //o/p: 11

//  let a = 6;
//  console.log(a++);
 //o/p: 6



//  let a = 5;
//  let b = 10;
//  let ans1 = (++a) * (--b);
//  console.log(ans1);

//  let ans2 = (a++) * (--b);
//  console.log(ans2);

//  let ans3 = (a++) * (b--);
//  console.log(ans3);

//  let ans4 = (++a) * (b--);
//  console.log(ans4);






//lecture 2------------------------------------

// object creation 

//-- 1. factory function---

// function creatRectangle(len ,bre) {

//     return rectanangle = {
//         length: len,
//         breadth: bre,
    
//         draw(){
//             console.log('drawing rectangle');
    
//         }

//     };

// }
// let rectangleObj1 = creatRectangle(5, 4);


// 2.constructor function -> pascal notation -> first letter of every word is capital
// function Rectangle(len, bre ) {
//     this.length = len;
//     this.breadth = bre;
//     this.draw = function() {
//         console.log('draw');
//     }
// }



//object creation using constructor function 

// let rectangleObject = new Rectangle(4,6);

// rectangleObject.color ='yellow';
// console.log(rectangleObject);

// delete rectangleObject.color;
// console.log(rectangleObject);


// let Rectangle1 = new Function(
//     'length', 'breadth',
//  `this.length = length;
//  this.breadth = breadth;
//  this.draw = function() {
//     console.log('draw');
// }`);

//object creation using rectangle1
// let rect = new Rectangle1(2,3);

// rect.length;

// console.log(rect);






// let a = { value: 10};
// let b = a;
// a.value++;
// console.log(a.value);
// console.log(b.value);

// let a = 10;
// function inc(a)
// {
//     a++;
// }
// inc(a);
// console.log(a);



// Iterating through Objects-----

// let rectangle = {
//     length:2,
//     breadth:4
// };

//for-in loop
// for(let key in rectangle) {
//     //keys are reflected through key variable
//     //values are reflected through rectangle[key]
//     console.log(key,rectangle[key]);
// }


//for-of loop
// for(let key of Object.keys(rectangle)) {
// console.log(key);
// }


// if('length' in rectangle) {
//     console.log('present');
// }
// else {
//     console.log('absent')
// }

//object - clone #1---
// let src = {
//     a:10,
//     b:20,
//     c:30
// };

// let dest = {};

// for(let key in src) {
//     dest[key] = src[key];
// }
// console.log(dest);

// src.a++;
// console.log(dest);

//object clone #2--
// let src = {
//     a:10,
//     b:20,
//     c:30
// };

// let src2 = { value: 25};

// let dest = Object.assign({}, src, src2);

// console.log(dest);
// src++;

// console.log(dest);

//object cloning #3----
// let src = {
//     a:10,
//     b:20,
//     c:30
// };

// let dest = {...src};

// console.log(dest);

// src++;

// console.log(dest);


// lec 3---------------------------------------------
// ---template litral--
// let lastName = 'babbar';
// let firstName = new String('love');

// let message = 
// `this 
// is
// my first 
// message `;

// `Hello love,

// thanks for Opportunity

// Regards,
// Babbar`;

// `Hello ${lastName},

// thanks for Opportunity

// Regards,
// Babbar`;

// console.log(message);


//--Date & Time-------------
// let date = new Date();

// let date2 = new Date('july 10 2000 07:10');
// // let date3 = new Date(2000, 6, 10, 7);

// let date3 = new Date(2000 , 11, 10, 7:10);
// date3.setFullYear(1947);
// console.log(date3);


// -------------Arrays---------------------
// let numbers = [1,4,5,7];
// console.log(numbers);
// Insertion- End, Begin, Middle
// numbers.push(9);

// end-> push
//begining-> unshift

//middle-> splice
// let numbers = [8, 1, 4, 5, 7, 9];
// console.log(numbers);
// numbers.splice(2,0,'a','b','c');

//----Searching----------

// let numbers = [8, 1, 4, 5, 7, 9];
// console.log(numbers);

// console.log(numbers.indexOf(7));

// //we want to check if a number exist in an array
// if(numbers.indexOf(4) != -1)
//    console.log("present");
 
//    console.log(numbers.includes(7));
 
// console.log(numbers.indexOf(4, 3));   



let courses = [
    {no:1, naam:'love'},
    {no:2, naam:'rahul'}
];

// console.log(courses);

// console.log(courses.includes({no:1, naam:'love'}));

// let course = courses.find(function(course) {
//     return course.naam === 'rahul';
// })
// console.log(course);

// let course = courses.find(course => course.naam === 'kilvish');

// console.log(course);






//----Removing Element------


// let numbers = [1, 2, 3, 4, 5, 6, 7];
// //end-pop()
// numbers.pop();
// //start-shift()
// numbers.shift();
// //middle-splice()
// numbers.splice(2,1)
// console.log(numbers);



//---Emptying an Array-------

// let numbers = [1,2,3,4,5];
// let numbers2 = numbers;

// // numbers = [];
// // numbers.length=0;
// numbers.splice(0,numbers.length);

// console.log(numbers);
// console.log(numbers2);



//--Combining & Slicing Arrays----------


// let first = [1,2,3];
// let second = [3,4,5];

// let combined = first.concat(second);
// console.log(combined);

// let sliced = combined.slice(2,4);
// console.log(sliced);


//--spread operator-------

let first = [1,2,3];
let second = [3,4,5];

// let combined = [...first, ...second];
// let combined = [...first,'a', ...second,'b'];
// let combined = [...first,'a',false, ...second,'b',true];
// console.log(combined);

//copy kaise create karu
// let another = [...combined];


//--Iterating an array-----

// let arr = [10,20,30,40,50];

//for-of loop---
// for(let value of arr) {
//     console.log(value);
// }

//forEach loop-----
// arr.forEach(function(number){
//    console.log(number); 
// })

// to convert arrow function
// arr.forEach(number => console.log(number));


//--Joining Arrays------

// let numbers = [10,20,30,40,50];
// const joined = numbers.join(',');

// console.log(joined);

//splite arrays-- 
// let message = `this is my first message`;
// let parts = message.split(' ');

// console.log(parts);

// let joined = parts.join('_');
// console.log(joined);


//--Sorting Arrays------------
// let numbers = [40,50,10,30,20];
// numbers.sort();

// console.log(numbers);

// numbers.reverse()
// console.log(numbers);


//--filtering Arrays--------

// let numbers = [1,2,-1,-4];
// let filtered = numbers.filter(function(value){
//     return value >=0;
// });
// console.log(filtered);

// let numbers = [1,2,-1,-4];
// let filtered = numbers.filter((value)=> value < 0);
// console.log(filtered);


// mapping Arrays-----------

// let numbers= [7,8,9,10];
// console.log(numbers);
// let items = numbers.map((value)=> 'student_no'+ value);
// console.log(items);


// maping with objects------
let numbers = [1,2,-6,-9];
// let filtered = numbers.filter(value => value >=0);

// let items = filtered.map((num) => {value: num});

// console.log(items);

// let filtered = numbers.filter(value => value >=0);

//chaining---
// let items =numbers
// .filter(value => value >=0)
// .map((num) => {value: num});

// console.log(items);



// lecture 4--------------------------------------------
 
//function-----------

// run();

// function run() {
//     console.log('running');
// }

//function call or invoke
// run();

// //Named function assignment
// let stand = function walk(){
//     console.log('walking');
// };

// //Anonymous function assignment
// let stand2 = function(){
//     console.log('walking');
// };

// stand();

// let jump = stand;
// jump();

// stand2();

// let x = 1;
// x = 'a';
// console.log(x);


// function sum(a, b) {
//     console.log(arguments);
//     return a+b;
// }
// // console.log(sum(1,2));
// // console.log(sum(1));
// // console.log(sum());
// // console.log(sum(1,2,3,4,5,6));

// let ans = sum(1,2,3,4,5,6);











//---rest operator-----
// function sum(num, value,...args){
//     console.log(args);
// }
// sum(1,2,3,4,5,6);



//Default Parameters--
// function interest(p,r=5,y=10){
//     return p*r*y/100;
// }
// console.log(interest(1000,8));

// function interest(p,r=6,y=9){
//     return p*r*y/100;
// }
// console.log(interest(1000,undefined,undefined));








// let person ={
//     fName: 'love',
//     lName: 'Babbar',
//     get fullName() {
//         return `${person.fName}  ${person.lName}`;
//     },
//     set fullName(value) {
//         if(typeof value !== String) {
//             throw new Error("you have not sent a string") ;
//         }
//         let parts = value.split(' ');
//         this.fName = parts[0];
//         this.lName = parts[1];
//     }
// };



// console.log(person);



//issue -> read only



// try {
//     person.fullName = true;
// }
// catch(e) {
//     alert(e);
// }


// console.log(person.fullName);


// let a = 5;
// console.log(a);  








//reducing an array------
let arr = [1,2,3,4];
// let total = 0;

// for(let value of arr)
// total = total + value;

// console.log(total);


let totalSum = arr.reduce((accumulator, currentValue) => accumulator + currentValue,0);
console.log("PRINTING TOATAL SUM:");
console.log(totalSum);