import { getBookById } from "./booksApi.js";

document.addEventListener("DOMContentLoaded", async () => {

  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id");

  if (!bookId) return;

  const book = await getBookById(bookId);
  if (!book) return;

  const section = document.querySelector(".book-detail");
  if (!section) return;

  const info = book.volumeInfo;

  const title = info.title || "No title";
  const authors = info.authors?.join(", ") || "Unknown author";
  const cover = info.imageLinks?.thumbnail || "";
  const description = info.description || "No description available.";
  const categories = info.categories?.join(", ") || "Uncategorized";

  // Render book detail and status buttons
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

  // ---- Add click events to status buttons ----
  const buttons = section.querySelectorAll(".add-btn");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.textContent;

      saveBookToLibrary({
        id: book.id,
        title,
        authors,
        cover
      }, status);
    });
  });

});

// ---- Save book to localStorage function ----
function saveBookToLibrary(bookData, status) {

  // Try to read library from localStorage
  let library = JSON.parse(localStorage.getItem("myLibrary"));

  // If nothing exists yet, create it
  if (!library) {
    library = {
      wantToRead: [],
      currentlyReading: [],
      finished: [],
      didNotFinish: [],
      favorites: []
    };
  }

  // Map button text to localStorage key
  const statusMap = {
    "Want to Read": "wantToRead",
    "Currently Reading": "currentlyReading",
    "Finished": "finished",
    "Did Not Finish": "didNotFinish",
    "Favorite": "favorites"
  };

  const key = statusMap[status];
  if (!key) return;

  // Prevent duplicates
  const alreadyExists = library[key].some(b => b.id === bookData.id);
  if (alreadyExists) {
    alert(`Book is already in "${status}"`);
    return;
  }

  // Add book to proper category
  library[key].push(bookData);

  // Save back to localStorage
  localStorage.setItem("myLibrary", JSON.stringify(library));

  alert(`Book added to "${status}"`);
}
