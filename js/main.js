var nameSignUp = document.getElementById("nameUser");
var emailSignUp = document.getElementById("emailUser");
var passwordSignUp = document.getElementById("passwordUser");
var emailSignIn = document.getElementById("emailUserExist");
var passwordSignIn = document.getElementById("passwordUserExist");

let data;

if (localStorage.getItem("list") == null) {
  data = [];
} else {
  data = JSON.parse(localStorage.getItem("list"));
}

function validName() {
  let regexName = /^[a-z]{3,20}[0-9]{0,3}$/;
  if (regexName.test(nameSignUp.value) == true) {
    return true;
  } else {
    return false;
  }
}

function validPassword() {
  let regexPassword = /^[a-zA-Z0-9@#%&+=-]{8,20}$/;
  // let regexName = /^[a-zA-z]{4,20}[0,9]{0,3}$/

  if (regexPassword.test(passwordSignUp.value) == true) {
    return true;
  } else {
    return false;
  }
}
var emailMessage = "";

function validEmail() {
  let regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  if (regexEmail.test(emailSignUp.value) == true) {
    if (data.lenght == 0) {
      return true;
    } else {
      for (const ele of data) {
        if (ele.email == emailSignUp.value) {
          emailMessage = "email is already exisit";
          break;
        }
      }
      if (emailMessage == "") {
        return true;
      } else {
        return false;
      }
    }
  } 
  else {
    emailMessage = "email should have a @ and please write a correct email";
    return false;
  }
}

function addInfo() {
  let person = {
    name: nameSignUp.value,
    email: emailSignUp.value,
    password: passwordSignUp.value,
  };

  data.push(person);
  localStorage.setItem("list", JSON.stringify(data));
}

function signUp() {
  let message;
  let color;
  if (validName() == true && validPassword() == true && validEmail() == true) {
    message = "Success";
    color = "green";
    addInfo();
  } else {
    if (
      nameSignUp.value == "" ||
      emailSignUp.value == "" ||
      passwordSignUp.value == ""
    ) {
      message = "All inputs are required";
    } else if (validName() == false) {
      message = "wrong Name";
    } else if (validEmail() == false) {
      message = emailMessage;
    } else if (validPassword() == false) {
      message = "you write a weak password";
    }
    color = "red";
  }

  document.getElementById("messageUp").innerHTML = message;
  document.getElementById("messageUp").style.color = color;

  console.log(message);
}

var messageSignIn = "";
var userName;

function verifyInputs() {
  for (const element of data) {
    if (element.email == emailSignIn.value){
        if(element.password == passwordSignIn.value){
            userName = element.name;
            return true;
        }
        else if(passwordSignIn.value == "" ){
            messageSignIn = "password is a required input"
            return false;
        }
        else{
            continue;
        }
    }

    else{
        if(data.indexOf(element) == data.lenght-1){
            if(emailSignIn.value == "" || passwordSignIn.value == ""){
                messageSignIn = "email and password is a required input"
                return false;
            }
            else{
                messageSignIn = "this email is not exist"
                return false
            }
        }
        else{
            continue;
        }

       
    }  
    
    // if (emailSignIn.value == "" || passwordSignIn.value == "") {
    //   messageSignIn = "All inputs are required";
    //   return false;
    // } else {
    //   messageSignIn = "you have a wrong email or a wrong password";
    //   return false;
    // }
  }
}

var signInBody = document.getElementById("signInBody");
var signInPage = `
<div class="box-form w-75 m-auto p-5 my-5 ">

        <h1 class="text-info text-center">Smart Login System</h1>
        <form action="">
            <input type="email" placeholder="Enter your email" id="emailUserExist"
                class=" form-control my-4 m-5 m-auto bg-transparent text-white">
            <input type="password" placeholder="Enter your password" id="passwordUserExist"
                class=" form-control my-4 m-5 m-auto bg-transparent text-white">
            <p id="messageIn" class="text-center fw-bolder fa-1x "></p>

            <button onclick="signIn()" type="button" class="btn btn-outline-info w-100 my-4 m-5 m-auto ">Sign In</button>
        </form>
        <h6 class="text-center text-white">I'm don,t have an account <span><a href="index.html" class="text-white">Sign
                    Up</a></span></h6>

    </div>


    <script src="js/main.js"></script>
`;

console.log(signInBody);

function signIn() {
  if (verifyInputs() == true) {
    var welcomePage = `
    <button onclick="logout()" class="btn btn-outline-info position-absolute  btn-log-out">Log out</button>
<div class="box-form w-75 m-auto p-5 my-5 ">
<h1 class="text-center text-info py-5" id="welcomeHeader">Welcome ${userName}</h1>
</div>
`;
    signInBody.innerHTML = welcomePage;
  } else {
    document.getElementById("messageIn").innerHTML = messageSignIn;
    document.getElementById("messageIn").style.color = "red";
  }
}


function logout(){
    signInBody.innerHTML = signInPage;

}