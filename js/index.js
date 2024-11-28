var userNameInput = document.getElementById('nameInput');
var userEmailInput = document.getElementById('emailInput1');
var userPasswordInput = document.getElementById('inputPassword1');
var inputbtn = document.querySelector('#inputbtn');
var emailAlert = document.querySelector('#emailAlert');
var errorMessage = document.querySelector('#error');
// --------------------------- //
var loginbtn = document.querySelector('#login');
var userEmailCheck = document.querySelector('#emailInput');
var userpasswordCheck = document.querySelector('#inputPassword5');
var noUser = document.querySelector('#noUser');
var emptyText = document.querySelector('#emptyText')
var wronData = document.querySelector('#wronData')
// -------------------------------//
var showName = document.querySelector('#showName')


var userList;
if (localStorage.getItem('userList') != null) {
    userList = JSON.parse(localStorage.getItem('userList'));
}
else {
    userList = []
}

loginbtn.addEventListener("click", function () {
    signIn();
})

inputbtn.addEventListener('click', function () {
    addUser();
})





function addUser() {

    emailAlert.classList.add('d-none');
    errorMessage.classList.add('d-none');

    if (
        userNameInput.value.trim() === '' ||
        userEmailInput.value.trim() === '' ||
        userPasswordInput.value.trim() === ''
    ) {
        errorMessage.classList.remove('d-none');
        return;
    }
    var existingUser = userList.find(user => user.email === userEmailInput.value);

    if (existingUser) {
        emailAlert.classList.remove('d-none');
        return;
    }


    var user = {
        name: userNameInput.value,
        email: userEmailInput.value,
        password: userPasswordInput.value,
    }
    Swal.fire({
        title: "you successfully sign up",
        icon: "success"
    });
    userList.push(user);
    console.log(userList)
    localStorage.setItem("userList", JSON.stringify(userList))
    clearForm()
}

function clearForm() {
    userEmailInput.value = null;
    userNameInput.value = null;
    userPasswordInput.value = null;
}

function signIn() {
    wronData.classList.add('d-none');
    noUser.classList.add('d-none');
    emptyText.classList.add('d-none');

    if (userList.length === 0) {
        noUser.classList.remove('d-none');
        return;
    }


    if (!userEmailCheck.value || !userpasswordCheck.value) {
        emptyText.classList.remove('d-none');
        return;
    }

    var existingUser = userList.find(user => user.email === userEmailCheck.value && user.password === userpasswordCheck.value);

    if (existingUser) {
        localStorage.setItem('loggedInUser', existingUser.name);
        window.location.href = "welcome.html";
    } else {
        wronData.classList.remove('d-none');
    }
}
if (showName) {
    var userName = localStorage.getItem('loggedInUser');

    if (userName) {
        showName.textContent = userName;
    }
}




