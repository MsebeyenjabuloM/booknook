import { searchBooks } from "./booksApi.js";

document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.querySelector(".search-section input");
  const searchButton = document.querySelector(".search-section button");
  const resultsSection = document.querySelector(".results-section");

  // If this page doesn’t have a search section, do nothing
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
    resultsSection.innerHTML = ""; // clear previous results

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
        <button class="add-btn">View</button>
      `;

      resultsSection.appendChild(card);

      
    });

    
  }

});
