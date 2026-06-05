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
