// Navbar toggle function
function toggleNavbar() {
  const navbar = document.querySelector(".ul-navbar");
  navbar.classList.toggle("active");
}

// Popup functions
function openLoginPopup() {
  document.getElementById("loginPopup").style.display = "flex";
}

function openOrderPopup() {
  document.getElementById("orderPopup").style.display = "block";
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
}

function submitLogin() {
  alert("Login successful!");
  closePopup("loginPopup");
}

function submitOrder() {
  const quantity = document.getElementById("quantity").value;
  alert("Order placed successfully for quantity: " + quantity);
  closePopup("orderPopup");
}

// Search Function
function searchProducts() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const produkList = document.querySelectorAll(".produk");

  produkList.forEach((produk) => {
    const title = produk.querySelector("h3").textContent.toLowerCase();
    if (title.includes(filter)) {
      produk.style.display = ""; // Tampilkan produk
    } else {
      produk.style.display = "none"; // Sembunyikan produk
    }
  });
}

//Sorting Or Filtering
function sortProducts() {
  const select = document.getElementById("sortSelect");
  const produkList = Array.from(document.querySelectorAll(".produk"));
  const isAscending = select.value === "asc";

  produkList.sort((a, b) => {
    const priceA = parseInt(
      a.querySelector("p").textContent.replace("Rp ", "").replace(".", "")
    );
    const priceB = parseInt(
      b.querySelector("p").textContent.replace("Rp ", "").replace(".", "")
    );
    return isAscending ? priceA - priceB : priceB - priceA;
  });

  const produkContainer = document.querySelector(".produk-list");
  produkContainer.innerHTML = ""; // Kosongkan daftar produk

  produkList.forEach((produk) => {
    produkContainer.appendChild(produk); // Tambahkan produk yang sudah diurutkan kembali
  });
}

//Katalog
function showCollection() {
  document.getElementById("welcomePage").style.display = "none"; // Sembunyikan welcome page
  document.getElementById("collection").style.display = "block"; // Tampilkan section Collection
}
