function logSubmit(event) {
    id = school_id.value;
    pwd = school_pwd.value;
    console.log("id: " + id);
    console.log("pwd: " + pwd);
    event.preventDefault(); //cancel the value
}

let id;
let pwd;

const login_form = document.getElementById('login_form');
const school_id = document.getElementById('school_id');
const school_pwd = document.getElementById('school_pwd');

login_form.addEventListener('submit', logSubmit);