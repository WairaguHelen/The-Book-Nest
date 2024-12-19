const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results");

// Storing the book shelves as arrays
let bookshelves = {
  favorites: [],
  currentlyReading: [],
  wantToRead: [],
};

// Search button functionality
async function fetchBooks(query) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

function displayBooks(books) {
  resultsContainer.innerHTML = ""; // Clear previous results
  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book";

    const title = book.volumeInfo.title || "Unknown Title";
    const authors = book.volumeInfo.authors?.join(", ") || "Unknown Author";
    const thumbnail =
      book.volumeInfo.imageLinks?.thumbnail ||
      "https://via.placeholder.com/100x150?text=No+Image";

    bookElement.innerHTML = `
      <img src="${thumbnail}" alt="${title}">
      <h3>${title}</h3>
      <p>${authors}</p>
      <button onclick="addBookToShelf('${title}', 'favorites')">Add to Favorites</button>
      <button onclick="addBookToShelf('${title}', 'currentlyReading')">Currently Reading</button>
      <button onclick="addBookToShelf('${title}', 'wantToRead')">Want to Read</button>
    `;
    resultsContainer.appendChild(bookElement);
  });
}

searchButton.addEventListener("click", async () => {
  const query = searchBar.value.trim();
  if (!query) {
    alert("Please enter a search term.");
    return;
  }
  const books = await fetchBooks(query); // GET books
  displayBooks(books);
});

// Viewing book details
const modal = document.getElementById("book-details-modal");
const modalContentDetails = document.getElementById("modal-content-details");
const closeModal = document.getElementById("close-modal");

// Open modal and display book details
function openBookDetails(book) {
  const title = book.volumeInfo.title || "Unknown Title";
  const authors = book.volumeInfo.authors?.join(", ") || "Unknown Author";
  const description = book.volumeInfo.description || "No description available.";
  const publishedDate = book.volumeInfo.publishedDate || "Unknown";
  const pageCount = book.volumeInfo.pageCount || "N/A";

  modalContentDetails.innerHTML = `
    <h2>${title}</h2>
    <p><strong>Author(s):</strong> ${authors}</p>
    <p><strong>Published Date:</strong> ${publishedDate}</p>
    <p><strong>Page Count:</strong> ${pageCount}</p>
    <p>${description}</p>
  `;

  modal.style.display = "block"; // Show the modal
}

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Adding book to different categories
function addBookToShelf(title, shelf) {
  if (!bookshelves[shelf].find((book) => book.title === title)) {
    bookshelves[shelf].push({ title });
    alert(`${title} added to ${shelf.replace(/([A-Z])/g, " $1")}.`);
  } else {
    alert(`${title} is already in ${shelf.replace(/([A-Z])/g, " $1")}.`);
  }
}

// View Books in the assigned folders
function viewShelf(shelf) {
  const shelfBooks = bookshelves[shelf];
  resultsContainer.innerHTML = `<h2>${shelf.replace(/([A-Z])/g, " $1")}</h2>`;
  shelfBooks.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book";
    bookElement.innerHTML = `
      <h3>${book.title}</h3>
      <button onclick="removeBookFromShelf('${book.title}', '${shelf}')">Remove</button>
    `;
    resultsContainer.appendChild(bookElement);
  });
}

// Moving book from one folder to the other
function moveBookToShelf(title, fromShelf, toShelf) {
  const bookIndex = bookshelves[fromShelf].findIndex((book) => book.title === title);
  if (bookIndex > -1) {
    const [book] = bookshelves[fromShelf].splice(bookIndex, 1); // Remove from current shelf
    bookshelves[toShelf].push(book); // Add to new shelf
    alert(`${title} moved to ${toShelf.replace(/([A-Z])/g, " $1")}.`);
  } else {
    alert(`${title} not found in ${fromShelf.replace(/([A-Z])/g, " $1")}.`);
  }
}

// Deleting a book from a folder
function removeBookFromShelf(title, shelf) {
  const bookIndex = bookshelves[shelf].findIndex((book) => book.title === title);
  if (bookIndex > -1) {
    bookshelves[shelf].splice(bookIndex, 1); // Remove book
    alert(`${title} removed from ${shelf.replace(/([A-Z])/g, " $1")}.`);
  } else {
    alert(`${title} not found in ${shelf.replace(/([A-Z])/g, " $1")}.`);
  }
}

// Event Listeners for Shelves
document.getElementById("favorites-link").addEventListener("click", () => viewShelf("favorites"));
document.getElementById("currently-reading-link").addEventListener("click", () => viewShelf("currentlyReading"));
document.getElementById("want-to-read-link").addEventListener("click", () => viewShelf("wantToRead"));

// Update displayBooks function to include a button to view details
function displayBooks(books) {
  resultsContainer.innerHTML = ""; // Clear previous results
  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book";

    const title = book.volumeInfo.title || "Unknown Title";
    const authors = book.volumeInfo.authors?.join(", ") || "Unknown Author";
    const thumbnail =
      book.volumeInfo.imageLinks?.thumbnail ||
      "https://via.placeholder.com/100x150?text=No+Image";

    bookElement.innerHTML = `
      <img src="${thumbnail}" alt="${title}">
      <h3>${title}</h3>
      <p>${authors}</p>
      <button onclick="openBookDetails(${JSON.stringify(book).replace(/"/g, '&quot;')})">View Details</button>
      <button onclick="addBookToShelf('${title}', 'favorites')">Add to Favorites</button>
      <button onclick="addBookToShelf('${title}', 'currentlyReading')">Currently Reading</button>
      <button onclick="addBookToShelf('${title}', 'wantToRead')">Want to Read</button>
    `;
    resultsContainer.appendChild(bookElement);
  });
}

// Rearrange Book Shelf (Move book to another category with dropdown)
function rearrangeBookShelf(title, currentShelf) {
  const dropdown = document.createElement("select");
  dropdown.className = "rearrange-dropdown";

  // Create options for each shelf
  ["favorites", "currentlyReading", "wantToRead"].forEach((shelf) => {
    if (shelf !== currentShelf) { // Exclude the current shelf from options
      const option = document.createElement("option");
      option.value = shelf;
      option.textContent = shelf.replace(/([A-Z])/g, " $1");
      dropdown.appendChild(option);
    }
  });

  // Create a container for the dropdown and action buttons
  const dropdownContainer = document.createElement("div");
  dropdownContainer.className = "dropdown-container";
  dropdownContainer.innerHTML = `
    <p>Move "${title}" to:</p>
  `;
  dropdownContainer.appendChild(dropdown);

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirm";
  confirmButton.onclick = () => {
    const newShelf = dropdown.value;
    moveBookToShelf(title, currentShelf, newShelf); // Move the book
    document.body.removeChild(dropdownContainer); // Remove dropdown after action
    viewShelf(currentShelf); // Refresh the current shelf
  };

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.onclick = () => {
    document.body.removeChild(dropdownContainer); // Remove dropdown if canceled
  };

  dropdownContainer.appendChild(confirmButton);
  dropdownContainer.appendChild(cancelButton);

  // Display the dropdown
  document.body.appendChild(dropdownContainer);
}

// View books in the newly assigned shelves
function viewShelf(shelf) {
  const shelfBooks = bookshelves[shelf];
  resultsContainer.innerHTML = `<h2>${shelf.replace(/([A-Z])/g, " $1")}</h2>`;
  shelfBooks.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book";
    bookElement.innerHTML = `
      <h3>${book.title}</h3>
      <button onclick="rearrangeBookShelf('${book.title}', '${shelf}')">Rearrange</button>
      <button onclick="removeBookFromShelf('${book.title}', '${shelf}')">Remove</button>
    `;
    resultsContainer.appendChild(bookElement);
  });
}
