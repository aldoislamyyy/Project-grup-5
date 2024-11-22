// Navbar toggle function
function toggleNavbar() {
  const navbar = document.querySelector(".ul-navbar");
  navbar.classList.toggle("active");
}

// Popup functions
function openLoginPopup() {
  document.getElementById("loginPopup").style.display = "flex";
}

function openOrderPopup(event) {
  const productCard = event.target.closest('.produk');
  const productName = productCard.querySelector('h3').textContent;
  const productPrice = productCard.querySelector('p').textContent;
  
  // Store the selected product info in the popup
  const orderPopup = document.getElementById("orderPopup");
  orderPopup.dataset.productName = productName;
  orderPopup.dataset.productPrice = productPrice;
  
  orderPopup.style.display = "block";
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
}

function submitLogin() {
  alert("Login successful!");
  closePopup("loginPopup");
}

// Cart array to store items
let cartItems = [];

// Submit order and add to cart
function submitOrder() {
  const orderPopup = document.getElementById("orderPopup");
  const productName = orderPopup.dataset.productName;
  const productPrice = orderPopup.dataset.productPrice;
  const quantity = parseInt(document.getElementById("quantity").value);

  if (quantity > 0) {
      // Add item to cart
      cartItems.push({
          name: productName,
          price: productPrice,
          quantity: quantity
      });

      // Update cart display
      displayCartItems();
      
      // Reset quantity and close popup
      document.getElementById("quantity").value = "1";
      closePopup("orderPopup");
      
      alert("Produk berhasil ditambahkan ke keranjang!");
  } else {
      alert("Silakan masukkan jumlah yang valid.");
  }
}

// Display cart items
function displayCartItems() {
  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = "";

  if (cartItems.length === 0) {
      cartItemsDiv.innerHTML = "<p>Keranjang belanja kosong</p>";
      return;
  }

  cartItems.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
          <span>${item.name}</span>
          <span>${item.price} x ${item.quantity}</span>
          <button class="delete-item" onclick="removeFromCart(${index})">Hapus</button>
      `;
      cartItemsDiv.appendChild(itemDiv);
  });
}

// Remove item from cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  displayCartItems();
}

// Cart popup controls
document.getElementById("openCartPopup").onclick = function() {
  document.getElementById("cartPopup").style.display = "block";
  displayCartItems();
}

document.getElementById("closeCartPopup").onclick = function() {
  document.getElementById("cartPopup").style.display = "none";
}

// Checkout function
document.getElementById("checkout").onclick = function() {
  if (cartItems.length === 0) {
      alert("Keranjang belanja masih kosong!");
      return;
  }
  
  alert("Terima kasih atas pesanan Anda!");
  cartItems = []; // Clear the cart
  displayCartItems();
  document.getElementById("cartPopup").style.display = "none";
}

// Search Function
function searchProducts() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const produkList = document.querySelectorAll(".produk");

  produkList.forEach((produk) => {
      const title = produk.querySelector("h3").textContent.toLowerCase();
      if (title.includes(filter)) {
          produk.style.display = "";
      } else {
          produk.style.display = "none";
      }
  });
}

// Sorting Function
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
  produkContainer.innerHTML = "";
  produkList.forEach((produk) => {
      produkContainer.appendChild(produk);
  });
}

// Show Collection
function showCollection() {
  document.getElementById("welcomePage").style.display = "none";
  document.getElementById("collection").style.display = "block";
}