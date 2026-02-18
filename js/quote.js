// js/quote.js

document.addEventListener("DOMContentLoaded", async () => {

  const quoteContainer = document.getElementById("quoteSection");
  if (!quoteContainer) return;

  try {
    const response = await fetch("https://api.quotable.io/random?tags=books|literature");
    const data = await response.json();

    quoteContainer.innerHTML = `
      <blockquote>
        "${data.content}"
      </blockquote>
      <p class="quote-author">— ${data.author}</p>
    `;

  } catch (error) {
    console.error("Error fetching quote:", error);
  }
});
