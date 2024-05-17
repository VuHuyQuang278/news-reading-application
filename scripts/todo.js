"use strict";

// Lấy các element
const taskInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

if (currentUser) {
  // Trường hợp người dùng đã đăng nhập
  displayTodoList();
  // Hàm hiển thị danh sách Todo list
  function displayTodoList() {
    // Xoá nội dung hiện có trong Todo list
    todoList.innerHTML = "";

    // Lọc ra các task của người dùng hiện tại và hiển thị
    todoArr
      .filter((todo) => todo.owner === currentUser.userName)
      .forEach((todo) => {
        todoList.innerHTML += `
        <li class="${todo.isDone ? "checked" : ""}">${
          todo.task
        }<span class="close">×</span></li>
        `;
      });
    eventToggleTasks();
    DeleteTask();
  }

  addBtn.addEventListener("click", function () {
    // Kiểm tra trường dữ liệu
    if (taskInput.value.trim().length === 0) {
      alert("Vui lòng nhập tên của Task !");
    } else {
      const todo = todoArr.find(
        (item) =>
          item.owner === currentUser.userName && item.task === taskInput.value
      );
      if (!todo) {
        // Nếu chưa có task thì tạo task mới
        const task = new Task(taskInput.value, currentUser.userName, false);

        // Thêm task mới vào mảng todoArr và lưu vào localStorage
        todoArr.push(task);
        saveToStorage("todoTask", todoArr);
        console.log(todoArr);

        // Xoá thông tin ở form
        taskInput.value = "";

        displayTodoList();
      } else {
        // Thông báo khi task đã tồn tại
        alert("Task đã tồn tại !");
      }
    }
  });

  // Toggle Task
  function eventToggleTasks() {
    // Thêm sự kiện click cho các phần tử li
    document.querySelectorAll("#todo-list li").forEach(function (li) {
      li.addEventListener("click", function (e) {
        if (e.target !== li.children[0]) {
          // Khi không bấm vào nút xoá thì thay đổi class của thẻ li
          li.classList.toggle("checked");
        }

        // Tìm kiếm todo tương ứng trong todoArr
        const todo = todoArr.find(
          (todoData) =>
            // Tên của người tạo todo phải trùng với người dùng hiện tại
            todoData.owner === currentUser.userName &&
            // Task phải trùng với text của thẻ li đã bỏ dấu ×
            todoData.task === li.textContent.slice(0, -1)
        );
        if (todo) {
          // Thay đổi giá trị của thuộc tính isDone
          todo.isDone = li.classList.contains("checked") ? true : false;
          saveToStorage("todoTask", todoArr);
        }
      });
    });
  }

  // Delete Task
  function DeleteTask() {
    // Thêm sự kiện click cho các phần tử close
    document.querySelectorAll("#todo-list .close").forEach(function (close) {
      close.addEventListener("click", function () {
        // Xác nhận có muốn xoá task
        const isDelete = confirm("Bạn có chắc muốn xoá task này ?");
        if (isDelete) {
          // Tìm index của phần tử cần xoá
          const index = todoArr.findIndex(
            (todo) =>
              // Tên của người tạo todo phải trùng với người dùng hiện tại
              todo.owner === currentUser.username ||
              // Task phải trùng với text của thẻ li đã bỏ dấu ×
              todo.task === close.parentElement.textContent.slice(0, -1)
          );
          // Xoá task khỏi todoArr
          todoArr.splice(index, 1);
          saveToStorage("todoTask", todoArr);
          displayTodoList();
        }
      });
    });
  }
} else {
  // Trường hợp người dùng chưa đăng nhập
  alert("Vui lòng đăng nhập !");
  window.location.href = "../pages/login.html";
}
