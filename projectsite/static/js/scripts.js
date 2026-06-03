const recipes = [
  {
    id: 1,
    title: "Classic Pancakes",
    description: "Fluffy homemade pancakes with a golden finish.",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
    category: "Breakfast",
    cooking_time: 20,
    servings: 4,
    author: "Chef John",
    ingredients: ["2 cups flour", "2 eggs", "1.5 cups milk", "2 tbsp sugar", "1 tsp baking powder"],
    instructions: ["Mix dry ingredients.", "Whisk in milk and eggs.", "Cook on a lightly greased pan."],
    favorites: false
  },
  {
    id: 2,
    title: "Creamy Carbonara",
    description: "Rich pasta with creamy sauce and savory bacon.",
    image: "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?auto=format&fit=crop&w=800&q=80",
    category: "Dinner",
    cooking_time: 30,
    servings: 3,
    author: "Chef Maria",
    ingredients: ["200g spaghetti", "2 egg yolks", "100g bacon", "1/2 cup cream", "Parmesan cheese"],
    instructions: ["Cook the pasta.", "Fry the bacon.", "Mix all ingredients with sauce off heat."],
    favorites: false
  },
  {
    id: 3,
    title: "Fresh Garden Salad",
    description: "A crisp salad with colorful vegetables.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    category: "Lunch",
    cooking_time: 15,
    servings: 2,
    author: "Chef Ana",
    ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Carrots", "Olive oil"],
    instructions: ["Chop vegetables.", "Combine in a bowl.", "Drizzle dressing and toss."],
    favorites: false
  },
  {
    id: 4,
    title: "Chocolate Cake",
    description: "Moist chocolate cake with rich frosting.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    category: "Dessert",
    cooking_time: 50,
    servings: 8,
    author: "Chef Lily",
    ingredients: ["Flour", "Cocoa powder", "Eggs", "Sugar", "Butter"],
    instructions: ["Prepare batter.", "Bake until set.", "Cool and frost."],
    favorites: false
  },
  {
    id: 5,
    title: "Fruit Smoothie",
    description: "A refreshing drink made with fresh fruits.",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
    category: "Drinks",
    cooking_time: 10,
    servings: 1,
    author: "Chef Ben",
    ingredients: ["Banana", "Mango", "Yogurt", "Ice", "Honey"],
    instructions: ["Add everything to a blender.", "Blend until smooth.", "Serve cold."],
    favorites: false
  },
  {
    id: 6,
    title: "Garlic Butter Shrimp",
    description: "Juicy shrimp sautéed in garlic butter sauce.",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
    category: "Dinner",
    cooking_time: 25,
    servings: 2,
    author: "Chef Nina",
    ingredients: ["Shrimp", "Garlic", "Butter", "Parsley", "Lemon juice"],
    instructions: ["Heat butter.", "Cook garlic and shrimp.", "Finish with lemon and parsley."],
    favorites: false
  }
];

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function saveFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

function toggleMobileNav() {
  const navbar = document.querySelector(".navbar");
  if (navbar) navbar.classList.toggle("open");
}

function renderRecipeCards(selector, data) {
  const container = document.querySelector(selector);
  if (!container) return;

  const favorites = getFavorites();
  container.innerHTML = data.length
    ? data
        .map(
          (recipe) => `
      <div class="recipe-card">
        <div class="recipe-thumb">
          <img src="${recipe.image}" alt="${recipe.title}">
          <div class="recipe-badges">
            <span class="badge">${recipe.category}</span>
            <button class="icon-btn fav-btn" data-id="${recipe.id}" aria-label="Toggle favorite">
              <i class="fa${favorites.includes(recipe.id) ? "s" : "r"} fa-heart"></i>
            </button>
          </div>
        </div>
        <div class="recipe-body">
          <h3 class="recipe-title">${recipe.title}</h3>
          <p>${recipe.description}</p>
          <div class="recipe-meta">
            <span><i class="fa-regular fa-clock"></i> ${recipe.cooking_time} min</span>
            <span><i class="fa-regular fa-user"></i> ${recipe.author}</span>
          </div>
          <a href="recipe-detail.html?id=${recipe.id}" class="btn btn-primary">View Recipe</a>
        </div>
      </div>`
        )
        .join("")
    : `<div class="empty-state"><h3>No results found</h3><p>Try another search or filter.</p></div>`;

  container.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const favs = getFavorites();
      const index = favs.indexOf(id);
      if (index >= 0) favs.splice(index, 1);
      else favs.push(id);
      saveFavorites(favs);
      const icon = btn.querySelector("i");
      icon.className = `fa${favs.includes(id) ? "s" : "r"} fa-heart`;
    });
  });
}

function initHome() {
  const featured = document.querySelector("#featured-recipes");
  if (featured) renderRecipeCards("#featured-recipes", recipes.slice(0, 4));

  const categories = document.querySelector("#category-list");
  if (categories) {
    const cats = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Drinks"];
    categories.innerHTML = cats
      .map(
        (cat) => `
      <a class="category-card" href="category.html?cat=${encodeURIComponent(cat)}">
        <h3>${cat}</h3>
        <p>Browse ${cat.toLowerCase()} recipes</p>
      </a>`
      )
      .join("");
  }

  const searchForm = document.querySelector("#home-search");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = document.querySelector("#home-search-input").value.trim();
      window.location.href = `search-results.html?q=${encodeURIComponent(value)}`;
    });
  }
}

function initSearchPage() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") || "";
  const input = document.querySelector("#search-input");
  const title = document.querySelector("#search-title");
  if (input) input.value = q;
  if (title) title.textContent = q ? `Search results for "${q}"` : "Search results";

  const search = (term) => {
    const filtered = recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(term.toLowerCase()) ||
        r.ingredients.join(" ").toLowerCase().includes(term.toLowerCase())
    );
    renderRecipeCards("#results-grid", filtered);
  };

  if (input) {
    input.addEventListener("input", () => search(input.value));
    search(q);
  }
}

function initCategoryPage() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat") || "Breakfast";
  const title = document.querySelector("#category-title");
  if (title) title.textContent = `All ${cat} Recipes`;

  const filtered = recipes.filter((r) => r.category === cat);
  renderRecipeCards("#category-grid", filtered);
}

function initRecipeDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id") || 1);
  const recipe = recipes.find((r) => r.id === id) || recipes[0];

  const img = document.querySelector("#detail-image");
  const title = document.querySelector("#detail-title");
  const author = document.querySelector("#detail-author");
  const category = document.querySelector("#detail-category");
  const time = document.querySelector("#detail-time");
  const servings = document.querySelector("#detail-servings");
  const desc = document.querySelector("#detail-description");
  const ingredients = document.querySelector("#detail-ingredients");
  const instructions = document.querySelector("#detail-instructions");

  if (img) img.src = recipe.image;
  if (title) title.textContent = recipe.title;
  if (author) author.textContent = recipe.author;
  if (category) category.textContent = recipe.category;
  if (time) time.textContent = `${recipe.cooking_time} min`;
  if (servings) servings.textContent = `${recipe.servings}`;
  if (desc) desc.textContent = recipe.description;

  if (ingredients) {
    ingredients.innerHTML = recipe.ingredients.map((item) => `<li>${item}</li>`).join("");
  }
  if (instructions) {
    instructions.innerHTML = recipe.instructions.map((item) => `<li>${item}</li>`).join("");
  }

  const favBtn = document.querySelector("#detail-fav");
  if (favBtn) {
    favBtn.addEventListener("click", () => {
      const favs = getFavorites();
      const index = favs.indexOf(recipe.id);
      if (index >= 0) favs.splice(index, 1);
      else favs.push(recipe.id);
      saveFavorites(favs);
      favBtn.innerHTML = `<i class="fa${favs.includes(recipe.id) ? "s" : "r"} fa-heart"></i> Save Recipe`;
    });
  }
}

function initFavoritesPage() {
  const favIds = getFavorites();
  const favRecipes = recipes.filter((r) => favIds.includes(r.id));
  renderRecipeCards("#favorites-grid", favRecipes);
}

function initMyRecipesPage() {
  renderRecipeCards("#my-recipes-grid", recipes.slice(0, 3));
}

function previewImage(inputId, previewId) {
  const input = document.querySelector(inputId);
  const preview = document.querySelector(previewId);
  if (!input || !preview) return;

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      preview.innerHTML = `<img src="${reader.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  });
}

function validateForm(formId) {
  const form = document.querySelector(formId);
  if (!form) return;

  form.addEventListener("submit", (e) => {
    const inputs = form.querySelectorAll("[required]");
    let valid = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) valid = false;
    });

    const email = form.querySelector('input[type="email"]');
    if (email && !/^\S+@\S+\.\S+$/.test(email.value)) valid = false;

    const password = form.querySelector("#password");
    const confirm = form.querySelector("#confirm-password");
    if (password && confirm && password.value !== confirm.value) valid = false;

    if (!valid) {
      e.preventDefault();
      alert("Please complete all required fields correctly.");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("#menu-toggle");
  if (toggle) toggle.addEventListener("click", toggleMobileNav);

  initHome();
  initSearchPage();
  initCategoryPage();
  initRecipeDetail();
  initFavoritesPage();
  initMyRecipesPage();

  renderRecipeCards("#all-recipes-grid", recipes);
  previewImage("#image-upload", "#image-preview");
  validateForm("#login-form");
  validateForm("#register-form");
  validateForm("#recipe-form");
});