// js/booksApi.js

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=intitle:";

export async function searchBooks(query) {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_URL}${query}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
