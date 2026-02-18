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
        <div class="card-buttons">
          <button class="add-btn view-btn">View</button>
          <button class="remove-btn">Remove</button>
        </div>
      `;

      container.appendChild(card);

      // Click to go to book detail page
      const viewButton = card.querySelector(".view-btn");
      viewButton.addEventListener("click", () => {
        window.location.href = `book.html?id=${book.id}`;
      });

      // Remove button functionality
      const removeButton = card.querySelector(".remove-btn");
      removeButton.addEventListener("click", () => {
        // Remove from localStorage
        library[category] = library[category].filter(b => b.id !== book.id);
        localStorage.setItem("myLibrary", JSON.stringify(library));

        // Remove from DOM
        card.remove();
      });
    });
  });
});
