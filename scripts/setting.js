"use strict";

// Lấy các element
const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const saveSettingBtn = document.getElementById("btn-submit");

// Hiển thị các tham số cài đặt của người dùng
pageSizeInput.value = currentUser.pageSize;
categoryInput.value = currentUser.category;

// Hàm validate dữ liệu
function validate() {
  let isvalidate = true;
  if (pageSizeInput.value === "") {
    alert("Không được để trống trường News per page !");
    isvalidate = false;
  } else {
    if (
      // Kiểm tra pageSize
      Number.isNaN(Number.parseInt(pageSizeInput.value)) ||
      Number.parseInt(pageSizeInput.value) <= 0
    ) {
      alert("Dữ liệu nhập vào phải là số nguyên dương");
      isvalidate = false;
    }
  }
  return isvalidate;
}

saveSettingBtn.addEventListener("click", function () {
  if (validate()) {
    // Lưu thông tin setting của người dùng hiện tại vào currentUser trong localStorage
    currentUser.pageSize = Number.parseInt(pageSizeInput.value);
    currentUser.category = categoryInput.value;
    saveToStorage("currentUser", currentUser);

    // Lưu thông tin setting của người dùng vào userArr trong localStorage
    const index = userArr.findIndex(
      (item) => item.userName === currentUser.userName
    );
    userArr[index] = currentUser;
    saveToStorage("userArr", userArr);

    // Thông báo thay đổi thành công
    alert("Thay đổi setting thành công !");
  }
});
