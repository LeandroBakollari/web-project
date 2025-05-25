let allProducts = [];

// Load products from file and localStorage
async function loadProducts() {
  try {
    const response = await fetch("/marketplace/data/products.json");
    const jsonProducts = await response.json();
    const localProducts = JSON.parse(localStorage.getItem("quickflip_products")) || [];

    allProducts = [...jsonProducts, ...localProducts];
    displayProducts(allProducts); // Show all on load
  } catch (err) {
    console.error("Failed to load products:", err);
  }
}

// Display products in the container
function displayProducts(products) {
    const container = document.getElementById("product-list");
    if (!container) return;
  
    container.innerHTML = "";
  
    if (products.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }
  
    products.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <p><strong>$${p.price}</strong></p>
        `;
        div.addEventListener("click", () => {
          localStorage.setItem("quickflip_selected_product", JSON.stringify(p));
          window.location.href = "/marketplace/view/productD.html";
        });
        container.appendChild(div);
      });
      
  }
  
// Filter by category
function setupCategoryFilter() {
  const links = document.querySelectorAll("#category-list a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.dataset.category;

      // Highlight the active category
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      if (category === "All") {
        displayProducts(allProducts);
      } else {
        const filtered = allProducts.filter(
            (p) => p.description && p.description.toLowerCase() === category.toLowerCase()
          );
        // If no products match, show all products          
        displayProducts(filtered);
      }
    });
  });
}

// Live search
function setupSearch() {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(keyword)
    );

    displayProducts(filtered);
  });
}

// Initialize everything
window.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupCategoryFilter();
  setupSearch();
  console.log(allProducts);
});