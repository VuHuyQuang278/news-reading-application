"use strict";

// Lấy các element
const firstNameIput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passWordInput = document.getElementById("input-password");
const confirmPassWordInput = document.getElementById("input-password-confirm");
const submitBtn = document.getElementById("btn-submit");

const validate = function (user) {
  let isvalidate = true;

  // Kiểm tra không trường nào bị bỏ trống
  if (user.firstName.trim().length === 0) {
    alert("First name không được để trống");
    isvalidate = false;
  }
  if (user.lastName.trim().length === 0) {
    alert("Last name không được để trống");
    isvalidate = false;
  }
  if (user.userName.trim().length === 0) {
    alert("User name không được để trống");
    isvalidate = false;
  }

  // Kiểm tra UserName
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].userName === user.userName) {
      alert(`Tài khoản ${user.userName} đã tồn tại`);
      isvalidate = false;
      break;
    }
  }

  // Kiểm tra password
  if (user.passWord.length < 8) {
    alert("Password phải có nhiều hơn 8 ký tự !");
    isvalidate = false;
  }
  if (user.passWord !== confirmPassWordInput.value) {
    alert("Password và Confirm Password phải giống nhau !");
    isvalidate = false;
  }

  return isvalidate;
};

submitBtn.addEventListener("click", function () {
  // Lấy dữ liệu nhập vào từ form
  const user = new User(
    firstNameIput.value,
    lastNameInput.value,
    userNameInput.value,
    passWordInput.value
  );

  // Kiểm tra dữ liệu
  const isvalidate = validate(user);
  if (isvalidate) {
    // Thêm user vào mảng và lưu vào localStorage
    userArr.push(user);
    saveToStorage("userArr", userArr);
    alert("Đăng ký tài khoản thành công !");

    // Điều hướng sang trang login
    window.location.href = "../pages/login.html";
  }
});

console.log(userArr);
