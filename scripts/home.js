"use strict";

// Lấy các element
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

console.log(currentUser);
// Hiển thị trang Home
if (currentUser) {
  // Khi người dùng đã đăng nhập
  loginModal.style.display = "none";
  mainContent.style.display = "block";
  welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
} else {
  // Khi người dùng chưa đăng nhập
  loginModal.style.display = "block";
  mainContent.style.display = "none";
}

// Chức năng Logout
logoutBtn.addEventListener("click", function () {
  // Đưa xa thông báo xác nhận muốn đăng xuất hay không
  const isLogout = confirm("Bạn có muốn đăng xuất không ?");
  if (isLogout) {
    // Nếu người dùng đồng ý thì đăng xuất và trở về trang login
    localStorage.removeItem("currentUser");
    window.location.href = "../pages/login.html";
  }
});
