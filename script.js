// Show / Hide Password

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {
    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "Show";
        }

    });
}


// Buyer Login Validation

const buyerLoginForm = document.getElementById("buyerLoginForm");

if (buyerLoginForm) {
    buyerLoginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email === "" || password === "") {
            alert("Please enter your email/phone and password.");
            return;
        }

        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        alert("Demo login successful!");

        window.location.href = "home.html";
    });
}
// Seller Show / Hide Password

const sellerPasswordInput = document.getElementById("sellerPassword");
const toggleSellerPassword = document.getElementById("toggleSellerPassword");

if (toggleSellerPassword) {
    toggleSellerPassword.addEventListener("click", function () {

        if (sellerPasswordInput.type === "password") {
            sellerPasswordInput.type = "text";
            toggleSellerPassword.textContent = "Hide";
        } else {
            sellerPasswordInput.type = "password";
            toggleSellerPassword.textContent = "Show";
        }

    });
}
// Seller Login Validation

const sellerLoginForm = document.getElementById("sellerLoginForm");

if (sellerLoginForm) {
    sellerLoginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("sellerEmail").value.trim();
        const password = document.getElementById("sellerPassword").value.trim();

        if (email === "" || password === "") {
            alert("Please enter your seller email and password.");
            return;
        }

        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        alert("Demo login successful!");

        window.location.href = "seller-dashboard.html";
    });
}
 // Add to Cart and Cart Count

const cartLink = document.getElementById("cartLink");
const cartButtons = document.querySelectorAll(".cart-button");

function getSavedCart() {
    return JSON.parse(localStorage.getItem("arulMartCart")) || [];
}

function updateCartCount() {
    const savedCart = getSavedCart();

    const count = savedCart.reduce(function (sum, item) {
        return sum + item.quantity;
    }, 0);

    if (cartLink) {
        cartLink.textContent = "Cart (" + count + ")";
    }
}

updateCartCount();

cartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.closest(".product-card");
        const name = productCard.querySelector("h3").textContent.trim();
        const priceText = productCard.querySelector("strong").textContent;
        const price = Number(priceText.replace(/[^\d.]/g, ""));

        const savedCart = getSavedCart();

        const existingItem = savedCart.find(function (item) {
            return item.name === name;
        });

        if (existingItem) {
            existingItem.quantity++;
        } else {
            savedCart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        localStorage.setItem("arulMartCart", JSON.stringify(savedCart));

        updateCartCount();

        alert("Product added to cart!");
    });

});
// Cart Page

const cartItems = document.getElementById("cartItems");

if (cartItems) {
    const savedCart = JSON.parse(localStorage.getItem("arulMartCart")) || [];

    if (savedCart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        let total = 0;

        cartItems.innerHTML = savedCart.map(function (item, index) {
            total += item.price * item.quantity;

            return `
                <div class="cart-product">
                    <h3>${item.name}</h3>

                    <p>
                        Quantity:
                        <button type="button" class="decrease-quantity" data-index="${index}">−</button>
                        <span>${item.quantity}</span>
                        <button type="button" class="increase-quantity" data-index="${index}">+</button>
                    </p>

                    <strong>₹${item.price * item.quantity}</strong>
                    <br><br>

                    <button type="button" class="remove-cart-button" data-index="${index}">
                        Remove 🗑️
                    </button>
                </div>
            `;
        }).join("");

        cartItems.innerHTML += `<h3>Total: ₹${total}</h3>`;

        cartItems.querySelectorAll(".increase-quantity").forEach(function (button) {
            button.addEventListener("click", function () {
                const index = Number(button.dataset.index);
                savedCart[index].quantity++;

                localStorage.setItem("arulMartCart", JSON.stringify(savedCart));
                location.reload();
            });
        });

        cartItems.querySelectorAll(".decrease-quantity").forEach(function (button) {
            button.addEventListener("click", function () {
                const index = Number(button.dataset.index);

                if (savedCart[index].quantity > 1) {
                    savedCart[index].quantity--;
                }

                localStorage.setItem("arulMartCart", JSON.stringify(savedCart));
                location.reload();
            });
        });

        cartItems.querySelectorAll(".remove-cart-button").forEach(function (button) {
            button.addEventListener("click", function () {
                const index = Number(button.dataset.index);
                savedCart.splice(index, 1);

                localStorage.setItem("arulMartCart", JSON.stringify(savedCart));
                location.reload();
            });
        });
    }
}


// Wishlist Button and Count

const wishlistLink = document.getElementById("wishlistLink");
const wishlistButtons = document.querySelectorAll(".wishlist-button");

function getSavedWishlist() {
    return JSON.parse(localStorage.getItem("arulMartWishlist")) || [];
}

function updateWishlistCount() {
    const savedWishlist = getSavedWishlist();

    if (wishlistLink) {
        wishlistLink.textContent = "Wishlist (" + savedWishlist.length + ")";
    }
}

updateWishlistCount();

// Add products to Wishlist

wishlistButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.closest(".product-card");
        const name = productCard.querySelector("h3").textContent.trim();
        const priceText = productCard.querySelector("strong").textContent;
        const price = Number(priceText.replace(/[^\d.]/g, ""));

        const savedWishlist = getSavedWishlist();

        const alreadyExists = savedWishlist.some(function (item) {
            return item.name === name;
        });

        if (alreadyExists) {
            alert("This product is already in your wishlist!");
            return;
        }

        savedWishlist.push({
            name: name,
            price: price
        });

        localStorage.setItem(
            "arulMartWishlist",
            JSON.stringify(savedWishlist)
        );

        updateWishlistCount();

        alert("Product added to wishlist!");
    });

});

// Display Wishlist products

const wishlistItems = document.getElementById("wishlistItems");

if (wishlistItems) {

    const savedWishlist = getSavedWishlist();

    if (savedWishlist.length === 0) {

        wishlistItems.innerHTML = "<p>Your wishlist is empty.</p>";

    } else {

        wishlistItems.innerHTML = savedWishlist.map(function (item, index) {

            return `
                <div class="wishlist-product">
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>
                    <button type="button" class="remove-wishlist-button" data-index="${index}">
                        Remove ❤️
                    </button>
                </div>
            `;

        }).join("");

        const removeButtons = wishlistItems.querySelectorAll(".remove-wishlist-button");

        removeButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index = Number(button.dataset.index);

                savedWishlist.splice(index, 1);

                localStorage.setItem(
                    "arulMartWishlist",
                    JSON.stringify(savedWishlist)
                );

                location.reload();
            });

        });
    }
}

// Seller Add Product

const addProductButton = document.querySelector(".add-product-button");
const sellerProducts = document.getElementById("sellerProducts");

if (addProductButton && sellerProducts) {

    addProductButton.addEventListener("click", function() {

        const productName = document.getElementById("productName").value.trim();
        const productPrice = document.getElementById("productPrice").value.trim();

        if (productName === "" || productPrice === "") {
            alert("Please enter product name and price.");
            return;
        }

        const productItem = document.createElement("div");

        productItem.className = "seller-product-item";

        productItem.innerHTML = `
            <h3>${productName}</h3>
            <p>Price: ₹${productPrice}</p>
        `;
sellerProducts.innerHTML = "";
        sellerProducts.appendChild(productItem);

        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";

        alert("Product added successfully!");

    });

}
// Checkout Page - Order Summary

const checkoutSummary = document.getElementById("checkoutSummary");

if (checkoutSummary) {
    const checkoutCart =
        JSON.parse(localStorage.getItem("arulMartCart")) || [];

    if (checkoutCart.length === 0) {
        checkoutSummary.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        let checkoutTotal = 0;

        checkoutCart.forEach(function (item) {
            const itemTotal = item.price * item.quantity;
            checkoutTotal += itemTotal;

            checkoutSummary.innerHTML += `
                <p>${item.name} × ${item.quantity} — ₹${itemTotal}</p>
            `;
        });

        checkoutSummary.innerHTML += `
            <h3>Total: ₹${checkoutTotal}</h3>
        `;
    }
}
// Place Order - Frontend Demo

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const cart = JSON.parse(
            localStorage.getItem("arulMartCart")
        ) || [];

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const customerName =
            document.getElementById("customerName").value.trim();

        const mobile =
            document.getElementById("mobile").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const city =
            document.getElementById("city").value.trim();

        const pincode =
            document.getElementById("pincode").value.trim();

        const order = {
            orderId: "AM" + Date.now(),
            customerName: customerName,
            mobile: mobile,
            address: address,
            city: city,
            pincode: pincode,
            items: cart,
            total: cart.reduce(function (sum, item) {
                return sum + item.price * item.quantity;
            }, 0),
            orderDate: new Date().toLocaleString()
        };

        const orders = JSON.parse(
            localStorage.getItem("arulMartOrders")
        ) || [];

        orders.push(order);

        localStorage.setItem(
            "arulMartOrders",
            JSON.stringify(orders)
        );

        localStorage.removeItem("arulMartCart");

        alert(
            "Order placed successfully! 🎉\n" +
            "Order ID: " + order.orderId +
            "\nThank you for shopping with ArulMart!"
        );

        window.location.href = "home.html";
    });
}