# The Book Nest SPA
# Project Description
The Book Nest is a Single Page Application (SPA) that allows users to search for books using the Google Books API and organize them into virtual bookshelves: Favorites, Currently Reading, and Want to Read. Users can view detailed information about each book, manage their bookshelves by rearranging books between categories, and remove books from their shelves.
# Features
# 1. Search for Books
•	Users can search for books by title, author, or keyword using the Google Books API.
•	Display book results with the following details:
o	Title
o	Author(s)
o	Thumbnail
# 2. View Book Details
•	Clicking on a book displays additional information in a modal:
o	Description
o	Publication Date
o	Page Count (if available)
# 3. Virtual Bookshelves
•	Users can organize books into three predefined categories:
o	Favorites
o	Currently Reading
o	Want to Read
•	Each bookshelf displays the books along with options to manage them.
# 4. CRUD Operations
•	Find Book: Find a book based on keyword searched
•	Add to Shelf: Add books to a specific shelf.
•	Rearrange: Move books between shelves using a dropdown.
•	Remove: Remove books from a shelf.
#5. Responsive Design
•	Fully responsive layout for seamless use across devices.
#Technologies Used
# •	Frontend:
o	HTML5
o	CSS3
o	JavaScript
# •	API:
o	Google Books API
# Getting Started
# 1. Prerequisites
Ensure you have the following installed:
•	A modern web browser (e.g., Chrome, Firefox)
•	An internet connection to access the Google Books API
# 2. Installation
1.	Clone the repository:
git clone https://github.com/your-username/the-book-nest.git
2.	Navigate to the project directory:
cd The-Book-Nest
3.	Open the index.html file in your browser to launch the application.
# Usage
1. Search for Books
•	Enter a keyword (title, author, or genre) in the search bar.
•	Click the Search button to fetch results.
2. Manage Bookshelves
•	Add a Book: Use the buttons in search results to add books to a shelf.
•	View a Shelf:
o	Click on a shelf link (e.g., Favorites) to view its contents.
•	Rearrange a Book:
o	Click the Rearrange button next to a book and select a new shelf from the dropdown.
•	Remove a Book:
o	Click the Remove button to delete the book from the shelf.
3. View Book Details
•	In search results, click View Details to open a modal with detailed book information.
# Project Structure
the-book-nest/
│
├── index.html         # Main HTML file
├── style.css          # Stylesheet for the application
├── app.js             # Main JavaScript file
└── README.md          # Project documentation
# API Reference
Google Books API
•	Base URL:
https://www.googleapis.com/books/v1/volumes
•	Example query:
https://www.googleapis.com/books/v1/volumes?q=harry+potter
# Enhancements
# Future Features
•	User authentication to persist personal libraries.
•	Dark mode for improved usability.
•	Drag-and-drop functionality for easier book rearrangement.
# Contributing
1.	Fork the repository.
2.	Create a new branch:
git checkout -b feature-name
3.	Make your changes and commit them:
git commit -m "Description of changes"
4.	Push to your fork:
git push origin feature-name
5.	Open a pull request.
# License
This project is licensed under the MIT License. See the LICENSE file for details.
# Contact
If you have any questions or suggestions, feel free to contact me at:
•	Email: helen.wairagu@student.moringaschool.com
•	GitHub: https://github.com/WairaguHelen
