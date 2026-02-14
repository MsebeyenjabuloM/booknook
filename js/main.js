import { searchBooks } from "./booksApi.js";

document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.querySelector(".search-section input");
  const searchButton = document.querySelector(".search-section button");
  const resultsSection = document.querySelector(".results-section");

  // 🛑 Stop if we're not on a page with search
  if (!searchInput || !searchButton || !resultsSection) {
    return;
  }

  searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    const books = await searchBooks(query);
    displayResults(books);
  });

  function displayResults(books) {
    resultsSection.innerHTML = "";

    books.forEach(book => {
      const info = book.volumeInfo;

      const title = info.title || "No title";
      const authors = info.authors?.join(", ") || "Unknown author";
      const cover = info.imageLinks?.thumbnail || "";

      const card = document.createElement("div");
      card.classList.add("book-card");

      card.innerHTML = `
        ${cover ? `<img src="${cover}" alt="${title} cover">` : ""}
        <h3>${title}</h3>
        <p>${authors}</p>
        <button class="add-btn">Add to Library</button>
      `;

      resultsSection.appendChild(card);
    });
  }

});
