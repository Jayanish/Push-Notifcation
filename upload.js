document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("product-form");
    const productList = document.createElement("div");
    productList.classList.add("product-list");
    document.body.appendChild(productList);

    // Load products from local storage on page load
    let products = JSON.parse(localStorage.getItem("products")) || [];
    displayProducts();

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("product-name").value;
        const description = document.getElementById("product-description").value;
        const price = parseFloat(document.getElementById("product-price").value);
        const imageInput = document.getElementById("product-image");

        if (imageInput.files.length === 0) {
            alert("Please upload a product image.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;

            const discountPrice = (price * 0.9).toFixed(2); // 10% discount

            const newProduct = {
                id: Date.now(),
                name,
                description,
                price: `$${price.toFixed(2)}`,
                discountPrice: `$${discountPrice}`,
                imageUrl
            };

            products.push(newProduct);
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts();
            productForm.reset();
        };

        reader.readAsDataURL(imageInput.files[0]);
    });

    function displayProducts() {
        productList.innerHTML = "<h2>Uploaded Products</h2>";
        products.forEach((product, index) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>Price:</strong> ${product.price} <span class="discount"> ${product.discountPrice}</span></p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            productList.appendChild(productCard);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                products.splice(index, 1);
                localStorage.setItem("products", JSON.stringify(products));
                displayProducts();
            });
        });
    }
});
