import { searchBooks, getBookById } from "./booksApi.js";

document.addEventListener("DOMContentLoaded", () => {

  // 🔎 Check if we're on book.html
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id");

  if (bookId) {
    loadBookDetails(bookId);
  }

  const searchInput = document.querySelector(".search-section input");
  const searchButton = document.querySelector(".search-section button");
  const resultsSection = document.querySelector(".results-section");

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

    books.forEach((book) => {
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

      const viewButton = card.querySelector(".add-btn");

      viewButton.addEventListener("click", () => {
        window.location.href = "book.html?id=" + book.id;
      });

    });
  }

});

async function loadBookDetails(id) {
  const book = await getBookById(id);
  if (!book) return;

  const section = document.querySelector(".book-detail");
  if (!section) return;

  const info = book.volumeInfo;

  const title = info.title || "No title";
  const authors = info.authors?.join(", ") || "Unknown author";
  const cover = info.imageLinks?.thumbnail || "";
  const description = info.description || "No description available.";
  const categories = info.categories?.join(", ") || "Uncategorized";

  section.innerHTML = `
    <div class="book-detail-container">
      ${cover ? `<img src="${cover}" alt="${title} cover">` : ""}
      <div class="book-info">
        <h2>${title}</h2>
        <p><strong>Author:</strong> ${authors}</p>
        <p><strong>Category:</strong> ${categories}</p>
        <p class="description">${description}</p>

        <div class="status-buttons">
          <button class="add-btn">Want to Read</button>
          <button class="add-btn">Currently Reading</button>
          <button class="add-btn">Finished</button>
          <button class="add-btn">Did Not Finish</button>
          <button class="add-btn">Favorite</button>
        </div>
      </div>
    </div>
  `;
}
