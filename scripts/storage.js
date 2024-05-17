"use strict";

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm chuyển user từ JS Object sang Class Instance
const parseUser = function (userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.passWord
  );
  return user;
};

// Lấy dữ liệu user dạng JS Object từ localStorage
const users = getFromStorage("userArr") ?? [];
// Tạo mảng dữ liệu user dạng Class Instance
const userArr = users.map((user) => parseUser(user));

// Taọ biến lưu thông tin user đăng nhập
let currentUser = getFromStorage("currentUser")
  ? getFromStorage("currentUser")
  : null;

// Hàm chuyển todo từ JS Object sang Class Instance
const parseTask = function (todoData) {
  const todo = new Task(todoData.task, todoData.owner, todoData.isDone);
  return todo;
};

// Lấy dữ liệu todo dạng JS Object từ localStorage
const todos = getFromStorage("todoTask") ?? [];
// Tạo mảng dữ liệu todo dạng Class Instance
const todoArr = todos.map((todo) => parseTask(todo));
// lưu dữ liệu todoArr xuống dưới LocalStorage
saveToStorage("todoTask", todoArr);
