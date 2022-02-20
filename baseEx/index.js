"use strict";

// Promise
// .then(()=>{})

// const data = fetch('./users.json');
// const usefullData = data.then((response)=>{
//   return response.json();
// })

// usefullData.then((user)=>{
// console.log('user :>> ', user);
// })

fetch("./users.json")
  .then((response) => {
    return response.json();
  })
  .then((user) => {
    console.log("user :>> ", user);
  })
  .catch((e) => console.log("e :>> ", e));
