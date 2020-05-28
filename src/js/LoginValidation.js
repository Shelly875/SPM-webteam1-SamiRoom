/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
// eslint-disable-next-line no-unused-vars
const STD = require('./modules/Student');
const LND = require("./modules/Landlord");

const regform = document.getElementById("register-form");
const logform = document.getElementById("login-form");
logform.addEventListener("submit", (e) => {
    const messages = [];
    const userid = document.getElementById("userid").value;
    const userpass = document.getElementById("pass").value;
    const logerror = document.getElementById("login-error");
    alert(userid);

    if (userid === '' || userid == null) {
        messages.push("name is required");
    }
    if (userpass === '' || userpass == null) {
        messages.push("password is required");
    }
    if (messages.length > 0) {
        e.preventDefault();
        logerror.innerText = messages.join(', ');
    } else {
        console.log('1');
        const res = new STD().confirmStudent(userid, userpass);
        res.then((result) => {
            if (result === false) {
                e.preventDefault();
                messages.push("wrong id or password");
                logerror.innerText = messages.join(', ');
            } else {
                console.log(1);
            }
        });
    }
});
regform.addEventListener("submit", (e) => {
    const messages = [];
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const regpass = document.getElementById("regpass").value;
    const regid = document.getElementById("regid").value;
    const phone = document.getElementById("phone").value;
    const pass = document.getElementById("pass").value;
    const city = document.getElementById("city").value;
    const address = document.getElementById("address").value;
    const birthday = document.getElementById("birthday").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const typeu = document.getElementById("userType").value;
    const idpic = document.getElementById("idPic").value;
    const priv = document.getElementById("idPic").value;
    const company = document.getElementById("idPic").value;
    const logerror = document.getElementById("login-error");


    // if (userid === '' || userid == null) {
    //     messages.push("name is required");
    // }
    // if (userpass === '' || userpass == null) {
    //     messages.push("password is required");
    // }
    // if (messages.length > 0) {
    //     e.preventDefault();
    //     logerror.innerText = messages.join(', ');
    // } else if (typeu === 'student') {
    //         const newstd = new STD(regid, fname, lname, city, phone, email, address, false, idpic, pass);
    //         newstd.writeStudentToDB();
    //     } else {
    //         const newlnd = new LND(regid, fname, lname, phone, email, true, null, pass);
    //         newlnd.writeLandlordToDB();
    //     }
});
