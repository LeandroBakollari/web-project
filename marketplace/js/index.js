
  document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.querySelector(".search-box");
    const productCards = document.querySelectorAll(".product-card");

    searchBox.addEventListener("input", function () {
      const query = searchBox.value.toLowerCase();

      productCards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(query)) {
          card.parentElement.style.display = "block";
        } else {
          card.parentElement.style.display = "none";
        }
      });
    });
  });
