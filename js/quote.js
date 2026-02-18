// js/quote.js
document.addEventListener("DOMContentLoaded", async () => {
  const quoteContainer = document.getElementById("quoteSection");
  if (!quoteContainer) return;

  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();

    const quote = data[0].q;
    const author = data[0].a;

    quoteContainer.innerHTML = `
      <blockquote>"${quote}"</blockquote>
      <p class="quote-author">— ${author}</p>
    `;

  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteContainer.innerHTML = `
      <p>Unable to load quote right now.</p>
    `;
  }
});
