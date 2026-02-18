
import { searchBooks } from "./booksApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  const resultsSection = document.querySelector(".results-section");
  if (!resultsSection) return;

  // Topics to choose from
  const randomTopics = ["fiction", "fantasy", "adventure", "romance", "mystery", "history", "science"];

  const allBooks = [];

  // Pick 5 random topics to get a bigger grid
  for (let i = 0; i < 5; i++) {
    const topic = randomTopics[Math.floor(Math.random() * randomTopics.length)];

    // Fetch books for this topic
    const books = await searchBooks(topic, 6, "en"); // 6 books per topic, English only
    if (books.length) {
      allBooks.push(...books);
    }
  }

  // Optionally shuffle allBooks for randomness
  shuffleArray(allBooks);

  displayBooks(allBooks, resultsSection);
});

// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Display books
function displayBooks(books, container) {
  container.innerHTML = "";

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
      <button class="add-btn view-btn">View</button>
    `;

    container.appendChild(card);

    const viewButton = card.querySelector(".view-btn");
    viewButton.addEventListener("click", () => {
      window.location.href = `book.html?id=${book.id}`;
    });
  });
}
