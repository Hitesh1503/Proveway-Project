const sizes = ["Select", "S", "M", "L"];
const colors = ["Select", "Black", "Red", "Blue"];

const boxesData = [
  { unit: 1, price: 10, discount: "10% Off", popular: false },
  {
    unit: 2,
    price: 18,
    discount: "20% Off",
    popular: true,
  },
  { unit: 3, price: 24, discount: "30% Off", popular: false },
];

const accordion = document.getElementById("accordion");
const totalEl = document.getElementById("total");

// Create all boxes dynamically
boxesData.forEach((data, index) => {
  const box = document.createElement("div");
  box.className = `box${data.popular ? " popular" : ""}`;
  box.dataset.units = data.unit;
  box.dataset.price = data.price;

  const inputs = `
  <div class="dropdown-content">
    <span>Size</span>
    <span>Color</span>
  </div>
  ${Array.from(
    { length: 2 },
    (_, i) => `
    <div class="dropdowns-content-box">
      #${i + 1} 
    <select>${sizes.map((size) => `<option>${size}</option>`).join("")}</select>
    <select>${colors
      .map((color) => `<option>${color}</option>`)
      .join("")}</select>
    </div>
  `
  ).join("")}
`;

  box.innerHTML = `
    <div class="header">
      <input type="radio" name="plan" id="plan-${index}">
      <label for="plan-${index}">
        <strong>${data.unit} Unit</strong>
        <span class="tag">${data.discount}</span>
        <div class="price">$${data.price.toFixed(
          2
        )} USD <div class="strike">$24.00 USD</div></div>
      </label>
    </div>
     ${
       data.unit === 1 ? '<div class="standard-price">Standard Price</div>' : ""
     }
    <div class="content">
      <div class="dropdowns">${inputs}</div>
    </div>
  `;

  accordion.appendChild(box);
  console.log(accordion);
});

// Accordion & Total update logic
const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
  const header = box.querySelector(".header");
  header.addEventListener("click", () => {
    boxes.forEach((b) => b.classList.remove("active"));
    box.classList.add("active");

    const price = parseFloat(box.dataset.price);
    totalEl.textContent = price.toFixed(2);
  });
});
