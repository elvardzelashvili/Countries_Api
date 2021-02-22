const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

const loginform = document.getElementById("loginform");

loginform.addEventListener("submit", function (ev) {
  ev.preventDefault();
  let userInfo = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  console.log(userInfo);
  fetch("https://reqres.in/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  }).then(res =>res.json())
  .then(user => {
     console.log(user);
     location.replace("countries.html")
  })

});
//   {
//     "email": "eve.holt@reqres.in",
//     "password": "cityslicka"
// }




