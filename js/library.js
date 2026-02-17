// js/library.js

document.addEventListener("DOMContentLoaded", () => {
  const library = JSON.parse(localStorage.getItem("myLibrary"));

  if (!library) return;

  const categories = ["wantToRead", "currentlyReading", "finished", "didNotFinish", "favorites"];

  categories.forEach(category => {
    const container = document.getElementById(category);
    if (!container) return;

    container.innerHTML = ""; // clear previous content

    library[category].forEach(book => {
      const card = document.createElement("div");
      card.classList.add("book-card");

      card.innerHTML = `
        ${book.cover ? `<img src="${book.cover}" alt="${book.title} cover">` : ""}
        <h3>${book.title}</h3>
        <p>${book.authors}</p>
        <button class="add-btn view-btn">View</button>
      `;

      container.appendChild(card);

      // Click to go to book detail page
      const viewButton = card.querySelector(".view-btn");
      viewButton.addEventListener("click", () => {
        window.location.href = `book.html?id=${book.id}`;
      });
    });
  });
});
