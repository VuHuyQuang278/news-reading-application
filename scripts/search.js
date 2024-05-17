"use strict";

// Link tham khảo https://www.youtube.com/watch?v=bPfXVdSh32g
// Lấy các element
const queryInput = document.getElementById("input-query");
const submitBtn = document.getElementById("btn-submit");
const prevBtn = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const nextBtn = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");
const navPageNum = document.getElementById("nav-page-num");

if (currentUser) {
  // Trường hợp người dùng đã đăng nhập
  let totalResults = 0;
  // Hàm lấy dữ liệu và hiển thị tin tức
  async function getDataNews(query, page, pageSize) {
    try {
      console.log(`Tìm kiếm cho ${query}, page number ${page}`);
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&sortBy=popularity&language=en&apiKey=6e02d06570934c4eaceb299d18402e10`
      );
      // Chuyển đổi dữ liệu sang dạng JS Object
      const data = await res.json();
      console.log(data);
      displayNewList(data);
    } catch (error) {
      console.error(err);
    }
  }

  //   document.addEventListener("keydown", function (e) {
  //     console.log(e.key);
  //     if (e.key === "Enter") {
  //       if (queryInput.value) {
  //         // Hiển thị trang đầu tiên
  //         getDataNews(queryInput.value, 1, currentUser.pageSize);
  //         navPageNum.style.display = "block";
  //       } else {
  //         alert("Vui lòng nhập từ khoá để tìm kiếm !");
  //       }
  //     }
  //   });

  submitBtn.addEventListener("click", function () {
    if (queryInput.value) {
      // Hiển thị trang đầu tiên
      getDataNews(queryInput.value, 1, currentUser.pageSize);
      // Đặt pageNum = 1 tránh TH pageNum không thay đổi khi tìm kiếm ở page khác 1
      pageNum.textContent = "1";
      navPageNum.style.display = "block";
    } else {
      alert("Vui lòng nhập từ khoá để tìm kiếm !");
    }
  });

  nextBtn.addEventListener("click", function () {
    if (queryInput.value) {
      // Khi nhấn nút Next thì hiển thị tin tức ở trang tiếp theo
      getDataNews(
        queryInput.value,
        ++pageNum.textContent,
        currentUser.pageSize
      );
    } else {
      alert("Vui lòng nhập từ khoá để tìm kiếm !");
    }
  });

  prevBtn.addEventListener("click", function () {
    if (queryInput.value) {
      // Khi nhấn nút Previous thì hiển thị tin tức ở trang trước
      getDataNews(
        queryInput.value,
        --pageNum.textContent,
        currentUser.pageSize
      );
    } else {
      alert("Vui lòng nhập từ khoá để tìm kiếm !");
    }
  });

  // Hàm kiểm tra nút Previous
  function checkPrev() {
    if (pageNum.textContent == 1) {
      // Nếu ở page 1 thì sẽ ẩn nút Previous đi
      prevBtn.style.display = "none";
    } else {
      // Không thì hiển thị nút Previous
      prevBtn.style.display = "block";
    }
  }

  // Hàm kiểm tra nút Next
  function checkNext() {
    // console.log("current Page: ", pageNum.textContent);
    if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
      // Khi ở page cuối thì ẩn nút Next đi
      nextBtn.style.display = "none";
    } else {
      // Không thì hiển thị nút Next
      nextBtn.style.display = "block";
    }
  }

  // Hàm hiển thị các bài viết
  function displayNewList(data) {
    totalResults = data.totalResults;
    checkPrev();
    checkNext();
    // Xoá nội dụng hiện có trong newsContainer
    newsContainer.innerHTML = "";
    data.articles.forEach(function (data) {
      // Hiển thị từng bài viết lên trang
      newsContainer.innerHTML += `
        <div class="card flex-row flex-wrap">
			<div class="card mb-3" style="">
				<div class="row no-gutters">
					<div class="col-md-4">
						<img src="${data.urlToImage}"
							class="card-img"
							alt="${data.title}">
					</div>
					<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title">${data.title}</h5>
							<p class="card-text">${data.description}</p>
							<a href="${data.url}" target="_blank"
								class="btn btn-primary">View</a>
						</div>
					</div>
				</div>
			</div>
		</div>`;
    });
  }
} else {
  // Trường hợp người dùng chưa đăng nhập
  alert("Vui lòng đăng nhập !");
  window.location.href = "../pages/login.html";
}
