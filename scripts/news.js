"use strict";

// Lấy các element
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const newsContainer = document.getElementById("news-container");

console.log(currentUser);
if (currentUser) {
  // Trường hợp người dùng đã dăng nhập
  let totalResults = 0;
  // Hàm lấy dữ liệu và hiển thị tin tức
  async function getDataNews(country, page, category, pageSize) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&category=${category}&apiKey=6e02d06570934c4eaceb299d18402e10`
      );
      // Chuyển đổi dữ liệu sang dạng JS Object
      const data = await res.json();
      console.log(data);
      displayNewList(data);
    } catch (err) {
      console.error(err);
    }
  }

  // Hiển thị trang đầu tiên
  getDataNews("us", 1, currentUser.category, currentUser.pageSize);

  // Hàm kiểm tra nút Previous
  const checkPrev = function () {
    if (pageNum.textContent == 1) {
      // Nếu ở page 1 thì sẽ ẩn nút Previous đi
      prevBtn.style.display = "none";
    } else {
      // Không thì hiển thị nút Previous
      prevBtn.style.display = "block";
    }
  };
  // Hàm kiểm tra nút Next
  const checkNext = function () {
    // console.log("current Page: ", pageNum.textContent);
    if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
      // Khi ở page cuối thì ẩn nút Next đi
      nextBtn.style.display = "none";
    } else {
      // Không thì hiển thị nút Next
      nextBtn.style.display = "block";
    }
  };

  // Hàm hiển thị các bài viết
  const displayNewList = function (data) {
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
  };

  nextBtn.addEventListener("click", function () {
    // Khi nhấn nút Next thì hiển thị tin tức ở trang tiếp theo
    getDataNews(
      "us",
      ++pageNum.textContent,
      currentUser.category,
      currentUser.pageSize
    );
  });

  prevBtn.addEventListener("click", function () {
    // Khi nhấn nút Previous thì hiển thị tin tức ở trang trước
    getDataNews(
      "us",
      --pageNum.textContent,
      currentUser.category,
      currentUser.pageSize
    );
  });
} else {
  // Trường hợp người dùng chưa đăng nhập
  alert("Vui lòng đăng nhập !");
  window.location.href = "../pages/login.html";
}
