// js/quote.js

document.addEventListener("DOMContentLoaded", async () => {

  const quoteContainer = document.getElementById("quoteSection");
  if (!quoteContainer) return;

  // Reset animation state
  quoteContainer.classList.remove("show");

  const readingKeywords = [
    "book",
    "read",
    "reading",
    "literature",
    "story",
    "stories",
    "novel",
    "author",
    "writer",
    "words",
    "library"
  ];

  async function fetchReadingQuote(attempts = 0) {
    if (attempts > 10) {
      quoteContainer.innerHTML = `
        <p>“A room without books is like a body without a soul.”</p>
        <p class="quote-author">— Marcus Tullius Cicero</p>
      `;

      setTimeout(() => {
        quoteContainer.classList.add("show");
      }, 50);

      return;
    }

    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();

      const quoteText = data.quote.toLowerCase();

      const isReadingRelated = readingKeywords.some(keyword =>
        quoteText.includes(keyword)
      );

      if (isReadingRelated) {
        quoteContainer.innerHTML = `
          <blockquote>"${data.quote}"</blockquote>
          <p class="quote-author">— ${data.author}</p>
        `;

        // Trigger animation
        setTimeout(() => {
          quoteContainer.classList.add("show");
        }, 50);

      } else {
        fetchReadingQuote(attempts + 1);
      }

    } catch (error) {
      console.error("Error fetching quote:", error);
      quoteContainer.innerHTML = `
        <p>Unable to load quote at the moment.</p>
      `;

      setTimeout(() => {
        quoteContainer.classList.add("show");
      }, 50);
    }
  }

  fetchReadingQuote();
});
