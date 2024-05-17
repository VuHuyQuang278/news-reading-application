"use strict";

// Lấy các element
const userNameInput = document.getElementById("input-username");
const passWordInput = document.getElementById("input-password");
const submitBtn = document.getElementById("btn-submit");

// Hàm validate dữ liệu nhập vào
const validate = function () {
  let isvalidate = true;
  if (userNameInput.value.trim() === "") {
    alert("User name không được để trống");
    isvalidate = false;
  }
  if (passWordInput.value === "") {
    alert("Password không được để trống");
    isvalidate = false;
  }
  return isvalidate;
};

submitBtn.addEventListener("click", function () {
  // Kiểm tra dữ liệu có bị trống không
  const isvalidate = validate();
  if (isvalidate) {
    // Nếu dữ liệu hông bị trống thì tìm kiếm thông tin của user
    // Sửa so với bài đã nộp là tìm user trong mảng users thay vì mảng userArr
    const user = users.find((item) => item.userName === userNameInput.value);
    if (user) {
      // Nếu có dữ liệu của user trong localStorage thì kiểm tra mật khẩu đúng hay chưa
      if (user.passWord === passWordInput.value) {
        // Nếu mật khẩu đúng thì thông báo đăng nhập thành công và chuyển về trang chủ
        alert("Đăng nhập thành công !");
        saveToStorage("currentUser", user);
        window.location.assign("../index.html");
      } else {
        // Nếu sai mật khẩu thì đưa ra thông báo
        alert("Mật khẩu không chính xác !");
      }
    } else {
      // Nếu không có dữ liệu user thì đưa ra thông báo yêu càu đăng ký tài khoản
      alert("Tài khoản chưa được đăng ký, vui lòng đăng ký tài khoản");
    }
  }
});
