document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navSearch = document.querySelector(".nav-search input");
  const searchBar = document.querySelector(".search-bar input");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("open");
    });
  }

  function doSearch(query) {
    if (!query || !query.trim()) return;
    window.location.href = `search_results.html?q=${encodeURIComponent(query.trim())}`;
  }

  if (navSearch) {
    navSearch.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doSearch(navSearch.value);
    });
  }

  if (searchBar) {
    searchBar.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doSearch(searchBar.value);
    });
  }

  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.querySelector(".navbar");
  const favoritesGrid = document.getElementById("favorites-grid");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("open");
    });
  }

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function renderFavorites() {
    if (!favoritesGrid) return;

    if (favorites.length === 0) {
      favoritesGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-heart-crack"></i>
          <h3>No favorites yet</h3>
          <p>Save recipes you love so they appear here.</p>
          <a href="index.html" class="btn btn-primary" style="margin-top:1rem;">
            Browse Recipes
          </a>
        </div>
      `;
      return;
    }

    favoritesGrid.innerHTML = favorites.map(recipe => `
      <article class="recipe-card">
        <div class="recipe-thumb">
          <img src="${recipe.image}" alt="${recipe.title}">
        </div>
        <div class="recipe-body">
          <h3 class="recipe-title">${recipe.title}</h3>
          <div class="recipe-meta">
            <span><i class="fa-regular fa-clock"></i> ${recipe.time || "30 min"}</span>
            <span><i class="fa-solid fa-star"></i> Favorite</span>
          </div>
          <div class="card-actions">
            <a href="recipe.html?id=${recipe.id}" class="btn btn-primary">View</a>
            <button class="btn btn-outline" onclick="removeFavorite(${recipe.id})">Remove</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  renderFavorites();
});

function removeFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(recipe => recipe.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  location.reload();
}