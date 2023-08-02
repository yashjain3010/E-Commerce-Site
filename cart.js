// Get the cart items from local storage
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to display cart items
// function displayCartItems() {
//   const cartItemsContainer = document.getElementById("cartItems");
//   cartItemsContainer.innerHTML = "";

//   if (cartItems.length === 0) {
//     cartItemsContainer.innerHTML =
//       '<tr><td colspan="6">No items in the cart</td></tr>';
//   } else {
//     let totalPrice = 0;

//     cartItems.forEach((item, index) => {
//       const { name, price, quantity, productImage } = item;
//       const total = price * quantity;
//       totalPrice += total;

//       const row = document.createElement("tr");
//       row.innerHTML = `

//         <td>${name}</td>
//         <td>${price}</td>
//         <td>
//           <button class="quantity-button" onclick="decrementQuantity(${index})">-</button>
//           ${quantity}
//           <button class="quantity-button" onclick="incrementQuantity(${index})">+</button>
//         </td>
//         <td>${total}</td>
//         <td><button onclick="removeItem(${index})">Remove</button></td>
//       `;

//       cartItemsContainer.appendChild(row);
//     });

//     // Display total price
//     const totalPriceRow = document.createElement("tr");
//     totalPriceRow.innerHTML = `
//       <td colspan="4">Total:</td>
//       <td>${totalPrice}</td>
//     `;
//     cartItemsContainer.appendChild(totalPriceRow);
//   }
// }
// cart.js

// Function to display cart items
  function displayCartItems() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML =
        '<tr><td colspan="6">No items in the cart</td></tr>';
    } else {
      let totalPrice = 0;

      cartItems.forEach((item, index) => {
        const { name, price, quantity, image } = item;
        const total = price * quantity;
        totalPrice += total;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td><img src="${image}" alt="${name}" class="product-image"></td>
          <td>${name}</td>
          <td>${price}</td>
          <td>
            <button class="quantity-button" onclick="decrementQuantity(${index})">-</button>
            ${quantity}
            <button class="quantity-button" onclick="incrementQuantity(${index})">+</button>
          </td>
          <td>${total}</td>
          <td><button onclick="removeItem(${index})">Remove</button></td>
        `;

        cartItemsContainer.appendChild(row);
      });

      // Display total price
      const totalPriceRow = document.createElement("tr");
      totalPriceRow.innerHTML = `
        <td colspan="5">Total:</td>
        <td>${totalPrice}</td>
      `;
      cartItemsContainer.appendChild(totalPriceRow);
    }
  }

  // Call the function to display the cart items when the cart page loads
  displayCartItems();

  // Function to handle updating the quantity in the cart
  function updateQuantity(productIndex, quantity) {
    if (productIndex >= 0 && productIndex < cartItems.length) {
      cartItems[productIndex].quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      displayCartItems();
    }
  }

  // Function to increment the quantity
  function incrementQuantity(productIndex) {
    const quantity = cartItems[productIndex].quantity + 1;
    updateQuantity(productIndex, quantity);
  }

  // Function to decrement the quantity
  function decrementQuantity(productIndex) {
    const quantity = cartItems[productIndex].quantity - 1;
    if (quantity >= 1) {
      updateQuantity(productIndex, quantity);
    }
  }

  // Function to handle adding an item to the cart and updating quantities
  function addToCart() {
    var productImage = document.getElementById("ProductImg").src;

    const name = document.querySelector("h1").innerText;
    const price = parseFloat(
      document.querySelector("h2").innerText.replace("Rs", "")
    );
    const quantity = parseInt(document.getElementById("quantityInput").value);

    // Check if the item already exists in the cart
    const existingItem = cartItems.find((item) => item.name === name);

    if (existingItem) {
      // If the item already exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the item doesn't exist, add it to the cart
      const newItem = {
        name: name,
        price: price,
        quantity: quantity,
        image: productImage,
      };
      cartItems.push(newItem);
    }

    // Save the updated cart items to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Redirect to cart.html
    window.location.href = "cart.html";
  }

  // Function to remove an item from the cart
  function removeItem(productIndex) {
    if (productIndex >= 0 && productIndex < cartItems.length) {
      cartItems.splice(productIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      displayCartItems();
    }
  }

  // Call the displayCartItems function when the page loads
  document.addEventListener("DOMContentLoaded", displayCartItems);
