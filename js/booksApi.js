// js/booksApi.js

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=intitle:";

export async function searchBooks(query, maxResults = 10, lang = "en") {
  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_URL}${encodeURIComponent(query)}&printType=books&langRestrict=${lang}&maxResults=${maxResults}`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export async function getBookById(id) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}
